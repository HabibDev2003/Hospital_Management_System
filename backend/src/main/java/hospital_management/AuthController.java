
package hospital_management;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final JdbcTemplate jdbc;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public AuthController(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    // STAFF REGISTRATION
    @PostMapping("/register")
    public RegisterResponse register(
            @RequestBody RegisterRequest request) {

        if (request.username() == null || request.username().isBlank()
                || request.password() == null || request.password().isBlank()
                || request.confirmPassword() == null
                || request.confirmPassword().isBlank()) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Username and password fields are required"
            );
        }

        String username = request.username().trim();

        if (request.password().length() < 8) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Password must contain at least 8 characters"
            );
        }

        if (!request.password().equals(request.confirmPassword())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Passwords do not match"
            );
        }

        Integer usernameCount = jdbc.queryForObject(
                "SELECT COUNT(*) FROM USERS WHERE LOWER(USERNAME) = LOWER(?)",
                Integer.class,
                username
        );

        if (usernameCount != null && usernameCount > 0) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Username is already registered"
            );
        }

        Integer nextUserId = jdbc.queryForObject(
                "SELECT NVL(MAX(USER_ID), 0) + 1 FROM USERS",
                Integer.class
        );

        String encryptedPassword =
                passwordEncoder.encode(request.password());

        // Public registrations receive Receptionist role.
        String role = "Receptionist";

        jdbc.update(
                "INSERT INTO USERS (USER_ID, USERNAME, PASSWORD, ROLE) " +
                "VALUES (?, ?, ?, ?)",
                nextUserId,
                username,
                encryptedPassword,
                role
        );

        return new RegisterResponse(
                "Registration successful",
                nextUserId,
                username,
                role
        );
    }

    // STAFF LOGIN
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        if (request.username() == null || request.username().isBlank()
                || request.password() == null || request.password().isBlank()) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Username and password are required"
            );
        }

        List<LoginUser> users = jdbc.query(
                "SELECT USER_ID, USERNAME, PASSWORD, ROLE " +
                "FROM USERS WHERE USERNAME = ?",
                (rs, rowNum) -> new LoginUser(
                        rs.getInt("USER_ID"),
                        rs.getString("USERNAME"),
                        rs.getString("PASSWORD"),
                        rs.getString("ROLE")
                ),
                request.username().trim()
        );

        if (users.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid username or password"
            );
        }

        LoginUser user = users.get(0);
        String storedPassword = user.password();

        boolean passwordMatches;

        // Check whether password is BCrypt encrypted.
        if (storedPassword.startsWith("$2a$")
                || storedPassword.startsWith("$2b$")
                || storedPassword.startsWith("$2y$")) {

            passwordMatches = passwordEncoder.matches(
                    request.password(),
                    storedPassword
            );

        } else {
            // Support existing plain-text passwords temporarily.
            passwordMatches = request.password().equals(storedPassword);

            // Encrypt old password after successful login.
            if (passwordMatches) {
                String encryptedPassword =
                        passwordEncoder.encode(request.password());

                jdbc.update(
                        "UPDATE USERS SET PASSWORD = ? WHERE USER_ID = ?",
                        encryptedPassword,
                        user.userId()
                );
            }
        }

        if (!passwordMatches) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid username or password"
            );
        }

        return new LoginResponse(
                "Login successful",
                user.userId(),
                user.username(),
                user.role()
        );
    }

    // REQUEST AND RESPONSE MODELS
    public record RegisterRequest(
            String username,
            String password,
            String confirmPassword
    ) {}

    public record RegisterResponse(
            String message,
            int userId,
            String username,
            String role
    ) {}

    public record LoginRequest(
            String username,
            String password
    ) {}

    public record LoginResponse(
            String message,
            int userId,
            String username,
            String role
    ) {}

    private record LoginUser(
            int userId,
            String username,
            String password,
            String role
    ) {}
}
