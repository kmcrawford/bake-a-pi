FROM node:17.7.1-alpine3.15
RUN apk update
RUN apk add --no-cache ca-certificates
ENV NODE_ENV production
COPY src ./src
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
RUN npm i
ENTRYPOINT ["node", "src/index"]


