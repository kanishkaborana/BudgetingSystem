package app.user;

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
		try {
			User myUser = userRepo.findById(id).get();
			System.out.println(myUser);
			return myUser;
		}
		catch (NoSuchElementException nse) {
			return new User();
		}
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
	
	public String register(User user) {
		if (!userRepo.findById(user.getUserID()).isPresent()) {
			userRepo.save(user);
			return "User created";
		}
		else {
			return "User exists";
		}
		
	}
	
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
