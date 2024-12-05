data "aws_availability_zones" "this" {}
data "aws_caller_identity" "this" {}


locals {
  name   = var.name
  region = var.region

  vpc_cidr = "10.244.0.0/16"
  azs = slice(data.aws_availability_zones.this.names, 0, 3)

  tags = {
    project = "${var.name}-prj"
  }
}


variable "name" {
  type        = string
  description = "Terraform Project name"
  default     = "msk-sasl"
}

variable "region" {
  type        = string
  description = "AWS region"
  default     = "ap-northeast-2" # Seoul
}

## EKS
variable "eks_cluster_version" {
  type        = string
  description = "EKS Cluster version"
  default     = "1.31"
}