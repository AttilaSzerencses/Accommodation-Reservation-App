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
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    private int pricePerNight;
    private int size;
    private String description;
    private int bedSize;
    @ManyToOne(targetEntity = Accommodation.class, cascade = CascadeType.MERGE)
    @JoinColumn(name = "accommodation_id", referencedColumnName = "id")
    private Accommodation accommodation;
    @OneToMany()
    private List<Reservation> reservations;
}
