FROM node:18

WORKDIR /opt/build

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000
CMD [ "yarn", "start", "-H", "0.0.0.0" ]