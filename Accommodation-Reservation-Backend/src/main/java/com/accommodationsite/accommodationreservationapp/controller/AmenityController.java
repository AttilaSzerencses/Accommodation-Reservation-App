package com.accommodationsite.accommodationreservationapp.controller;

import com.accommodationsite.accommodationreservationapp.model.Address;
import com.accommodationsite.accommodationreservationapp.model.Amenity;
import com.accommodationsite.accommodationreservationapp.service.AmenityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/request/amenity")
public class AmenityController {
    @Autowired
    private AmenityService amenityService;

    @PostMapping({"/add"})
    public void addAmenity(@RequestBody Amenity amenity) {
        amenityService.addAmenity(amenity);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Amenity>> getAllAmenities() {
        List<Amenity> amenities = amenityService.findAllAmenity();
        return new ResponseEntity<>(amenities, HttpStatus.OK);
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<Amenity> getAmenityById(@PathVariable("id") int id) {
        Amenity amenity  = amenityService.findAmenityById(id);
        return new ResponseEntity<>(amenity, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Amenity> updateAmenity(@RequestBody Amenity amenity) {
        Amenity updateAmenity= amenityService.updateAmenity(amenity);
        return new ResponseEntity<>(updateAmenity, HttpStatus.OK);
    }

    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<?> deleteAmenityById(@PathVariable("id") int id) {
        amenityService.deleteAmenityById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
