FROM node:latest

WORKDIR /code

COPY package*.json ./
RUN npm install
COPY *.js ./
ADD middleware /code/middleware
ADD public /code/public
ADD routes /code/routes
ADD views /code/views

CMD ["npm", "start"]