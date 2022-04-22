FROM node:14-alpine

WORKDIR /app

EXPOSE 4000

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .

CMD ["yarn", "dev2"]
