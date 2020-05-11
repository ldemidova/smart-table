FROM node:12.6-alpine
WORKDIR /srv
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm i
COPY . ./
RUN npm run build
