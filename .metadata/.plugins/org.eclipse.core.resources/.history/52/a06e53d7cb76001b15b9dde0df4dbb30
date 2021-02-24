package user;

import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepo;
	
	public Iterable<User> getAllUsers() {
		return userRepo.findAll();
	}
	
	public User getUserByID(String id) {
		User myUser = userRepo.findById(id).get();
		System.out.println(myUser);
		return myUser;
	}
	
	public void addUser(User user) {
		System.out.println(user);
		userRepo.save(user);
		
	}
	
	public void deleteUser(User user) {
		userRepo.delete(user);
	}
	
	public void deleteUserById(String id) {
		userRepo.deleteById(id);
	}
	
	public String authenticate(Login login) {
		try {
			User user = userRepo.findById(login.getUserID()).get();
			if (user.getPassword().equals(login.getPassword()))
				return "Permission Granted";
			else
				return "Permission Denied";
		}
		catch (NoSuchElementException nse) {
			return "No such user.";
		}
		
	}
	
	public String register(User user) {
		if (userRepo.findById(user.getUserID()) == null) {
			userRepo.save(user);
			return "Account created";
		}
		else {
			return "User already exists";
		}
	}
	
}
