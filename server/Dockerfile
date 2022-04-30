FROM node:16-alpine

WORKDIR /app

EXPOSE 4000

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
RUN npm install --global --unsafe-perm exp
COPY . .

CMD ["yarn", "dev:watch"]
