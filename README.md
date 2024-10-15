# Outbuild Backend Assessment

## Overview

This repository contains the source code for a scalable and secure backend API developed for the **Outbuild Backend Assessment**. The API is designed using **Express.js** and **PostgreSQL**, with a focus on handling large datasets efficiently. It provides users with the ability to manage **schedules** and their related **activities**, ensuring proper error handling, security, and observability throughout.

The project demonstrates key backend principles such as:
- Scalable and modular API design
- Secure data access control
- Effective error handling and logging
- Test-Driven Development (TDD)
- Performance optimization for handling large datasets

Due to the time for this project all the changes were done directally in main using commits. For a better practice this should have been done by using branches and PRs. 

## Problem Statement

Outbuild requires a backend system that enables users to manage schedules and their activities. Each user can have multiple schedules, and each schedule can contain multiple activities. Activities within a schedule may scale to thousands, so the system must handle large datasets efficiently.

Key features include:
- Creation of schedules
- Retrieval of schedules with associated activities
- Adding single or multiple activities to schedules
- Security to prevent unauthorized access
- Logging for observability
- Error handling and robust testing

## Core Technologies

- **Node.js**: Backend runtime environment
- **Express.js**: Web framework for building REST APIs
- **PostgreSQL**: Relational database for managing users, schedules, and activities
- **Docker**: For containerization and easy deployment
- **Jest**: For unit and integration testing
- **Winston**: Logging library for observability

## API Features

- **Create Schedule**: Create an empty schedule for a user, with the following endpoint: http://localhost:3000/api/schedules/
- **Get Schedule**: Fetch a schedule along with its activities, with the following endpoint: http://localhost:3000/api/schedules/:id
- **Add Activity**: Add a single or multiple activities to a schedule, with the following endpoint: http://localhost:3000/api/schedules/:id/activities
- **Add Batch Activity**: Add a single or multiple activities to a schedule, with the following endpoint: http://localhost:3000/api/schedules/:id/activities/batch
- **Security**: Ensure that only authorized users can access their schedules. This is done by using a jwt token, which needs to be added to the authorization as a bearer ot jwt token. For this two more endpoints were created:
http://localhost:3000/api/auth/register\
http://localhost:3000/api/auth/login

## Project Structure

### Domain Layer
- Contains core business logic, entities, and value objects.
- Defines models like **User**, **Schedule**, and **Activity** that represent the main business entities.
  
  - `domain/entities/`: Defines entities and their relationships.
  - `domain/repositories/`: Defines the interfaces for the future methods to handle the entities.

### Application Layer
- Implements application logic and services that coordinate between the domain and interface layers.
- Defines services like **ScheduleService** and **ActivityService** to handle business rules and coordinate with repositories.
  
  - `application/useCases/`: Contains business service classes that execute use cases.
  - `application/dto/`: Defines Data Transfer Objects (DTOs) to ensure the separation of internal domain models from external APIs.

### Infrastructure Layer
- Handles persistence and external service integrations.
- Interacts with the database and external systems (PostgreSQL, authentication).
  
  - `infrastructure/database/`: Defines repositories for interacting with the PostgreSQL database with Prisma and the prisma schema.
  - `infrastructure/security/`: Manages JWT authentication and authorization.
  - `infrastructure/logging/`: Holds the logging function to be used for all the api calls.

### Interface Layer
- Exposes the application to external clients (e.g., via HTTP).
- Defines the **Express.js** controllers, routes, and middlewares for handling API requests.
  
  - `interface/http/`: Contains the entrypoint were all routes are being called.
  - `interface/routes/`: Defines the API routes for the application.
  - `interface/middleware/`: Implements error handling, security checks, and logging.

### Test Layer
- Contains unit and integration tests to verify the functionality of each layer.
  
  - `test/`: Organizes all tests, with clear separation of unit and integration tests for domain, application, and infrastructure layers.



## How to Run

This project uses Docker for containerization. To run the project, follow these steps:
1. Clone the repository.
2. Run `docker-compose up` to start the server and database.
3. Access the API through `http://localhost:3000`.

For more detailed instructions, see the "Installation" section below.

## API Documentation

The API documentation is available through Swagger UI. After starting the application, you can access the documentation at:
http://localhost:3000/api-docs
