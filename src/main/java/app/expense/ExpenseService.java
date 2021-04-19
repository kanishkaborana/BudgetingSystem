package app.expense;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.jpa.repository.Query;
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
    
}
