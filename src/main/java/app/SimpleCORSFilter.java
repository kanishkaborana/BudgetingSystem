/**
Simple CORS filter that allows webpages in project to make requests
@author Szymon Gogolowski, Kanishka Borana, ELise Merritt, Sushanth Nadam, Jacob Batista
*/
package app;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class SimpleCORSFilter implements Filter {

	private final Logger log = LoggerFactory.getLogger(SimpleCORSFilter.class);

	/**
    Creates a new SimpleCORSFilter object
	*/
	public SimpleCORSFilter() {
    	log.info("SimpleCORSFilter init");
	}
	
  	/**
    Allows webpages of project to make requests, by receiving a request and response, then
    passing it to the next part of the chain
    @param req the request as a ServletRequest object
    @param res the response as a ServletResponse object
    @param chain the chain the request and response are traveling through
    */
	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {

    	HttpServletRequest request = (HttpServletRequest) req;
   	 	HttpServletResponse response = (HttpServletResponse) res;

    	response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
    	response.setHeader("Access-Control-Allow-Credentials", "true");
    	response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    	response.setHeader("Access-Control-Max-Age", "3600");
    	response.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");

    	chain.doFilter(req, res);
	}
	
  	/**
    Initializes the CORS filter by placing it in service
    @param filterConfig holds information needed for initialization
    */
	@Override
	public void init(FilterConfig filterConfig) {
	}
	
  	/**
    Destroys the CORS filter by removing it from service
    */
	@Override
	public void destroy() {
	}

}
