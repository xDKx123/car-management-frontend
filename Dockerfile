FROM node:20-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install -f

EXPOSE 3000

CMD ["npm", "start"]