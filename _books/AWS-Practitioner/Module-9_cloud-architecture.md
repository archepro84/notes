# 모듈 9: 클라우드 아키텍처

## 1: AWS Well-Architected 프레임워크

아키텍처는 큰 구조물을 설계하고 구축하는 예술이자 과학이다.

대규모 시스템의 아키텍트는 시스템의 규모와 복잡성을 관리해야한다.

### 클라우드 아키텍트의 업무

- 의사 결정권자와 협력하여 비즈니스 목표와 개선이 필요한 기능을 식별한다.
- 솔루션의 기술 결과물이 비즈니스 목표와 일치하는지 확인한다.
- 솔루션을 구현하는 제공 팀과 협력하여 기술의 기능이 적절한지 확인한다.

### AWS Well-Architected 프레임워크

- 인프라 설계를 위한 안내서 이다.
    - 안전
    - 고성능
    - 복원력
    - 효율성
- 클라우드 아키텍처를 평가하고 구현하는 일관된 접근 방식
- 고객 아키텍처를 검토하여 얻은 교훈을 바탕으로 개발된 모범 사례를 제공하는 방법

### AWS Well-Architected 프레임워크의 원칙

- 운영 우수성
- 보안
- 안전성
- 성능 효율성
- 비용 최적화

## 2: 운영 우수성 원칙

비즈니스 가치를 실현하고 지원 프로세스 및 절차를 지속적으로 개선하기 위해 시스템을 실행 및 모니터링한다.

- 변경 관리 및 자동화
- 이벤트에 대응
- 일상적인 운영을 성공적으로 관리하기 위한 표준 정의

### 운영 우수성 설계 원칙

- 코드로 작업 수행
- 설명서에 주석 추가
- 빈번하고 작은 규모로 되돌릴 수 있는 변경 수행
- 운영 절차를 빈번하게 재정의
- 장애 예측
- 모든 운영 이벤트 및 장애로부터 교훈 얻기

### 운영 우수성 모범사례의 질문

- 준비
- 운영
- 개선

## 3: 보안 원칙

위험 평가 및 완화 전략을 통해 비즈니스 가치를 제공하면서 정보, 시스템 및 자산을 보호한다.

- 누가 무엇을 할 수 있는지 식별 및 관리
- 보안 이벤트 감지를 위한 제어 설정
- 시스템 및 서비스 보호
- 데이터의 기밀성 및 무결성 보호

### 보안 설계 원칙

- 강력한 자격 증명 기반 구현
- 추적 기능 활성화
- 모든 계층에 보안 적용
- 보안 모범 사례 자동화
- 전송 중인 데이터 및 저장된 데이터 보호
- 사람들을 데이터로부터 차단
- 보안 이벤트에 대비

### 보안 관련 모범사례 영역

- 자격 증명 및 액세스 관리
- 탐지 제어
- 인프라 보호
- 데이터 보호 (데이터의 기밀성과 무결성 유지)
- 인시던트 대응

## 4: 안정성 원칙

**장애를 예방하고 신속하게 복구**하여 비즈니스 및 고객의 요구를 충족

- 구성
- 교차 프로젝트 요구 사항
- 복구 계획
- 변경 처리

### 안정성 설계 원칙

- 복구 절차 테스트
- 장애로부터 자동 복구
- 전체 시스템 가용성을 높이도록 수평적으로 확장
- 용량 추정 불필요
- 변경 관리 자동화

### 안정성 관련 질문

- 기초
- 변경 관리
- 장애 관리

## 5: 성능 효율성 원칙

컴퓨팅 리소스를 효율적으로 사용하여 시스템 요구 사항을 충족하고 수요가 변하고 기술이 진화함에 따라 이러한 효율성을 유지한다.

- 워크로드 요구 사항에 따라 적합한 리소스 유형 및 크기 선택
- 성능 모니터링
- 비즈니스 요구 사항의 변화에 따라 효율성을 유지하기 위해 정보에 입각하여 의사 결정

### 성능 효율성 설계 원칙

- 고급 기술 대중화
- 몇 분 만에 전 세계에 배포
- 서버리스 아키텍처 사용
- 실험 빈도를 증가하여 자주 실험
- 적합한 기술을 파악 및 사용

### 성능 효율성 관련 질문

- 선택
- 검토
- 모니터링
- 절충

## 6: 비용 최적화 원칙

가장 낮은 가격으로 비즈니스 자치를 제공하도록 시스템을 실행

