CREATE DATABASE IF NOT EXISTS groc CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'Namu'@'%' IDENTIFIED BY 'gana2111';
GRANT ALL PRIVILEGES ON groc.* TO 'Namu'@'%';
FLUSH PRIVILEGES;

USE groc;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DOUBLE NOT NULL,
  image_url VARCHAR(500),
  description TEXT,
  category VARCHAR(50),
  available BOOLEAN NOT NULL DEFAULT TRUE
);

-- Insert test user with BCrypt hashed password (password: test123)
INSERT INTO users (username, password, enabled) VALUES
('testuser', '$2a$10$7Q5yLNZsZ2bdp5K.SUrh2eLxRmcLka/GfPU5i1PLqFVeS/hI2u1rO', 1);

-- Insert sample products
INSERT INTO products (name, price, image_url, description, category, available) VALUES
-- Fruits
('Bananas (1kg)', 40.0, 'https://images.unsplash.com/photo-1582515073490-3998134b8b83', 'Fresh yellow bananas, perfect for smoothies and snacks', 'Fruits', 1),
('Apples (1kg)', 120.0, 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce', 'Crisp red apples, great for eating fresh or baking', 'Fruits', 1),
('Oranges (1kg)', 80.0, 'https://images.unsplash.com/photo-1547514701-42782101795e', 'Sweet and juicy oranges, rich in vitamin C', 'Fruits', 1),
('Grapes (500g)', 150.0, 'https://images.unsplash.com/photo-1515589666096-d54d2c8f7c6b', 'Fresh green grapes, perfect for snacking', 'Fruits', 1),
('Strawberries (250g)', 200.0, 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6', 'Sweet and fresh strawberries', 'Fruits', 1),

-- Vegetables
('Tomatoes (1kg)', 60.0, 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337', 'Fresh red tomatoes, perfect for cooking', 'Vegetables', 1),
('Onions (1kg)', 40.0, 'https://images.unsplash.com/photo-1518977676601-b53f82aba655', 'Fresh onions for cooking', 'Vegetables', 1),
('Potatoes (2kg)', 80.0, 'https://images.unsplash.com/photo-1518977676601-b53f82aba655', 'Fresh potatoes, great for various dishes', 'Vegetables', 1),
('Carrots (1kg)', 50.0, 'https://images.unsplash.com/photo-1447175008436-1701707c0e73', 'Fresh orange carrots, rich in vitamins', 'Vegetables', 1),
('Spinach (250g)', 30.0, 'https://images.unsplash.com/photo-1576045057995-568f588f82fb', 'Fresh green spinach leaves', 'Vegetables', 1),

-- Dairy
('Milk (1L)', 80.0, 'https://images.unsplash.com/photo-1550583724-b2692b85b150', 'Fresh whole milk, perfect for drinking and cooking', 'Dairy', 1),
('Cheese (200g)', 120.0, 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d', 'Fresh cheddar cheese', 'Dairy', 1),
('Yogurt (500g)', 60.0, 'https://images.unsplash.com/photo-1488477181946-6428a0291777', 'Natural yogurt, great for breakfast', 'Dairy', 1),
('Butter (250g)', 100.0, 'https://images.unsplash.com/photo-1548907040-4baa9d7a6b2b', 'Fresh butter for cooking and baking', 'Dairy', 1),
('Eggs (12 pieces)', 80.0, 'https://images.unsplash.com/photo-1506976785307-8732e854ad6f', 'Fresh farm eggs', 'Dairy', 1),

-- Bakery
('Bread (500g)', 60.0, 'https://images.unsplash.com/photo-1509440159596-0249088772ff', 'Fresh baked bread, soft and delicious', 'Bakery', 1),
('Croissants (6 pieces)', 120.0, 'https://images.unsplash.com/photo-1555507036-ab1f40388010', 'Fresh baked croissants', 'Bakery', 1),
('Cake (500g)', 200.0, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587', 'Delicious chocolate cake', 'Bakery', 1),
('Cookies (250g)', 80.0, 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35', 'Fresh baked cookies', 'Bakery', 1),

-- Meat
('Chicken Breast (500g)', 250.0, 'https://images.unsplash.com/photo-1604503468506-a8da13d82791', 'Fresh chicken breast, perfect for grilling or cooking', 'Meat', 1),
('Beef Mince (500g)', 300.0, 'https://images.unsplash.com/photo-1544025162-d76694265947', 'Fresh beef mince for cooking', 'Meat', 1),
('Fish Fillet (400g)', 280.0, 'https://images.unsplash.com/photo-1519708227418-9e5f171a9c79', 'Fresh fish fillet', 'Meat', 1),

-- Beverages
('Coffee (250g)', 150.0, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', 'Premium coffee beans', 'Beverages', 1),
('Tea (100 bags)', 80.0, 'https://images.unsplash.com/photo-1544787219-7f47ccb76574', 'Assorted tea bags', 'Beverages', 1),
('Orange Juice (1L)', 120.0, 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b', 'Fresh orange juice', 'Beverages', 1),
('Water (2L)', 40.0, 'https://images.unsplash.com/photo-1559827260-dc66d52bef19', 'Pure drinking water', 'Beverages', 1),

-- Snacks
('Chips (150g)', 50.0, 'https://images.unsplash.com/photo-1566478989037-eec170784d0b', 'Crispy potato chips', 'Snacks', 1),
('Nuts (200g)', 180.0, 'https://images.unsplash.com/photo-1599599810769-bcde5a56d0c8', 'Mixed nuts and dry fruits', 'Snacks', 1),
('Chocolate (100g)', 120.0, 'https://images.unsplash.com/photo-1548907040-4baa9d7a6b2b', 'Dark chocolate bar', 'Snacks', 1);
