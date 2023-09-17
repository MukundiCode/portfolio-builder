# Devportfolio

Devportfolio is a platform where developers can create their online portfolio, kind of like an online CV. Devfolio allows developers to showcase their skills, projects, education, and work experience in a professional and attractive way. Devfolio is built using Java (Spring boot) and React with Typescript. Devfolio uses a Postgres database for persistence.

## Features

- [x] User profile creation and editing
- [x] User portfolio generation and customization
- [X] Create and launch profile
- [X] Persistence
- [X] User authentication and authorization
- [ ] User analytics and insights
- [ ] Deployment

## Installation

To run Devfolio locally, you need to have Java 11, Node.js 14, and Postgres 13 installed on your machine. You also need to clone this repository and install the dependencies.

```bash
# Clone the repository
git clone https://github.com/MukundiCode/devfolio.git

# Go to the backend directory
cd devfolio/backend

# Install the dependencies
./mvnw install

# Run the backend application
./mvnw spring-boot:run

# Go to the frontend directory in another terminal
cd devfolio/frontend

# Install the dependencies
npm install

# Run the frontend application
npm start
```

The backend application will run on port 8080 and the frontend application will run on port 3000. You can access the Devfolio website at http://localhost:3000.

## Configuration

You need to create a `.properties` file in the frontend directory with the following variables:

```
REACT_APP_BACKEND_URL=http://localhost:8080
```

You also need to create an `application.properties` file in the backend directory with the following variables:

```
spring.datasource.url=jdbc:postgresql://localhost:5432/devfolio
spring.datasource.username=<your-postgres-username>
spring.datasource.password=<your-postgres-password>
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.show-sql=true
spring.security.jwt.secret=<your-jwt-secret>
```

## Usage

To use Devfolio, you need to register an account with your email and password. After logging in, you can create your profile by filling in your personal information, skills, projects, education, and work experience. You can also customize your portfolio by choosing a theme, a layout, and a font. You can preview your portfolio and see how it looks on different devices. You can also share your portfolio with others by generating a unique link or exporting it as a PDF file.

## License

Devfolio is licensed under the MIT License. See the [LICENSE] file for more details.
```
