package ru.trollsmedjan.muninn.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

/**
 * Created by syachin on 15.05.2015.
 */
@RestController
public class AuthController {

    @RequestMapping(value = "/checkauth", method = RequestMethod.POST)
    public @ResponseBody
    Principal checkAuth(Principal user) {
        System.out.println(user);
        return user;
    }
}
