# 1) build stage: npm으로 정적 파일 빌드
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG VITE_API_URL=""
ENV VITE_API_URL=${VITE_API_URL}

RUN npm run build

# 2) runtime stage: 빌드 결과물(dist)을 node 서버로 서빙
FROM node:20-alpine AS runner
WORKDIR /app

RUN npm install -g serve@14

COPY --from=builder --chown=node:node /app/dist ./dist

USER node
EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
