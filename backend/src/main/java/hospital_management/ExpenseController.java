
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
@RequestMapping("/api/expenses")
@CrossOrigin
public class ExpenseController {

    private final JdbcTemplate jdbc;

    public ExpenseController(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    // GET all expenses
    @GetMapping
    public List<Expense> getAll() {
        return jdbc.query(
            "SELECT Expense_ID, Expense_Category, Description, Amount, Expense_Date, Payment_Method, Payment_Status, User_ID FROM Expense ORDER BY Expense_ID",
            (rs, rowNum) -> new Expense(
                rs.getInt("EXPENSE_ID"),
                rs.getString("EXPENSE_CATEGORY"),
                rs.getString("DESCRIPTION"),
                rs.getBigDecimal("AMOUNT"),
                rs.getDate("EXPENSE_DATE").toLocalDate(),
                rs.getString("PAYMENT_METHOD"),
                rs.getString("PAYMENT_STATUS"),
                rs.getInt("USER_ID")
            )
        );
    }

    // GET expense by ID
    @GetMapping("/{id}")
    public Expense getById(@PathVariable int id) {
        List<Expense> expenses = jdbc.query(
            "SELECT Expense_ID, Expense_Category, Description, Amount, Expense_Date, Payment_Method, Payment_Status, User_ID FROM Expense WHERE Expense_ID = ?",
            (rs, rowNum) -> new Expense(
                rs.getInt("EXPENSE_ID"),
                rs.getString("EXPENSE_CATEGORY"),
                rs.getString("DESCRIPTION"),
                rs.getBigDecimal("AMOUNT"),
                rs.getDate("EXPENSE_DATE").toLocalDate(),
                rs.getString("PAYMENT_METHOD"),
                rs.getString("PAYMENT_STATUS"),
                rs.getInt("USER_ID")
            ),
            id
        );

        if (expenses.isEmpty()) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Expense not found"
            );
        }

        return expenses.get(0);
    }

    // POST new expense
    @PostMapping
    public String add(@RequestBody ExpenseRequest expense) {
        jdbc.update(
            "INSERT INTO Expense (Expense_ID, Expense_Category, Description, Amount, Expense_Date, Payment_Method, Payment_Status, User_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            expense.expenseId(),
            expense.expenseCategory(),
            expense.description(),
            expense.amount(),
            Date.valueOf(expense.expenseDate()),
            expense.paymentMethod(),
            expense.paymentStatus(),
            expense.userId()
        );

        return "Expense added successfully";
    }

    // PUT update expense
    @PutMapping("/{id}")
    public String update(
        @PathVariable int id,
        @RequestBody ExpenseRequest expense
    ) {
        int rows = jdbc.update(
            "UPDATE Expense SET Expense_Category = ?, Description = ?, Amount = ?, Expense_Date = ?, Payment_Method = ?, Payment_Status = ?, User_ID = ? WHERE Expense_ID = ?",
            expense.expenseCategory(),
            expense.description(),
            expense.amount(),
            Date.valueOf(expense.expenseDate()),
            expense.paymentMethod(),
            expense.paymentStatus(),
            expense.userId(),
            id
        );

        if (rows == 0) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Expense not found"
            );
        }

        return "Expense updated successfully";
    }

    // DELETE expense
    @DeleteMapping("/{id}")
    public String delete(@PathVariable int id) {
        int rows = jdbc.update(
            "DELETE FROM Expense WHERE Expense_ID = ?",
            id
        );

        if (rows == 0) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Expense not found"
            );
        }

        return "Expense deleted successfully";
    }

    public record Expense(
        int expenseId,
        String expenseCategory,
        String description,
        BigDecimal amount,
        LocalDate expenseDate,
        String paymentMethod,
        String paymentStatus,
        int userId
    ) {}

    public record ExpenseRequest(
        Integer expenseId,
        String expenseCategory,
        String description,
        BigDecimal amount,
        LocalDate expenseDate,
        String paymentMethod,
        String paymentStatus,
        Integer userId
    ) {}
}
