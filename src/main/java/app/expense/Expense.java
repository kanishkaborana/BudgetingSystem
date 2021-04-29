/**
Represents an expense (something the user had to pay money for).
@author Szymon Gogolowski, Kanishka Borana, Elise Merritt, Sushanth Nadam, Jacob Batista
*/

package app.expense;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer expenseID;
    private String userID;
    private String expenseTitle;
    private Date dateAdded;
    private Double amount;
    private String category;
    private int recurring;

  	/**
    Constructs a new expense, with parameters already filled in with
    zeros, empty strings, and other "filler" values that can be
    replaced later.
    */
    public Expense() {
        super();
        this.expenseID = 0;
        this.userID = "";
        this.expenseTitle = "";
        this.dateAdded = null;
        this.amount = 0.0;
        this.category = "";
        this.recurring = 0;
    }

  	/**
    Constructs a new expense, with parameters specified by the user.
    @param userID the unique identification number that identifies a user
    @param expenseTitle the title of the expense
    @param dateAdded the date the user added the expense
    @param amount the amount the user paid for the expense
    @param category the category of the expense (rent, entertainment, etc.)
    @param recurring specifies if this expense is recurring (the user will pay it repeatedly) or not
    */
    public Expense(String userID, String expenseTitle, Date dateAdded, Double amount, String category, int recurring) {
        super();
        this.userID = userID;
        this.expenseTitle = expenseTitle;
        this.dateAdded = dateAdded;
        this.amount = amount;
        this.category = category;
        this.recurring = recurring;
    }
    
    
	/**
    Retrieves the identification number of an expense.
    @return expenseID the identification number of an expense
    */
    public Integer getExpenseID() {
        return expenseID;
    }
  
  	/**
    Sets the identification number of an expense to a given integer.
    @param expenseID the new identification number of the expense
    */
    public void setExpenseID(Integer expenseID) {
        this.expenseID = expenseID;
    }
  
  	/**
    Retrieves the identification number of a user.
    @return userID the identification number of a user as a string
    */
    public String getUserID() {
        return userID;
    }
  
  	/**
    Sets the identification number of a user to a given string
    @param userID the new identification number of the user as a string
    */
    public void setUserID(String userID) {
        this.userID = userID;
    }
  
 	/**
  	Retrieves the title of an expense
    @return expenseTitle the title of an expense
    */
    public String getExpenseTitle() {
        return expenseTitle;
    }
  
  	/**
    Sets the title of an expense to a given string.
    @param expenseTitle the new title of an expense
    */
    public void setExpenseTitle(String expenseTitle) {
        this.expenseTitle = expenseTitle;
    }
  
  	/**
    Retrieves the date an expense was added by the user
    @return dateAdded the date a user added an expense
    */
    public Date getDateAdded() {
        return dateAdded;
    }
  	/**
    Sets the date a user added an expense to a given date
    @param dateAdded the new date a user added an expense, as a Date object
  	*/
    public void setDateAdded(Date dateAdded) {
        this.dateAdded = dateAdded;
    }
  
  	/**
    Retrieves the amount of money a user paid for an expense.
    @return amount the amount of money a user paid for an expense
    */
    public Double getAmount() {
        return amount;
    }
  
   /**
   Sets the amount of money a user paid for an expense to a given double
   @param amount the new amount of money a user paid for an expense
   */
    public void setAmount(Double amount) {
        this.amount = amount;
    }
  
  	/**
    Retrieves the category of an expense
    @return category the category of an expense
    */
    public String getCategory() {
        return category;
    }
  
   	/**
    Sets the category of an expense to a given category
    @param category the new category of an expense (as a Category object)
    */
    public void setCategory(String category) {
        this.category = category;
    }
  
  	/**
    Retrieves an integer representing whether or not the expense recurrs.
    @return recurring an integer representing whether an expense is recurring or not
    */
    public int getRecurring() {
        return recurring;
    }
  
  	/**
    Sets an integer representing whether or not an expense recurrs to a given number.
    @param recurring the new integer representing whether or not a expense recurrs
    */
    public void setRecurring(int recurring) {
        this.recurring = recurring;
    }
	
   /**
   Creates and returns a string representing an expense, containing the expense ID, expense title,
   date expense was added, expense amount, and the category of the expense.
   @return a string representing an expense object
   */
    public String toString() {
        return "ExpenseID: " + this.expenseID + "\nUsername: " + this.userID + "\nExpense Title: " + this.expenseTitle + "\nDate Added: " + this.dateAdded + "\nAmount: " + this.amount + "\nCategory: " + this.category ;
    }



    
}
