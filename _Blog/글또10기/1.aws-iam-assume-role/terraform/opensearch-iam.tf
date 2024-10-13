resource "aws_iam_policy" "os_repo" {
  name        = "${var.name}-OpenSearchRepositoryPolicy"
  description = "OpenSearch Snapshot Repository Policy"

  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Action" : [
          "s3:ListBucket"
        ],
        "Resource" : [
          "arn:aws:s3:::${var.s3_bucket_name}"
        ]
      },
      {
        "Effect" : "Allow",
        "Action" : [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject",
        ],
        "Resource" : [
          "arn:aws:s3:::${var.s3_bucket_name}/*"
        ]
      },
      {
        "Effect" : "Allow",
        "Action" : "iam:PassRole",
        "Resource" : [
          "arn:aws:iam::${data.aws_caller_identity.this.account_id}:role/*"
        ]
      },
      {
        "Effect" : "Allow",
        "Action" : "es:ESHttpPut",
        "Resource" : [
          "arn:aws:es:ap-northeast-2:${data.aws_caller_identity.this.account_id}:domain/${local.opensearch_domain}"
        ]
      }
    ]
  })
}

resource "aws_iam_role" "os_repo" {
  name = "${var.name}-OpenSearchRepositoryRole"
  assume_role_policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Sid" : "",
        "Effect" : "Allow",
        "Principal" : {
          "Service" : "es.amazonaws.com"
        },
        "Action" : "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_user" "os_repo" {
  name = "${var.name}-OpenSearchRepositoryUser"
}

resource "aws_iam_user_policy" "os_repo_user" {
  name = "${var.name}-OpenSearchRepositoryUserPolicy"
  user = aws_iam_user.os_repo.name

  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Action" : "iam:PassRole",
        "Resource" : [
          "arn:aws:iam::${data.aws_caller_identity.this.account_id}:role/*"
        ]
      },
      {
        "Effect" : "Allow",
        "Action" : "es:ESHttpPut",
        "Resource" : [
          "arn:aws:es:${var.region}:${data.aws_caller_identity.this.account_id}:domain/${local.opensearch_domain}/*"
        ]
      }
    ]
  })
}

resource "aws_iam_user_policy" "os_repo_s3_bucket" {
  name = "${var.name}-OpenSearchRepositoryBucketPolicy"
  user = aws_iam_user.os_repo.name

  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Action" : [
          "s3:*",
          "s3-object-lambda:*"
        ],
        "Resource" : [aws_s3_bucket.this.arn]
      }
    ]
  })
}


resource "aws_iam_access_key" "os_repo_user" {
  user = aws_iam_user.os_repo.name
}