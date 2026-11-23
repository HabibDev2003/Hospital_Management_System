package hospital_management;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin
public class DoctorController {

    private final JdbcTemplate jdbc;

    public DoctorController(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    // GET all doctors
    @GetMapping
    public List<Doctor> getAllDoctors() {
        return jdbc.query(
            "SELECT * FROM Doctor ORDER BY Doctor_ID",
            (rs, rowNum) -> new Doctor(
                rs.getInt("DOCTOR_ID"),
                rs.getString("DOCTOR_NAME"),
                rs.getString("SPECIALIZATION"),
                rs.getString("PHONE_NUMBER"),
                rs.getString("EMAIL"),
                rs.getInt("DEPARTMENT_ID")
            )
        );
    }

    // GET doctor by ID
    @GetMapping("/{id}")
    public Doctor getDoctorById(@PathVariable int id) {
        List<Doctor> doctors = jdbc.query(
            "SELECT * FROM Doctor WHERE Doctor_ID = ?",
            (rs, rowNum) -> new Doctor(
                rs.getInt("DOCTOR_ID"),
                rs.getString("DOCTOR_NAME"),
                rs.getString("SPECIALIZATION"),
                rs.getString("PHONE_NUMBER"),
                rs.getString("EMAIL"),
                rs.getInt("DEPARTMENT_ID")
            ),
            id
        );

        if (doctors.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Doctor not found");
        }

        return doctors.get(0);
    }

    // POST new doctor
    @PostMapping
    public String addDoctor(@RequestBody DoctorRequest doctor) {
        jdbc.update(
            "INSERT INTO Doctor (Doctor_ID, Doctor_Name, Specialization, Phone_Number, Email, Department_ID) VALUES (?, ?, ?, ?, ?, ?)",
            doctor.doctorId(),
            doctor.doctorName(),
            doctor.specialization(),
            doctor.phoneNumber(),
            doctor.email(),
            doctor.departmentId()
        );

        return "Doctor added successfully";
    }

    // PUT update doctor
    @PutMapping("/{id}")
    public String updateDoctor(@PathVariable int id, @RequestBody DoctorRequest doctor) {
        int rows = jdbc.update(
            "UPDATE Doctor SET Doctor_Name = ?, Specialization = ?, Phone_Number = ?, Email = ?, Department_ID = ? WHERE Doctor_ID = ?",
            doctor.doctorName(),
            doctor.specialization(),
            doctor.phoneNumber(),
            doctor.email(),
            doctor.departmentId(),
            id
        );

        if (rows == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Doctor not found");
        }

        return "Doctor updated successfully";
    }

    // DELETE doctor
    @DeleteMapping("/{id}")
    public String deleteDoctor(@PathVariable int id) {
        int rows = jdbc.update(
            "DELETE FROM Doctor WHERE Doctor_ID = ?",
            id
        );

        if (rows == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Doctor not found");
        }

        return "Doctor deleted successfully";
    }

    // Doctor response
    public record Doctor(
        int doctorId,
        String doctorName,
        String specialization,
        String phoneNumber,
        String email,
        int departmentId
    ) {}

    // Doctor request
    public record DoctorRequest(
        Integer doctorId,
        String doctorName,
        String specialization,
        String phoneNumber,
        String email,
        Integer departmentId
    ) {}
}