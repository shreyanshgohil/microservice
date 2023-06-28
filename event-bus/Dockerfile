FROM node:14-alpine
WORKDIR /user/app
COPY ./package.json ./
RUN npm install
COPY ./ ./
CMD ["npm","start"]