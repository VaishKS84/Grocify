package com.grocify.repository;

import com.grocify.entity.Order;
import com.grocify.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    
    List<Order> findByUserOrderByOrderDateDesc(User user);
    
    List<Order> findByStatus(String status);
    
    List<Order> findByUserAndStatus(User user, String status);
}












