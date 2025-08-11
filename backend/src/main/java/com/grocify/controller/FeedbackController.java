package com.grocify.controller;

import com.grocify.entity.Feedback;
import com.grocify.entity.Product;
import com.grocify.entity.User;
import com.grocify.service.FeedbackService;
import com.grocify.service.ProductService;
import com.grocify.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "*")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @PostMapping("/submit")
    public ResponseEntity<?> submitFeedback(@RequestBody FeedbackRequest feedbackRequest) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            User user = userService.findByUsername(username);

            Product product = null;
            if (feedbackRequest.getProductId() != null) {
                product = productService.getProductById(feedbackRequest.getProductId()).orElse(null);
            }

            Feedback feedback = new Feedback(user, product, feedbackRequest.getRating(), feedbackRequest.getComment());
            feedback.setFeedbackType(feedbackRequest.getFeedbackType());
            feedback.setPublic(feedbackRequest.isPublic());

            Feedback savedFeedback = feedbackService.saveFeedback(feedback);
            return ResponseEntity.ok(savedFeedback);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to submit feedback: " + e.getMessage());
        }
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Feedback>> getProductFeedback(@PathVariable Long productId) {
        try {
            List<Feedback> feedbacks = feedbackService.getProductFeedback(productId);
            return ResponseEntity.ok(feedbacks);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/my-feedback")
    public ResponseEntity<List<Feedback>> getMyFeedback() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            User user = userService.findByUsername(username);

            List<Feedback> feedbacks = feedbackService.getUserFeedback(user);
            return ResponseEntity.ok(feedbacks);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/{feedbackId}")
    public ResponseEntity<?> deleteFeedback(@PathVariable Long feedbackId) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            User user = userService.findByUsername(username);

            Feedback feedback = feedbackService.getFeedbackById(feedbackId).orElse(null);
            if (feedback != null && feedback.getUser().getId().equals(user.getId())) {
                feedbackService.deleteFeedback(feedbackId);
                return ResponseEntity.ok("Feedback deleted successfully");
            } else {
                return ResponseEntity.badRequest().body("Unauthorized to delete this feedback");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to delete feedback: " + e.getMessage());
        }
    }

    public static class FeedbackRequest {
        private Long productId;
        private Integer rating;
        private String comment;
        private String feedbackType = "REVIEW";
        private boolean isPublic = true;

        // Getters and Setters
        public Long getProductId() {
            return productId;
        }

        public void setProductId(Long productId) {
            this.productId = productId;
        }

        public Integer getRating() {
            return rating;
        }

        public void setRating(Integer rating) {
            this.rating = rating;
        }

        public String getComment() {
            return comment;
        }

        public void setComment(String comment) {
            this.comment = comment;
        }

        public String getFeedbackType() {
            return feedbackType;
        }

        public void setFeedbackType(String feedbackType) {
            this.feedbackType = feedbackType;
        }

        public boolean isPublic() {
            return isPublic;
        }

        public void setPublic(boolean isPublic) {
            this.isPublic = isPublic;
        }
    }
}












