package com.grocify.repository;

import com.grocify.entity.Feedback;
import com.grocify.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    
    List<Feedback> findByProductIdAndIsPublicTrueOrderByCreatedAtDesc(Long productId);
    
    List<Feedback> findByUserOrderByCreatedAtDesc(User user);
    
    List<Feedback> findByIsPublicTrueOrderByCreatedAtDesc();
    
    List<Feedback> findByProductIdOrderByCreatedAtDesc(Long productId);
}












