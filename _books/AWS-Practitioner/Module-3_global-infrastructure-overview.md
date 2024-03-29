# 모듈 3: AWS 글로벌 인프라 개요

## 1: AWS 글로벌 인프라

AWS 글로벌 인프라는 우수한 품질의 글로벌 네트워크 성능으로 유연하고, 안정적이며, 확장 가능하고, 안전한 클라우드 컴퓨팅 환경을 제공하도록 설계되고 구축되었다.

### AWS 리전(Region)

- 리전은 지리적 영역이다.
- 리전간 데이터 복제는 고객이 제어한다.
- 리전 간 통신에는 **AWS 백본 네트워크 인프라**가 사용된다.
- 각 AWS 리전은 **완전한 이중화 및 네트워크 연결**을 제공한다.
- 리전은 일반적으로 **2개 이상의 가용 영역**으로 구성된다.

### 가용 영역(AZ, Availability Zone)

- 각 리전에는 다수의 가용 영역이 있다.
- 각 가용 영역은 AWS 인프라의 완전히 격리된 파티션이다.
    - 가용 영역은 **별개의 데이터 센터**로 구성된다.
    - **내결함성을 제공**하도록 설계되었다.
    - 고속 프라이빗 네트워크를 통해 다른 가용 영역과 상호 연결되어 있다.
    - 사용할 가용 영역을 고객이 선택한다.
    - 복원력을 위해 여러 가용 영역에 걸쳐 데이터와 리소스를 복제하는 것이 좋다.

### AWS 데이터 센터(Data Center)

- AWS 데이터 센터는 보안을 고려하여 설계되었다.
- 데이터 센터는 데이터가 상주하고 데이터가 처리되는 위치
- 각 데이터 센터는 이중화된 전력, 네트워킹 및 연결을 사용하며 별도의 시설에 구축된다.

### PoP(Point of Presence)

- AWS CloudFront와 함께 사용된다.
- 액세스 빈도가 낮은 콘텐츠에는 **리전 엣지 캐시**가 사용된다.
    - 리전 엣지 캐시는 CloudFront에서 기본적으로 사용된다.
    - 리전 엣지 캐시는 엣지 로케이션에 유지할 정도로 **자주 액세스되지 않는 콘텐츠**가 있을 때 사용된다.

### AWS 인프라 기능

- 탄력성 및 확장성
- 내결함성
- 고가용성

### 정리

- AWS 글로벌 인프라는 리전과 가용 영역으로 구분된다.
- 리전을 선택할 때는 일반적으로 규정 준수 요구 사항 또는 지연 시간 감소에 기준을 준다.
- 각 가용 영역은 다른 가용 영역과 **물리적으로 분리**되며 **이중화된 전원, 네트워킹 및 연결**을 사용한다.
- 엣지 로케이션 및 리전 엣지 캐시는 **사용자에게 더 가까운 위치에서 콘텐츠를 캐싱**하여 성능을 개선한다.

## 2: AWS 서비스 및 서비스 범주 개요

### 글로벌 인프라

- 리전
- 가용 영역
- 엣지 로케이션을 포함하는 PoP(Point of Presence)

### 컴퓨팅 서비스 범주

- EC2 Auto Scaling
    - 사용자가 정의한 조건에 따라 EC2 인스턴스를 자동으로 추가하거나 제거할 수 있다.
- Elastic Container Service(ECS)
    - Docker 컨테이너를 지원하는 확장성이 뛰어난 고성능 컨테이너 오케스트레이션 서비스
- Elastic Container Registry(ECR)
    - Docker 컨테이너 이미지의 저장, 관리 및 배포 작업을 용이하게 하는 개발자용 완전관리형 Docker 컨테이너 레지스트리
- Elastic Beanstalk
    - Apache 및 MS의 IIS(Internet Information Services)와 같은 잘 알려진 서버에 웹 어플리케이션 및 서비스를 배포하고 확장할 때 사용되는 서비스
- Elastic Kubernetes Service(EKS)
    - AWS에서 Kubernetes를 사용하는 컨테이너식 어플리케이션을 손쉽게 배포하고 관리하고 확장할 수 있다.
- Fargate
    - 서버 또는 클러스터를 관리할 필요 없이 컨테이너를 실행할 수 있는 ECS용 **컴퓨팅 엔진**

### 데이터베이스 서비스 범주

