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

    public Expense() {
        super();
        this.expenseID = 0;
        this.userID = "";
        this.expenseTitle = "";
        this.dateAdded = null;
        this.amount = 0.0;
        this.category = "";
    }

    public Expense(String userID, String expenseTitle, Date dateAdded, Double amount, String category) {
        super();
        this.userID = userID;
        this.expenseTitle = expenseTitle;
        this.dateAdded = dateAdded;
        this.amount = amount;
        this.category = category;
    }
    
    

    public Integer getExpenseID() {
        return expenseID;
    }
    public void setExpenseID(Integer expenseID) {
        this.expenseID = expenseID;
    }
    public String getUserID() {
        return userID;
    }
    public void setUserID(String userID) {
        this.userID = userID;
    }
    public String getExpenseTitle() {
        return expenseTitle;
    }
    public void setExpenseTitle(String expenseTitle) {
        this.expenseTitle = expenseTitle;
    }
    public Date getDateAdded() {
        return dateAdded;
    }
    public void setDateAdded(Date dateAdded) {
        this.dateAdded = dateAdded;
    }
    public Double getAmount() {
        return amount;
    }
    public void setAmount(Double amount) {
        this.amount = amount;
    }
    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }

    public String toString() {
        return "ExpenseID: " + this.expenseID + "\nUsername: " + this.userID + "\nExpense Title: " + this.expenseTitle + "\nDate Added: " + this.dateAdded + "\nAmount: " + this.amount + "\nCategory: " + this.category ;
    }



    
}
