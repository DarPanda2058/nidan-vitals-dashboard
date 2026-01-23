# Nidan Vitals Dashboard
A Full-Stack Application for recording patients vitals and conducting real-time BMI calculation,
while being fully compliant with FHIR R4 standards.


## Setup Instructions

### 1. Backend Setup


    No Database Setup Required for SQLite.
    
    # Go to the backend folder
    cd nidanVitalsBackend
    
    # Install Dependencies and Build
    mvn clean install

    # Run Spring Boot Application
    mvn spring-boot:run


### 2. Frontend Setup

    
    # Go to the forntend folder
    cd nidanVitalsFrontend

    # Install Dependencies
    npm install

    # Start the development Server
    npm run dev

## Tech Stack

### Backend
* **Java**
* **Spring Boot**
* **Lombok - Annotations for Constructors and Getters/Setters**
* **SLF4J - Logging Support**
* **SQLite JDBC - SQLite Database Support**
* **Data-JPA - ORM**
* **HAPI FHIR - FHIR R4**
* **SQLite - Database**
* **Maven - Dependency Management**

### Frontend
* **TypeScript**
* **React**
* **React Hook Form**
* **Tailwind CSS**
* **Axios - HTTP Client**
* **ShadCn - Component Library**

## DEMO

https://drive.google.com/file/d/1RlMhsxUW4Ds3xATjllNoNL6UuHA03-aO/view?usp=sharing
<video src="https://drive.google.com/file/d/1RlMhsxUW4Ds3xATjllNoNL6UuHA03-aO/view?usp=sharing" controls title="NidanVitalDemo" width="600"></video>
