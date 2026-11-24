
package hospital_management;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin
public class PatientController {

    private final JdbcTemplate jdbcTemplate;

    public PatientController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // GET: Retrieve all patients
    @GetMapping
    public List<?> getAllPatients() {
        return jdbcTemplate.queryForList(
            "SELECT * FROM Patient ORDER BY Patient_ID"
        );
    }

    // GET: Retrieve one patient by ID
    @GetMapping("/{id}")
    public List<?> getPatientById(@PathVariable int id) {
        List<?> patients = jdbcTemplate.queryForList(
            "SELECT * FROM Patient WHERE Patient_ID = ?", id
        );

        if (patients.isEmpty()) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Patient not found"
            );
        }

        return patients;
    }

    // POST: Add a new patient
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public String addPatient(@RequestBody PatientRequest patient) {
        jdbcTemplate.update(
            "INSERT INTO Patient (Patient_ID, Full_Name, Gender, Date_Of_Birth, Phone_Number, Address, Blood_Group) VALUES (?, ?, ?, ?, ?, ?, ?)",
            patient.patientId(),
            patient.fullName(),
            patient.gender(),
            patient.dateOfBirth(),
            patient.phoneNumber(),
            patient.address(),
            patient.bloodGroup()
        );

        return "Patient added successfully";
    }

    // PUT: Update an existing patient
    @PutMapping("/{id}")
    public String updatePatient(
            @PathVariable int id,
            @RequestBody PatientRequest patient) {

        int rows = jdbcTemplate.update(
            "UPDATE Patient SET Full_Name = ?, Gender = ?, Date_Of_Birth = ?, Phone_Number = ?, Address = ?, Blood_Group = ? WHERE Patient_ID = ?",
            patient.fullName(),
            patient.gender(),
            patient.dateOfBirth(),
            patient.phoneNumber(),
            patient.address(),
            patient.bloodGroup(),
            id
        );

        if (rows == 0) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Patient not found"
            );
        }

        return "Patient updated successfully";
    }

    // DELETE: Remove a patient
    
@DeleteMapping("/{id}")
public String deletePatient(@PathVariable int id) {

    Integer appointmentCount = jdbcTemplate.queryForObject(
        "SELECT COUNT(*) FROM Appointment WHERE Patient_ID = ?",
        Integer.class, id
    );

    Integer prescriptionCount = jdbcTemplate.queryForObject(
        "SELECT COUNT(*) FROM Prescription WHERE Patient_ID = ?",
        Integer.class, id
    );

    Integer paymentCount = jdbcTemplate.queryForObject(
        "SELECT COUNT(*) FROM Payment WHERE Patient_ID = ?",
        Integer.class, id
    );

    if (appointmentCount > 0 || prescriptionCount > 0 || paymentCount > 0) {
        throw new ResponseStatusException(
            HttpStatus.CONFLICT,
            "Cannot delete patient because related records exist."
        );
    }

    int rows = jdbcTemplate.update(
        "DELETE FROM Patient WHERE Patient_ID = ?", id
    );

    if (rows == 0) {
        throw new ResponseStatusException(
            HttpStatus.NOT_FOUND, "Patient not found"
        );
    }

    return "Patient deleted successfully";
}


    // Request data structure
    public record PatientRequest(
        Integer patientId,
        String fullName,
        String gender,
        java.time.LocalDate dateOfBirth,
        String phoneNumber,
        String address,
        String bloodGroup
    ) {}
}
