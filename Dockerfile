FROM node:12.14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3001
ENV DB="mongo"
EXPOSE 3001

CMD [ "npm", "seed:start" ]
