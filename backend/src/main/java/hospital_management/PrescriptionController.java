
package hospital_management;

import java.sql.Date;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/prescriptions")
@CrossOrigin
public class PrescriptionController {

    private final JdbcTemplate jdbc;

    public PrescriptionController(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    // GET all prescriptions
    @GetMapping
    public List<Prescription> getAllPrescriptions() {
        return jdbc.query(
            "SELECT * FROM Prescription ORDER BY Prescription_ID",
            (rs, rowNum) -> new Prescription(
                rs.getInt("PRESCRIPTION_ID"),
                rs.getInt("PATIENT_ID"),
                rs.getInt("DOCTOR_ID"),
                rs.getDate("PRESCRIPTION_DATE").toLocalDate()
            )
        );
    }

    // GET prescription by ID
    @GetMapping("/{id}")
    public Prescription getPrescriptionById(@PathVariable int id) {
        List<Prescription> prescriptions = jdbc.query(
            "SELECT * FROM Prescription WHERE Prescription_ID = ?",
            (rs, rowNum) -> new Prescription(
                rs.getInt("PRESCRIPTION_ID"),
                rs.getInt("PATIENT_ID"),
                rs.getInt("DOCTOR_ID"),
                rs.getDate("PRESCRIPTION_DATE").toLocalDate()
            ),
            id
        );

        if (prescriptions.isEmpty()) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Prescription not found"
            );
        }

        return prescriptions.get(0);
    }

    // POST new prescription
    @PostMapping
    public String addPrescription(
        @RequestBody PrescriptionRequest prescription
    ) {
        jdbc.update(
            "INSERT INTO Prescription (Prescription_ID, Patient_ID, Doctor_ID, Prescription_Date) VALUES (?, ?, ?, ?)",
            prescription.prescriptionId(),
            prescription.patientId(),
            prescription.doctorId(),
            Date.valueOf(prescription.prescriptionDate())
        );

        return "Prescription added successfully";
    }

    // PUT update prescription
    @PutMapping("/{id}")
    public String updatePrescription(
        @PathVariable int id,
        @RequestBody PrescriptionRequest prescription
    ) {
        int rows = jdbc.update(
            "UPDATE Prescription SET Patient_ID = ?, Doctor_ID = ?, Prescription_Date = ? WHERE Prescription_ID = ?",
            prescription.patientId(),
            prescription.doctorId(),
            Date.valueOf(prescription.prescriptionDate()),
            id
        );

        if (rows == 0) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Prescription not found"
            );
        }

        return "Prescription updated successfully";
    }

    // DELETE prescription
    @DeleteMapping("/{id}")
    public String deletePrescription(@PathVariable int id) {
        int rows = jdbc.update(
            "DELETE FROM Prescription WHERE Prescription_ID = ?",
            id
        );

        if (rows == 0) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Prescription not found"
            );
        }

        return "Prescription deleted successfully";
    }

    // Prescription response
    public record Prescription(
        int prescriptionId,
        int patientId,
        int doctorId,
        java.time.LocalDate prescriptionDate
    ) {}

    // Prescription request
    public record PrescriptionRequest(
        Integer prescriptionId,
        Integer patientId,
        Integer doctorId,
        java.time.LocalDate prescriptionDate
    ) {}
}
