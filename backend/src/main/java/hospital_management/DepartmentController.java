
package hospital_management;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/departments")
@CrossOrigin
public class DepartmentController {

    private final JdbcTemplate jdbcTemplate;

    public DepartmentController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // GET: Retrieve all departments
    @GetMapping
    public List<?> getAllDepartments() {
        return jdbcTemplate.queryForList(
            "SELECT * FROM Department ORDER BY Department_ID"
        );
    }

    // GET: Retrieve one department by ID
    @GetMapping("/{id}")
    public List<?> getDepartmentById(@PathVariable int id) {
        List<?> departments = jdbcTemplate.queryForList(
            "SELECT * FROM Department WHERE Department_ID = ?", id
        );

        if (departments.isEmpty()) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Department not found"
            );
        }

        return departments;
    }

    // POST: Add a new department
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public String addDepartment(@RequestBody DepartmentRequest department) {
        jdbcTemplate.update(
            "INSERT INTO Department (Department_ID, Department_Name, Location) VALUES (?, ?, ?)",
            department.departmentId(),
            department.departmentName(),
            department.location()
        );

        return "Department added successfully";
    }

    // PUT: Update an existing department
    @PutMapping("/{id}")
    public String updateDepartment(
            @PathVariable int id,
            @RequestBody DepartmentRequest department) {

        int rows = jdbcTemplate.update(
            "UPDATE Department SET Department_Name = ?, Location = ? WHERE Department_ID = ?",
            department.departmentName(),
            department.location(),
            id
        );

        if (rows == 0) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Department not found"
            );
        }

        return "Department updated successfully";
    }

    // DELETE: Remove a department
   @DeleteMapping("/{id}")
public String deleteDepartment(@PathVariable int id) {

    Integer doctorCount = jdbcTemplate.queryForObject(
        "SELECT COUNT(*) FROM Doctor WHERE Department_ID = ?",
        Integer.class,
        id
    );

    if (doctorCount != null && doctorCount > 0) {
        throw new ResponseStatusException(
            HttpStatus.CONFLICT,
            "Cannot delete department. " + doctorCount
            + " doctor(s) are assigned to this department."
        );
    }

    int rows = jdbcTemplate.update(
        "DELETE FROM Department WHERE Department_ID = ?", id
    );

    if (rows == 0) {
        throw new ResponseStatusException(
            HttpStatus.NOT_FOUND, "Department not found"
        );
    }

    return "Department deleted successfully";
}

    // Request data structure
    public record DepartmentRequest(
        Integer departmentId,
        String departmentName,
        String location
    ) {}
}
