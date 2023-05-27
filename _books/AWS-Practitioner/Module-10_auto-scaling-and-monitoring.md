# 모듈 10: 자동 조정 및 모니터링

## 1: Elastic Load Balancing

### Elastic Load Balancing (ELB)

- 수신되는 어플리케이션 또는 네트워크 트래픽을 단이 가용 영역 또는 여러 가용 영역의 EC2 인스턴스, 컨테이너, IP 주소 및 Lambda 함수와 같은 여러 대상에 분산하는 AWS 서버
- 어플리케이션의 트래픽이 변경됨에 따라 로드밸런서를 조정한다.
- 고가용성 및 내결함성 어플리케이션
- 컨테이너 어플리케이션
- 탄력성 및 확장성
- Virtual Private Cloud(VPC)
- 하이브리드 환경
- HTTP(S)를 통해 Lambda 함수 호출

### Application LoadBalancer (OSI, 모델 계층 7)

- HTTP 및 HTTPS 트래픽의 로드 밸런싱
- 콘텐츠를 기반으로 EC2 인스턴스, 컨테이너, IP 주소, Lambda 함수 등의 트래픽을 라우팅
- HTTP, HTTPS 트래픽의 적합
- MSA 및 컨테이너 기반 어플리케이션을 비롯하여 최신 어플리케이션 아키텍처를 제공하는 것을 목표로 하는 고급 라우팅 기능 제공
- SSL/TLS 암호 및 프로토콜이 사용됨

### Network Load Balancer (OSI, 모델 계층 4)

- 최고 수준의 성능이 필요한 TCP, UDP 및 TLS 트래픽의 로드 밸런싱
- IP 프로토콜 데이터에 따라 연결을 대상(EC2 인스턴스, 마이크로 서비스, 컨테이너)으로 라우팅
- TCP 트래픽의 로드 밸런싱에 적합
- 매우 짧은 지연 시간을 유지하면서 초당 수백만 개의 요청을 처리

### Classic Load Balancer

- 여러 인스턴스에 기본 로드 밸런싱 지원
- 어플리케이션, 네트워크 전송 레벨 모두 작동
- HTTP, HTTPS, TCP, SSL을 사용하는 어플리케이션의 로드밸런싱 지원

### Elastic Load Balancing의 작동 방식

### 로드 밸런서 모니터링

- Amazon CloudWatch 지표
- Access Log
- AWS CloudTrail 로그

### 정리

- Elastic Load Balancing 은 수신되는 어플리케이션 또는 네트워크 트래픽을 하나 이상의 가용 영역에 있는 여러 대상으로 분산한다.
- Elastic Load Balancing 은 세 가지 유형의 로드 밸런서를 지원한다.
    - Application Load Blanacer(OSI 7)
    - Network Load Balancer(OSI 4)
    - Classic Load Balancer)
- Elastic Load Balancing는 인스턴스 상태 확인, 보안 및 모니터링 기능을 제공한다.

## 2: Amazon CloudWatch

### Amazon CloudWatch

모니터링 및 관찰 기능 서비스, AWS 리소스와 AWS에서 실행되는 어플리케이션을 실시간으로 모니터링한다.

- 모니터
    - AWS 리소스
    - AWS에서 실행되는 어플리케이션
- 수집 및 추적
- 경보
    - SNS Alarm 전송
    - Auto Scaling
- 이벤트

### Cloud Watch 경보

- 경보 기준
    - 정적 임계값
    - 변칙 감지
    - 지표 수학 표현식
- 지정할 수 있는 기준
    - 네임스페이스
    - 지표
    - 통계
    - 기간
    - 조건
    - 추가 구성 정보

### Amazon CloudTrail

- AWS 리소스에 대한 모든 액세스 로그가 있을 때 사용한다.
- AWS 계정의 거버넌스, 규정 준수, 운영 감사, 위험 감사를 지원한다.

### 정리

- Amazon CloudWatch는 AWS 리소스와 AWS에서 실행되는 어플리케이션을 실시간으로 모니터링하는 데 유용하다.
- CloudWatch를 사용한다면
    - 표준 및 사용자 지정 지표를 수집하고 추적
    - SNS Topic에 알림을 자동으로 보내거나 EC2 Auto Scaling 또는 EC2 작업을 수행하도록 경보를 설정
    - AWS 환경의 변경 사항과 일치하는 규칙을 정의하고 이벤트를 대상으로 라우팅하여 처리

## 3: Amazon EC2 Auto Scaling

### Amazon EC2 Auto Scaling

- 어플리케이션의 가용성을 유지하도록 지원
- 정의한 조건에 따라 EC2 인스턴스를 자동으로 추가하거나 제거할 수 있다.
- 손상된 EC2 인스턴스 및 비정상 어플리케이션을 감지하고 사용자의 개입 없이 인스턴스를 교체
- 수동, 예약, 동적 또는 온디맨드, 예측 등 다양한 조정 옵션 제공

### Auto Scaling 그룹

- 자동 조정 및 관리 목적의 논리적 그룹으로 다뤄지는 EC2 인스턴스의 모임
- 수동으로 또는 자동으로 조정하여 수요에 맞게 크기를 조절할 수 있다.
- 최소, 희망, 최대 3가지의 속성을 설정할 수 있다.

### Amazon EC2 Auto Scaling의 작동 방식

### Auto Scaling의 조정 옵션

- 항상 현재 인스턴스 수준 유지
- 수동 조정
    - 최대 용량, 최소 용량 또는 원하는 용량의 변동만 지원
- 예약된 조정
    - 날짜 및 시간에 따라 조정 작업이 자동으로 수행
- 동적 온디맨드 조정
    - 조정 프로세스를 제어하는 파라미터 정의
- 예측 조정
    - 실제 EC2 사용량에서 수집한 데이터를 이용해 예측된 수요에 따라 용량 조절

### AWS Auto Scaling

- 어플리케이션을 모니터링하고 용량을 ㅗ자동으로 조정하여, 최대한 저렴한 비용으로 안정적이고 예측 가능한 성능 유지
- 조정 플랜
    - Amazon EC2 인스턴스와 스팟 플릿
    - Amazon Elastic Container Service(Amazon ECS)작업
    - Amazon DynamoDB 테이블 및 인덱스
    - Amazon Aurora 복제본

### 정리

- 조정을 통해 리소스 요구 사항의 변화에 신속하게 대응할 수 있다.
- Amazon EC2 Auto Scaling은 EC2 인스턴스를 자동으로 추가 또는 제거하여 어플리케이션 가용성을 유지
- Auto Scaling 그룹은 EC2 인스턴스의 모음
- 시작 구성은 인스턴스 구성 템플릿
- 동적 조정에는 Amazon EC2 Auto Scaling, CloudWatch 및 Elastic Load Balancing이 사용된다.
- AWS Auto Scaling은 Amazon EC2 Auto Scaling과 별도의 서비스이다.