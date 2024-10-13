locals {
  opensearch_domain = "os-domain-${var.name}"
}

# OpenSearch로 인입되는 모든 트래픽을 허용하는 정책
data "aws_iam_policy_document" "this" {
  version = "2012-10-17"

  statement {
    effect = "Allow"
    actions = ["es:*"]

    resources = [
      "arn:aws:es:${var.region}:${data.aws_caller_identity.this.account_id}:domain/${local.opensearch_domain}/*"
    ]

    principals {
      type = "AWS"
      identifiers = ["*"]
    }
  }
}

# FIXME: OpenSearch Service Linked Role이 이미 생성되어 있다면, OpenSearch 생성시 에러가 발생합니다.
#  해당 상황에서는 default=false 로 변경이 필요합니다.
resource "aws_iam_service_linked_role" "opensearch" {
  count = var.opensearch_service_linked_role ? 1 : 0

  aws_service_name = "opensearchservice.amazonaws.com"
}

resource "aws_opensearch_domain" "this" {
  domain_name     = local.opensearch_domain
  engine_version  = var.opensearch_engine_version
  access_policies = data.aws_iam_policy_document.this.json

  advanced_options = {
    "indices.fielddata.cache.size"        = "20"
    "indices.query.bool.max_clause_count" = "1024"
  }

  advanced_security_options {
    enabled                        = true
    anonymous_auth_enabled         = false
    internal_user_database_enabled = true

    master_user_options {
      master_user_name     = var.opensearch_root_name
      master_user_password = var.opensearch_root_password
    }
  }

  auto_tune_options {
    desired_state = "ENABLED" # Auto Tuning enabled
    rollback_on_disable = "NO_ROLLBACK" # Rollback disabled
    use_off_peak_window = false
  }

  cluster_config {
    instance_count = 1
    instance_type  = var.opensearch_instance_type
    warm_enabled   = false # Warm instance disabled
  }

  domain_endpoint_options {
    enforce_https = true # HTTPS 강제
    tls_security_policy = "Policy-Min-TLS-1-2-2019-07"
  }

  ebs_options {
    ebs_enabled = true
    iops        = var.opensearch_ebs_iops
    throughput  = var.opensearch_ebs_throughput
    volume_size = var.opensearch_ebs_volume
    volume_type = "gp3"
  }

  encrypt_at_rest {
    enabled = true
  }

  node_to_node_encryption {
    enabled = true
  }

  off_peak_window_options {
    enabled = true

    off_peak_window {
      window_start_time {
        hours   = 0
        minutes = 0
      }
    }
  }

  snapshot_options {
    automated_snapshot_start_hour = 0  # Auto Snapshot Start Hour
  }

  software_update_options {
    auto_software_update_enabled = true # Auto Software Update enabled
  }
}