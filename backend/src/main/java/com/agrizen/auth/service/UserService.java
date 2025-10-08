package com.agrizen.auth.service;

import com.agrizen.auth.dto.LoginRequest;
import com.agrizen.auth.dto.RegisterRequest;
import com.agrizen.auth.entity.User;
import com.agrizen.auth.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Locale;

@Service
public class UserService {

	private final UserRepository userRepository;
	private final BCryptPasswordEncoder passwordEncoder;

	public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	public User register(RegisterRequest req) {
		if (req == null || isBlank(req.name) || isBlank(req.email) || isBlank(req.password) || req.role == null) {
			throw new IllegalArgumentException("Missing required fields");
		}
		if (userRepository.existsByEmail(req.email)) {
			throw new IllegalArgumentException("Email already registered");
		}
		User u = new User();
		u.setName(req.name.trim());
		u.setEmail(req.email.trim().toLowerCase(Locale.ROOT));
		u.setPassword(passwordEncoder.encode(req.password));
		u.setRole(req.role);
		return userRepository.save(u);
	}

	public User login(LoginRequest req) {
		if (req == null || isBlank(req.email) || isBlank(req.password) || req.role == null) {
			throw new IllegalArgumentException("Missing credentials");
		}
		User u = userRepository.findByEmail(req.email.trim().toLowerCase(Locale.ROOT))
				.orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));
		if (u.getRole() != req.role) {
			throw new IllegalArgumentException("Role mismatch");
		}
		if (!passwordEncoder.matches(req.password, u.getPassword())) {
			throw new IllegalArgumentException("Invalid credentials");
		}
		return u;
	}

	private boolean isBlank(String s) { return s == null || s.trim().isEmpty(); }
}


