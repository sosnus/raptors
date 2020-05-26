FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
RUN ls
RUN echo "AAAAA"
RUN ls /usr/src/app/dist/ra-front


FROM nginx:1.17.1-alpine
RUN ls
COPY --from=build /usr/src/app/dist/ra-front /usr/share/nginx/html
RUN ls
RUN ls /usr/share/nginx/html