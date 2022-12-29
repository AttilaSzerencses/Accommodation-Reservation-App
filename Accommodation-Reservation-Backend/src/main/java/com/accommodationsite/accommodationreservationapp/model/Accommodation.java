package com.accommodationsite.accommodationreservationapp.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Accommodation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(nullable = false)
    private String name;
    private String mainPagePicture;
    private String description;
    private String city;

    //Egy darab szálláshoz egy darab cím tartozhat.
    @OneToOne(targetEntity = Address.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;

    //Egy darab szálláshoz több darab szoba tartozhat.
    @OneToMany(targetEntity = Room.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "accomodation_id", referencedColumnName = "id")
    private List<Room> rooms;


    private String phoneNumber;
}
