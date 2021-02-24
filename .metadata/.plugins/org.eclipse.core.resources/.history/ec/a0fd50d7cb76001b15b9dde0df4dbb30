package user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {

	@Autowired
	private UserService userService;
	
	@RequestMapping("/users")
	public Iterable<User> getAllUsers() {
		return userService.getAllUsers();
	}
	
	@RequestMapping("/users/{id}")
	public User getUserById(@PathVariable String id) {
		return userService.getUserByID(id);
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value = "users/delete/{id}")
	public @ResponseBody String deleteUserById(@PathVariable String id){
		userService.deleteUserById(id);
		return "User Succesfully deleted!";
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value = "users/delete")
	public @ResponseBody String deleteUser(@RequestBody User user){
		userService.deleteUser(user);
		return "User Succesfully deleted!";
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "users/add")
	public @ResponseBody String addUser(@RequestBody User user){
		userService.addUser(user);
		return "User Succesfully added!";
	}
	
	@PostMapping(value = "/users/authenticate")
	public @ResponseBody String authenticate(@RequestBody Login login) {
		return userService.authenticate(login);
	}
	
	@PostMapping(value = "/users/register")
	public @ResponseBody String register(@RequestBody User newUser) {
		return userService.register(newUser);
	}
	
}
