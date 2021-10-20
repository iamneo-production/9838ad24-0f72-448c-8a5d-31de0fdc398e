package com.examly.springapp.service;

import com.examly.springapp.dao.Userdao;
import com.examly.springapp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    Userdao dao;

    public boolean register(User user){
        User checkuser=dao.findByemailId(user.getEmailId());
        if(checkuser!=null){
            return false;
        }
        if(dao.save(user)!=null){
            return true;
        }
        return false;
    }

    public List<User> getusers(){
        return dao.findAll();
    }



    public String deleteUserByName(String email){
        dao.deleteByemailId(email);
        return "Deleted "+email+" username successfully";
    }

    public String deletebyid(int id){
        dao.deleteById(id);
        return "ID Deleted";
    }

    public String update(User user){
        User existinguser=dao.findByemailId(user.getEmailId());
        if(existinguser==null){return "NO USER";}
        existinguser.setMobileNumber(user.getMobileNumber());
        existinguser.setCustomerName(user.getCustomerName());
        existinguser.setStatus(user.isStatus());
        existinguser.setPassword(user.getPassword());
        dao.save(existinguser);
        return "UPDATED SUCCESSFULLY";
    }

    public User getUserById(String emailId){
        User existing=dao.findByemailId(emailId);
        return existing;
    }


}
