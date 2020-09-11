package pl.raptors.ra_back.controller.movement;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;

import io.minio.errors.*;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.raptors.ra_back.domain.mapsMetadata.*;
import pl.raptors.ra_back.domain.movement.MovementMap;
import pl.raptors.ra_back.service.mapsMetadata.MapsService;
import pl.raptors.ra_back.service.movement.MinioService;
import pl.raptors.ra_back.service.pgm.PGMIO;


import javax.validation.Valid;
import java.io.*;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/movement/maps/minio")
public class MinioController {

    @Autowired
    MinioService minioService;
    @Autowired
    MapsService mapsService;

    private static String bucketName = "minioblobtest";


    private InputStream convertToPNGfromPGM(MultipartFile mapImage) throws IOException {
        byte[] pngByteArray =  PGMIO.pgm2png(mapImage.getBytes());
        return new ByteArrayInputStream(pngByteArray);
    }

    private File multipartToFile(MultipartFile multipart, String fileName) throws IllegalStateException, IOException {
        File convFile = new File(System.getProperty("java.io.tmpdir") + "/" + fileName);
        multipart.transferTo(convFile);
        return convFile;
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @PostMapping("/upload")
    public Maps upload(@RequestParam("name") String name, @RequestParam("mapImage") MultipartFile mapImage, @RequestParam("yamlFile") MultipartFile yamlFile) throws IOException, InvalidResponseException, InvalidKeyException, NoSuchAlgorithmException, ServerException, ErrorResponseException, XmlParserException, InvalidBucketNameException, InsufficientDataException, InternalException {

        //zapisz yaml, pgm i png do minio
        minioService.uploadFile(bucketName, name + ".pgm", mapImage.getInputStream());
        minioService.uploadFile(bucketName, name + ".yaml", yamlFile.getInputStream());
        minioService.uploadFile(bucketName, name + ".png", convertToPNGfromPGM(mapImage));

        //zapisz adresy plików wrzuconych na minio do nowego obiektu maps
        String yamlURL = minioService.getUrl(bucketName, name + ".yaml");
        String pgmURL = minioService.getUrl(bucketName, name + ".pgm");
        String pngURL = minioService.getUrl(bucketName, name + ".png");

        //odczytaj z pliku yaml i zapisz do obiektu maps reszte danych
        ObjectMapper mapper = new ObjectMapper(new YAMLFactory());
        mapper.findAndRegisterModules();
        MapMetadata mapMetadata = mapper.readValue(multipartToFile(yamlFile, name), MapMetadata.class);

        String[] tags = null;   //reszta danych wczytywana z nowego frontu w formularzu...
        MapTransformation mapTransformation = null;
        MapRotation mapRotation = null;

        Maps maps = new Maps(yamlURL, pgmURL, pngURL, tags, mapMetadata, mapTransformation, mapRotation);
        return mapsService.addOne(maps);    //zapisz obiekt maps do bazy
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/{id}")
    public Binary downloadFile(String bucketName, String fileName) throws IOException, InvalidResponseException, InvalidKeyException, NoSuchAlgorithmException, ServerException, ErrorResponseException, XmlParserException, InvalidBucketNameException, InsufficientDataException, InternalException {
        return minioService.downloadFile(bucketName, fileName);
    }



    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/delete")     //filename powinno nie byc... tylko jakos po id wyszukiwac, trzeba ten problem rozwiazac xD
    public void delete(@RequestBody @Valid Maps maps, String fileName) throws IOException, InvalidResponseException, InvalidKeyException, NoSuchAlgorithmException, ServerException, ErrorResponseException, XmlParserException, InvalidBucketNameException, InsufficientDataException, InternalException {
        minioService.deleteFile(bucketName, fileName);
        mapsService.deleteOne(maps);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/update")
    public Maps update(@RequestBody @Valid Maps maps) {
        if (maps.getId() != null) {
            //todo update file in minio
            return mapsService.updateOne(maps);
        } else {
            //todo add files to minio
            return mapsService.addOne(maps);
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/getBucketsList")
    public List<String> getBucketsList() throws IOException, InvalidResponseException, InvalidKeyException, NoSuchAlgorithmException, ServerException, ErrorResponseException, XmlParserException, InvalidBucketNameException, InsufficientDataException, InternalException {
        return minioService.getBuckets();
    }

}
