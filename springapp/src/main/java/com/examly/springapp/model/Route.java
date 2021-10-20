package com.examly.springapp.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="routes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Route {
    @Id
    @GeneratedValue
    private int id;
    private String startPoint;
    private String endPoint;
    private int distance;
    private String time;
    private String date;
    private String carModel;
    private String registrationNo;
    private int seatsAvailable;
}
