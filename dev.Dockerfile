FROM node:13.10.1-alpine3.10

ARG proxy
ENV http_proxy=$proxy https_proxy=$proxy

WORKDIR /app

CMD ["npm", "start"]
