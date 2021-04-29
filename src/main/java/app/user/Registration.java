/**
Represents the information users give the budgeting system when they register for it
@author Szymon Gogolowski, Kanishka Borana, Elise Merritt, Sushanth Nadam, Jacob Batista
*/
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
	
	/**
    Creates a new Registration object containing a user's registration information.
    @param userID the user's unique identification
    @param email the user's email address
    @param password the user's password
    @param fname the user's first name
    @param lname the user's last name
    @param userType the user's type (admin or not)
    @param dob the user's date of birth
    @param annIncome how much money the user makes in a year
    @param filingStatus the user's filing status (single, married filing jointly, etc.)
    */
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

	/**
    Retrieves the user's unique identification
    @return the ID of a user
    */
	public String getUserID() {
		return userID;
	}

	/**
    Sets the identification of a user to a given string
    @param userID the new ID of a user
    */
	public void setUserID(String userID) {
		this.userID = userID;
	}

	/**
    Retrieves the email address of a user
    @return email the email address of a user
    */
	public String getEmail() {
		return email;
	}

	/**
    Sets the email address of a user to a given string
    @param email the new email address of a user
    */
	public void setEmail(String email) {
		this.email = email;
	}

	/**
    Retrieves the password of a user
    @return the password of a user
    */
	public String getPassword() {
		return password;
	}

	/**
    Sets the password of a user to a given string
    @param password the new password of a user
    */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
    Retrieves the first name of a user
    @return fname the first name of a user
    */
	public String getFname() {
		return fname;
	}

	/**
    Sets the first name of a user to a given string
    @param fname the new first name of a user
    */
	public void setFname(String fname) {
		this.fname = fname;
	}

	/**
    Retrieves the last name of a user
    @return lname the last name of a user
    */
	public String getLname() {
		return lname;
	}

	/**
    Sets the last name of a user to a given string
    @param lname the new last name of a user
    */
	public void setLname(String lname) {
		this.lname = lname;
	}

	/**
    Retrieves a user's type (admin, etc.)
    @return userType a user's type
    */
	public String getUserType() {
		return userType;
	}

	/**
    Sets a user's type to a given string
    @param userType the new type of a user
    */
	public void setUserType(String userType) {
		this.userType = userType;
	}

	/**
    Retrieves a user's birth date as a Date object
    @return dob a user's date of birth
    */
	public Date getDob() {
		return dob;
	}

	/**
    Sets a user's birth date to a given Date object
    @param dob a user's new date of birth
    */
	public void setDob(Date dob) {
		this.dob = dob;
	}

	/**
    Retrieves the annual income of a user, or how much money
    they earn in a year
    @return annIncome a user's annual income
    */
	public Double getAnnIncome() {
		return annIncome;
	}

	/**
    Sets a user's annual income to a given Double
    @param annIncome the user's new annual income
    */
	public void setAnnIncome(Double annIncome) {
		this.annIncome = annIncome;
	}

	/**
    Retrieves the tax filing status of a user (single, married filing
    jointly/apart, etc.)
    @return filingStatus the filing status of a user
    */
	public String getFilingStatus() {
		return filingStatus;
	}

	/**
    Sets a user's filing status to a given string
    @param filingStatus the user's new filing status
    */
	public void setFilingStatus(String filingStatus) {
		this.filingStatus = filingStatus;
	}
	
	
	
	
}
