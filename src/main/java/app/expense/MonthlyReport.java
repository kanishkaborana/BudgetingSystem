/**
Represents a monthly report, or the total sum of a user's expenses in a given month
@author Szymon Gogolowski, Kanishka Borana, Elise Merritt, Sushanth Nadam, Jacob Batista
*/
package app.expense;



public class MonthlyReport {
    private String month;
    private double amount;
	
  	/**
    Creates a new monthly report, with month left blank and 
    total expenses set to zero.
    */
    public MonthlyReport() {
        this.month = "";
        this.amount = 0.0;
    }
	
    /**
    Creates a new monthly report. The month and total expenses
    must be specified.
    @param month the month to report expenses for
    @param amount the total expenses of a user during the given month
    */
    public MonthlyReport(String month, double amount) {
        this.month = month;
        this.amount = amount;
    }
	
    /**
    Retrieves the month a report was created for
    @return month the month a report was created for
    /*
    public String getMonth() {
        return this.month;
    }
	
    /**
    Retrieves the total expenses of a user in the month reported
    @return amount the amount a user spent in the month reported
    */
    public double getAmount() {
        return this.amount;
    }
	
    /**
    Sets the month a report was created for
    @param month the month a report was created
    */
    public void setMonth(String month) {
        this.month = month;
    }
	
    /**
    Sets the total expenses of a user during a month
    @param amount the total expenses of a user in a month
    */
    public void setAmount(double amount) {
        this.amount = amount;
    }
  	
  	/**
    Returns a string representing a monthly report.
    @return a string displaying the month and amount of a report.
    */
  	public String toString(){
    	return this.month + " "+this.amount;
    }
}
