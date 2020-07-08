docker rm -f ra-barrier
docker build -t ra-barrier:latest .
docker run -d -p  4406:5000 --name=metis-ra-barrier ra-barrier