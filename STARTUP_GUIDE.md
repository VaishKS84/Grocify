# 🚀 Grocify Fullstack Startup Guide

## Prerequisites
- MySQL 8.0 running on port 3306
- Java 17+ installed
- Node.js 16+ installed
- Maven installed

## Quick Start (Windows)

### Option 1: Use the Scripts
1. **Double-click `start.bat`** (Command Prompt) or **Right-click `start.ps1` → Run with PowerShell**
2. Follow the prompts
3. Wait for both services to start

### Option 2: Manual Startup

#### Step 1: Start Backend
1. Open Command Prompt/PowerShell
2. Navigate to backend directory:
   ```
   cd C:\Users\Namu\Downloads\grocify_fullstack\backend
   ```
3. Start Spring Boot:
   ```
   mvn spring-boot:run
   ```
4. Wait for "Started GrocifyApplication" message
5. Keep this window open

#### Step 2: Start Frontend
1. Open another Command Prompt/PowerShell
2. Navigate to frontend directory:
   ```
   cd C:\Users\Namu\Downloads\grocify_fullstack\frontend
   ```
3. Start React development server:
   ```
   npm run dev
   ```
4. Wait for "Local: http://localhost:5173/" message
5. Keep this window open

## Access the Application

- **Frontend**: http://localhost:5173/
- **Backend API**: http://localhost:8081/api/products

## Default Login Credentials

- **Username**: `admin`
- **Password**: `admin123`

## Features Available

✅ **User Authentication**
- Login/Logout
- User Registration
- Session Management

✅ **Product Management**
- Browse products by category
- Search products
- Product details
- 7 categories: Fruits, Vegetables, Dairy, Bakery, Meat, Beverages, Snacks

✅ **Shopping Cart**
- Add products to cart
- Update quantities
- Remove items
- Cart total calculation

✅ **Responsive Design**
- Mobile-friendly interface
- Modern UI with gradients
- Smooth animations

## Troubleshooting

### Backend Won't Start
- Check if port 8081 is available
- Verify MySQL is running on port 3306
- Ensure Java 17+ is installed

### Frontend Won't Start
- Check if port 5173 is available
- Run `npm install` in frontend directory
- Verify Node.js is installed

### Database Connection Issues
- MySQL must be running
- Database `groc` must exist
- Check username/password in `application.yml`

### Port Conflicts
- Backend: Change port in `backend/src/main/resources/application.yml`
- Frontend: Change port in `frontend/vite.config.js`
- Update all API calls in frontend files

## File Structure

```
grocify_fullstack/
├── backend/                 # Spring Boot application
│   ├── src/main/java/
│   │   ├── com/grocify/
│   │   │   ├── controller/  # REST controllers
│   │   │   ├── entity/      # JPA entities
│   │   │   ├── repository/  # Data repositories
│   │   │   ├── service/     # Business logic
│   │   │   └── config/      # Configuration
│   │   └── resources/
│   │       └── application.yml
│   └── pom.xml
├── frontend/                # React application
│   ├── src/
│   │   ├── pages/          # Page components
│   │   ├── components/     # Reusable components
│   │   └── styles.css      # Global styles
│   ├── package.json
│   └── vite.config.js
├── start.bat               # Windows batch startup script
├── start.ps1               # PowerShell startup script
└── README.md               # Project documentation
```

## Support

If you encounter any issues:
1. Check the console output in both backend and frontend windows
2. Verify all prerequisites are met
3. Check the troubleshooting section above
4. Ensure all files are in the correct locations

Happy coding! 🎉

