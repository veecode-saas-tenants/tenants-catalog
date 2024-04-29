FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY src/ ./src/

EXPOSE ${{ values.port }}

CMD [ "node", "src/index.js" ]