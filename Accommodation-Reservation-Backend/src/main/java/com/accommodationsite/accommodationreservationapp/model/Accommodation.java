package com.accommodationsite.accommodationreservationapp.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Accommodation implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(nullable = false)
    private String name;
    private String status;
    private String mainPagePicture;
    private String secondImage;
    private String thirdImage;
    private String description;
    private String checkInDescriptionForEmail;
    private String city;

    @OneToOne(targetEntity = Address.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;

    @OneToOne(targetEntity = Person.class, cascade = CascadeType.MERGE)
    @JoinColumn(name = "person_id", referencedColumnName = "id")
    private Person person;

    @ManyToMany(targetEntity = Amenity.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "amenities",  referencedColumnName = "id")
    private List<Amenity> amenities;


    private String phoneNumber;
}
