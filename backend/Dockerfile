# Start with a base image containing Java runtime
FROM openjdk:17-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the build output from the host to the container
COPY build/libs/*.jar app.jar

# Run the jar file
ENTRYPOINT ["java","-jar","/app.jar"]
