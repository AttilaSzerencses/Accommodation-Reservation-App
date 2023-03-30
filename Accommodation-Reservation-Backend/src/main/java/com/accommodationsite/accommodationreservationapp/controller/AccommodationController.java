package com.accommodationsite.accommodationreservationapp.controller;

import com.accommodationsite.accommodationreservationapp.model.Accommodation;
import com.accommodationsite.accommodationreservationapp.service.AccommodationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/request/accommodation")
public class AccommodationController {
    @Autowired
    private AccommodationService accommodationService;

    @PostMapping( "/add")
    public ResponseEntity<String> addAccommodation(@RequestParam("image") MultipartFile image, @RequestParam("secondImage") MultipartFile secondImage, @RequestParam("thirdImage") MultipartFile thirdImage, @RequestParam("accommodation") String accommodationJson) {
        try{
            Accommodation accommodation = new ObjectMapper().readValue(accommodationJson, Accommodation.class);
            String pathForMainPagePicture = accommodationService.saveImageForAccommodationAndReturnPath(image);
            String pathForSecondPicture = accommodationService.saveImageForAccommodationAndReturnPath(secondImage);
            String pathForThirdPicture = accommodationService.saveImageForAccommodationAndReturnPath(thirdImage);
            accommodation.setMainPagePicture(pathForMainPagePicture);
            accommodation.setSecondImage(pathForSecondPicture);
            accommodation.setThirdImage(pathForThirdPicture);
            accommodation.setStatus("waiting");
            accommodationService.addAccommodation(accommodation);
            return new ResponseEntity<String>("Successful creation", HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<String>("Error", HttpStatus.BAD_REQUEST);
        }
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

    @GetMapping("/findAllByPersonId/{personId}")
    public ResponseEntity<List<Accommodation>> getAllAccommodationByPersonId(@PathVariable("personId") int personId) {
        List<Accommodation> accommodations  = accommodationService.findAllAccommodationByPersonId(personId);
        return new ResponseEntity<>(accommodations, HttpStatus.OK);
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
    public ResponseEntity<String> updateAccommodation(@RequestParam(value = "image", required = false) MultipartFile image, @RequestParam(value = "secondImage", required = false) MultipartFile secondImage, @RequestParam(value = "thirdImage", required = false) MultipartFile thirdImage, @RequestParam("accommodation") String accommodationJson) {
        try{
            Accommodation accommodation = new ObjectMapper().readValue(accommodationJson, Accommodation.class);
            if (image != null){
                String pathForMainPagePicture = accommodationService.saveImageForAccommodationAndReturnPath(image);
                accommodation.setMainPagePicture(pathForMainPagePicture);
            }
            if (secondImage != null) {
                String pathForSecondPicture = accommodationService.saveImageForAccommodationAndReturnPath(secondImage);
                accommodation.setSecondImage(pathForSecondPicture);
            }
            if (thirdImage != null) {
                String pathForThirdPicture = accommodationService.saveImageForAccommodationAndReturnPath(thirdImage);
                accommodation.setThirdImage(pathForThirdPicture);
            }
            accommodationService.updateAccommodation(accommodation);
            return new ResponseEntity<String>("Successful update!", HttpStatus.NO_CONTENT);
        } catch (Exception e){
            return new ResponseEntity<String>("Error", HttpStatus.BAD_REQUEST);
        }
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
