package com.accommodationsite.accommodationreservationapp.service;

import com.accommodationsite.accommodationreservationapp.model.Reservation;
import com.accommodationsite.accommodationreservationapp.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;

    public Reservation addReservation(Reservation reservation){
       return reservationRepository.save(reservation);
    }

    public List<Reservation> findAllReservations(){
        return reservationRepository.findAll();
    }

    public Reservation updateReservation(Reservation reservation){
        return reservationRepository.save(reservation);
    }

    public Reservation findReservationById(int id){ return reservationRepository.findById(id).orElse(null); }

    public Reservation findReservationByPersonId(int id) { return reservationRepository.findByPersonId(id).orElse(null);}

    public void deleteReservationByPersonId(int userId){
        reservationRepository.deleteByPersonId(userId);
    }

    public void deleteReservationById(int id){ reservationRepository.deleteById(id); }
}
