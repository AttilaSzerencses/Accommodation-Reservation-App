package com.accommodationsite.accommodationreservationapp.model;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Person implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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
    private Boolean activated;
    //Egy darab felhasználóhoz egy darab address tartozhat!
    @OneToOne(targetEntity = Address.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;
    //Egy darab felhasználóhoz, egy darab hotel tartozhat.
    @OneToOne(targetEntity = Accommodation.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "own_accommodation_id", referencedColumnName = "id")
    private Accommodation accommodation;
}
