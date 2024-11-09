# Base Image
FROM node:20

# 작업 디렉토리 생성
WORKDIR /usr/src/app

# package.json과 package-lock.json 복사
COPY package*.json ./

# Dependencies 설치
RUN npm install

# 소스 파일 복사
COPY  . .

# 서버가 사용하는 포트 열기
EXPOSE 3000

# 서버 실행
CMD ["node", "src/app.js"]
