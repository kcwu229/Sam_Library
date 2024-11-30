FROM maven:3.8.6-eclipse-temurin-17 AS build
WORKDIR /app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml ./

RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

FROM eclipse-temurin:17-jre
ARG DEPENDENCY=/app/target/dependency

# Copy project dependencies from the build stage
COPY --from=build /app/target/samLibrary-0.0.1-SNAPSHOT.jar /app/samLibrary-0.0.1-SNAPSHOT.jar
EXPOSE 8080

ENTRYPOINT ["java","-jar","/app/samLibrary-0.0.1-SNAPSHOT.jar"]