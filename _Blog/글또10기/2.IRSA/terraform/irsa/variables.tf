data "aws_availability_zones" "this" {}
data "aws_caller_identity" "this" {}

variable "name" {
  type        = string
  description = "Terraform Project name"
  default     = "eks-s3-irsa"
}

variable "region" {
  type        = string
  description = "AWS region"
  default     = "ap-northeast-2" # Seoul
}

## S3 Bucket
variable "s3_bucket_name" {
  type        = string
  description = "S3 Bucket name"
  default     = "test-irsa-s3"
}


## EKS
variable "eks_cluster_name" {
  type        = string
  description = "EKS Cluster name"
  default     = "eks-s3-irsa"
}

variable "eks_cluster_endpoint" {
  type        = string
  description = "EKS Cluster endpoint"
}

variable "eks_cluster_certificate" {
  type        = string
  description = "EKS Cluster certificate"
}

