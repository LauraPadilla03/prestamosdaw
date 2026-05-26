FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

RUN ./gradlew clean build -x test

CMD ["java","-jar","build/libs/prestamosportatiles-0.0.1-SNAPSHOT.jar"]