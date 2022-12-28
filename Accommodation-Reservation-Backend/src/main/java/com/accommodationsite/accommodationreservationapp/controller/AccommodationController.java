package com.accommodationsite.accommodationreservationapp.controller;

import com.accommodationsite.accommodationreservationapp.model.Accommodation;
import com.accommodationsite.accommodationreservationapp.service.AccommodationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/request/accommodation")
public class AccommodationController {
    @Autowired
    private AccommodationService accommodationService;

    @PostMapping({"/add"})
    public void addAccommodation(@RequestBody Accommodation accommodation) {
        accommodationService.addAccommodation(accommodation);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Accommodation>> getAllAccommodation() {
        List<Accommodation> accommodations = accommodationService.findAllAccommodation();
        return new ResponseEntity<>(accommodations, HttpStatus.OK);
    }

    @GetMapping("/findByName/{name}")
    public ResponseEntity<Accommodation> getAccommodationByName(@PathVariable("name") String name) {
        Accommodation accommodation  = accommodationService.findAccommodationByName(name);
        return new ResponseEntity<>(accommodation, HttpStatus.OK);
    }

    @GetMapping("/findByCity/{city}")
    public ResponseEntity<Accommodation> getAccommodationByCity(@PathVariable("city") String city) {
        Accommodation accommodation  = accommodationService.findAccommodationByCity(city);
        return new ResponseEntity<>(accommodation, HttpStatus.OK);
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<Accommodation> getAccommodationByCity(@PathVariable("id") Integer id) {
        Accommodation accommodation  = accommodationService.findAccommodationById(id);
        if (accommodation == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(accommodation, HttpStatus.OK);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Accommodation> updateAccommodation(@RequestBody Accommodation accommodation) {
        Accommodation updateAccommodation = accommodationService.updateAccommodation(accommodation);
        return new ResponseEntity<>(updateAccommodation, HttpStatus.OK);
    }

    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<?> deleteAccommodationById(@PathVariable("id") int id) {
        accommodationService.deleteAccommodationById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/deleteByName/{name}")
    public ResponseEntity<?> deleteAccommodationByName(@PathVariable("name") String name) {
        accommodationService.deleteAccommodationByName(name);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
