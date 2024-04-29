# GitOps | Amazon Web Services - EKS Template

**The GitOps project is a template for provisioning the EKS cluster on AWS.**

## How to use ?
To use the template, the user must clone <a href="https://github.com/vertigobr/aws-eks">this repository.</a>

### Project structure

<img src="./imgs/image1.png"/>

**This template provides a automation solution for provisioning the EKS cluster and configura assume-role for user autentication. Example (Vault)**
A default provisioning configuration located in config/defaults.yml that can be changed according to the user's needs.

**Example**

~~~yaml

cluster_name: #example_name
cluster_version: "1.20"
cidr_block: 10.50.0.0/16
private_subnets:
  - 10.50.1.0/24
  - 10.50.2.0/24
  - 10.50.3.0/24
public_subnets:
  - 10.50.4.0/24
  - 10.50.5.0/24
  - 10.50.6.0/24
aws_availability_zones: [""]
node_groups:
  eks-sample:
    desired_capacity: "1"
    max_capacity: "3"
    min_capacity: "1"
    ami_type: AL2_x86_64
    instance_types:
      - t3.small
    capacity_type: #choice
cluster_enabled_log_types:
  - api
  - audit
  - authenticator
  - controllerManager
  - scheduler
users_list:
  - name: root-user
    role: root
tags:
  Project: #Project
  Source: aws-eks
~~~

**pipeline**

The pipeline is divided into 2 workflows, namely:


**Deploy (manual execution):** Provisions infrastructure via Terraform.

**Destroy (manual execution):** Destroys the infrastructure.

---

## Pipeline Secrets
For the project to run as expected, it is necessary to configure some secrets in the pipeline, some are optional.

:key: AWS_ACCESS_KEY `mandatory` <br>
:key: AWS_SECRET_KEY `mandatory` <br>
:key: AWS_REGION `mandatory` <br>
:key: INFRACOST_API_KEY `optional` <br>