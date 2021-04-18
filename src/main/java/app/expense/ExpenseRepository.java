package app.expense;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ExpenseRepository extends CrudRepository<Expense, Integer> {
    @Query(value = "SELECT * FROM budgeting_system.expense WHERE userID = (:userID)", nativeQuery = true)
	public Iterable<Expense> getExpensesByUserID(String userID);
    
}
