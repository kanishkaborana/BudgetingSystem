/**
Allows system to access repository of users
@author Szymon Gogolowski, Kanishka Borana, Elise Merritt, Sushanth Nadam, Jacob Batista
*/
package app.user;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, String>{
	
	
}
