package user;


import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity 
public class User {
	
	@Id
	private String userID;
	private String email;
	private String password;
	private String fname;
	private String lname;
	private String userType;
	private Date dob;
	private Double annIncome;
	private String filingStatus;
	
	public User() {
		super();
		this.userID = "";
		this.email = "";
		this.password = "";
		this.fname = "";
		this.lname = "";
		this.userType = "";
		this.dob = null;
		this.annIncome = 0.0;
		this.filingStatus = "";
	}
	
	public User(String userID, String email, String password, String fname, String lname, String userType, Date dob,
			Double annIncome, String filingStatus) {
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
	
	public String toString() {
		return "Email: " + this.email + "\nUsername:  " + this.userID + "\nPassword: " + this.password + "\nFirst Name: " + this.fname + "\nLast Name: " + this.lname + "\nUser Type: " + this.userType
				+ "\nDOB: " + this.dob + "\nAnnual Income: " + this.annIncome + "\nFiling Status: " + this.filingStatus;
	}
	
	
	
	

	
	
}
