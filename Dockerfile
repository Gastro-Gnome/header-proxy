FROM node:12.4-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install

# RUN npm run seed

EXPOSE 3000

CMD ["npm", "run", "start"]