FROM node:12.10.0 as builder
WORKDIR /srv
COPY package*.json ./
RUN npm i --only=production
COPY . ./
RUN npm run build

FROM nginx:1.12-alpine
WORKDIR /srv
COPY --from=builder /srv/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
