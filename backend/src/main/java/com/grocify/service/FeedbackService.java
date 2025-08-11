package com.grocify.service;

import com.grocify.entity.Feedback;
import com.grocify.entity.User;
import com.grocify.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    public Feedback saveFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getProductFeedback(Long productId) {
        return feedbackRepository.findByProductIdAndIsPublicTrueOrderByCreatedAtDesc(productId);
    }

    public List<Feedback> getUserFeedback(User user) {
        return feedbackRepository.findByUserOrderByCreatedAtDesc(user);
    }

    public Optional<Feedback> getFeedbackById(Long feedbackId) {
        return feedbackRepository.findById(feedbackId);
    }

    public void deleteFeedback(Long feedbackId) {
        feedbackRepository.deleteById(feedbackId);
    }

    public List<Feedback> getAllPublicFeedback() {
        return feedbackRepository.findByIsPublicTrueOrderByCreatedAtDesc();
    }
}












