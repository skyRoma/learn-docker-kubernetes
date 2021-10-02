FROM node:alpine

USER node

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node package.json .
RUN npm install

# This step isn't needed if we use volumes
COPY --chown=node:node . .

CMD ["npm","run","start"]
