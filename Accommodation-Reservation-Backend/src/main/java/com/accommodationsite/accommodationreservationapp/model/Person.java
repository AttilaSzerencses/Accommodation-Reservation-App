package com.accommodationsite.accommodationreservationapp.model;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
public class Person implements Serializable {
    @Id
    @GeneratedValue
    @Column(nullable = false, updatable = false)
    private int id;
    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    private String password;
    private String firstName;
    private String lastName;
    @Column(nullable = false)
    private String email;
    private String phone;
    private String role;
}
