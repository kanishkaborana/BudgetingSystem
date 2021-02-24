package app.user;

public class Login {
	
	
	private String userID;
	private String password;
	
	public Login() {
		this.userID = "";
		this.password = "";
	}
	
	public Login(String userID, String password) {
		super();
		this.userID = userID;
		this.password = password;
	}
	
	public String getUserID() {
		return userID;
	}
	
	public void setUserID(String userID) {
		this.userID = userID;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	
}
