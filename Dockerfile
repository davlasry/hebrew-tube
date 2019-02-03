FROM node:8.11.1-alpine


WORKDIR /app

RUN apk add --update --no-cache gcc g++ make libc6-compat

RUN apk add --update --no-cache --virtual .gyp \
        python \
        make \
        g++ \
        gcc \
        libpng-dev \
        autoconf \
        automake \
        libtool \
        nasm

COPY package.json .

RUN npm set progress=false && npm install 

COPY server.js server.js
COPY server/ server/

EXPOSE 4600