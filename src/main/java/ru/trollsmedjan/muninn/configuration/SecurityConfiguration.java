package ru.trollsmedjan.muninn.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import ru.trollsmedjan.muninn.filters.CsrfHeaderFilter;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;


/**
 * Created by syachin on 14.05.2015.
 */
@Configuration
@EnableGlobalMethodSecurity(securedEnabled = true)
@EnableAutoConfiguration
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private DataSource dataSource;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .httpBasic().and()
                .authorizeRequests()
                .antMatchers("/index.html", "/views/home.html", "/views/login.html", "/")
                .permitAll().anyRequest()
                .authenticated().and()
                .addFilterAfter(new CsrfHeaderFilter(), CsrfFilter.class)
                .csrf().csrfTokenRepository(csrfTokenRepository())
        .and().logout().logoutSuccessUrl("/")
                ;
//                .and()
//                .formLogin()
//                .loginPage("/login")
//                .permitAll()
//                .and()
//                .logout()
//                .permitAll();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.jdbcAuthentication()
                .dataSource(dataSource)
                .passwordEncoder(passwordEncoder())
                .usersByUsernameQuery("Select email, password, enabled from users where email=?")
                .authoritiesByUsernameQuery("select email, authority from users where email=?");

//        JdbcUserDetailsManager userDetailsService = new JdbcUserDetailsManager();
//        userDetailsService.setDataSource(dataSource);
//        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//
//        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
//        auth.jdbcAuthentication().dataSource(dataSource)
//                .usersByUsernameQuery("Select email, password, enabled from users where email=?")
//                .authoritiesByUsernameQuery("select email, authority from users where email=?");
//
//        if (!userDetailsService.userExists("user")) {
//            List<GrantedAuthority> authorities = new ArrayList<>();
//            authorities.add(new SimpleGrantedAuthority("USER"));
//            User userDetails = new User("user", passwordEncoder.encode("user"), authorities);
//            userDetailsService.createUser(userDetails);
//        }
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder;
    }

    private CsrfTokenRepository csrfTokenRepository() {
        HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
        repository.setHeaderName("X-XSRF-TOKEN");
        return repository;
    }
}















