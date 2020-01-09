
package pl.raptors.raptorsRobotsApp.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.annotation.Resource;

//import javax.sql.DataSource;

@EnableCaching(proxyTargetClass = true)
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Resource(name = "myUserDetailsService")
    private UserDetailsService userDetailsService;

    @Autowired
    public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication().withUser("admin").password("{noop}admin").roles("ADMIN");
        auth.inMemoryAuthentication().withUser("serviceman").password("{noop}serviceman").roles("SERVICEMAN", "REGULAR_USER");
        auth.inMemoryAuthentication().withUser("super_user").password("{noop}super_user").roles("SUPER_USER", "REGULAR_USER");
        auth.inMemoryAuthentication().withUser("regular_user").password("{noop}regular_user").roles("REGULAR_USER");
        auth.inMemoryAuthentication().withUser("robot").password("{noop}robot").roles("ROBOT");

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }

    //ZAKOEMNTOWANY PRZYKŁAD POD REKACYJNA BAZE DANYCH, W PRZYSZLOSCI DO PRZEROBIENIA POD MONGO

/*   @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private DataSource dataSource;

    @Autowired
    CustomSuccessHandler customSuccessHandler;

    @Value("select login, password, active from user where login=?")
    private String usersQuery;

    @Value("select u.login, r.role from user u inner join user_role ur on(u.id=ur.user_id) inner join role r on(ur.role_id=r.id) where u.login=?")
    private String rolesQuery;

    @Override
    protected void configure(AuthenticationManagerBuilder auth)
            throws Exception {
        auth.
                jdbcAuthentication()
                .usersByUsernameQuery(usersQuery)
                .authoritiesByUsernameQuery(rolesQuery)
                .dataSource(dataSource)
                .passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.
                authorizeRequests()
                .antMatchers("/manage/**").hasAnyAuthority("ADMIN","MANAGER")
                .antMatchers("/tenant/**").hasAuthority("TENANT")
                .antMatchers("/users").hasAuthority("ADMIN")
                .antMatchers("/login").permitAll()
                .antMatchers("/register").permitAll()
                .antMatchers("/registrationConfirm*").permitAll()
                .antMatchers("/successRegister").permitAll()
                .antMatchers("/emailError*").permitAll()
                .antMatchers("/favicon.ico").permitAll()
                .anyRequest()
                .authenticated().and().csrf().disable().formLogin()
                .loginPage("/login").failureUrl("/login?error=true")
                .successHandler(customSuccessHandler)
                .usernameParameter("login")
                .passwordParameter("password")
                .and().logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .logoutSuccessUrl("/").and().exceptionHandling()
                .accessDeniedPage("/access-denied");
    }*//*

 */
/*   @Override
    public void configure(WebSecurity web) throws Exception {
        web
                .ignoring()
                .antMatchers("/webapp/**", "/resources/**", "/static/**", "/css/**", "/js/**", "/images/**");
    }*/

}
