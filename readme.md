# Youbrary

Youbrary is a recommendation based library. The system consists of 4 projects:
- authentication-microservice
- book-microservice
- user-microservice (internally used microservice)
- youbrary-client

### Used Technologies

- Nestjs microservices
- Passport
- Mongodb
- Docker
- Google API

Web client was build using Angular with Angular Material. An interceptor was used for JWT.
The server was used using NestJS. Authentication was done using Passport (local, jwt and google). 
Database is a MongoDB database. 
The up runs in a docker container.

## Running the application

Install Docker Desktop if you do not have it. Run docker package using docker-compose command

docker-compose up 

Browse: http://localhost:4200/