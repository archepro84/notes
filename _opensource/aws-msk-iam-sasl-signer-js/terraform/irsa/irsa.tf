locals {
  namespace            = "default"
  service_account_name = "msk-sasl-sa"
}

# base: https://aws.amazon.com/ko/blogs/tech/amazon-msk-topic-iam-access-control/
data "aws_iam_policy_document" "msk" {
  version = "2012-10-17"

  statement {
    actions = [
      "kafka:*", # Kafka Full Access
      "kafka-cluster:*", # Kafka Cluster Full Access
    ]
    resources = ["*"]
  }
}

resource "aws_iam_policy" "msk" {
  name        = "MskSaslPolicy"
  description = "Policy to all msk actions"

  policy = data.aws_iam_policy_document.msk.json
}

resource "aws_iam_role" "msk" {
  name = "MskSaslIRSARole"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Federated = data.aws_iam_openid_connect_provider.this.arn
        }
        Action = "sts:AssumeRoleWithWebIdentity"
        Condition = {
          StringEquals = {
            "${data.aws_iam_openid_connect_provider.this.url}:aud" = "sts.amazonaws.com"
            "${data.aws_iam_openid_connect_provider.this.url}:sub" = "system:serviceaccount:${local.namespace}:${local.service_account_name}",
          }
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "msk" {
  role       = aws_iam_role.msk.name
  policy_arn = aws_iam_policy.msk.arn
}


resource "kubernetes_service_account_v1" "msk" {
  metadata {
    name      = local.service_account_name
    namespace = local.namespace

    annotations = {
      "eks.amazonaws.com/role-arn" : aws_iam_role.msk.arn
    }
  }
}