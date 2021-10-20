package com.examly.springapp.controller;

import com.examly.springapp.model.Employee;
import com.examly.springapp.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class EmployeeController {
    @Autowired
    private EmployeeService service;

    @GetMapping("/getEmployee")
    public List<Employee> getEmployee(){
        return service.getEmployees();
    }


    @GetMapping("/getEmployeeById")
    public Employee getEmployeeById(@RequestParam String emailId){
        return service.getEmployeeByID(emailId);
    }

    @DeleteMapping("/delete")
    @Transactional
    public String deleteEmployee(@RequestParam String emailId){
        return service.deleteEmployee(emailId);
    }

    @PutMapping("/editEmployee")
    public Employee editEmployee(@RequestBody Employee employee){
        return service.editEmployee(employee);
    }

    @PostMapping("/saveEmployee")
    public boolean saveEmployee(@RequestBody Employee employee){
        return service.saveEmployee(employee);
    }








}
