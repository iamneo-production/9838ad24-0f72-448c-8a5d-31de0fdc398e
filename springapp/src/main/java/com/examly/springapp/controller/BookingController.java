package com.examly.springapp.controller;

import com.examly.springapp.model.Booking;
import com.examly.springapp.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RestController
public class BookingController {
    @Autowired
    BookingService service;

    @PostMapping("/saveBooking")
    public boolean saveBooking(@RequestBody Booking book) {
        return service.saveBooking(book);
    }

    @DeleteMapping("/deleteBooking")
    @Transactional
    public String deleteBooking(@RequestParam String emailId){
        return service.deleteBooking(emailId);
    }
}
