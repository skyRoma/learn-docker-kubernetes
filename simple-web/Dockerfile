# Specify a base image
FROM node:alpine

WORKDIR /usr/app

# Install some dependencies
COPY ./package.json ./
RUN npm install

# Cache will be invalidated if we change any file that was copied!
COPY ./ ./

# Default command
CMD [ "npm", "start" ]
 