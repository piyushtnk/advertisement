FROM node:14-alpine

WORKDIR /usr/src/app

COPY . ./
RUN npm install

EXPOSE 80

ENV HOST=0.0.0.0
ENV PORT=80

RUN npm run build

CMD [ "npm", "run", "start" ]