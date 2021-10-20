package com.examly.springapp.dao;

import com.examly.springapp.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Bookingdao extends JpaRepository<Booking,Integer> {
    public String deleteByEmailId(String emailid);
    public Booking findByEmailId(String emailId);
}
