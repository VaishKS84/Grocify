package com.grocify.config;

import com.grocify.entity.Product;
import com.grocify.entity.User;
import com.grocify.repository.ProductRepository;
import com.grocify.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Initialize users if none exist
        if (userRepository.count() == 0) {
            initializeUsers();
        }
        
        // Only initialize if no products exist
        if (productRepository.count() == 0) {
            initializeProducts();
        }
    }

    private void initializeUsers() {
        // Create admin user
        User adminUser = new User();
        adminUser.setUsername("admin");
        adminUser.setPassword(passwordEncoder.encode("admin123"));
        adminUser.setRole(User.Role.ADMIN);
        adminUser.setEnabled(true);
        userRepository.save(adminUser);
        
        // Create regular user
        User regularUser = new User();
        regularUser.setUsername("user");
        regularUser.setPassword(passwordEncoder.encode("user123"));
        regularUser.setRole(User.Role.USER);
        regularUser.setEnabled(true);
        userRepository.save(regularUser);
        
        System.out.println("Default users created:");
        System.out.println("Admin: username=admin, password=admin123");
        System.out.println("User: username=user, password=user123");
    }

    private void initializeProducts() {
        // Fruits
        Product product1 = new Product();
        product1.setName("Organic Bananas (1kg)");
        product1.setPrice(45.0);
        product1.setImageUrl("https://images.unsplash.com/photo-1582515073490-3998134b8b83?w=400&h=300&fit=crop");
        product1.setDescription("Fresh organic yellow bananas, perfect for smoothies and snacks");
        product1.setCategory("Fruits");
        product1.setAvailable(true);
        productRepository.save(product1);

        Product product2 = new Product();
        product2.setName("Red Apples (1kg)");
        product2.setPrice(130.0);
        product2.setImageUrl("https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&h=300&fit=crop");
        product2.setDescription("Crisp red apples, great for eating fresh or baking");
        product2.setCategory("Fruits");
        product2.setAvailable(true);
        productRepository.save(product2);

        Product product3 = new Product();
        product3.setName("Sweet Oranges (1kg)");
        product3.setPrice(85.0);
        product3.setImageUrl("https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=300&fit=crop");
        product3.setDescription("Sweet and juicy oranges, rich in vitamin C");
        product3.setCategory("Fruits");
        product3.setAvailable(true);
        productRepository.save(product3);

        Product product4 = new Product();
        product4.setName("Fresh Grapes (500g)");
        product4.setPrice(160.0);
        product4.setImageUrl("https://images.unsplash.com/photo-1515589666096-d54d2c8f7c6b?w=400&h=300&fit=crop");
        product4.setDescription("Fresh green grapes, perfect for snacking");
        product4.setCategory("Fruits");
        product4.setAvailable(true);
        productRepository.save(product4);

        Product product5 = new Product();
        product5.setName("Strawberries (250g)");
        product5.setPrice(220.0);
        product5.setImageUrl("https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=300&fit=crop");
        product5.setDescription("Sweet and fresh strawberries");
        product5.setCategory("Fruits");
        product5.setAvailable(true);
        productRepository.save(product5);

        Product product6 = new Product();
        product6.setName("Mangoes (1kg)");
        product6.setPrice(180.0);
        product6.setImageUrl("https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=300&fit=crop");
        product6.setDescription("Sweet and juicy mangoes, perfect for summer");
        product6.setCategory("Fruits");
        product6.setAvailable(true);
        productRepository.save(product6);

        Product product7 = new Product();
        product7.setName("Pineapple (1kg)");
        product7.setPrice(120.0);
        product7.setImageUrl("https://images.unsplash.com/photo-1550258987-190a2d3a8ba7?w=400&h=300&fit=crop");
        product7.setDescription("Fresh tropical pineapple");
        product7.setCategory("Fruits");
        product7.setAvailable(true);
        productRepository.save(product7);

        Product product8 = new Product();
        product8.setName("Kiwi (6 pieces)");
        product8.setPrice(140.0);
        product8.setImageUrl("https://images.unsplash.com/photo-1550258987-190a2d3a8ba7?w=400&h=300&fit=crop");
        product8.setDescription("Fresh kiwi fruits, rich in vitamin C");
        product8.setCategory("Fruits");
        product8.setAvailable(true);
        productRepository.save(product8);

        Product product9 = new Product();
        product9.setName("Pomegranate (500g)");
        product9.setPrice(180.0);
        product9.setImageUrl("https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=300&fit=crop");
        product9.setDescription("Fresh pomegranate, antioxidant rich");
        product9.setCategory("Fruits");
        product9.setAvailable(true);
        productRepository.save(product9);

        Product product10 = new Product();
        product10.setName("Avocado (3 pieces)");
        product10.setPrice(200.0);
        product10.setImageUrl("https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop");
        product10.setDescription("Ripe avocados, perfect for guacamole");
        product10.setCategory("Fruits");
        product10.setAvailable(true);
        productRepository.save(product10);

        // Vegetables
        Product product11 = new Product();
        product11.setName("Fresh Tomatoes (1kg)");
        product11.setPrice(65.0);
        product11.setImageUrl("https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=300&fit=crop");
        product11.setDescription("Fresh red tomatoes, perfect for cooking");
        product11.setCategory("Vegetables");
        product11.setAvailable(true);
        productRepository.save(product11);

        Product product12 = new Product();
        product12.setName("Onions (1kg)");
        product12.setPrice(45.0);
        product12.setImageUrl("https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop");
        product12.setDescription("Fresh onions for cooking");
        product12.setCategory("Vegetables");
        product12.setAvailable(true);
        productRepository.save(product12);

        Product product13 = new Product();
        product13.setName("Potatoes (2kg)");
        product13.setPrice(85.0);
        product13.setImageUrl("https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop");
        product13.setDescription("Fresh potatoes, great for various dishes");
        product13.setCategory("Vegetables");
        product13.setAvailable(true);
        productRepository.save(product13);

        Product product14 = new Product();
        product14.setName("Carrots (1kg)");
        product14.setPrice(55.0);
        product14.setImageUrl("https://images.unsplash.com/photo-1447175008436-1701707c0e73?w=400&h=300&fit=crop");
        product14.setDescription("Fresh orange carrots, rich in vitamins");
        product14.setCategory("Vegetables");
        product14.setAvailable(true);
        productRepository.save(product14);

        Product product15 = new Product();
        product15.setName("Spinach (250g)");
        product15.setPrice(35.0);
        product15.setImageUrl("https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop");
        product15.setDescription("Fresh green spinach leaves");
        product15.setCategory("Vegetables");
        product15.setAvailable(true);
        productRepository.save(product15);

        Product product16 = new Product();
        product16.setName("Broccoli (500g)");
        product16.setPrice(75.0);
        product16.setImageUrl("https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=300&fit=crop");
        product16.setDescription("Fresh green broccoli, rich in nutrients");
        product16.setCategory("Vegetables");
        product16.setAvailable(true);
        productRepository.save(product16);

        Product product17 = new Product();
        product17.setName("Bell Peppers (500g)");
        product17.setPrice(90.0);
        product17.setImageUrl("https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=400&h=300&fit=crop");
        product17.setDescription("Colorful bell peppers, perfect for salads");
        product17.setCategory("Vegetables");
        product17.setAvailable(true);
        productRepository.save(product17);

        Product product18 = new Product();
        product18.setName("Cucumber (500g)");
        product18.setPrice(40.0);
        product18.setImageUrl("https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400&h=300&fit=crop");
        product18.setDescription("Fresh cucumbers, perfect for salads");
        product18.setCategory("Vegetables");
        product18.setAvailable(true);
        productRepository.save(product18);

        Product product19 = new Product();
        product19.setName("Cauliflower (1kg)");
        product19.setPrice(60.0);
        product19.setImageUrl("https://images.unsplash.com/photo-1568584711075-3d021a7c3ca8?w=400&h=300&fit=crop");
        product19.setDescription("Fresh white cauliflower");
        product19.setCategory("Vegetables");
        product19.setAvailable(true);
        productRepository.save(product19);

        Product product20 = new Product();
        product20.setName("Sweet Corn (500g)");
        product20.setPrice(50.0);
        product20.setImageUrl("https://images.unsplash.com/photo-1601593768797-76ac2c0e0b0a?w=400&h=300&fit=crop");
        product20.setDescription("Fresh sweet corn on the cob");
        product20.setCategory("Vegetables");
        product20.setAvailable(true);
        productRepository.save(product20);

        // Dairy & Eggs
        Product product21 = new Product();
        product21.setName("Fresh Milk (1L)");
        product21.setPrice(85.0);
        product21.setImageUrl("https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop");
        product21.setDescription("Fresh whole milk, perfect for drinking and cooking");
        product21.setCategory("Dairy & Eggs");
        product21.setAvailable(true);
        productRepository.save(product21);

        Product product22 = new Product();
        product22.setName("Cheddar Cheese (200g)");
        product22.setPrice(125.0);
        product22.setImageUrl("https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=300&fit=crop");
        product22.setDescription("Fresh cheddar cheese");
        product22.setCategory("Dairy & Eggs");
        product22.setAvailable(true);
        productRepository.save(product22);

        Product product23 = new Product();
        product23.setName("Natural Yogurt (500g)");
        product23.setPrice(65.0);
        product23.setImageUrl("https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop");
        product23.setDescription("Natural yogurt, great for breakfast");
        product23.setCategory("Dairy & Eggs");
        product23.setAvailable(true);
        productRepository.save(product23);

        Product product24 = new Product();
        product24.setName("Butter (250g)");
        product24.setPrice(105.0);
        product24.setImageUrl("https://images.unsplash.com/photo-1548907040-4baa9d7a6b2b?w=400&h=300&fit=crop");
        product24.setDescription("Fresh butter for cooking and baking");
        product24.setCategory("Dairy & Eggs");
        product24.setAvailable(true);
        productRepository.save(product24);

        Product product25 = new Product();
        product25.setName("Fresh Eggs (12 pieces)");
        product25.setPrice(85.0);
        product25.setImageUrl("https://images.unsplash.com/photo-1506976785307-8732e854ad6f?w=400&h=300&fit=crop");
        product25.setDescription("Fresh farm eggs");
        product25.setCategory("Dairy & Eggs");
        product25.setAvailable(true);
        productRepository.save(product25);

        Product product26 = new Product();
        product26.setName("Cream (200ml)");
        product26.setPrice(95.0);
        product26.setImageUrl("https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop");
        product26.setDescription("Fresh cream for cooking and desserts");
        product26.setCategory("Dairy & Eggs");
        product26.setAvailable(true);
        productRepository.save(product26);

        Product product27 = new Product();
        product27.setName("Mozzarella Cheese (200g)");
        product27.setPrice(140.0);
        product27.setImageUrl("https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=300&fit=crop");
        product27.setDescription("Fresh mozzarella cheese");
        product27.setCategory("Dairy & Eggs");
        product27.setAvailable(true);
        productRepository.save(product27);

        Product product28 = new Product();
        product28.setName("Greek Yogurt (400g)");
        product28.setPrice(95.0);
        product28.setImageUrl("https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop");
        product28.setDescription("Thick Greek yogurt, high in protein");
        product28.setCategory("Dairy & Eggs");
        product28.setAvailable(true);
        productRepository.save(product28);

        // Bakery
        Product product29 = new Product();
        product29.setName("Whole Wheat Bread (500g)");
        product29.setPrice(65.0);
        product29.setImageUrl("https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop");
        product29.setDescription("Fresh baked whole wheat bread, soft and delicious");
        product29.setCategory("Bakery");
        product29.setAvailable(true);
        productRepository.save(product29);

        Product product30 = new Product();
        product30.setName("Croissants (6 pieces)");
        product30.setPrice(125.0);
        product30.setImageUrl("https://images.unsplash.com/photo-1555507036-ab1f40388010?w=400&h=300&fit=crop");
        product30.setDescription("Fresh baked croissants");
        product30.setCategory("Bakery");
        product30.setAvailable(true);
        productRepository.save(product30);

        Product product31 = new Product();
        product31.setName("Chocolate Cake (500g)");
        product31.setPrice(220.0);
        product31.setImageUrl("https://images.unsplash.com/photo-1578985545062-69928b85b150?w=400&h=300&fit=crop");
        product31.setDescription("Delicious chocolate cake");
        product31.setCategory("Bakery");
        product31.setAvailable(true);
        productRepository.save(product31);

        Product product32 = new Product();
        product32.setName("Chocolate Cookies (250g)");
        product32.setPrice(85.0);
        product32.setImageUrl("https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop");
        product32.setDescription("Fresh baked chocolate cookies");
        product32.setCategory("Bakery");
        product32.setAvailable(true);
        productRepository.save(product32);

        Product product33 = new Product();
        product33.setName("Donuts (6 pieces)");
        product33.setPrice(150.0);
        product33.setImageUrl("https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=300&fit=crop");
        product33.setDescription("Fresh glazed donuts");
        product33.setCategory("Bakery");
        product33.setAvailable(true);
        productRepository.save(product33);

        Product product34 = new Product();
        product34.setName("Baguette (250g)");
        product34.setPrice(45.0);
        product34.setImageUrl("https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop");
        product34.setDescription("Fresh French baguette");
        product34.setCategory("Bakery");
        product34.setAvailable(true);
        productRepository.save(product34);

        Product product35 = new Product();
        product35.setName("Muffins (4 pieces)");
        product35.setPrice(120.0);
        product35.setImageUrl("https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=300&fit=crop");
        product35.setDescription("Fresh baked muffins");
        product35.setCategory("Bakery");
        product35.setAvailable(true);
        productRepository.save(product35);

        // Meat & Seafood
        Product product36 = new Product();
        product36.setName("Chicken Breast (500g)");
        product36.setPrice(260.0);
        product36.setImageUrl("https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop");
        product36.setDescription("Fresh chicken breast, perfect for grilling or cooking");
        product36.setCategory("Meat & Seafood");
        product36.setAvailable(true);
        productRepository.save(product36);

        Product product37 = new Product();
        product37.setName("Beef Mince (500g)");
        product37.setPrice(310.0);
        product37.setImageUrl("https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop");
        product37.setDescription("Fresh beef mince for cooking");
        product37.setCategory("Meat & Seafood");
        product37.setAvailable(true);
        productRepository.save(product37);

        Product product38 = new Product();
        product38.setName("Salmon Fillet (400g)");
        product38.setPrice(580.0);
        product38.setImageUrl("https://images.unsplash.com/photo-1519708227418-9e5f171a79?w=400&h=300&fit=crop");
        product38.setDescription("Fresh salmon fillet, rich in omega-3");
        product38.setCategory("Meat & Seafood");
        product38.setAvailable(true);
        productRepository.save(product38);

        Product product39 = new Product();
        product39.setName("Pork Chops (500g)");
        product39.setPrice(280.0);
        product39.setImageUrl("https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop");
        product39.setDescription("Fresh pork chops");
        product39.setCategory("Meat & Seafood");
        product39.setAvailable(true);
        productRepository.save(product39);

        Product product40 = new Product();
        product40.setName("Lamb Chops (500g)");
        product40.setPrice(450.0);
        product40.setImageUrl("https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop");
        product40.setDescription("Fresh lamb chops");
        product40.setCategory("Meat & Seafood");
        product40.setAvailable(true);
        productRepository.save(product40);

        Product product41 = new Product();
        product41.setName("Shrimp (300g)");
        product41.setPrice(380.0);
        product41.setImageUrl("https://images.unsplash.com/photo-1519708227418-9e5f171a79?w=400&h=300&fit=crop");
        product41.setDescription("Fresh shrimp, perfect for cooking");
        product41.setCategory("Meat & Seafood");
        product41.setAvailable(true);
        productRepository.save(product41);

        Product product42 = new Product();
        product42.setName("Tuna Steak (300g)");
        product42.setPrice(420.0);
        product42.setImageUrl("https://images.unsplash.com/photo-1519708227418-9e5f171a79?w=400&h=300&fit=crop");
        product42.setDescription("Fresh tuna steak");
        product42.setCategory("Meat & Seafood");
        product42.setAvailable(true);
        productRepository.save(product42);

        // Beverages
        Product product43 = new Product();
        product43.setName("Premium Coffee Beans (250g)");
        product43.setPrice(180.0);
        product43.setImageUrl("https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop");
        product43.setDescription("Premium coffee beans");
        product43.setCategory("Beverages");
        product43.setAvailable(true);
        productRepository.save(product43);

        Product product44 = new Product();
        product44.setName("Green Tea (100 bags)");
        product44.setPrice(95.0);
        product44.setImageUrl("https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop");
        product44.setDescription("Assorted green tea bags");
        product44.setCategory("Beverages");
        product44.setAvailable(true);
        productRepository.save(product44);

        Product product45 = new Product();
        product45.setName("Fresh Orange Juice (1L)");
        product45.setPrice(130.0);
        product45.setImageUrl("https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop");
        product45.setDescription("Fresh orange juice");
        product45.setCategory("Beverages");
        product45.setAvailable(true);
        productRepository.save(product45);

        Product product46 = new Product();
        product46.setName("Mineral Water (2L)");
        product46.setPrice(45.0);
        product46.setImageUrl("https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop");
        product46.setDescription("Pure mineral water");
        product46.setCategory("Beverages");
        product46.setAvailable(true);
        productRepository.save(product46);

        Product product47 = new Product();
        product47.setName("Coconut Water (500ml)");
        product47.setPrice(75.0);
        product47.setImageUrl("https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop");
        product47.setDescription("Fresh coconut water");
        product47.setCategory("Beverages");
        product47.setAvailable(true);
        productRepository.save(product47);

        Product product48 = new Product();
        product48.setName("Apple Juice (1L)");
        product48.setPrice(110.0);
        product48.setImageUrl("https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop");
        product48.setDescription("Fresh apple juice");
        product48.setCategory("Beverages");
        product48.setAvailable(true);
        productRepository.save(product48);

        Product product49 = new Product();
        product49.setName("Herbal Tea (50 bags)");
        product49.setPrice(85.0);
        product49.setImageUrl("https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop");
        product49.setDescription("Assorted herbal tea bags");
        product49.setCategory("Beverages");
        product49.setAvailable(true);
        productRepository.save(product49);

        // Snacks & Nuts
        Product product50 = new Product();
        product50.setName("Potato Chips (150g)");
        product50.setPrice(55.0);
        product50.setImageUrl("https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=300&fit=crop");
        product50.setDescription("Crispy potato chips");
        product50.setCategory("Snacks & Nuts");
        product50.setAvailable(true);
        productRepository.save(product50);

        Product product51 = new Product();
        product51.setName("Mixed Nuts (200g)");
        product51.setPrice(190.0);
        product51.setImageUrl("https://images.unsplash.com/photo-1599599810769-bcde5a56d0c8?w=400&h=300&fit=crop");
        product51.setDescription("Mixed nuts and dry fruits");
        product51.setCategory("Snacks & Nuts");
        product51.setAvailable(true);
        productRepository.save(product51);

        Product product52 = new Product();
        product52.setName("Dark Chocolate (100g)");
        product52.setPrice(125.0);
        product52.setImageUrl("https://images.unsplash.com/photo-1548907040-4baa9d7a6b2b?w=400&h=300&fit=crop");
        product52.setDescription("Dark chocolate bar");
        product52.setCategory("Snacks & Nuts");
        product52.setAvailable(true);
        productRepository.save(product52);

        Product product53 = new Product();
        product53.setName("Popcorn (200g)");
        product53.setPrice(65.0);
        product53.setImageUrl("https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=300&fit=crop");
        product53.setDescription("Fresh popcorn kernels");
        product53.setCategory("Snacks & Nuts");
        product53.setAvailable(true);
        productRepository.save(product53);

        Product product54 = new Product();
        product54.setName("Cashews (200g)");
        product54.setPrice(220.0);
        product54.setImageUrl("https://images.unsplash.com/photo-1599599810769-bcde5a56d0c8?w=400&h=300&fit=crop");
        product54.setDescription("Premium cashew nuts");
        product54.setCategory("Snacks & Nuts");
        product54.setAvailable(true);
        productRepository.save(product54);

        Product product55 = new Product();
        product55.setName("Almonds (200g)");
        product55.setPrice(250.0);
        product55.setImageUrl("https://images.unsplash.com/photo-1599599810769-bcde5a56d0c8?w=400&h=300&fit=crop");
        product55.setDescription("Premium almonds");
        product55.setCategory("Snacks & Nuts");
        product55.setAvailable(true);
        productRepository.save(product55);

        Product product56 = new Product();
        product56.setName("Raisins (250g)");
        product56.setPrice(95.0);
        product56.setImageUrl("https://images.unsplash.com/photo-1599599810769-bcde5a56d0c8?w=400&h=300&fit=crop");
        product56.setDescription("Sweet dried raisins");
        product56.setCategory("Snacks & Nuts");
        product56.setAvailable(true);
        productRepository.save(product56);

        // Pantry & Staples
        Product product57 = new Product();
        product57.setName("Basmati Rice (2kg)");
        product57.setPrice(180.0);
        product57.setImageUrl("https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop");
        product57.setDescription("Premium basmati rice");
        product57.setCategory("Pantry & Staples");
        product57.setAvailable(true);
        productRepository.save(product57);

        Product product58 = new Product();
        product58.setName("Whole Wheat Flour (1kg)");
        product58.setPrice(45.0);
        product58.setImageUrl("https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop");
        product58.setDescription("Whole wheat flour for baking");
        product58.setCategory("Pantry & Staples");
        product58.setAvailable(true);
        productRepository.save(product58);

        Product product59 = new Product();
        product59.setName("Olive Oil (500ml)");
        product59.setPrice(220.0);
        product59.setImageUrl("https://images.unsplash.com/photo-1548907040-4baa9d7a6b2b?w=400&h=300&fit=crop");
        product59.setDescription("Extra virgin olive oil");
        product59.setCategory("Pantry & Staples");
        product59.setAvailable(true);
        productRepository.save(product59);

        Product product60 = new Product();
        product60.setName("Honey (500g)");
        product60.setPrice(180.0);
        product60.setImageUrl("https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop");
        product60.setDescription("Pure natural honey");
        product60.setCategory("Pantry & Staples");
        product60.setAvailable(true);
        productRepository.save(product60);

        Product product61 = new Product();
        product61.setName("Pasta (500g)");
        product61.setPrice(75.0);
        product61.setImageUrl("https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop");
        product61.setDescription("Premium pasta");
        product61.setCategory("Pantry & Staples");
        product61.setAvailable(true);
        productRepository.save(product61);

        Product product62 = new Product();
        product62.setName("Black Pepper (100g)");
        product62.setPrice(85.0);
        product62.setImageUrl("https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop");
        product62.setDescription("Fresh ground black pepper");
        product62.setCategory("Pantry & Staples");
        product62.setAvailable(true);
        productRepository.save(product62);

        Product product63 = new Product();
        product63.setName("Sugar (1kg)");
        product63.setPrice(55.0);
        product63.setImageUrl("https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop");
        product63.setDescription("Refined white sugar");
        product63.setCategory("Pantry & Staples");
        product63.setAvailable(true);
        productRepository.save(product63);

        Product product64 = new Product();
        product64.setName("Salt (500g)");
        product64.setPrice(25.0);
        product64.setImageUrl("https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop");
        product64.setDescription("Iodized table salt");
        product64.setCategory("Pantry & Staples");
        product64.setAvailable(true);
        productRepository.save(product64);

        // Frozen Foods
        Product product65 = new Product();
        product65.setName("Mixed Vegetables (500g)");
        product65.setPrice(95.0);
        product65.setImageUrl("https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=300&fit=crop");
        product65.setDescription("Frozen mixed vegetables");
        product65.setCategory("Frozen Foods");
        product65.setAvailable(true);
        productRepository.save(product65);

        Product product66 = new Product();
        product66.setName("Ice Cream (500ml)");
        product66.setPrice(150.0);
        product66.setImageUrl("https://images.unsplash.com/photo-1548907040-4baa9d7a6b2b?w=400&h=300&fit=crop");
        product66.setDescription("Vanilla ice cream");
        product66.setCategory("Frozen Foods");
        product66.setAvailable(true);
        productRepository.save(product66);

        Product product67 = new Product();
        product67.setName("Frozen Pizza (400g)");
        product67.setPrice(280.0);
        product67.setImageUrl("https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop");
        product67.setDescription("Frozen margherita pizza");
        product67.setCategory("Frozen Foods");
        product67.setAvailable(true);
        productRepository.save(product67);

        Product product68 = new Product();
        product68.setName("Frozen Fish Fillets (500g)");
        product68.setPrice(320.0);
        product68.setImageUrl("https://images.unsplash.com/photo-1519708227418-9e5f171a79?w=400&h=300&fit=crop");
        product68.setDescription("Frozen fish fillets");
        product68.setCategory("Frozen Foods");
        product68.setAvailable(true);
        productRepository.save(product68);

        Product product69 = new Product();
        product69.setName("Frozen French Fries (500g)");
        product69.setPrice(120.0);
        product69.setImageUrl("https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop");
        product69.setDescription("Frozen French fries");
        product69.setCategory("Frozen Foods");
        product69.setAvailable(true);
        productRepository.save(product69);

        // Personal Care
        Product product70 = new Product();
        product70.setName("Toothpaste (100g)");
        product70.setPrice(85.0);
        product70.setImageUrl("https://images.unsplash.com/photo-1559591935-c8c395bb7c71?w=400&h=300&fit=crop");
        product70.setDescription("Fresh mint toothpaste");
        product70.setCategory("Personal Care");
        product70.setAvailable(true);
        productRepository.save(product70);

        Product product71 = new Product();
        product71.setName("Shampoo (400ml)");
        product71.setPrice(180.0);
        product71.setImageUrl("https://images.unsplash.com/photo-1559591935-c8c395bb7c71?w=400&h=300&fit=crop");
        product71.setDescription("Nourishing shampoo");
        product71.setCategory("Personal Care");
        product71.setAvailable(true);
        productRepository.save(product71);

        Product product72 = new Product();
        product72.setName("Soap Bar (100g)");
        product72.setPrice(45.0);
        product72.setImageUrl("https://images.unsplash.com/photo-1559591935-c8c395bb7c71?w=400&h=300&fit=crop");
        product72.setDescription("Natural soap bar");
        product72.setCategory("Personal Care");
        product72.setAvailable(true);
        productRepository.save(product72);

        Product product73 = new Product();
        product73.setName("Deodorant (150ml)");
        product73.setPrice(120.0);
        product73.setImageUrl("https://images.unsplash.com/photo-1559591935-c8c395bb7c71?w=400&h=300&fit=crop");
        product73.setDescription("Long-lasting deodorant");
        product73.setCategory("Personal Care");
        product73.setAvailable(true);
        productRepository.save(product73);

        // Household
        Product product74 = new Product();
        product74.setName("Dish Soap (500ml)");
        product74.setPrice(95.0);
        product74.setImageUrl("https://images.unsplash.com/photo-1559591935-c8c395bb7c71?w=400&h=300&fit=crop");
        product74.setDescription("Effective dish soap");
        product74.setCategory("Household");
        product74.setAvailable(true);
        productRepository.save(product74);

        Product product75 = new Product();
        product75.setName("Laundry Detergent (2L)");
        product75.setPrice(280.0);
        product75.setImageUrl("https://images.unsplash.com/photo-1559591935-c8c395bb7c71?w=400&h=300&fit=crop");
        product75.setDescription("Gentle laundry detergent");
        product75.setCategory("Household");
        product75.setAvailable(true);
        productRepository.save(product75);

        Product product76 = new Product();
        product76.setName("Paper Towels (6 rolls)");
        product76.setPrice(120.0);
        product76.setImageUrl("https://images.unsplash.com/photo-1559591935-c8c395bb7c71?w=400&h=300&fit=crop");
        product76.setDescription("Absorbent paper towels");
        product76.setCategory("Household");
        product76.setAvailable(true);
        productRepository.save(product76);

        Product product77 = new Product();
        product77.setName("Toilet Paper (12 rolls)");
        product77.setPrice(180.0);
        product77.setImageUrl("https://images.unsplash.com/photo-1559591935-c8c395bb7c71?w=400&h=300&fit=crop");
        product77.setDescription("Soft toilet paper");
        product77.setCategory("Household");
        product77.setAvailable(true);
        productRepository.save(product77);

        System.out.println("Enhanced product catalog initialized successfully with 77 products across 10 categories!");
    }
}
