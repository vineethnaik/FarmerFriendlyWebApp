package com.agrizen.auth.controller;

import com.agrizen.auth.dto.AuthResponse;
import com.agrizen.auth.dto.LoginRequest;
import com.agrizen.auth.dto.RegisterRequest;
import com.agrizen.auth.entity.User;
import com.agrizen.auth.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

	private final UserService userService;

	public AuthController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping("/register")
	public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
		try {
			User u = userService.register(request);
			return ResponseEntity.ok(AuthResponse.ok(u.getId(), u.getName(), u.getEmail(), u.getRole()));
		} catch (IllegalArgumentException ex) {
			return ResponseEntity.badRequest().body(AuthResponse.error(ex.getMessage()));
		}
	}

	@PostMapping("/login")
	public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
		try {
			User u = userService.login(request);
			return ResponseEntity.ok(AuthResponse.ok(u.getId(), u.getName(), u.getEmail(), u.getRole()));
		} catch (IllegalArgumentException ex) {
			return ResponseEntity.badRequest().body(AuthResponse.error(ex.getMessage()));
		}
	}
}


