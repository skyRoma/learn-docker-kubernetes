FROM node:alpine as builder
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node package.json .
RUN npm install
COPY --chown=node:node . .
RUN npm run build

FROM nginx:alpine
# TODO check
# With this vscode extension will automatically map port 3000 
# EXPOSE 3000
COPY /nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /home/node/app/build /usr/share/nginx/html
# CMD is not needed since default nginx command will be used to start the server
