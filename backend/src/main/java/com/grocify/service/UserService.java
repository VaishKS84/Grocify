package com.grocify.service;

import com.grocify.entity.User;
import com.grocify.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User saveUser(User user) {
        // Encode password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        return userOptional.orElse(null);
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }
    
    public User createUser(String username, String password, User.Role role) {
        User user = new User(username, password, role);
        return saveUser(user);
    }
    
    public User createAdminUser(String username, String password) {
        return createUser(username, password, User.Role.ADMIN);
    }
    
    public User createRegularUser(String username, String password) {
        return createUser(username, password, User.Role.USER);
    }
}
