FROM node:14.4.0-buster-slim AS build

ARG NODE_ENV=production

WORKDIR /app

COPY package.json package-lock.json ./

# RUN npm install
RUN npm ci

COPY . .

RUN npm run build

FROM nginx:1.19.0

COPY --from=build /app/dist/ra-front /usr/share/nginx/html

# TODO: NGINX config file + ADD USER

# RUN useradd -u 5000 app \
    # && mkdir -p /var/run/nginx /var/tmp/nginx \
    # && chown -R app:app /usr/share/nginx /var/run/nginx /var/tmp/nginx 

# COPY ./nginx.conf /etc/nginx/nginx.conf
# COPY ./default.conf /etc/nginx/conf.d/

# USER app:app

CMD ["nginx","-g","daemon off;"]