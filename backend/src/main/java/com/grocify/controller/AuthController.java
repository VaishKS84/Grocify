package com.grocify.controller;

import com.grocify.dto.AuthRequest;
import com.grocify.dto.AuthResponse;
import com.grocify.dto.SignupRequest;
import com.grocify.entity.User;
import com.grocify.service.UserService;
import com.grocify.util.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest authRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User user = userService.findByUsername(userDetails.getUsername());
            
            String token = jwtUtil.generateToken(userDetails, user.getRole().name());
            
            return ResponseEntity.ok(new AuthResponse(token, user.getUsername(), user.getRole().name()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new AuthResponse("Invalid username or password"));
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@Valid @RequestBody SignupRequest signupRequest) {
        try {
            if (userService.existsByUsername(signupRequest.getUsername())) {
                return ResponseEntity.badRequest().body(new AuthResponse("Username already exists"));
            }

            User.Role role = "ADMIN".equalsIgnoreCase(signupRequest.getRole()) ? 
                User.Role.ADMIN : User.Role.USER;
            
            User user = userService.createUser(signupRequest.getUsername(), signupRequest.getPassword(), role);
            
            // Generate token for the newly created user
            String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());
            
            return ResponseEntity.ok(new AuthResponse(token, user.getUsername(), user.getRole().name()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new AuthResponse("Registration failed: " + e.getMessage()));
        }
    }

    @PostMapping("/signup/admin")
    public ResponseEntity<AuthResponse> signupAdmin(@Valid @RequestBody SignupRequest signupRequest) {
        try {
            if (userService.existsByUsername(signupRequest.getUsername())) {
                return ResponseEntity.badRequest().body(new AuthResponse("Username already exists"));
            }

            User user = userService.createAdminUser(signupRequest.getUsername(), signupRequest.getPassword());
            
            return ResponseEntity.ok(new AuthResponse("Admin user registered successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new AuthResponse("Admin registration failed: " + e.getMessage()));
        }
    }
}
