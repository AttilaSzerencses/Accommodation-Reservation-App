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
    private int size;
    private String description;
    private int bedSize;
    @ManyToOne()
    @JoinColumn(name = "accommodation_id")
    private Accommodation accommodation;
    @OneToMany(mappedBy = "room")
    private List<Reservation> reservations;
}
