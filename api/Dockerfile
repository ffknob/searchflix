FROM node:8-alpine as build

ARG NPMRC_CONTENT=""

WORKDIR /usr/src/app

COPY package*.json ./

RUN echo -e "$NPMRC_CONTENT" > .npmrc && \
    npm install && \
    rm -rf .npmrc

COPY . .

FROM build

ENV PORT 5000
ENV BASE_HREF /
ENV ES_PROTOCOL http
ENV ES_HOST localhost
ENV ES_PORT 9200
ENV ES_USERNAME ''
ENV ES_PASSWORD ''

WORKDIR /usr/src/app

COPY --from=build /usr/src/app /usr/src/app

EXPOSE ${PORT}

CMD [ "npm", "start" ]
