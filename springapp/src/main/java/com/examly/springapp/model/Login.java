package com.examly.springapp.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="login")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Login {
    @Id
    @GeneratedValue
    private int id;
    private String email;
    private String password;
}
