package com.accommodationsite.accommodationreservationapp.service;

import com.accommodationsite.accommodationreservationapp.model.Room;
import com.accommodationsite.accommodationreservationapp.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public Room updateRoom(Room room){
        return roomRepository.save(room);
    }

    public void deleteRoomById(int id){
        roomRepository.deleteById(id);
    }
}
