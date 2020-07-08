docker rm -f metis-ra-back
docker build -t ra-back:latest .
docker run -d -p  4401:8080 --name=metis-ra-back ra-back