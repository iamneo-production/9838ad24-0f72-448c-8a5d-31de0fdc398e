package com.examly.springapp.dao;

import com.examly.springapp.model.Route;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Routedao extends JpaRepository<Route,Integer> {
        public Route findByRegistrationNo(String registrationNo);
        public void deleteByRegistrationNo(String registrationNo);
}
