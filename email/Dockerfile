FROM node:16.15.0-alpine

WORKDIR /app

EXPOSE 4200

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build

CMD ["yarn", "start"]
