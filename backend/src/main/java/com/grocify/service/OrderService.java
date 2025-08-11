package com.grocify.service;

import com.grocify.entity.Order;
import com.grocify.entity.OrderItem;
import com.grocify.entity.Product;
import com.grocify.entity.User;
import com.grocify.repository.OrderRepository;
import com.grocify.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    public Order createOrder(User user, List<CartItemRequest> cartItems, String shippingAddress, String paymentMethod, String notes) {
        List<OrderItem> orderItems = new ArrayList<>();
        double totalAmount = 0.0;

        for (CartItemRequest cartItem : cartItems) {
            Optional<Product> productOpt = productRepository.findById(cartItem.getProductId());
            if (productOpt.isPresent()) {
                Product product = productOpt.get();
                double itemTotal = product.getPrice() * cartItem.getQuantity();
                totalAmount += itemTotal;

                OrderItem orderItem = new OrderItem();
                orderItem.setProduct(product);
                orderItem.setQuantity(cartItem.getQuantity());
                orderItem.setPrice(product.getPrice());
                orderItems.add(orderItem);
            }
        }

        Order order = new Order();
        order.setUser(user);
        order.setTotalAmount(totalAmount);
        order.setShippingAddress(shippingAddress);
        order.setPaymentMethod(paymentMethod);
        order.setNotes(notes);
        order.setStatus("PENDING");

        // Set the order reference for each order item
        for (OrderItem item : orderItems) {
            item.setOrder(order);
        }
        order.setOrderItems(orderItems);

        return orderRepository.save(order);
    }

    public List<Order> getUserOrders(User user) {
        return orderRepository.findByUserOrderByOrderDateDesc(user);
    }

    public Optional<Order> getOrderById(Long orderId) {
        return orderRepository.findById(orderId);
    }

    public Order updateOrderStatus(Long orderId, String status) {
        Optional<Order> orderOpt = orderRepository.findById(orderId);
        if (orderOpt.isPresent()) {
            Order order = orderOpt.get();
            order.setStatus(status);
            return orderRepository.save(order);
        }
        throw new RuntimeException("Order not found");
    }

    public static class CartItemRequest {
        private Long productId;
        private Integer quantity;

        public Long getProductId() {
            return productId;
        }

        public void setProductId(Long productId) {
            this.productId = productId;
        }

        public Integer getQuantity() {
            return quantity;
        }

        public void setQuantity(Integer quantity) {
            this.quantity = quantity;
        }
    }
}












