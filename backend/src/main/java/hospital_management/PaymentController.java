
package hospital_management;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin
public class PaymentController {

    private final JdbcTemplate jdbc;

    public PaymentController(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    // GET all payments
    @GetMapping
    public List<Payment> getAll() {
        return jdbc.query(
            "SELECT Payment_ID, Patient_ID, Amount, Payment_Date, Payment_Method, Payment_Status FROM Payment ORDER BY Payment_ID",
            (rs, rowNum) -> new Payment(
                rs.getInt("PAYMENT_ID"),
                rs.getInt("PATIENT_ID"),
                rs.getBigDecimal("AMOUNT"),
                rs.getDate("PAYMENT_DATE").toLocalDate(),
                rs.getString("PAYMENT_METHOD"),
                rs.getString("PAYMENT_STATUS")
            )
        );
    }

    // GET payment by ID
    @GetMapping("/{id}")
    public Payment getById(@PathVariable int id) {
        List<Payment> payments = jdbc.query(
            "SELECT Payment_ID, Patient_ID, Amount, Payment_Date, Payment_Method, Payment_Status FROM Payment WHERE Payment_ID = ?",
            (rs, rowNum) -> new Payment(
                rs.getInt("PAYMENT_ID"),
                rs.getInt("PATIENT_ID"),
                rs.getBigDecimal("AMOUNT"),
                rs.getDate("PAYMENT_DATE").toLocalDate(),
                rs.getString("PAYMENT_METHOD"),
                rs.getString("PAYMENT_STATUS")
            ),
            id
        );

        if (payments.isEmpty()) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Payment not found"
            );
        }

        return payments.get(0);
    }

    // POST new payment
    @PostMapping
    public String add(@RequestBody PaymentRequest payment) {
        jdbc.update(
            "INSERT INTO Payment (Payment_ID, Patient_ID, Amount, Payment_Date, Payment_Method, Payment_Status) VALUES (?, ?, ?, ?, ?, ?)",
            payment.paymentId(),
            payment.patientId(),
            payment.amount(),
            Date.valueOf(payment.paymentDate()),
            payment.paymentMethod(),
            payment.paymentStatus()
        );

        return "Payment added successfully";
    }

    // PUT update payment
    @PutMapping("/{id}")
    public String update(
        @PathVariable int id,
        @RequestBody PaymentRequest payment
    ) {
        int rows = jdbc.update(
            "UPDATE Payment SET Patient_ID = ?, Amount = ?, Payment_Date = ?, Payment_Method = ?, Payment_Status = ? WHERE Payment_ID = ?",
            payment.patientId(),
            payment.amount(),
            Date.valueOf(payment.paymentDate()),
            payment.paymentMethod(),
            payment.paymentStatus(),
            id
        );

        if (rows == 0) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Payment not found"
            );
        }

        return "Payment updated successfully";
    }

    // DELETE payment
    @DeleteMapping("/{id}")
    public String delete(@PathVariable int id) {
        int rows = jdbc.update(
            "DELETE FROM Payment WHERE Payment_ID = ?",
            id
        );

        if (rows == 0) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Payment not found"
            );
        }

        return "Payment deleted successfully";
    }

    public record Payment(
        int paymentId,
        int patientId,
        BigDecimal amount,
        LocalDate paymentDate,
        String paymentMethod,
        String paymentStatus
    ) {}

    public record PaymentRequest(
        Integer paymentId,
        Integer patientId,
        BigDecimal amount,
        LocalDate paymentDate,
        String paymentMethod,
        String paymentStatus
    ) {}
}
