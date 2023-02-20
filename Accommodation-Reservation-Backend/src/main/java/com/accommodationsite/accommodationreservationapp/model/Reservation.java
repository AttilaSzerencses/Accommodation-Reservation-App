package com.accommodationsite.accommodationreservationapp.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "person_id")
    private Person person;
    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;
    @Column(columnDefinition = "DATE")
    private LocalDate checkinDate;
    @Column(columnDefinition = "DATE")
    private LocalDate checkoutDate;
}

