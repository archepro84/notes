data "aws_availability_zones" "this" {}
data "aws_caller_identity" "this" {}

variable "name" {
  type        = string
  description = "Terraform Project name"
  default     = "msk-sasl-irsa"
}

variable "region" {
  type        = string
  description = "AWS region"
  default     = "ap-northeast-2" # Seoul
}

## MSK
variable "msk_cluster_name" {
  type        = string
  description = "MSK Cluster name"
  default     = "msk-sasl"
}


## EKS
variable "eks_cluster_name" {
  type        = string
  description = "EKS Cluster name"
  default     = "msk-sasl"
}

variable "eks_cluster_endpoint" {
  type        = string
  description = "EKS Cluster endpoint"
}

variable "eks_cluster_certificate" {
  type        = string
  description = "EKS Cluster certificate"
}

