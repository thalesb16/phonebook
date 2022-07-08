FROM node:alpine

WORKDIR /home/node

RUN apk add --no-cache bash
RUN npm i -g @nestjs/cli
