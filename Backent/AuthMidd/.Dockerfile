FROM node:16-alpine

WORKDIR /app
COPY package.json .
RUN npm instal
COPY . .

CMD ["npm", "start"]
