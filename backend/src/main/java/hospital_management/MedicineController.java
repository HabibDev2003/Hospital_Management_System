
package hospital_management;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/medicines")
@CrossOrigin
public class MedicineController {

    private final JdbcTemplate jdbc;

    public MedicineController(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    // GET all medicines
    @GetMapping
    public List<Medicine> getAllMedicines() {
        return jdbc.query(
            "SELECT * FROM Medicine ORDER BY Medicine_ID",
            (rs, rowNum) -> new Medicine(
                rs.getInt("MEDICINE_ID"),
                rs.getString("MEDICINE_NAME"),
                rs.getInt("QUANTITY"),
                rs.getBigDecimal("UNIT_PRICE"),
                rs.getDate("EXPIRY_DATE").toLocalDate()
            )
        );
    }

    // GET medicine by ID
    @GetMapping("/{id}")
    public Medicine getMedicineById(@PathVariable int id) {
        List<Medicine> medicines = jdbc.query(
            "SELECT * FROM Medicine WHERE Medicine_ID = ?",
            (rs, rowNum) -> new Medicine(
                rs.getInt("MEDICINE_ID"),
                rs.getString("MEDICINE_NAME"),
                rs.getInt("QUANTITY"),
                rs.getBigDecimal("UNIT_PRICE"),
                rs.getDate("EXPIRY_DATE").toLocalDate()
            ),
            id
        );

        if (medicines.isEmpty()) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Medicine not found"
            );
        }

        return medicines.get(0);
    }

    // POST new medicine
    @PostMapping
    public String addMedicine(@RequestBody MedicineRequest medicine) {
        jdbc.update(
            "INSERT INTO Medicine (Medicine_ID, Medicine_Name, Quantity, Unit_Price, Expiry_Date) VALUES (?, ?, ?, ?, ?)",
            medicine.medicineId(),
            medicine.medicineName(),
            medicine.quantity(),
            medicine.unitPrice(),
            Date.valueOf(medicine.expiryDate())
        );

        return "Medicine added successfully";
    }

    // PUT update medicine
    @PutMapping("/{id}")
    public String updateMedicine(
        @PathVariable int id,
        @RequestBody MedicineRequest medicine
    ) {
        int rows = jdbc.update(
            "UPDATE Medicine SET Medicine_Name = ?, Quantity = ?, Unit_Price = ?, Expiry_Date = ? WHERE Medicine_ID = ?",
            medicine.medicineName(),
            medicine.quantity(),
            medicine.unitPrice(),
            Date.valueOf(medicine.expiryDate()),
            id
        );

        if (rows == 0) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Medicine not found"
            );
        }

        return "Medicine updated successfully";
    }

    // DELETE medicine
    @DeleteMapping("/{id}")
    public String deleteMedicine(@PathVariable int id) {
        int rows = jdbc.update(
            "DELETE FROM Medicine WHERE Medicine_ID = ?",
            id
        );

        if (rows == 0) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Medicine not found"
            );
        }

        return "Medicine deleted successfully";
    }

    // Medicine response
    public record Medicine(
        int medicineId,
        String medicineName,
        int quantity,
        BigDecimal unitPrice,
        java.time.LocalDate expiryDate
    ) {}

    // Medicine request
    public record MedicineRequest(
        Integer medicineId,
        String medicineName,
        Integer quantity,
        BigDecimal unitPrice,
        java.time.LocalDate expiryDate
    ) {}
}
