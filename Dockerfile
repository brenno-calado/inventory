FROM node:16.14.2-alpine


WORKDIR /app

COPY package*.json ./

RUN yarn install

RUN chmod 777 node_modules

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]