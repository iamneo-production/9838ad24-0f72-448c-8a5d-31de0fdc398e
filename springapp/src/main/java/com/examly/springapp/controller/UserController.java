package com.examly.springapp.controller;

import com.examly.springapp.model.Route;
import com.examly.springapp.model.User;
import com.examly.springapp.service.LoginService;
import com.examly.springapp.service.RouteService;
import com.examly.springapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserService service;
    @Autowired
    private LoginService loginService;
    @Autowired
    private RouteService routeService;

    @PostMapping("/signup")
    public boolean register(@RequestBody User user){
        System.out.println(user.getEmailId()+" "+user.getPassword()+" "+user.getCustomerName()+" "+user.getMobileNumber());

        loginService.savelogin(user);

        return service.register(user);
    }

    @PutMapping("/editCustomer")
    public String editCustomer(@RequestBody User user){

        if(loginService.update(user)){
            return service.update(user);}
        return "Error in updating";
    }

    @GetMapping("/routes")
    public List<Route> getRoutes(){
        return routeService.getRoutes();
    }

    @GetMapping("/routeById")
    public Route getRouteById(@RequestParam String registrationNumber){
        return routeService.getRouteById(registrationNumber);
    }


    @GetMapping("/getUserById")
    public User getUserDetails(@RequestParam String emailId){
        return service.getUserById(emailId);
    }

    @GetMapping("/getUsers")
    public List<User> getUsers(){
        return service.getusers();
    }

    @DeleteMapping("/deleteUserByEmail")
    @Transactional
    public String deleteUserByEmail(@RequestParam String emailId){
        return service.deleteUserByName(emailId);
    }


}
