package com.examly.springapp.service;

import com.examly.springapp.dao.Employeedao;
import com.examly.springapp.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {
    @Autowired
    Employeedao dao;

    public List<Employee> getEmployees(){
        return dao.findAll();
    }

    public Employee getEmployeeByID(String emailId){

        Employee result=dao.findByEmail(emailId);
        if(result==null){return null;}
        return result;
    }

    public Employee editEmployee(Employee employee){
        Employee existingEmployee=dao.findByEmail(employee.getEmail());
        if(existingEmployee==null){return null;}
        existingEmployee.setVehicleNumber(employee.getVehicleNumber());
        existingEmployee.setVehicleModel(employee.getVehicleModel());
        existingEmployee.setUsername(employee.getUsername());
        existingEmployee.setMobileNumber(employee.getMobileNumber());
        existingEmployee.setPassword(employee.getPassword());
        existingEmployee.setEmail(employee.getEmail());
        existingEmployee.setActive(employee.isActive());
        existingEmployee.setVerified(employee.isVerified());
        dao.save(existingEmployee);
        return existingEmployee;

    }

    public boolean saveEmployee(Employee employee){
        Employee existing=dao.findByEmail(employee.getEmail());
        if(existing!=null){return false;}
        dao.save(employee);
        return true;
    }

    public String deleteEmployee(String emailId){
        System.out.println(emailId+"===========");
        if(dao.deleteByEmail(emailId)!=null){
            return "Deleted Employee";}
        return "Error in deleting";
    }






}
