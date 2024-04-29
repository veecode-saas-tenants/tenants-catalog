terraform {
  backend "s3" {
    bucket = "${{ values.terraformStateBucketName }}"
    key    = "${{ values.cluster_name }}/terraform.tfstate"
    region = "${{ values.terraformStateBucketRegion }}"
  }
}