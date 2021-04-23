package app.expense;

import java.sql.Date;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ExpenseRepository extends CrudRepository<Expense, Integer> {
    @Query(value = "SELECT * FROM budgeting_system.expense WHERE userID = (:userID)", nativeQuery = true)
	public Iterable<Expense> getExpensesByUserID(String userID);
    
    @Query(value = "SELECT * FROM budgeting_system.expense WHERE date_added between (:date1) and (:date2)", nativeQuery = true)
	public Iterable<Expense> getExpensesBetween(Date date1, Date date2);
}
