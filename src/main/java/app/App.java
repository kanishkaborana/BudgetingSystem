/**
Runs the budgeting system so it can be used
@author Szymon Gogolowski, Kanishka Borana, ELise Merritt, Sushanth Nadam, Jacob Batista
*/
package app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class App {
	
  	/**
    Main method that runs the budgeting system by calling the application's
    run method
    */
	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
		
		
	}

}

