variable "key_names" {
  description = "Set of SSH key pair names to be used in the VM"
  type        = set(string)
  default     = ["control-plane-andre"]
}

variable "instance_name" {
  description = "Name of the EC2 instance"
  type        = string
  default     = "saas-${{values.componentName}}-tenant"
}

variable "instance_type" {
  description = "EC2 instance type (Graviton-based)"
  type        = string
  default     = "${{values.instanceSize}}"
}

variable "vpc_name" {
  description = "Name of the VPC to import"
  type        = string
  default     = "veecode-saas-vpc"
}

variable "subnet_name" {
  description = "Name of the existing subnet to launch the instance in"
  type        = string
  default     = "veecode-saas-private-subnet-1"
}

variable "security_group_name" {
  description = "Name of the existing security group to use"
  type        = string
  default     = "veecode-saas-default-sg"
}
