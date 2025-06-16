package com.example.climaxtfg;

import com.example.climaxtfg.model.Usuario;
import com.example.climaxtfg.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class ClimaxTFGApplication {

    public static void main(String[] args) {
        SpringApplication.run(ClimaxTFGApplication.class, args);
    }

    @Bean
    CommandLineRunner init(UsuarioRepository repo, PasswordEncoder encoder) {
        return args -> {
            if (repo.count() == 0) {
                repo.save(new Usuario("admin", encoder.encode("admin123"), "ADMIN"));
                repo.save(new Usuario("cliente", encoder.encode("cliente123"), "CLIENTE"));
            }
        };
    }
}
