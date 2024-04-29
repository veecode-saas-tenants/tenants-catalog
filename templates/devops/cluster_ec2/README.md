# ${{ values.cluster_name }}

# Template for Cluster Provisioning on EC2 Instance

This repository aims to provision a cluster on an EC2 instance using Terraform, Kubernetes, and other related tools. This repository has been generated through a collaborative process involving infrastructure experts, developers, and system administrators. It has been refined over time based on best practices, past experiences, and feedback.

### Template Filling Steps and Structure

1. **Environment Settings:** Specifies which environment will be used for provisioning the EC2 cluster.
2. **EC2 Configuration:** Defines information related to the instance component owner (e.g., instance name, type, and key for SSH access).
3. **Network Configuration:** Defines instance network information (instance zone and subnet IP to be created).
4. **Terraform Configuration:** Defines information about the S3 bucket that will store the Terraform state and check the cost of the provisioned infrastructure.
5. **Nginx:** Defines information about the installation of the ingress controller that will be used.
6. **Observability:** Defines information about the observability configuration that will be used.
7. **Choose a Location:** Defines information related to the resulting repository from executing the template such as Git provider, organization, name, and visibility (public or private).
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