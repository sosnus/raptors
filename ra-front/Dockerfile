### STAGE 1: Build ###
FROM node:14.4.0-buster-slim AS build
# ARG NODE_ENV=production   # error?
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build


### STAGE 2: Run ###
FROM nginx:1.19.0
# COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/ra-front /usr/share/nginx/html
# CMD ["nginx","-g","daemon off;"]

# TODO: NGINX config file + ADD USER

# RUN useradd -u 5000 app \
    # && mkdir -p /var/run/nginx /var/tmp/nginx \
    # && chown -R app:app /usr/share/nginx /var/run/nginx /var/tmp/nginx 

# COPY ./nginx.conf /etc/nginx/nginx.conf
# COPY ./default.conf /etc/nginx/conf.d/

# USER app:app
