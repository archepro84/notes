data "aws_msk_cluster" "this" {
  cluster_name = var.msk_cluster_name
}