package ru.trollsmedjan.muninn.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
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

    @RequestMapping
    public Principal user(Principal user) {
        return user;
    }

    @RequestMapping(method = RequestMethod.POST)
    public void registerUser(@RequestBody User user) {

    }
}
