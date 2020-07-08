# Install the MongoDB client
# sudo apt-get install mongodb-clients

# Change mydb to the name of your DB
# mongo localhost/mydb


# sudo 
# docker run -d -p 37017:27017 -v ~/data_clone:/data/db mongo
docker run -d -p  4404:27017 \
  --name=metis-ra-database \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  -v ~/data_clone:/data/db mongo

# CONNECT below
# mongo --port 4404
# mongo --host 127.0.0.1:4404