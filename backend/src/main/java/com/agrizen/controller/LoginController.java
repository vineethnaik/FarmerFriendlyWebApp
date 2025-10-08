package com.agrizen.controller;

import com.agrizen.model.Login;
import com.agrizen.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
@CrossOrigin
public class LoginController {
    @Autowired
    private LoginRepository loginRepository;

    @PostMapping
    public Login saveLogin(@RequestBody Login login) {
        return loginRepository.save(login);
    }
} 