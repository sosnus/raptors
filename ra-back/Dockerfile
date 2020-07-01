# FROM maven:3-openjdk-8-slim

# WORKDIR /app

# COPY . .

# RUN mvn package

# # RUN ls ./target


FROM maven:3.6.3-openjdk-8 AS build
WORKDIR /usr/src/app
COPY . .
RUN mvn -U package
# RUN mvn -U -e package
# -U force update # -e print error #-X debug



FROM openjdk:8-jdk-alpine
ARG JAR_FILE=target/*.jar
COPY --from=build /usr/src/app/${JAR_FILE} app.jar

# LOCAL:
# ENTRYPOINT ["java","-Dserver.port=3333","-jar","/app.jar"]
# EXPOSE 3333

# CLOUD:
ENTRYPOINT ["java","-jar","/app.jar"]
EXPOSE 8080:8080
