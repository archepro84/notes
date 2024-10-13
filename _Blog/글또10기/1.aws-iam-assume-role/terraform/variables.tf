data "aws_availability_zones" "this" {}
data "aws_caller_identity" "this" {}


variable "name" {
  type        = string
  description = "Terraform Project name"
  default     = "os-repo-prg"
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
  default     = "os-repo-bucket"
}


## OpenSearch

# FIXME: OpenSearch Service Linked Role이 이미 생성되어 있다면, OpenSearch 생성시 에러가 발생합니다.
#  해당 상황에서는 default=false 로 변경이 필요합니다.
variable "opensearch_service_linked_role" {
  type        = bool
  description = "Create OpenSearch Service Linked Role"
  default     = true
}

variable "opensearch_access_type" {
  type        = string
  description = "OpenSearch Access type"
  default     = "public"
}

variable "opensearch_engine_version" {
  type        = string
  description = "OpenSearch Engine version"
  default     = "OpenSearch_2.15"
}

variable "opensearch_root_name" {
  type        = string
  description = "OpenSearch Root Name"
  default     = "os-root"
}

variable "opensearch_root_password" {
  type        = string
  description = "OpenSearch Root Password"
  default     = "+2p!EKR5XW7rUv8kUN5M"
}

variable "opensearch_instance_type" {
  type        = string
  description = "OpenSearch instance type"
  default     = "r7g.medium.search" # ap-northeast-2, (39.05 USD/month)
}

variable "opensearch_ebs_volume" {
  type        = number
  description = "OpenSearch volume size"
  default     = 100
}

variable "opensearch_ebs_iops" {
  type        = number
  description = "OpenSearch EBS IOPS"
  default     = 3000 # Default IOPS
}

variable "opensearch_ebs_throughput" {
  type        = number
  description = "OpenSearch EBS Throughput (MiB/s)"
  default     = 125 # Default Through
}