/**
Allows the budgeting system to manage users 
@author Szymon Gogolowski, Kanishka Borana, ELise Merritt, Sushanth Nadam, Jacob Batista
*/
package app.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
public class UserController {

	@Autowired
	private UserService userService;
	
  	/**
    Retrieves all users in the budgeting system
    @return all users in the budgeting system
    */
	@RequestMapping("/users")
	public Iterable<User> getAllUsers() {
		return userService.getAllUsers();
	}
	
  	/**
    Retrieves a user
    @param id the identification number of the user to retrieve
    @return the user with the given id
    */
	@RequestMapping("/users/{id}")
	public User getUserById(@PathVariable String id) {
		return userService.getUserByID(id);
	}
	
  	/**
    Deletes the user with the given identification number
    @param id the identification number of the user to delete
    @return a message that the user was successfully deleted
    */
	@RequestMapping(method = RequestMethod.DELETE, value = "/users/delete/{id}")
	public @ResponseBody String deleteUserById(@PathVariable String id){
		userService.deleteUserById(id);
		return "User Succesfully deleted!";
	}
	
  	/**
    Deletes a user
    @param user the expense to delete
    @return a message that the user was successfully deleted
    */
	@RequestMapping(method = RequestMethod.DELETE, value = "/users/delete")
	public @ResponseBody String deleteUser(@RequestBody User user){
		userService.deleteUser(user);
		return "User Succesfully deleted!";
	}
	
  	/**
    Adds a user
    @param user the user to add
    @return a message that the user was successfully added
    */
	@PostMapping(value = "/users/add")
	public @ResponseBody String addUser(@RequestBody User user){
		userService.addUser(user);
		return "User Succesfully added!";
	}
	
  	/**
    Authenticates a user logging into the system, by checking to see if the 
    user's credentials are correct.
    @param login a Login object containing the user's ID and password
    @return a message indicating whether or not the user was authenticated
    */
	@PostMapping(value = "/users/authenticate")
	public @ResponseBody String authenticate(@RequestBody Login login) {
		return userService.authenticate(login);
	}
  
  	/**
    Registers a new user, who is accessing the budgeting system for the 
    first time.
    @param newUser the new user
    @return a message indicating whether or not the new user was registered successfully
    */
	@CrossOrigin(origins = "http://localhost:8080")
	@PostMapping(value = "/users/register")
	public @ResponseBody String register(@RequestBody User newUser) {
		return userService.register(newUser);
	}

  	/**
    Updates an existing user's information
    @param newUser a user object with the new information
    */
	@CrossOrigin(origins = "http://localhost:8080")
	@PostMapping(value = "/users/update")
	public @ResponseBody String update(@RequestBody User newUser) {
		return userService.update(newUser);
	}


	
}
