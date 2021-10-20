package com.examly.springapp.service;

import com.examly.springapp.dao.Logindao;
import com.examly.springapp.model.Login;
import com.examly.springapp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
    @Autowired
    Logindao dao;

    public boolean verifyLogin(String username,String password){
        Login user=dao.findByemail(username);
        if(user==null){return false;}
        if(user.getPassword().equals(password)){return true;}
        return false;
    }

    public boolean savelogin(User user){
        Login existed=dao.findByemail(user.getEmailId());
        if(existed!=null){return false;}
        Login details=new Login();
        details.setEmail(user.getEmailId());
        details.setPassword(user.getPassword());

        dao.save(details);
        return true;
    }

    public boolean update(User user){
        Login existed=dao.findByemail(user.getEmailId());
        if(existed==null){return false;}
        existed.setPassword(user.getPassword());
        dao.save(existed);
        return true;
    }

    public boolean delete(String emailId){
        Login existed=dao.findByemail(emailId);
        if(existed==null){return false;}
        dao.deleteByEmail(emailId);
        return true;
    }
}
