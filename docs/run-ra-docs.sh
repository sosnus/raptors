docker rm -f metis-ra-docs
docker build -t ra-docs:latest .
docker run -d -p  4405:80 --name=metis-ra-docs ra-docs