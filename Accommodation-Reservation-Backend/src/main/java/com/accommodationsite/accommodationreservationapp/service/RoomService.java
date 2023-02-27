package com.accommodationsite.accommodationreservationapp.service;

import com.accommodationsite.accommodationreservationapp.model.Room;
import com.accommodationsite.accommodationreservationapp.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class RoomService {
    @Autowired
    private RoomRepository roomRepository;

    public Room addRoom(Room room){
        return roomRepository.save(room);
    }

    public List<Room> findAllRooms(){
        return roomRepository.findAll();
    }

    public Room findRoomById(int id){
        return roomRepository.findById(id).orElse(null);
    }

    public List<Room> findRoomsByAccommodationId(int hotelId){
        return roomRepository.findByAccommodationId(hotelId).orElse(null);
    }

    public Room updateRoom(Room room){
        return roomRepository.save(room);
    }

    public void deleteRoomById(int id){
        roomRepository.deleteById(id);
    }

    public List<Room> findAvailableRoomsByDateRangeAndHotelId(LocalDate startDate, LocalDate endDate, int hotelId, int persons) {
        return  roomRepository.findAvailableRoomsByDateRangeAndHotelId(startDate, endDate, hotelId, persons);
    }

    public List<Room> findAvailableRoomsByRoomCapacityAndHotelId(int hotelId, int roomCapacity){
        return roomRepository.findAvailableRoomsByRoomCapacityAndHotelId(hotelId, roomCapacity);
    }
}
