# **RaptorsApp docs**
### Version 1.10.6


## Azure pipelines (Helike deployment)
* [helike-ra-front-sosnus-develop](http://helike-ra-back-sosnus-develop.azurewebsites.net/) ![alt text](https://dev.azure.com/RaptorsApp/helike-ra-sosnus-develop-and-master/_apis/build/status/helike-ra-front-sosnus-develop)
* [helike-ra-back-sosnus-develop](http://helike-ra-back-sosnus-develop.azurewebsites.net/) ![alt text](https://dev.azure.com/RaptorsApp/helike-ra-sosnus-develop-and-master/_apis/build/status/helike-ra-back-sosnus-develop)
* [helike-ra-docs-sosnus-develop](http://helike-ra-docs-sosnus-develop.azurewebsites.net/) ![alt text](https://dev.azure.com/RaptorsApp/helike-ra-sosnus-develop-and-master/_apis/build/status/helike-ra-docs-sosnus-develop)


# **Services list**
* [ra-back docs](#ra-back)
* [ra-front docs](#ra-front)
* [ra-storage docs](#ra-storage)
* [ra-supervisor docs](#ra-supervisor)
* [ra-database docs](#ra-database)


# **Services description**

# ra-back 
![DOCKER](https://img.shields.io/badge/Docker-DONE-greenb)
![AZURE](https://img.shields.io/badge/Azure-DONE-greenb)
![AZURE+DOCKER](https://img.shields.io/badge/Azure+Docker-DONE-greenb)

[ra-back docs](./ra-back/ra-back.md)
### About
Backend for RaptorsApp solution. Middleware between clients and storage like Mongo database and Minio.
### Users, clients, dependencies
(Enumerate all users: Personal actors, Non-personal actors, External systems, Devices, Time in bulletpoint)
* *ra-front*
* *ra-kiosk*
* *supervisor/dispatcher*
* robots
### Stack
* Java 1.8
* Spring Boot 2.9.2
* Maven 3.3.9

# ra-barrier
![DOCKER](https://img.shields.io/badge/Docker-DONE-greenb)
![AZURE](https://img.shields.io/badge/Azure-DONE-greenb)
![AZURE+DOCKER](https://img.shields.io/badge/Azure+Docker-NOT_YET-orange)
[ra-barrier DOCS](./ra-barrier/ra-barrier.md) 
### About
ra-barrier can generate polygons for database based on image analysis.
### Users, clients, dependencies
(Enumerate all users: Personal actors, Non-personal actors, External systems, Devices, Time in bulletpoint)
* ra-front - trigger for run alghoritm
* ra-storage - storage maps and yaml files - input data
* ra-back - storage barrier colection, receive output from ra-barrier
### Stack
* Python (TODO more)
### CI-CD problem
* Azure WebApp for Containers can't hit endpoint (no http respond on port 80)

# ra-database
![DOCKER](https://img.shields.io/badge/Docker-NOT_YET-orange)
![AZURE](https://img.shields.io/badge/Azure-DONE-greenb)
![AZURE+DOCKER](https://img.shields.io/badge/Azure+Docker-NOT_YET-orange)
[ra-database docs](./ra-database/ra-database.md)

### About
ra-database contains almost all data from RaptorsApp solution.
### Users, clients, dependencies
* ra-backend
### Stack
* MongoDatabase 4.2
### CI-CD Problem
* How to run app with parameters or start script to prepare db config?
* How to connect disc?

# ra-docs
![DOCKER](https://img.shields.io/badge/Docker-DONE-greenb)
![AZURE](https://img.shields.io/badge/Azure-DONE-greenb)
![AZURE+DOCKER](https://img.shields.io/badge/Azure+Docker-DONE-greenb)
### About
ra-docs contains instructions/manuals for developers and users.
### Users, clients, dependencies
* Users
### Stack
* Markdown
* MkDocs
* AsciiDocs (maybe ra-barrier?)


# ra-front
![DOCKER](https://img.shields.io/badge/Docker-DONE-greenb)
![AZURE](https://img.shields.io/badge/Azure-DONE-greenb)
![AZURE+DOCKER](https://img.shields.io/badge/Azure+Docker-DONE-greenb)
[ra-front docs](./ra-front/ra-front.md)

### About
ra-front is user friendly interface to show data from ra-storage.
### Users, clients, dependencies
* Humans
### Stack
* Angular8
* Typescript (version?)
* Node (version?)


# ra-storage
![DOCKER](https://img.shields.io/badge/Docker-DONE-greenb)
![AZURE](https://img.shields.io/badge/Azure-DONE-greenb)
![AZURE+DOCKER](https://img.shields.io/badge/Azure+Docker-NOT_YET-orange)
[ra-storage docs](./ra-storage/ra-storage.md)
### About
ra-storage is storage for large files like maps or pictures. Based on minio. Data can be storage directly on disc or Azure blob storage. API compatible with Amazon S3.
### Clients
* ra-back - can add and remove files
* ra-front - read
* robots - read
* Minio webpage service-address/minio - can add and remove files, but only for debug!
* ### Stack
* Minio
### CI-CD Problem
* How to run app with parameters or start script to prepare config?
* (If without Azure Blob storage) How to connect disc?


# ra-supervisor
[ra-supervisor DOCS](./ra-supervisor/ra-supervisor.md) , [ra-supervisor CODE](./ra-supervisor) , [ra-supervisor CHANGELOG](../ra-supervisor/changelog.md)   ![version](https://img.shields.io/badge/version-0.1.0-yellow)

### About
(Service description)<br>
TODO
### Users, clients, dependencies
(Enumerate all users: Personal actors, Non-personal actors, External systems, Devices, Time in bulletpoint)
* TODO
* TODO
### Stack
(Enumerate technological stack with bulletpoint)
* TODO
* TODO

# placeholders_________
# ra-kiosk
# ra-control
# ra-dashboard