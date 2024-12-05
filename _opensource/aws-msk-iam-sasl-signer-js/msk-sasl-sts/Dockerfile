# Base Image
FROM node:22

# 작업 디렉토리 생성
WORKDIR /usr/src/app

# package.json과 package-lock.json 복사
COPY package*.json ./

# tsconfig 파일 복사
COPY tsconfig*.json ./

# Dependencies 설치
RUN npm install --no-audit

# 소스 파일 복사
COPY  . .

# 서버가 사용하는 포트 열기
EXPOSE 3000

# 서버 실행
RUN npm run build

CMD ["node", "dist/src/main.js"]