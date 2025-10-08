package com.agrizen.controller;

import com.agrizen.model.Payment;
import com.agrizen.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
@CrossOrigin
public class PaymentController {
    @Autowired
    private PaymentRepository paymentRepository;

    @PostMapping
    public Payment savePayment(@RequestBody Payment payment) {
        return paymentRepository.save(payment);
    }
} 