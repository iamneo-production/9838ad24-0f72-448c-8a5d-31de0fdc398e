package com.examly.springapp.controller;

import com.examly.springapp.model.User;
import com.examly.springapp.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @Autowired
    public LoginService service;

    @PostMapping("/login")
    public boolean verifyLogin(@RequestBody User user){
        return service.verifyLogin(user.getEmailId(), user.getPassword());
    }
}
