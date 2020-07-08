FROM python:2.7 AS build
COPY . /docs/
WORKDIR /docs/
RUN pip install mkdocs
# RUN pip install mkdocs-bootstrap4
RUN mkdocs build

FROM nginx:1.19.0

COPY --from=build /docs/site /usr/share/nginx/html
# // TODO: ngix settings
CMD ["nginx","-g","daemon off;"]