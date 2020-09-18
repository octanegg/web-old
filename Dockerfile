FROM node:10

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

RUN npm run build
EXPOSE 3000

CMD [ "npm", "start" ]