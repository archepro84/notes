locals {
  number_of_broker_nodes = 2  # Number of broker nodes in the cluster, 2 is the minimum
}

resource "aws_security_group" "msk" {
  name        = "${local.name}-msk"
  description = "MSK security group"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port = 0
    to_port   = 65535
    protocol  = "tcp"
    cidr_blocks = [module.vpc.vpc_cidr_block]
  }

  egress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    cidr_blocks = [module.vpc.vpc_cidr_block]
  }
}

# docs: https://registry.terraform.io/modules/terraform-aws-modules/msk-kafka-cluster/aws/latest
module "msk_cluster" {
  source  = "terraform-aws-modules/msk-kafka-cluster/aws"
  version = "2.9.0"

  name = local.name

  kafka_version = "3.6.0" # Kafka Version, 2024-12 LTS version
  number_of_broker_nodes = local.number_of_broker_nodes

  broker_node_client_subnets = slice(module.vpc.private_subnets, 0, local.number_of_broker_nodes) # MSK Broker 서브넷
  broker_node_instance_type = "kafka.t3.small" # MSK Broker 인스턴스 타입, minimum kafka.t3.small
  broker_node_security_groups = [aws_security_group.msk.id]

  # Broker Node Storage
  broker_node_storage_info = {
    ebs_storage_info = { volume_size = 32 }
  }

  # IAM SASL 인증을 사용하여 클라이언트 인증을 활성화
  client_authentication = {
    sasl = { iam = true }
  }
}