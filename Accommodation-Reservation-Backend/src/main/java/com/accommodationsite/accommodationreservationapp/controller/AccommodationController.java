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
    public void addAccommodation(@RequestParam("image") MultipartFile image, @RequestParam("accommodation") String accommodationJson) {
        try{
            Accommodation accommodation = new ObjectMapper().readValue(accommodationJson, Accommodation.class);
            if (image.isEmpty()) {
                System.out.println("Can't save the file because it's empty.");
            } {
                String fileName = StringUtils.cleanPath(image.getOriginalFilename());
                String fileExtension = StringUtils.getFilenameExtension(fileName);
                String newFileName = UUID.randomUUID().toString() + "." + fileExtension;
                Path path = Paths.get("src/main/resources/images/" + newFileName);
                Path path2 = Paths.get("target/classes/images/"  + newFileName);
                accommodation.setMainPagePicture("http://localhost:8080/images/"+newFileName);
                try {
                    Files.copy(image.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
                    Files.copy(image.getInputStream(), path2, StandardCopyOption.REPLACE_EXISTING);
                } catch (IOException e) {
                    System.out.println("Something is bad with the file, so we can't save it.");
                }
            }
            accommodationService.addAccommodation(accommodation);
        } catch (Exception e) {
            System.out.println("Something wen't wrong with the accommodation creation!");
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
