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

    public Iterable<Expense> getAllExpense() {
		return expenseRepo.findAll();
	}
	
	public Expense getExpenseByID(Integer id) {
		try {
			Expense myExpense = expenseRepo.findById(id).get();
			System.out.println(myExpense);
			return myExpense;
		}
		catch (NoSuchElementException nse) {
			return new Expense();
		}
	}
	

	public Iterable<Expense> getExpensesByUserID(String userID) {
		return expenseRepo.getExpensesByUserID(userID);
	}

	public void addExpense(Expense expense) {
		System.out.println(expense);
		expenseRepo.save(expense);
		
	}
	
	public void deleteExpense(Expense expense) {
		expenseRepo.delete(expense);
	}
	
	public void deleteExpenseById(Integer id) {
		expenseRepo.deleteById(id);
	}
	
    public String add(Expense expense) {
		if (!expenseRepo.findById(expense.getExpenseID()).isPresent()) {
			expenseRepo.save(expense);
			return "Expense created";
		}
		else {
			return "Expense exists";
		}
		
	}
	
	public String update(Expense expense) {
		Expense updateExpense = expenseRepo.findById(expense.getExpenseID()).get();
		updateExpense.setExpenseTitle(expense.getExpenseTitle());
		updateExpense.setAmount(expense.getAmount());
		updateExpense.setCategory(expense.getCategory());
		updateExpense.setUserID(expense.getUserID());
		updateExpense.setDateAdded(expense.getDateAdded());
		expenseRepo.save(updateExpense);
		return "Expense updated";
	}

	public Iterable<Expense> getExpensesByMonth(String id, int month, int year) {
		Date date1 = new Date(year - 1900, month, 1);
		Date date2 = new Date(year - 1900, month + 1, 0);
		System.out.println(date1 + " AND " + date2);
		return expenseRepo.getExpensesBetween(id, date1, date2);
	}


	public Iterable<Expense> getExpensesByYear(String id, int year) {
		Date date1 = new Date(year - 1900, 0, 1);
		Date date2 = new Date(year - 1900, 11, 31);
		System.out.println(date1 + " AND " + date2);
		return expenseRepo.getExpensesBetween(id, date1, date2);
	}

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
		return output;
	}
    
}
