module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "20.29.0"

  cluster_name    = local.name
  cluster_version = var.eks_cluster_version

  vpc_id = module.vpc.vpc_id

  subnet_ids = module.vpc.private_subnets

  cluster_endpoint_public_access = true # 클러스터 엔드포인트 공개 액세스
  enable_cluster_creator_admin_permissions = true # 클러스터 생성자 관리자 권한 활성화

  create_cluster_security_group = false # 클러스터 보안 그룹 생성 해제
  create_node_security_group = false # 노드 보안 그룹 생성 해제

  cluster_addons = {
    coredns = {}
    kube-proxy = {}
    vpc-cni = {}
  }

  eks_managed_node_groups = {
    example = {
      # Starting on 1.30, AL2023 is the default AMI type for EKS managed node groups
      ami_type = "AL2_x86_64"
      instance_types = ["t3.small"]

      min_size     = 1
      max_size     = 1
      # This value is ignored after the initial creation
      # https://github.com/bryantbiggs/eks-desired-size-hack
      desired_size = 1
    }
  }
}
