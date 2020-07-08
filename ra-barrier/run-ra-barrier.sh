docker rm -f ra-barrier
docker build --no-cache -t ra-barrier:latest .
docker run -d -p  4406:80 --name=metis-ra-barrier ra-barrier