/**
Provides services that allow the budgeting system to provide services to users
@author Szymon Gogolowski, Kanishka Borana, Elise Merritt, Sushanth Nadam, Jacob Batista
*/
package app.user;

import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepo;
	
    /**
    Retrieves all users in the budgeting system
    @return all users in the budgeting system
    */
	public Iterable<User> getAllUsers() {
		return userRepo.findAll();
	}
	
  	/**
    Retrieves a user
    @param id the identification number of the user to retrieve
    @return the user with the given id
    */
	public User getUserByID(String id) {
		try {
			User myUser = userRepo.findById(id).get();
			return myUser;
		}
		catch (NoSuchElementException nse) {
			return new User();
		}
	}
	
  	/**
    Adds a user
    @param user the user to add
    @return a message that the user was successfully added
    */
	public void addUser(User user) {
		userRepo.save(user);
		
	}
	
  	/**
    Deletes a user
    @param user the user to delete
    @return a message that the user was successfully deleted
    */
	public void deleteUser(User user) {
		userRepo.delete(user);
	}
	
  	/**
    Deletes the user with the given identification number
    @param id the identification number of the user to delete
    @return a message that the user was successfully deleted
    */
	public void deleteUserById(String id) {
		userRepo.deleteById(id);
	}
	
  	/**
    Authenticates a user logging into the system, by checking to see if the 
    user's credentials are correct.
    @param login a Login object containing the user's ID and password
    @return a message indicating whether or not the user was authenticated
    */
	public String authenticate(Login login) {
		try {
			User user = userRepo.findById(login.getUserID()).get();
			if(user.getUserType().equals("customer")) {
				if (user.getPassword().equals(login.getPassword()))
					return "Customer Permission Granted";
				else
					return "Customer Permission Denied";
			}
			else {
				if (user.getPassword().equals(login.getPassword()))
					return "Admin Permission Granted";
				else
					return "Admin Permission Denied";
			}
		}
		catch (NoSuchElementException nse) {
			return "No such user.";
		}
		
	}
	
  	/**
    Registers a new user, who is accessing the budgeting system for the 
    first time. Before registration, the system checks if the user already exists
    @param user the new user
    @return a message indicating whether or not the new user was registered successfully
    */
	public String register(User user) {
		if (!userRepo.findById(user.getUserID()).isPresent()) {
			userRepo.save(user);
			return "User created";
		}
		else {
			return "User exists";
		}
		
	}
	
  	/**
    Updates an existing user's registration information
    @param newUser a user object with the new information
    */
	public String update(User user) {
		User updateUser = userRepo.findById(user.getUserID()).get();
		updateUser.setAnnIncome(user.getAnnIncome());
		updateUser.setFilingStatus(user.getFilingStatus());
		updateUser.setFname(user.getFname());
		updateUser.setLname(user.getLname());
		updateUser.setEmail(user.getEmail());
		updateUser.setPassword(user.getPassword());
		userRepo.save(updateUser);
		return "User updated";
	}
	
}
