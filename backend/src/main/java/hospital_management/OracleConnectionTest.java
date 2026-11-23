package hospital_management;

import java.sql.Connection;
import java.sql.DriverManager;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class OracleConnectionTest implements CommandLineRunner {


    @Override
    public void run(String... args) {

        String url = "jdbc:oracle:thin:@//localhost:1521/oraclpdb";
        String username = "POPAL";
        String password = System.getenv("ORACLE_PASSWORD");
// Here the passord is not set but we should give during the running time
        if (password == null || password.isBlank()) {
            System.out.println("FAILED: ORACLE_PASSWORD is not set.");
            return;
        }

        try (Connection connection =
                DriverManager.getConnection(url, username, password)) {

            System.out.println("SUCCESS: Java connected to Oracle 19c!");

        } catch (Exception e) {
            System.out.println("FAILED: " + e.getMessage());
        }
    }
}