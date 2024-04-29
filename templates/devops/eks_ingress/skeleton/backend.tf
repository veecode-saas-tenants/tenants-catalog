terraform {
  backend "s3" {
    bucket = "${{ values.terraformStateBucketName }}"
    key    = "${{ values.eks_cluster_name }}/terraform.tfstate"
    region = "${{ values.terraformStateBucketRegion }}"
  }
}