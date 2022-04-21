FROM node:12.13.0-alpine

WORKDIR /usr/app

# COPY package.json .

# WORKDIR /app

ADD . /usr/app

RUN npm i --quiet

COPY . .

RUN npm install pm2 -g

EXPOSE 3000

# CMD ["pm2-runtime", "server.js"]

CMD pm2 start server.js && tail -f /dev/null
