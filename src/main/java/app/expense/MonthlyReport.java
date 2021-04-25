package app.expense;



public class MonthlyReport {
    private String month;
    private double amount;

    public MonthlyReport() {
        this.month = "";
        this.amount = 0.0;
    }

    public MonthlyReport(String month, double amount) {
        this.month = month;
        this.amount = amount;
    }

    public String getMonth() {
        return this.month;
    }

    public double getAmount() {
        return this.amount;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}
