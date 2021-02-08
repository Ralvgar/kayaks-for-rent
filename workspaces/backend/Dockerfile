FROM node:current-alpine3.10

#RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./

RUN npm install -g npm-cli-login
RUN npm install pm2 -g

COPY .npmrc ./

ENV NPM_USER="albertvazquezm"
ENV NPM_PASS="b99c3d63ff1d4b0ccf1223e2d2f63e5d8f12c0ab"
ENV NPM_EMAIL="hola@albertvazquez.es"
ENV NPM_REGISTRY="https://npm.pkg.github.com"
ENV NPM_SCOPE="@mallorcabootcamp"

RUN npm-cli-login

COPY src /home/node/app

#USER node

RUN npm install
RUN npm run build

#COPY --chown=node:node . .

EXPOSE $PORT

CMD ["pm2-runtime", "./dist/index.js"]