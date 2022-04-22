FROM node:14-alpine

WORKDIR /app

#не обязательно, но указывает на каком порту работает приложение
EXPOSE 3000

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

#для более эффективного переиспользования слоёв,  перемещаем после установки пакетов BEST PRACTISE
COPY . .

CMD ["yarn", "start"]
