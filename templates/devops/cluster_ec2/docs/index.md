# ${{ values.cluster_name }}

# Template for EC2 Instance Cluster Provisioning

This template aims to provision a cluster on an EC2 instance using Terraform, Kubernetes, and other related tools. It allows users to customize aspects such as environment settings, EC2 configuration (including cluster name, instance type, and key pair), network configuration, Terraform configuration (including name and region of the state bucket), Nginx configuration, observability options (such as enabling Grafana dashboards), and repository location.

### Template Filling Steps and Structure

1. **Environment Settings:** Specifies which environment will be used for provisioning the EC2 cluster.
2. **Ec2 Configuration:** Defines information related to the owner of the instance component (e.g., instance name, type, and SSH access key).
3. **Network Configuration:** Defines instance network information (instance zone and subnet IP to be created).
4. **Terraform Configuration:** Defines information about the S3 bucket that will store the Terraform state and infrastructure cost checking.
5. **Nginx:** Defines information about the installation of the ingress controller that will be used.
6. **Observability:** Defines information about the observability configuration that will be used.
7. **Choose a Location:** Defines information related to the resulting repository from executing the template such as git provider, organization, name, and visibility (public or private).
8. **Review:** Space where information defined in the previous steps is displayed, and where template execution is confirmed.

Overall, this template facilitates the provisioning of EC2 instances to host Kubernetes clusters using Terraform, with additional features to configure Nginx and observability tools like Grafana.

# GitHub Actions Workflow

This document describes the GitHub Actions workflow used to deploy and configure infrastructure and services in an AWS and Kubernetes environment, as well as configuring dashboards in Grafana.

## Workflow:

The workflow is divided into three main stages:

1. **apply**: This stage applies infrastructure changes defined in the Terraform files in the AWS environment.
   
2. **kubeconfig**: This stage generates and configures the kubeconfig file to access the deployed Kubernetes cluster.

3. **prometheus-overview**: This stage configures and deploys dashboards in Grafana, using data collected from Prometheus.

### Stage Descriptions:

### "apply" Stage

This stage executes the following steps:

- Checks for changes in the repository.
- Configures the Terraform environment.
- Extracts the branch name from the repository.
- Initializes Terraform and plans changes.
- Applies changes to the AWS infrastructure.

### "kubeconfig" Stage

This stage executes the following steps:

- Configures AWS credentials.
- Creates a certificate file for SSH access.
- Waits until the Kubernetes cluster is ready.
- Generates and downloads the kubeconfig file for the cluster.
- Updates the kubeconfig file to avoid TLS verification errors.
- Uploads the kubeconfig file as an artifact.

### "prometheus-overview" Stage

This stage executes the following steps:

- Configures AWS credentials.
- Installs Vkpr to manage Kubernetes resources.
- Configures Vkpr credentials.
- Installs yq to process YAML files.
- Configures Prometheus to collect metrics.
- Updates Grafana dashboards with Prometheus information.
- Deletes old Grafana dashboards if they exist.
- Publishes new dashboards in Grafana.

## Execution and Continuous Integration

This workflow can be triggered manually or can be configured to run automatically in response to specific events, such as pushes to certain branches or pull requests.

### How to Use

To use this workflow:

1. Configure AWS and Grafana credentials as "secrets" in the repository. The secrets are:

   - AWS_ACCESS_KEY
   - AWS_SECRET_KEY
   - AWS_REGION
   - INFRACOST_API_KEY (if marked in step 4!)
   - GRAFANA_API_TOKEN (if marked in step 6!)

2. Run the workflow manually or configure automatic triggers as needed.

3. Track the progress and results of the workflow on the repository's Actions page.

## Additional Configurations

### EC2 Cluster Overview

**Setting Up Read Permissions in Kubernetes with RBAC**

This step-by-step guide will help you set up read permissions in Kubernetes using Role-Based Access Control (RBAC). You will learn how to create a ClusterRole to define the necessary permissions, a ServiceAccount to represent an identity in Kubernetes, and how to bind the ClusterRole to the ServiceAccount using a ClusterRoleBinding.

### Prerequisites

- Access to the cluster through kubeconfig and retrieved in the workflow executed after EC2 instance deployment to create RBAC resources.
- Basic knowledge of using the Kubernetes command line (kubectl).
- A text editor to create the necessary YAML files.
- yq tool installed for YAML manipulation.
- Helm tool installed to manage applications on Kubernetes.

### Step 1: Create a ClusterRole

A ClusterRole defines a set of permissions that can be assigned to objects in Kubernetes. In this example, we will create a ClusterRole named "platform-devportal-read-only" that grants read permissions only for various Kubernetes resources.

