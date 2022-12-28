package com.accommodationsite.accommodationreservationapp.repository;


import com.accommodationsite.accommodationreservationapp.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer>{
}
