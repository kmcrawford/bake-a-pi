FROM node:alpine3.15
EXPOSE 8080
COPY package*.json ./
RUN npm ci --only=production
COPY index.js index.js
CMD [ "node", "index.js" ]
