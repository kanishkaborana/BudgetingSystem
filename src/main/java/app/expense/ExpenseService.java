/**
Provides methods to manage a user's expenses
@author Szymon Gogolowski, Kanishka Borana, ELise Merritt, Sushanth Nadam, Jacob Batista
*/
package app.expense;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepo;
	
  	/**
    Retrieves all expenses in the budgeting system
    @return all expenses fond in the budgeting system
    */
    public Iterable<Expense> getAllExpense() {
		return expenseRepo.findAll();
	}
	
  	/**
    Retrieves an expense
    @param id the identification number of the expense to retrieve
    @return myExpense expense with the given id
    */
	public Expense getExpenseByID(Integer id) {
		try {
			Expense myExpense = expenseRepo.findById(id).get();
			return myExpense;
		}
		catch (NoSuchElementException nse) {
			return new Expense();
		}
	}
	
	/**
    Retrieves all expenses of a specified user
    @param userID the ID of the user whose expenses are
    to be retrieved
    @return all expenses of the user with the given id
    */
	public Iterable<Expense> getExpensesByUserID(String userID) {
		return expenseRepo.getExpensesByUserID(userID);
	}
	
  	/**
    Adds an expense
    @param newExpense the expense to add
    */
	public void addExpense(Expense expense) {
		expenseRepo.save(expense);
		
	}
	
  	/**
    Deletes an expense
    @param expense the expense to delete
    */
	public void deleteExpense(Expense expense) {
		expenseRepo.delete(expense);
	}
	
  	/**
    Deletes the expense with the given identification number
    @param id the identification number of the expense to delete
    */
	public void deleteExpenseById(Integer id) {
		expenseRepo.deleteById(id);
	}
	
  	/**
    Adds an expense after checking if the expense already exists
    @param expense the expense to add
    @return a message telling the user if the expense already exists or
    has just been created.
    */
    public String add(Expense expense) {
		if (!expenseRepo.findById(expense.getExpenseID()).isPresent()) {
			expenseRepo.save(expense);
			return "Expense created";
		}
		else {
			return "Expense exists";
		}
		
	}
	
  	/**
    Updates an expense
    @param expense the expense to update
    @return a message telling the user the expense was updated
    */
	public String update(Expense expense) {
		Expense updateExpense = expenseRepo.findById(expense.getExpenseID()).get();
		updateExpense.setExpenseTitle(expense.getExpenseTitle());
		updateExpense.setAmount(expense.getAmount());
		updateExpense.setCategory(expense.getCategory());
		updateExpense.setUserID(expense.getUserID());
		updateExpense.setDateAdded(expense.getDateAdded());
		updateExpense.setRecurring(expense.getRecurring());
		expenseRepo.save(updateExpense);
		return "Expense updated";
	}
	
  	/**
    Retrieves all of a user's expenses in a selected month
    @param id the ID of the user whose expenses are to be retrieved
    @param year the year the month to retrieve expenses from was in
    @param month the month to retrieve expenses from 
    @return all of a user's expenses for the given month
    */
	public Iterable<Expense> getExpensesByMonth(String id, int month, int year) {
		Date date1 = new Date(year - 1900, month, 1);
		Date date2 = new Date(year - 1900, month + 1, 0);
		return expenseRepo.getExpensesBetween(id, date1, date2);
	}

	/**
    Retrieves all of a user's expenses in a selected year
    @param id the ID of the user whose expenses are to be retrieved
    @param year the year to retrieve expenses from 
    @return all of a user's expenses for the given year
    */
	public Iterable<Expense> getExpensesByYear(String id, int year) {
		Date date1 = new Date(year - 1900, 0, 1);
		Date date2 = new Date(year - 1900, 11, 31);
		return expenseRepo.getExpensesBetween(id, date1, date2);
	}
	
  	/**
    Retrieves the sum of all of a user's expenses in each month of a year\
    @param id the ID of the user whose expenses are to be retrieved
    @param year the year to retrieve expenses from 
    @return output the total expenses of the user in each month of the chosen year
    */
	public List<MonthlyReport> getMonthlyExpenses(String id, int year) {
		String[] monthNames = {"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"};
		List<MonthlyReport> output = new ArrayList<MonthlyReport>();
		for (int i = 0; i < 12; i ++) {
			Iterable<Expense> monthlyExpense = getExpensesByMonth(id, i, year);
			double sum = 0;
			for (Expense e : monthlyExpense) 
				sum += e.getAmount();
			output.add(new MonthlyReport(monthNames[i], sum));
		}
		System.out.println(output);
		return output;
	}
    
}
