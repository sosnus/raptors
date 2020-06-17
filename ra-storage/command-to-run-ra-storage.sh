docker run -p 8080:8080 --name azure-s3 \
 -e "MINIO_ACCESS_KEY=tebestorageblob" \
 -e "MINIO_SECRET_KEY=9zYtC8+6nHiKYnNA40xdeotmmS00VscRBmZYwyccv5TCxFdg8bg9jbKGqsgReFEg+jXBVXMQaX9xH7d+x1YVzg==" \
 -e "MINIO_AZURE_CHUNK_SIZE_MB=0.25" \
 minio/minio gateway azure

 # key21
 # mc admin user add myminio/ newuser newuser123