FROM node:12

RUN mkdir /code
WORKDIR /code
ADD package.json /code/
RUN yarn install

CMD yarn start