- 비용이 소비되는 시점 이해 및 제어
- 가장 적절한 수의 리소스 유형 선택
- 시간 경과에 따른 지출 분석
- 초과 지출 없이 비즈니스 요구 사항에 맞게 확장

### 비용 최적화 설계 원칙

- 소비 모델 채택
- 전반적인 효율성 측정
- 데이터 센터 운영에 대한 비용 투자 중단
- 지출 분석 및 귀속
- 어플리케이션 수준의 관리형 서비스르 사용하여 소유 비용 절감

### 비용 최적화 관련 질문

- 지출 인식
- 비용 효율적인 리소스
- 공급과 수요의 균형
- 시간 경과에 따른 최적화

### 정리

- AWS Well-Architected 프레임워크는 클라우드 아키텍처를 평가하는 일관된 접근 방식과 설계를 구현하기 위한 도움이 되는 지침을 제공한다.
- AWS Well-Architected 프레임워크는 구체적으로 아키텍처가 클라우드 모범 사례에 잘 부합하는지 살펴볼 수 있는 기본 질문 세트가 기록되어 있다.
- AWS Well-Architected 프레임워크는 5가지 원칙으로 구성되어 있다.
- 각 원칙에는 일련의 설계 원칙과 모범 사례가 포함되어 있다.

## 7: 안정성 및 가용성

### 모든 것에서 항상 장애가 생긴다.

### 안전성

- **사용자가 원하는 경우 기능을 제공할 수 있는 시스템의 능력을 측정하는 척도**
- 사용자가 원할 때 기능을 제공하는 시스템의 능력을 측정한다.
- 시스템
    - 하드웨어, 펌웨어, 소프트웨어 등 모든 시스템 구성 요소가 포함된다.
- 확률
    - 지정된 기간 동안 전체 시스템이 의도대로 작동할 확률
- MTBF(평균 장애 간격)
    - 총 서비스 시간/장애 횟수

### 가용성

- **시스템이 정상적으로 작동하거나 예상되는 작업을 올바르게 수행하는 시간의 비율**
- 정상 작동 시간 / 총 시간
- 시간 경과(ex: 1년)에 따른 가동 시간 비율(ex: 99.9%)
- 9의 개수 - 파이브 나인은 99.999%의 가용성을 의미

### 고가용성

- **성능이 어느정도 저하되더라도 시스템이 사용 가능한 상태로 유지된다.**
- 가동 중단 시간이 최소화된다.
- 최소한의 인정 개입이 필요하다.

### 가용성에 영향을 미치는 요인

- 내결함성 (Fault tolerance)
    - 어플리케이션 구성 요소의 내장된 중복성과 작동 유지 능력
- 확장성 (Scalability)
    - 어플리케이션이 설계를 변경하기 않고 증가하는 용량을 수용하는 능력
- 복구성 (Recoverability)
    - 재해 발생 후 서비스 복구와 관련된 프로세스, 정책 및 절차

### 정리

- 안전성은 사용자가 원하는 경우 기능을 제공할 수 있는 시스템의 능력을 나타내며, MTBF로 측정할 수 있다.
- 가용성은 시스템이 정상적으로 작동하거나 예상되는 작업을 올바르게 수행하는 시간의 비율(또는 총 시간 대비 정상 작동 시간)입니다.
- 어플리케이션의 가용성에 영향을 미치는 세 가지 요인은 내결함성, 확장성 및 복구성이다.
- 고가용성을 보장하도록 워크로드와 어플리케이션을 설계할 수 있지만, 그에 따른 비용 상승을 고려해야한다.

## 8: AWS Trusted Advisor

### AWS Trusted Advisor

- AWS 모범 사례에 따라 리소스를 프로비저닝 하는데 도움이 되도록 실시간 지침을 제공하는 온라인 도구
- 비용 최적화
    - 리소스 샤용량을 분석하고, 사용하지 않는 유휴 리소스를 제거하거나 예약 용량을 약정하여 비용을 최적화 할 수 있도록 권장 사항 제시
- 성능
    - 서비스 한도를 점검하고, 프로비저닝된 처리량을 활영하는지 확인하며, 초과 사용되는 인스턴스를 모니터링하여 서비스 성능 개선
- 보안
    - 결함을 없애고, 다양항 AWS 보안 기능을 사용하며, 권한을 점검하여 어플리케이션의 보안을 개선
- 내결함성
    - 자동 조정, 상태 확인, 다중 AZ 배포, 백업 기능을 활용하여 AWS 어플리케이션의 가용성과 이중화를 개선
- 서비스 제한
    - 서비스 한도의 80%가 넘는 서비스 사용량이 있는지 점검