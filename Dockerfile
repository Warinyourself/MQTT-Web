FROM node:16-alpine3.14

RUN mkdir -p /usr/src/front

WORKDIR /usr/src/front

RUN apk update && apk upgrade && apk add git yarn

COPY . /usr/src/front/

RUN yarn

EXPOSE 3000

CMD [ "yarn", "dev" ]