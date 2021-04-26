package app.expense;

import java.sql.Date;
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
	
	@RequestMapping("/expenses")
	public Iterable<Expense> getAllExpense() {
		return expenseService.getAllExpense();
	}
	
	@RequestMapping("/expenses/{id}")
	public Expense getExpenseById(@PathVariable Integer id) {
		return expenseService.getExpenseByID(id);
	}

	@RequestMapping("/expense/{userID}")
	public Iterable<Expense> getExpenseByUserID(@PathVariable String userID) {
		return expenseService.getExpensesByUserID(userID);
	}
		
	@RequestMapping(method = RequestMethod.DELETE, value = "/expenses/delete/{id}")
	public @ResponseBody String deleteExpenseById(@PathVariable Integer id){
		expenseService.deleteExpenseById(id);
		return "Expense Succesfully deleted!";
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/expenses/delete")
	public @ResponseBody String deleteExpense(@RequestBody Expense expense){
		expenseService.deleteExpense(expense);
		return "Expense Succesfully deleted!";
	}
	
	@PostMapping(value = "/expenses/added")
	public @ResponseBody String addExpense(@RequestBody Expense expense){
		expenseService.addExpense(expense);
		return "Expense Succesfully added!";
	}
	
	@CrossOrigin(origins = "http://localhost:8080")
	@PostMapping(value = "/expense/add")
	public @ResponseBody String add(@RequestBody Expense newExpense) {
		return expenseService.add(newExpense);
	}

	@CrossOrigin(origins = "http://localhost:8080")
	@PostMapping(value = "/expenses/update")
	public @ResponseBody String update(@RequestBody Expense newExpense) {
		return expenseService.update(newExpense);
	}

	@CrossOrigin(origins = "http://localhost:8080")
	@RequestMapping(value = "/expenses/{id}/month/{month}/year/{year}")
	public @ResponseBody Iterable<Expense> getExpensesByMonth(@PathVariable String id, @PathVariable int year, @PathVariable int month) {
		return expenseService.getExpensesByMonth(id, month, year);
	}

	@CrossOrigin(origins = "http://localhost:8080")
	@RequestMapping(value = "/expenses/{id}/year/{year}")
	public @ResponseBody Iterable<Expense> getExpensesByYear(@PathVariable String id, @PathVariable int year) {
		return expenseService.getExpensesByYear(id, year);
	}

	@CrossOrigin(origins = "http://localhost:8080")
	@RequestMapping(value = "/expenses/{id}/monthly/{year}")
	public @ResponseBody List<MonthlyReport> getMonthlyExpenses(@PathVariable String id, @PathVariable int year) {
		return expenseService.getMonthlyExpenses(id, year);
	}
    
}
