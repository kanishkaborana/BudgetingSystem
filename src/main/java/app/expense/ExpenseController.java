/**
Allows users of the Budgeting-System web application to control their Expenses.
@author Szymon Gogolowski, Kanishka Borana, Elise Merritt, Sushanth Nadam, Jacob Batista
*/
package app.expense;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "http://localhost:8080")
@RestController
public class ExpenseController {

    @Autowired
	private ExpenseService expenseService;
	
    /**
    Retrieves all expenses in the budgeting system
    @return all expenses in the budgeting system
    */
	@RequestMapping("/expenses")
	public Iterable<Expense> getAllExpense() {
		return expenseService.getAllExpense();
	}
	
  	/**
    Retrieves an expense
    @param id the identification number of the expense to retrieve
    @return the expense with the given id
    */
	@RequestMapping("/expenses/{id}")
	public Expense getExpenseById(@PathVariable Integer id) {
		return expenseService.getExpenseByID(id);
	}
	
    /**
    Retrieves all expenses of a specified user
    @param userID the ID of the user whose expenses are
    to be retrieved
    @return all expenses of the user with the given id
    */
	@RequestMapping("/expense/{userID}")
	public Iterable<Expense> getExpenseByUserID(@PathVariable String userID) {
		return expenseService.getExpensesByUserID(userID);
	}
	
   /**
   Deletes the expense with the given identification number
   @param id the identification number of the expense to delete
   @return a string informing the user the expense was successfully deleted
   */
	@RequestMapping(method = RequestMethod.DELETE, value = "/expenses/delete/{id}")
	public @ResponseBody String deleteExpenseById(@PathVariable Integer id){
		expenseService.deleteExpenseById(id);
		return "Expense Succesfully deleted!";
	}
	
   /**
   Deletes an expense
   @param expense the expense to delete
   @return a string informing the user the expense was successfully deleted
   */
	@RequestMapping(method = RequestMethod.DELETE, value = "/expenses/delete")
	public @ResponseBody String deleteExpense(@RequestBody Expense expense){
		expenseService.deleteExpense(expense);
		return "Expense Succesfully deleted!";
	}
	
  	/**
    Adds an expense
    @param expense the expense to add
    @return a string informing the user the expense was successfully added
    */
	@PostMapping(value = "/expenses/added")
	public @ResponseBody String addExpense(@RequestBody Expense expense){
		expenseService.addExpense(expense);
		return "Expense Succesfully added!";
	}
	
    /**
    Adds an expense
    @param newExpense the expense to add
    @return the newly-added expense
    */
	@CrossOrigin(origins = "http://localhost:8080")
	@PostMapping(value = "/expense/add")
	public @ResponseBody String add(@RequestBody Expense newExpense) {
		return expenseService.add(newExpense);
	}
	
  	/**
    Updates an expense
    @param newExpense the expense to update
    @return the newly-updated expense
    */
	@CrossOrigin(origins = "http://localhost:8080")
	@PostMapping(value = "/expenses/update")
	public @ResponseBody String update(@RequestBody Expense newExpense) {
		return expenseService.update(newExpense);
	}
	
  	/**
    Retrieves all of a user's expenses in a selected month
    @param id the ID of the user whose expenses are to be retrieved
    @param year the year the month to retrieve expenses from was in
    @param month the month to retrieve expenses from 
    @return all of a user's expenses for the given month
    */
	@CrossOrigin(origins = "http://localhost:8080")
	@RequestMapping(value = "/expenses/{id}/month/{month}/year/{year}")
	public @ResponseBody Iterable<Expense> getExpensesByMonth(@PathVariable String id, @PathVariable int year, @PathVariable int month) {
		return expenseService.getExpensesByMonth(id, month, year);
	}
	
    /**
    Retrieves all of a user's expenses in a selected year
    @param id the ID of the user whose expenses are to be retrieved
    @param year the year to retrieve expenses from 
    @return all of a user's expenses for the given year
    */
	@CrossOrigin(origins = "http://localhost:8080")
	@RequestMapping(value = "/expenses/{id}/year/{year}")
	public @ResponseBody Iterable<Expense> getExpensesByYear(@PathVariable String id, @PathVariable int year) {
		return expenseService.getExpensesByYear(id, year);
	}
    
  	/**
    Retrieves the sum of all of a user's expenses in each month of a year\
    @param id the ID of the user whose expenses are to be retrieved
    @param year the year to retrieve expenses from 
    @return the total expenses of the user in each month of the chosen year
    */
	@CrossOrigin(origins = "http://localhost:8080")
	@RequestMapping(value = "/expenses/{id}/monthly/{year}")
	public @ResponseBody List<MonthlyReport> getMonthlyExpenses(@PathVariable String id, @PathVariable int year) {
		return expenseService.getMonthlyExpenses(id, year);
	}
    
}