Create a file named `cluster-role.yaml` and add the following content:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: platform-devportal-read-only
  namespace: vkpr
rules:
  - apiGroups:
      - '*'
    resources:
      - configmaps
      - cronjobs
      - daemonsets
      - deployments
      - horizontalpodautoscalers
      - ingressclasses
      - ingresses
      - jobs
      - limitranges
      - namespaces
      - nodes
      - pods
      - replicasets
      - services
      - statefulsets
      - resourcequotas
    verbs:
      - get
      - list
      - watch
  - apiGroups:
      - batch
    resources:
      - jobs
      - cronjobs
    verbs:
      - get
      - list
      - watch
  - apiGroups:
      - metrics.k8s.io
    resources:
      - pods
    verbs:
      - get
      - list
```

Apply this YAML file using the command:

```bash
kubectl apply -f cluster-role.yaml
```

### Step 2: Create a ServiceAccount

A ServiceAccount is an identity that can be used by applications within pods to access the Kubernetes API.

Create a file named `service-account.yaml` and add the following content:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: platform-devportal
  namespace: vkpr
```

Apply this YAML file using the command:

```bash
kubectl apply -f service-account.yaml
```

### Step 3: Bind the ClusterRole to the ServiceAccount

To allow the ServiceAccount to have the permissions defined in the ClusterRole, we need to create a ClusterRoleBinding. For the creation of these resources, we will use an example namespace called vkpr, which can be created with the following command:

```bash
kubectl create namespace vkpr
```

Create a file named `cluster-role-binding.yaml` and add the following content:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: platform-devportal-read-only
  namespace: vkpr
roleRef:
  kind: Cluster

Role
  name: platform-devportal-read-only
  apiGroup: rbac.authorization.k8s.io
subjects:
  - kind: ServiceAccount
    name: platform-devportal
    namespace: vkpr
```

Apply this YAML file using the command:

```bash
kubectl apply -f cluster-role-binding.yaml
```

### Step 4: Create a token to use the ServiceAccount and retrieve it

For the devportal to be able to view information related to the k8s cluster, we need to create a token associated with the ServiceAccount created in step 2.

Create the token using the following command:
```bash
kubectl create token platform-devportal -n vkpr --duration=87600h 
```

### Step 5: Retrieve certificate and cluster EC2 host.

After retrieving kubeconfig generated in the EC2 instance deployment process, it will be necessary to retrieve information related to host (Server Host) of the Kubernetes and certificate (Certificate Authority Data). You can retrieve this information through the following command if you have the yq tool installed and have already downloaded the kubeconfig file.

```bash
K8S_SERVER_CERTIFICATE=$(cat ~/.kube/config | yq -r ".clusters[] | select(.name == \"$(cat ~/.kube/config | yq -r '.current-context')\").cluster.certificate-authority-data")
K8S_SERVER_HOST=$(cat ~/.kube/config | yq -r ".clusters[] | select(.name == \"$(cat ~/.kube/config | yq -r '.current-context')\").cluster.server")
echo "-----------------------------------"
echo "K8S Server Host: $K8S_SERVER_HOST"
echo "-----------------------------------"
echo "K8S Certificate Authority Data: $K8S_SERVER_CERTIFICATE" 
echo "-----------------------------------"
```

### Step 6: Upgrade the Devportal installation to add overview visualization.

Using the helm tool, we will retrieve the values related to the platform devportal installation chart and store them in a values file called platform-devportal-values.yml

```bash
touch platform-devportal-values.yml
helm get values platform-devportal -n vkpr > platform-devportal-values.yml
```

Using a text editor, add the following configuration using the values ​​retrieved in step 5 and the token generated in step 4:

```yaml
...
kubernetes:
  clusterLocatorMethods:
  - clusters:
    - authProvider: serviceAccount
      caData: <certificate_authority_data> # if not retrieved in the previous step fill with "null"
      name: <cluster_name>
      serviceAccountToken: <serviceAccount_token>
      skipMetricsLookup: false
      skipTLSVerify: true
      url: <server_host> 
    type: config
  serviceLocatorMethod:
    type: multiTenant
...
```
After adding the configuration to the retrieved values, just upgrade the chart with the updated values:

```bash
helm upgrade --install platform-devportal veecode-platform/devportal -n vkpr -f platform-devportal-values.yml
```

### Conclusion

You have now successfully configured read permissions in Kubernetes using RBAC. The ServiceAccount `platform-devportal` in the `vkpr` namespace has permissions only to read the resources specified in the ClusterRole `platform-devportal-read-only`, and we updated the environment to be able to observe our EC2 cluster environment. Make sure to adjust the ServiceAccount and ClusterRole names according to your specific needs.