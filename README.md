# Grocify - Full Stack Grocery Application

A modern, full-stack grocery shopping application built with Spring Boot (Backend) and React (Frontend).

## 🚀 Features

- **Backend (Spring Boot 3.x)**
  - RESTful API with Spring Boot 3.2.5
  - JPA/Hibernate for data persistence
  - MySQL database integration
  - Spring Security with CORS configuration
  - Product management (CRUD operations)
  - User authentication system
  - Data initialization with sample products

- **Frontend (React 18)**
  - Modern React with Hooks
  - Responsive design with CSS Grid/Flexbox
  - Product browsing and search
  - Category filtering
  - Product detail pages
  - Mobile-friendly interface
  - Beautiful UI with smooth animations

## 🛠️ Tech Stack

### Backend
- Java 17
- Spring Boot 3.2.5
- Spring Data JPA
- Spring Security
- MySQL 8.0
- Maven

### Frontend
- React 18
- React Router DOM
- Axios for API calls
- Vite for build tooling
- CSS3 with modern features

## 📋 Prerequisites

- Java 17 or higher
- Node.js 16 or higher
- Docker and Docker Compose
- Maven 3.6+

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd grocify_fullstack
```

### 2. Start the Database
```bash
cd docker
docker-compose up -d
```

This will start a MySQL database on port 3306 with the following credentials:
- **Database**: groc
- **Username**: Namu
- **Password**: gana2111

### 3. Start the Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 4. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:5173`

## 📁 Project Structure

```
grocify_fullstack/
├── backend/                 # Spring Boot application
│   ├── src/main/java/
│   │   └── com/grocify/
│   │       ├── controller/  # REST controllers
│   │       ├── entity/      # JPA entities
│   │       ├── repository/  # Data repositories
│   │       ├── service/     # Business logic
│   │       ├── config/      # Configuration classes
│   │       └── GrocifyApplication.java
│   ├── src/main/resources/
│   │   ├── application.yml  # Application configuration
│   │   └── data.sql        # Initial data
│   └── pom.xml             # Maven dependencies
├── frontend/                # React application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── App.jsx         # Main app component
│   │   ├── main.jsx        # Entry point
│   │   └── styles.css      # Global styles
│   ├── package.json        # Node dependencies
│   └── vite.config.js      # Vite configuration
├── docker/                  # Docker configuration
│   ├── docker-compose.yml  # Database service
│   └── init-db.sql        # Database initialization
└── README.md               # This file
```

## 🔧 Configuration

### Backend Configuration
The backend configuration is in `backend/src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/groc?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
    username: Namu
    password: gana2111
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
```

### Frontend Configuration
The frontend is configured to connect to the backend at `http://localhost:8081`.

## 📊 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/category/{category}` - Get products by category
- `GET /api/products/search?name={name}` - Search products by name
- `POST /api/products` - Create new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

### Authentication (Future)
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

## 🎨 Frontend Features

- **Home Page**: Hero section with call-to-action, features, and category navigation
- **Products Page**: Product grid with search and category filtering
- **Product Detail**: Detailed product information with add-to-cart functionality
- **Responsive Design**: Mobile-first approach with modern CSS

## 🗄️ Database Schema

### Users Table
- `id` (Primary Key)
- `username` (Unique)
- `password` (BCrypt hashed)
- `enabled` (Boolean)

### Products Table
- `id` (Primary Key)
- `name`
- `price`
- `image_url`
- `description`
- `category`
- `available` (Boolean)

## 🚀 Deployment

### Backend Deployment
```bash
cd backend
mvn clean package
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

### Frontend Deployment
```bash
cd frontend
npm run build
# Serve the dist/ folder with your web server
```

## 🔍 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure MySQL is running: `docker ps`
   - Check database credentials in `application.yml`
   - Verify database exists: `docker exec -it <container-id> mysql -u Namu -p`

2. **Port Already in Use**
   - Backend: Change port in `application.yml`
   - Frontend: Change port in `vite.config.js`

3. **CORS Issues**
   - Backend CORS is configured to allow `http://localhost:5173`
   - Check SecurityConfig.java for CORS settings

4. **Build Errors**
   - Clean and rebuild: `mvn clean install`
   - Check Java version: `java -version`
   - Verify Maven version: `mvn -version`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the troubleshooting section
2. Review the logs for error messages
3. Ensure all prerequisites are met
4. Create an issue with detailed error information

## 🎯 Future Enhancements

- Shopping cart functionality
- User authentication and authorization
- Order management system
- Payment integration
- Admin dashboard
- Product reviews and ratings
- Inventory management
- Email notifications

---

**Happy Coding! 🎉**