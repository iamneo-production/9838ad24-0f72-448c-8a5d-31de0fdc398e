package com.examly.springapp.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Employee")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Employee {
    @Id
    @GeneratedValue
    private int id;
    private String username;
    private String password;
    private String email;
    private long mobileNumber;
    private String vehicleModel;
    private String vehicleNumber;
    private boolean verified;
    private boolean active;
}
