package com.examly.springapp.dao;

import com.examly.springapp.model.Login;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Logindao extends JpaRepository<Login,Integer> {
    public Login findByemail(String email);
}
