package com.accommodationsite.accommodationreservationapp.controller;

import com.accommodationsite.accommodationreservationapp.model.Room;
import com.accommodationsite.accommodationreservationapp.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/request/room")
public class RoomController {
    @Autowired
    private RoomService roomService;

    @PostMapping("/add")
    public void addRoom(@RequestBody Room room) {
            roomService.addRoom(room);
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
    public ResponseEntity<Room> updatePerson(@RequestBody Room room) {
        Room updateRoom = roomService.updateRoom(room);
        return new ResponseEntity<>(updateRoom, HttpStatus.OK);
    }

    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<?> deletePerson(@PathVariable("id") int id) {
        roomService.deleteRoomById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
