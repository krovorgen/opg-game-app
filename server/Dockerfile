FROM node:16.15.0-alpine

WORKDIR /app

EXPOSE 4000

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .

CMD ["yarn", "dev:watch"]
