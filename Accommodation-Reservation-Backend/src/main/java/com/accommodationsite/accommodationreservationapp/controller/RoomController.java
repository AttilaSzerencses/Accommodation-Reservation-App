package com.accommodationsite.accommodationreservationapp.controller;

import com.accommodationsite.accommodationreservationapp.model.Accommodation;
import com.accommodationsite.accommodationreservationapp.model.Room;
import com.accommodationsite.accommodationreservationapp.service.AccommodationService;
import com.accommodationsite.accommodationreservationapp.service.RoomService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.istack.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/request/room")
public class RoomController {
    @Autowired
    private RoomService roomService;

    @Autowired
    private AccommodationService accommodationService;

    @PostMapping("/add")
    public ResponseEntity<String> addRoom(@RequestParam("image") MultipartFile image, @RequestParam("room") String roomJson) {
        try{
            Room room = new ObjectMapper().readValue(roomJson, Room.class);
            String pathForRoomImage = accommodationService.saveImageForAccommodationAndReturnPath(image);
            room.setRoomImage(pathForRoomImage);
            room.setStatus("active");
            roomService.addRoom(room);
            return new ResponseEntity<String>("Successful creation", HttpStatus.NO_CONTENT);
        } catch (Exception e){
            return new ResponseEntity<String>("Error", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Room>> getAllRooms() {
        List<Room> rooms = roomService.findAllRooms();
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    @GetMapping("/findAllByAccommodationId/{accommodationId}")
    public ResponseEntity<List<Room>> getAllRoomsByHotelId(@PathVariable("accommodationId") int accommodationId) {
        List<Room> rooms = roomService.findRoomsByAccommodationId(accommodationId);
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    @GetMapping("/available")
    public ResponseEntity<List<Room>> getAvailableRoomsByDateRangeAndHotelId(@RequestParam int hotelId, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate, @RequestParam int persons) {
        List<Room> availableRooms = roomService.findAvailableRoomsByDateRangeAndHotelId(startDate, endDate, hotelId, persons);
        return new ResponseEntity<>(availableRooms, HttpStatus.OK);
    }

    @GetMapping("/availableByCapacity")
    public ResponseEntity<List<Room>> getAvailableRoomsByRoomCapacityAndHotelId(@RequestParam int hotelId, @RequestParam int persons) {
        List<Room> availableRoomsByCapacity = roomService.findAvailableRoomsByRoomCapacityAndHotelId(hotelId, persons);
        return new ResponseEntity<>(availableRoomsByCapacity, HttpStatus.OK);
    }


    @GetMapping("/findById/{id}")
    public ResponseEntity<Room> getPerson(@PathVariable("id") int id) {
        Room room = roomService.findRoomById(id);
        return new ResponseEntity<>(room, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updatePerson(@RequestParam(value = "image", required = false) MultipartFile image, @RequestParam("room") String roomJson) {
        try{
            Room room = new ObjectMapper().readValue(roomJson, Room.class);
            if(image != null) {
                String pathForRoomImage = accommodationService.saveImageForAccommodationAndReturnPath(image);
                room.setRoomImage(pathForRoomImage);
            }
            roomService.updateRoom(room);
            return new ResponseEntity<String>("Successful update!", HttpStatus.NO_CONTENT);
        } catch (Exception e){
            return new ResponseEntity<String>("Error on update!", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<?> deletePerson(@PathVariable("id") int id) {
        roomService.deleteRoomById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
