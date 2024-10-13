# Create OpenSearch Snapshot Repository

## 개요
OpenSearch Repository는 보안 문제로 인해, `curl` 명령어 및 `console`에서 생성할 수 없습니다.
그로인해, 별도의 라이브러리가 필요하며, 해당 스크립트를 통해 OpenSearch Snapshot Repository를 생성할 예정입니다.


## 환경 변수
스냅샷을 실행하기 위해서는 `sample.env` 파일에 여러 값들이 필요합니다.  
각 환경 변수마다 필요한 값을 수정한 후, 스크립트 실행이 필요합니다.

``` dotenv
OPEN_SEARCH_ENDPOINT=search-os-domain-os-repo-prg-<DOMAIN_ID>.ap-northeast-2.es.amazonaws.com;
OPEN_SEARCH_REGION=ap-northeast-2;
OPEN_SEARCH_SNAPSHOT_REPOSITORY_ROLE_ARN=arn:aws:iam::<AWS_ACCOUNT_ID>:role/os-repo-prg-OPEN_SEARCHRepositoryRole;
OPEN_SEARCH_SNAPSHOT_REPOSITORY_NAME=js-outbound-logs-repo;

S3_BUCKET_NAME=os-repo-bucket;
S3_BUCKET_SNAPSHOT_PATH=js-outbound-logs;

AWS_IAM_REPOSITORY_USER_ACCESS_KEY_ID=<AWS_IAM_REPOSITORY_USER_ACCESS_KEY_ID>
AWS_IAM_REPOSITORY_USER_SECRET_ACCESS_KEY=<AWS_IAM_REPOSITORY_USER_SECRET_ACCESS_KEY>
```

## 실행하기
``` bash
# dotenv, aws4, https 패키지 설치 
npm install

# Node.js 스크립트 실행
node app.js
```


