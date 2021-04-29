/**
Represents the credentials a user needs to log into the budgeting system.
@author Szymon Gogolowski, Kanishka Borana, ELise Merritt, Sushanth Nadam, Jacob Batista
*/
package app.user;

public class Login {
	
	
	private String userID;
	private String password;
	
    /**
    Creates a new Login object, with blank strings for the user ID and password
    */
	public Login() {
		this.userID = "";
		this.password = "";
	}
	
    /**
    Creates a new Login object. User ID and password must be specified.
    @param userID a string identifying a specific user
    @param password a string used by the user to confirm their identity
    */
	public Login(String userID, String password) {
		super();
		this.userID = userID;
		this.password = password;
	}
	
    /**
    Retrieves the ID of a user
    @return the ID identifying a user
    */
	public String getUserID() {
		return userID;
	}
	
    /**
    Sets a user's ID to a given string
    @param userID the new ID of a user
    */
	public void setUserID(String userID) {
		this.userID = userID;
	}
	
    /**
    Retrieves the password of a user
    @return password the password of a user
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
	
	
}
