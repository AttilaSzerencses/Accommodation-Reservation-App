package com.accommodationsite.accommodationreservationapp.controller;

import com.accommodationsite.accommodationreservationapp.model.Accommodation;
import com.accommodationsite.accommodationreservationapp.model.Reservation;
import com.accommodationsite.accommodationreservationapp.model.Room;
import com.accommodationsite.accommodationreservationapp.service.EmailSenderService;
import com.accommodationsite.accommodationreservationapp.service.ReservationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/request/reservation")
public class ReservationController {
    @Autowired
    private ReservationService reservationService;

    @Autowired
    private EmailSenderService emailSenderService;

    private Logger logger = LoggerFactory.getLogger(PersonController.class);

    @GetMapping("/all")
    public ResponseEntity<List<Reservation>> getAllReservations() {
        List<Reservation> reservations = reservationService.findAllReservations();
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    @PostMapping({"/add"})
    public void addReservation(@RequestBody Reservation reservation) {
        LocalDate currentDate = LocalDate.now();
        String generatedQrCodeId = UUID.randomUUID().toString();
        reservation.setReservationDate(currentDate);
        reservation.setQrCodeId(generatedQrCodeId);
        reservationService.addReservation(reservation);
        try {
            String email = reservation.getPerson().getEmail();
            Room room = reservation.getRoom();
            Accommodation accommodation = reservation.getRoom().getAccommodation();
            String firstName = reservation.getPerson().getFirstName();
            emailSenderService.sendReservationEmail(email, "Reservation Confirmation", room, accommodation, reservation, firstName);
        }catch( Exception e ){
            logger.info("Error Sending Email: " + e.getMessage());
        }
    }

    @GetMapping("/findByUserId/{userId}")
    public ResponseEntity<Reservation> getReservationByUserId(@PathVariable("userId") int id) {
        Reservation reservation = reservationService.findReservationByPersonId(id);
        return new ResponseEntity<>(reservation, HttpStatus.OK);
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<Reservation> getPersonByUserId(@PathVariable("id") int id) {
        Reservation reservation = reservationService.findReservationById(id);
        return new ResponseEntity<>(reservation, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Reservation> updateReservation(@RequestBody Reservation reservation) {
        Reservation updateReservation = reservationService.updateReservation(reservation);
        return new ResponseEntity<>(updateReservation, HttpStatus.OK);
    }

    @DeleteMapping("/deleteByUserId/{userId}")
    public ResponseEntity<?> deleteReservationByUserId(@PathVariable("userId") int userId) {
        reservationService.deleteReservationByPersonId(userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<?> deleteReservationById(@PathVariable("id") int id) {
        reservationService.deleteReservationById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
