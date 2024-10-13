resource "local_sensitive_file" "os_repo_user_keys" {
  filename        = "./${aws_iam_user.os_repo.name}.json"
  file_permission = "400"

  content = jsonencode({
    access_key_id : aws_iam_access_key.os_repo_user.id
    secret_access_key : aws_iam_access_key.os_repo_user.secret
  })
}


output "os_repo_user_arn" {
  value = aws_iam_user.os_repo.arn
}

output "os_endpoint" {
  value = aws_opensearch_domain.this.endpoint
}

output "os_dashboard" {
  value = aws_opensearch_domain.this.dashboard_endpoint
}