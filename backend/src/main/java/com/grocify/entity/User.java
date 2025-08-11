package com.grocify.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Size(max = 50)
    @Column(unique = true)
    private String username;
    
    @NotBlank
    @Size(max = 255)
    private String password;
    
    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;
    
    private boolean enabled = true;
    
    // Constructors
    public User() {}
    
    public User(String username, String password) {
        this.username = username;
        this.password = password;
        this.role = Role.USER;
        this.enabled = true;
    }
    
    public User(String username, String password, Role role) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.enabled = true;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public Role getRole() {
        return role;
    }
    
    public void setRole(Role role) {
        this.role = role;
    }
    
    public boolean isEnabled() {
        return enabled;
    }
    
    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
    
    public enum Role {
        USER, ADMIN
    }
}