- Amazon Aurora
    - MySQL 및 PostgreSQL과 호환되는 관계형 데이터베이스
- Amazon Redshift
    - 로컬로 저장된 페타바이트 규모의 데이터와 S3에 저장된 엑사바이트 규모의 데이터에 대해 직접 분석 쿼리를 실행할 수 있다.

### 네트워킹 및 콘텐츠 전송 서비스 범주

- Amazon Virtual Private Cloud(VPC)
    - 클라우드의 **논리적으로 격리된 섹션**을 프로비저닝 할 수 있다.
- Elastic Load Balancing
    - 어플리케이션 트래픽을 Amazon EC2 인스턴스, 컨테이너, IP 주소 및 Lambda 함수와 같은 여러 대상에 자동으로 분산한다.
- Amazon CloudFront
    - 짧은 지연 시간과 빠른 전송 속도로 데이터, 동영상, 어플리케이션, API를 전 세계 고객에게 안전하게 전송하는 고속 CDN(콘텐츠 전송 네트워크) 서비스
- AWS Transit Gateway
    - VPC와 온프레미스 네트워크를 단일 게이트웨이에 연결하는 기능을 제공
- AWS Direct Connect
    - 데이터 센터 또는 사무실과 같은 온프레미스 환경에서 AWS로 연결되는 **전용 프라이빗 네트워크 연결을 설정**하여 네트워크 비용을 줄이고 대역폭 처리량을 늘릴 수 있다.
- AWS Virtual Private Network (VPN)
    - 네트워크 또는 디바이스에서 AWS 글로벌 네트워크로 연결되는 **보안 프라이빗 터널**을 제공

### 보안, 자격 증명 및 규정 준수 서비스 범주

- AWS Identity and Access Management(IAM)
    - AWS 사용자 및 그룹을 생성하고 관리할 수 있다.
    - IAM 권한(Role)을 사용하여 AWS 리소스에 대한 사용자 및 그룹의 **액세스를 허용하고 거부**할 수 있다.
- AWS Organizations (조직)
    - 계정에서 허용되는 서비스와 작업을 제한
- Amazon Cognito
    - 웹 및 모바일 앱에 **사용자 가입, 로그인 및 액세스 제어 기능**을 추가할 수 있다.
- AWS Artifact
    - AWS **보안 및 규정 준수 보고서**와 일부 온라인 계약에 필요에 따라 액세스 할 수 있다.
- AWS Key Management Service(KMS)
    - 키를 생성하고 관리할 수 있다.
    - 다양한 AWS 서비스와 어플리케이션에서 암호화 사용을 제어할 수 있다.
- AWS Shield
    - AWS 에서 실행되는 어플리케이션을 보호하는 관리형 DDoS(Distributed Denial of Service) 방어 서비스

### AWS 비용 관리 서비스 범주

- AWS 비용 및 사용 보고서 (Cost and Usage Report)
    - AWS 서비스, 요금 및 예약에 대한 추가 메타데이터를 비롯하여 사용 가능한 **가장 포괄적인 AWS 비용 및 사용량 데이터 세트**가 포함된다.
- AWS 예산 (Budgets)
    - **비용 또는 사용량**이 예산 금액을 초과하거나 초과할 것으로 예상될 때 **알림**을 받도록 사용자 지정 예산을 설정할 수 있다.
- AWS 비용 탐색기(Cost Explorer)
    - 사용이 쉬운 인터페이스를 통해 시간 경과에 따른 AWS 비용 및 사용량을 시각화 하고 파악하고 관리할 수 있다.

### AWS 관리 및 거버넌스 서비스 범주

- AWS Config
    - **리소스 인벤토리 및 변경사항**을 추적
- AWS Trusted Advisor
    - 성능 및 보안을 **최적화**하는 데 도움
- AWS Well-Architected Tool
    - 워크로드를 검토하고 개선
- AWS CloudTrail
    - **사용자 활동 및 API 사용**을 추적

## Wrap up

- AWS 리전, 가용 영역 및 엣지 로케이션 간의 차이점 확인
- AWS 서비스 및 서비스 범주 확인
- **내결함성**
    - 인프라에 구성 요소 이중화 기능이 내장되어 있다는 것을 의미
- **탄력성 및 확장성**
    - 리소스가 용량 요구 사항의 증가 또는 감소에 맞게 동적으로 조정