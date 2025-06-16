package com.example.climaxtfg.controller;

import com.example.climaxtfg.dto.AuthRequest;
import com.example.climaxtfg.model.Usuario;
import com.example.climaxtfg.repository.UsuarioRepository;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authManager;
    private final UsuarioRepository usuarioRepository;

    public AuthController(AuthenticationManager authManager, UsuarioRepository usuarioRepository) {
        this.authManager = authManager;
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        try {
            UsernamePasswordAuthenticationToken authInputToken =
                    new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword());

            Authentication authentication = authManager.authenticate(authInputToken);

            Usuario usuario = usuarioRepository.findByEmail(authRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            return ResponseEntity.ok(Map.of(
                    "message", "Login successful",
                    "username", usuario.getUsername(), // aquí mandamos el username
                    "email", usuario.getEmail(),
                    "role", usuario.getRole()
            ));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Usuario o contraseña incorrectos"));
        }
    }
}
