package ru.trollsmedjan.muninn.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.trollsmedjan.muninn.model.User;
import ru.trollsmedjan.muninn.model.dao.CompanyDao;
import ru.trollsmedjan.muninn.model.dao.UserDao;

import java.security.Principal;

/**
 * Created by syachin on 14.05.2015.
 */
@RestController
@RequestMapping("/user")
public class UserRestController {

    @Autowired
    private CompanyDao companyDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private PasswordEncoder passwordEncoder;



    @RequestMapping
    public Principal user(Principal user) {
        if (user == null)
            return null;
        System.out.println("logged in: " + user.getName());
        return user;
    }

    @RequestMapping(method = RequestMethod.POST)
    public void registerUser(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setEnabled(false);
        userDao.save(user);
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping(value = "/{email}/enable")
    public void enableUser(@PathVariable String email) {
        User user = userDao.findOne(email);
        if (user != null) {
            user.setEnabled(true);
            userDao.save(user);
        }
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping("/securetest")
    public @ResponseBody
    String greeting() {
        return "Greetings to admin!";
    }


}
