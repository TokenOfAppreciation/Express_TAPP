FROM node:9.7.1

MAINTAINER Clemens Stift

ENV NODE_ENV = production
# ENV PORT = 3000

COPY        . /src
WORKDIR     /src

RUN         npm install
RUN         npm rebuild

EXPOSE 3000

ENTRYPOINT ["npm", "start"]