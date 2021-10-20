package com.examly.springapp.controller;

import com.examly.springapp.model.Route;
import com.examly.springapp.service.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class RouteController {
    @Autowired
    private RouteService service;

    @GetMapping("/routes")
    public List<Route> getRoute(){
        return service.getRoutes();
    }

    @PostMapping("/addRoutes")
    public String saveRoute(@RequestBody Route route){
        return service.addRoute(route);
    }

    @DeleteMapping("/deleteRoutes")
    @Transactional
    public String deleteRoute(@RequestParam String registrationNo){
        return service.deleteRoute(registrationNo);
    }

    @PutMapping("/editRoutes")
    public String editRoute(@RequestBody Route route){
        return service.editRoute(route);
    }



}
