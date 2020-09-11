package pl.raptors.ra_back.service.movement;

import java.io.IOException;
import java.io.InputStream;
import java.security.NoSuchAlgorithmException;
import java.security.InvalidKeyException;
import java.util.*;

import com.google.common.io.ByteStreams;
import io.minio.*;
import io.minio.errors.*;
import io.minio.messages.Bucket;
import io.minio.messages.Item;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.stereotype.Service;

@Service
public class MinioService {

    private static String endpoint = "http://tebe.westeurope.cloudapp.azure.com:9000/";
    private static String accessKey = "tebestorageblob";
    private static String secretKey = "Fy8+VkNi3BBWnKi/4qCg2AXl+xkCSAeIVjjMBrwgmttblbH74fYSG4jEXZPFxZNPCeHNcPlMXp9cmdtYro+CSA==";


    public Binary downloadFile(String bucketName, String fileName) throws IOException, InvalidKeyException, InvalidResponseException, InsufficientDataException, NoSuchAlgorithmException, ServerException, InternalException, XmlParserException, InvalidBucketNameException, ErrorResponseException {
        MinioClient minioClient = MinioClient.builder()
                .endpoint(endpoint)
                .credentials(accessKey, secretKey)
                .build();

        InputStream stream = minioClient.getObject(
                GetObjectArgs.builder()
                        .bucket(bucketName)
                        .object(fileName)
                        .build());
        byte[] bytes = ByteStreams.toByteArray(stream);
        stream.close();
        return new Binary(BsonBinarySubType.BINARY, bytes);
    }

    //powinno zwracac adres w minio?
    public void uploadFile(String bucketName, String fileName, InputStream inputStream) throws IOException, InvalidKeyException, InvalidResponseException, InsufficientDataException, NoSuchAlgorithmException, ServerException, InternalException, XmlParserException, InvalidBucketNameException, ErrorResponseException {

        MinioClient minioClient = MinioClient.builder()
                .endpoint(endpoint)
                .credentials(accessKey, secretKey)
                .build();

        minioClient.putObject(
                PutObjectArgs.builder().bucket(bucketName).object(fileName).stream(inputStream, -1, 10485760)
                        //.contentType("file/pgn???")
                        .build());
    }

    public void deleteFile(String bucketName, String fileName) throws IOException, InvalidKeyException, InvalidResponseException, InsufficientDataException, NoSuchAlgorithmException, ServerException, InternalException, XmlParserException, InvalidBucketNameException, ErrorResponseException {
        MinioClient minioClient = MinioClient.builder()
                .endpoint(endpoint)
                .credentials(accessKey, secretKey)
                .build();
        minioClient.removeObject(
                RemoveObjectArgs.builder().bucket(bucketName).object(fileName).build());
    }

    public String getUrl(String bucketName, String fileName) throws IOException, InvalidKeyException, InvalidResponseException, InsufficientDataException, NoSuchAlgorithmException, ServerException, InternalException, XmlParserException, InvalidBucketNameException, ErrorResponseException {
        MinioClient minioClient = MinioClient.builder()
                .endpoint(endpoint)
                .credentials(accessKey, secretKey)
                .build();
        return minioClient.getObjectUrl(bucketName, fileName);
    }

    public List<String> getBuckets() throws IOException, InvalidKeyException, InvalidResponseException, InsufficientDataException, NoSuchAlgorithmException, ServerException, InternalException, XmlParserException, InvalidBucketNameException, ErrorResponseException {
        List<String> bucketList = new ArrayList<>();
        MinioClient minioClient = MinioClient.builder()
                .endpoint(endpoint)
                .credentials(accessKey, secretKey)
                .build();

        for (Bucket bucket : minioClient.listBuckets()) {
            bucketList.add(bucket.name());
        }

        return bucketList;
    }

    //to ma pretendencje do napisania getAll...
    public List<Result<Item>> getObjectsList(String bucketName) throws IOException, InvalidKeyException, InvalidResponseException, InsufficientDataException, NoSuchAlgorithmException, ServerException, InternalException, XmlParserException, InvalidBucketNameException, ErrorResponseException {
        List<Result<Item>> target = new ArrayList<>();

        MinioClient minioClient = MinioClient.builder()
                .endpoint(endpoint)
                .credentials(accessKey, secretKey)
                .build();

        Iterable<Result<Item>> results = minioClient.listObjects(
                ListObjectsArgs.builder().bucket("my-bucketname").build());
        results.forEach(target::add);
        for(Result<Item> resoult:target) {
            System.out.println("name: " + resoult.get().objectName());
            System.out.println("storageClass: " + resoult.get().storageClass());
            System.out.println("etag: " + resoult.get().etag());
            System.out.println("isDir: " + resoult.get().isDir());
            System.out.println("lastModified: " + resoult.get().lastModified());
            System.out.println("owner: " + resoult.get().owner());
            System.out.println("size: " + resoult.get().size());
        }

        return target;
    }

}
