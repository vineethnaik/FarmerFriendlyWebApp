package com.agrizen.controller;

import com.agrizen.model.Register;
import com.agrizen.repository.RegisterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/register")
@CrossOrigin
public class RegisterController {
    @Autowired
    private RegisterRepository registerRepository;

    @PostMapping
    public Register saveRegister(@RequestBody Register register) {
        return registerRepository.save(register);
    }
} 