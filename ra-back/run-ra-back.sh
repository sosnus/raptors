docker rm -f metis-ra-back
docker build --no-cache -t ra-back:latest .
docker run -d --net=new_bridge -p  4401:8080 --name=metis-ra-back ra-back