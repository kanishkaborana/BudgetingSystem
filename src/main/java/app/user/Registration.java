package app.user;

import java.sql.Date;

public class Registration {
	
	private String userID;
	private String email;
	private String password;
	private String fname;
	private String lname;
	private String userType;
	private Date dob;
	private Double annIncome;
	private String filingStatus;
	
	
	public Registration(String userID, String email, String password, String fname, String lname, String userType,
			Date dob, Double annIncome, String filingStatus) {
		super();
		this.userID = userID;
		this.email = email;
		this.password = password;
		this.fname = fname;
		this.lname = lname;
		this.userType = userType;
		this.dob = dob;
		this.annIncome = annIncome;
		this.filingStatus = filingStatus;
	}


	public String getUserID() {
		return userID;
	}


	public void setUserID(String userID) {
		this.userID = userID;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public String getFname() {
		return fname;
	}


	public void setFname(String fname) {
		this.fname = fname;
	}


	public String getLname() {
		return lname;
	}


	public void setLname(String lname) {
		this.lname = lname;
	}


	public String getUserType() {
		return userType;
	}


	public void setUserType(String userType) {
		this.userType = userType;
	}


	public Date getDob() {
		return dob;
	}


	public void setDob(Date dob) {
		this.dob = dob;
	}


	public Double getAnnIncome() {
		return annIncome;
	}


	public void setAnnIncome(Double annIncome) {
		this.annIncome = annIncome;
	}


	public String getFilingStatus() {
		return filingStatus;
	}


	public void setFilingStatus(String filingStatus) {
		this.filingStatus = filingStatus;
	}
	
	
	
	
}
