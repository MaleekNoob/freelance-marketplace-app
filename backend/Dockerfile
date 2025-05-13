FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g npm@8.19.2
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
