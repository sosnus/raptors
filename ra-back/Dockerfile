FROM maven:3.6.3-openjdk-8 AS build
WORKDIR /usr/src/app
COPY . .
RUN mvn -U -e -X package



FROM openjdk:8-jdk-alpine
ARG JAR_FILE=target/*.jar
COPY --from=build /usr/src/app/${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
EXPOSE 8080:8080
