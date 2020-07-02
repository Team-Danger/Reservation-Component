FROM node:12.14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run seed

EXPOSE 3001

CMD [ "npm", "start" ]
