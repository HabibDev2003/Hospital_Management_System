
package hospital_management;

import java.sql.Date;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin
public class AppointmentController {

    private final JdbcTemplate jdbc;

    public AppointmentController(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    // GET all appointments
    @GetMapping
    public List<Appointment> getAllAppointments() {
        return jdbc.query(
            "SELECT * FROM Appointment ORDER BY Appointment_ID",
            (rs, rowNum) -> new Appointment(
                rs.getInt("APPOINTMENT_ID"),
                rs.getInt("PATIENT_ID"),
                rs.getInt("DOCTOR_ID"),
                rs.getDate("APPOINTMENT_DATE").toLocalDate(),
                rs.getString("APPOINTMENT_TIME"),
                rs.getString("STATUS")
            )
        );
    }

    // GET appointment by ID
    @GetMapping("/{id}")
    public Appointment getAppointmentById(@PathVariable int id) {
        List<Appointment> appointments = jdbc.query(
            "SELECT * FROM Appointment WHERE Appointment_ID = ?",
            (rs, rowNum) -> new Appointment(
                rs.getInt("APPOINTMENT_ID"),
                rs.getInt("PATIENT_ID"),
                rs.getInt("DOCTOR_ID"),
                rs.getDate("APPOINTMENT_DATE").toLocalDate(),
                rs.getString("APPOINTMENT_TIME"),
                rs.getString("STATUS")
            ),
            id
        );

        if (appointments.isEmpty()) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Appointment not found"
            );
        }

        return appointments.get(0);
    }

    // POST new appointment
    @PostMapping
    public String addAppointment(
        @RequestBody AppointmentRequest appointment
    ) {
        jdbc.update(
            "INSERT INTO Appointment (Appointment_ID, Patient_ID, Doctor_ID, Appointment_Date, Appointment_Time, Status) VALUES (?, ?, ?, ?, ?, ?)",
            appointment.appointmentId(),
            appointment.patientId(),
            appointment.doctorId(),
            Date.valueOf(appointment.appointmentDate()),
            appointment.appointmentTime(),
            appointment.status()
        );

        return "Appointment added successfully";
    }

    // PUT update appointment
    @PutMapping("/{id}")
    public String updateAppointment(
        @PathVariable int id,
        @RequestBody AppointmentRequest appointment
    ) {
        int rows = jdbc.update(
            "UPDATE Appointment SET Patient_ID = ?, Doctor_ID = ?, Appointment_Date = ?, Appointment_Time = ?, Status = ? WHERE Appointment_ID = ?",
            appointment.patientId(),
            appointment.doctorId(),
            Date.valueOf(appointment.appointmentDate()),
            appointment.appointmentTime(),
            appointment.status(),
            id
        );

        if (rows == 0) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Appointment not found"
            );
        }

        return "Appointment updated successfully";
    }

    // DELETE appointment
    @DeleteMapping("/{id}")
    public String deleteAppointment(@PathVariable int id) {
        int rows = jdbc.update(
            "DELETE FROM Appointment WHERE Appointment_ID = ?",
            id
        );

        if (rows == 0) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Appointment not found"
            );
        }

        return "Appointment deleted successfully";
    }

    // Appointment response
    public record Appointment(
        int appointmentId,
        int patientId,
        int doctorId,
        java.time.LocalDate appointmentDate,
        String appointmentTime,
        String status
    ) {}

    // Appointment request
    public record AppointmentRequest(
        Integer appointmentId,
        Integer patientId,
        Integer doctorId,
        java.time.LocalDate appointmentDate,
        String appointmentTime,
        String status
    ) {}
}
