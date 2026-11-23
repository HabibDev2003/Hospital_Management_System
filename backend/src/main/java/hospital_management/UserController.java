
package hospital_management;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    private final JdbcTemplate jdbc;

    public UserController(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    // GET all users (without passwords)
    @GetMapping
    public List<User> getAllUsers() {
        return jdbc.query(
            "SELECT User_ID, Username, Role FROM Users ORDER BY User_ID",
            (rs, rowNum) -> new User(
                rs.getInt("USER_ID"),
                rs.getString("USERNAME"),
                rs.getString("ROLE")
            )
        );
    }

    // GET user by ID (without password)
    @GetMapping("/{id}")
    public User getUserById(@PathVariable int id) {
        List<User> users = jdbc.query(
            "SELECT User_ID, Username, Role FROM Users WHERE User_ID = ?",
            (rs, rowNum) -> new User(
                rs.getInt("USER_ID"),
                rs.getString("USERNAME"),
                rs.getString("ROLE")
            ),
            id
        );

        if (users.isEmpty()) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "User not found"
            );
        }

        return users.get(0);
    }

    // POST new user
    @PostMapping
    public String addUser(@RequestBody UserRequest user) {
        jdbc.update(
            "INSERT INTO Users (User_ID, Username, Password, Role) VALUES (?, ?, ?, ?)",
            user.userId(),
            user.username(),
            user.password(),
            user.role()
        );

        return "User added successfully";
    }

    // PUT update user
    @PutMapping("/{id}")
    public String updateUser(
        @PathVariable int id,
        @RequestBody UserRequest user
    ) {
        int rows = jdbc.update(
            "UPDATE Users SET Username = ?, Password = ?, Role = ? WHERE User_ID = ?",
            user.username(),
            user.password(),
            user.role(),
            id
        );

        if (rows == 0) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "User not found"
            );
        }

        return "User updated successfully";
    }

    // DELETE user
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable int id) {
        int rows = jdbc.update(
            "DELETE FROM Users WHERE User_ID = ?",
            id
        );

        if (rows == 0) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "User not found"
            );
        }

        return "User deleted successfully";
    }

    // User response (no password)
    public record User(
        int userId,
        String username,
        String role
    ) {}

    // User request
    public record UserRequest(
        Integer userId,
        String username,
        String password,
        String role
    ) {}
}
