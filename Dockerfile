FROM node:16.14.0

WORKDIR /app/src

COPY package.json package.json

RUN npm install
COPY ./ /app/src
CMD ["npm", "run", "start"]