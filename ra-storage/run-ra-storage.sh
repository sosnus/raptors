#   --name metis-ra-storage

# docker rm -f metis-ra-storage

docker rm -f metis-ra-storage

docker run -p 4403:9000 --name metis-ra-storage \
  -e "MINIO_ACCESS_KEY=miniouseradmin" \
  -e "MINIO_SECRET_KEY=wJalrXUtnFEMK7MDEPxRfiCYEXAMPLEKEY" \
  -v /mnt/ra-storage-data:/ra-storage-data \
  minio/minio server /ra-storage-data


  # nazwa folderu:
  #      /<nazwa bucket>/<mapy>/<nazwa kolekcji>/<nazwa pliku>.<rozszerzenie>
  # /mnt/metis-ra-storage-bucket/maps/apartament/apartament.pgm

# INSTALL MC

# wget https://dl.min.io/client/mc/release/linux-amd64/mc
# chmod +x mc
# ./mc --help

# config host1
#   ./mc config host add metis-ra-storage http://localhost:4403 miniouseradmin wJalrXUtnFEMK7MDEPxRfiCYEXAMPLEKEY

#  ./mc policy set public metis/metis-ra-storage-bucket

# policy test:
# http://localhost:4403/metis-ra-storage-bucket/maps/maskonur/maskonur.jpg