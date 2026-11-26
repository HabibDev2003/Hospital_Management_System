
package hospital_management;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/prescription-medicines")
@CrossOrigin
public class PrescriptionMedicineController {

    private final JdbcTemplate jdbc;

    public PrescriptionMedicineController(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    // GET all prescription-medicine records
    @GetMapping
    public List<PrescriptionMedicine> getAll() {
        return jdbc.query(
            "SELECT Prescription_ID, Medicine_ID, Quantity, Instructions " +
            "FROM Prescription_Medicine " +
            "ORDER BY Prescription_ID, Medicine_ID",
            (rs, rowNum) -> new PrescriptionMedicine(
                rs.getInt("PRESCRIPTION_ID"),
                rs.getInt("MEDICINE_ID"),
                rs.getInt("QUANTITY"),
                rs.getString("INSTRUCTIONS")
            )
        );
    }

    // GET by composite ID
    @GetMapping("/{prescriptionId}/{medicineId}")
    public PrescriptionMedicine getById(
        @PathVariable int prescriptionId,
        @PathVariable int medicineId
    ) {
        List<PrescriptionMedicine> records = jdbc.query(
            "SELECT Prescription_ID, Medicine_ID, Quantity, Instructions " +
            "FROM Prescription_Medicine " +
            "WHERE Prescription_ID = ? AND Medicine_ID = ?",
            (rs, rowNum) -> new PrescriptionMedicine(
                rs.getInt("PRESCRIPTION_ID"),
                rs.getInt("MEDICINE_ID"),
                rs.getInt("QUANTITY"),
                rs.getString("INSTRUCTIONS")
            ),
            prescriptionId,
            medicineId
        );

        if (records.isEmpty()) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Record not found"
            );
        }

        return records.get(0);
    }

    // POST new prescription-medicine record
    @PostMapping
    public String add(@RequestBody PrescriptionMedicineRequest record) {
        jdbc.update(
            "INSERT INTO Prescription_Medicine " +
            "(Prescription_ID, Medicine_ID, Quantity, Instructions) " +
            "VALUES (?, ?, ?, ?)",
            record.prescriptionId(),
            record.medicineId(),
            record.quantity(),
            record.instructions()
        );

        return "Prescription medicine added successfully";
    }

    // PUT update prescription-medicine record
    @PutMapping("/{prescriptionId}/{medicineId}")
    public String update(
        @PathVariable int prescriptionId,
        @PathVariable int medicineId,
        @RequestBody PrescriptionMedicineRequest record
    ) {
        int rows = jdbc.update(
            "UPDATE Prescription_Medicine " +
            "SET Prescription_ID = ?, Medicine_ID = ?, " +
            "Quantity = ?, Instructions = ? " +
            "WHERE Prescription_ID = ? AND Medicine_ID = ?",
            record.prescriptionId(),
            record.medicineId(),
            record.quantity(),
            record.instructions(),
            prescriptionId,
            medicineId
        );

        if (rows == 0) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Record not found"
            );
        }

        return "Prescription medicine updated successfully";
    }

    // DELETE by composite key
    @DeleteMapping("/{prescriptionId}/{medicineId}")
    public String delete(
        @PathVariable int prescriptionId,
        @PathVariable int medicineId
    ) {
        int rows = jdbc.update(
            "DELETE FROM Prescription_Medicine " +
            "WHERE Prescription_ID = ? AND Medicine_ID = ?",
            prescriptionId,
            medicineId
        );

        if (rows == 0) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Record not found"
            );
        }

        return "Prescription medicine deleted successfully";
    }

    public record PrescriptionMedicine(
        int prescriptionId,
        int medicineId,
        int quantity,
        String instructions
    ) {}

    public record PrescriptionMedicineRequest(
        Integer prescriptionId,
        Integer medicineId,
        Integer quantity,
        String instructions
    ) {}
}
