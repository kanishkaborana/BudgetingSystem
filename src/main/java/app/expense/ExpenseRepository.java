/**
An interface for methods that use an expense repository
@author Szymon Gogolowski, Kanishka Borana, Elise Merritt, Sushanth Nadam, Jacob Batista
*/
package app.expense;

import java.sql.Date;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ExpenseRepository extends CrudRepository<Expense, Integer> {
    
    /**
    Retrieves all expenses of a specified user
    @param userID the identification of the user whose expenses are
    to be retrieved
    */
    @Query(value = "SELECT * FROM budgeting_system.expense WHERE userID = (:userID)", nativeQuery = true)
	public Iterable<Expense> getExpensesByUserID(String userID);
    
    /**
    Retrieves all expenses a user added between two dates
    @param userID the identification of the user whose expenses are
    to be retrieved
    @param date1 the earliest date to retrieve expenses from
    @param date2 the latest date to retrieve expenses from
    */
    @Query(value = "SELECT * FROM budgeting_system.expense WHERE (date_added between (:date1) and (:date2)) AND userID = (:userID) ", nativeQuery = true)
	public Iterable<Expense> getExpensesBetween(String userID, Date date1, Date date2);
}


