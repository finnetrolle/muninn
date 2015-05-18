package ru.trollsmedjan.muninn;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.data.geo.Point;
import org.springframework.data.geo.Polygon;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CsrfFilter;
import ru.trollsmedjan.muninn.filters.CsrfHeaderFilter;
import ru.trollsmedjan.muninn.model.Company;
import ru.trollsmedjan.muninn.model.PowerSource;
import ru.trollsmedjan.muninn.model.User;
import ru.trollsmedjan.muninn.model.dao.CompanyDao;
import ru.trollsmedjan.muninn.model.dao.PowerSourceDao;
import ru.trollsmedjan.muninn.model.dao.UserDao;

/**
 * Created by syachin on 14.05.2015.
 */
@EnableAutoConfiguration
@ComponentScan
@Configuration
@SpringBootApplication
public class Muninn implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(Muninn.class, args);
    }

    @Autowired
    private CompanyDao companyDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private PowerSourceDao powerSourceDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... strings) throws Exception {
//        Company company = userDao.findOne("admin@mail.ru").getCompany();
//        for (int i = 0; i < 15; ++i) {
//            User user = new User();
//            user.setCompany(company);
//            user.setEmail("user" + i + "@mail.ru");
//            user.setName("User " + i + " Userovich");
//            user.setEnabled(true);
//            user.setPassword(passwordEncoder.encode("helloworld"));
//            user.setAuthority("ROLE_USER");
//            userDao.save(user);
//        }

//        Company company = new Company();
//        company.setName("Олигарх инкорпорейтед");
//        companyDao.save(company);
//        System.out.println(company);
//
//        User user = new User();
//        user.setName("Васильков Петр Прохорович");
//        user.setAuthority("ROLE_USER");
//        user.setCompany(company);
//        user.setEmail("vasil@mail.ru");
//        user.setPassword(passwordEncoder.encode("helloworld"));
//        user.setEnabled(true);
//        userDao.save(user);
//        System.out.println(user);
//
//        user = new User();
//        user.setName("Архаров Модест Павлович");
//        user.setAuthority("ROLE_ADMIN");
//        user.setCompany(company);
//        user.setEmail("admin@mail.ru");
//        user.setPassword(passwordEncoder.encode("helloworld"));
//        user.setEnabled(true);
//        userDao.save(user);
//        System.out.println(user);
//
//        PowerSource powerSource = new PowerSource();
//        powerSource.setCompany(company);
//        powerSource.setLocation(new Point(59.0, 30.0));
//        powerSource.setPolygon(new Polygon(
//                new Point(59.0, 30.0),
//                new Point(60.0, 30.0),
//                new Point(59.0, 31.0),
//                new Point(59.0, 30.0)));
//        powerSource.setName("ПС СПБ");
//        powerSource.setUsedPower(50);
//        powerSource.setPower("110/75/50");
//        powerSourceDao.save(powerSource);
//        System.out.println(powerSource);
    }
}
