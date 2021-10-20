package com.examly.springapp.service;

import com.examly.springapp.dao.Routedao;
import com.examly.springapp.model.Route;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RouteService {
    @Autowired
    private Routedao dao;


    public List<Route> getRoutes(){
        return dao.findAll();
    }

    public Route getRouteById(String registrationNo){
        return dao.findByRegistrationNo(registrationNo);
    }

    public String addRoute(Route route){
        dao.save(route);
        return "Routes Added Successfully";
    }

    public String editRoute(Route route){
        Route existingRoute=dao.findByRegistrationNo(route.getRegistrationNo());
        if(existingRoute==null){return "Route Not Present";}
        existingRoute.setDate(route.getDate());
        existingRoute.setDistance(route.getDistance());
        existingRoute.setCarModel(route.getCarModel());
        existingRoute.setEndPoint(route.getEndPoint());
        existingRoute.setRegistrationNo(route.getRegistrationNo());
        existingRoute.setStartPoint(route.getStartPoint());
        existingRoute.setTime(route.getTime());
        existingRoute.setSeatsAvailable(route.getSeatsAvailable());
        dao.save(existingRoute);
        return "Successfully routes edited";
    }

    public String deleteRoute(String registrationNumber){
        dao.deleteByRegistrationNo(registrationNumber);
        return "Route with vehicle Registration No: "+registrationNumber+" is Deleted Successfully";

    }

}
