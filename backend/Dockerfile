FROM openjdk:17-jdk-slim

WORKDIR /app

COPY . .

RUN ./gradlew bootJar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "build/libs/backend-0.0.1-SNAPSHOT.jar"]