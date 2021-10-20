package com.examly.springapp.service;


import com.examly.springapp.dao.Bookingdao;
import com.examly.springapp.model.Booking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookingService {
    @Autowired
    Bookingdao dao;

    public boolean saveBooking(Booking book){
        Booking existing=dao.findByEmailId(book.getEmailId());
        if(existing==null){
            dao.save(book);
            return true;
        }
        existing.setRegistrationNo(book.getRegistrationNo());
        dao.save(existing);
        return true;
    }

    public String deleteBooking(String emailId){
        if(dao.deleteByEmailId(emailId)!=null){
            return "Deleted Successfully";
        };
        return "Error in deleting";
    }
}
