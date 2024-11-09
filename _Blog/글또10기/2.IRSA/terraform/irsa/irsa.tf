locals {
  namespace            = "default"
  service_account_name = "get-s3-sa"
}

data "aws_iam_policy_document" "get_s3_bucket" {
  version = "2012-10-17"

  statement {
    actions = [
      "s3:GetObject",
      "s3:ListBucket",
    ]

    resources = [aws_s3_bucket.this.arn]
  }
}

resource "aws_iam_policy" "get_s3_bucket" {
  name        = "getS3BucketPolicy"
  description = "Policy to get S3 bucket files"

  policy = data.aws_iam_policy_document.get_s3_bucket.json
}

resource "aws_iam_role" "get_s3_bucket" {
  name = "getS3BucketIRSARole"
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

resource "aws_iam_role_policy_attachment" "get_s3_bucket" {
  role       = aws_iam_role.get_s3_bucket.name
  policy_arn = aws_iam_policy.get_s3_bucket.arn
}


resource "kubernetes_service_account_v1" "get_s3_bucket" {
  metadata {
    name      = local.service_account_name
    namespace = local.namespace

    annotations = {
      "eks.amazonaws.com/role-arn" : aws_iam_role.get_s3_bucket.arn
    }
  }
}