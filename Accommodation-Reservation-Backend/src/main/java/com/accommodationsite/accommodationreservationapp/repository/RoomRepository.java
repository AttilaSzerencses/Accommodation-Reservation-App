package com.accommodationsite.accommodationreservationapp.repository;


import com.accommodationsite.accommodationreservationapp.model.Person;
import com.accommodationsite.accommodationreservationapp.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer>{
    Optional<List<Room>> findByAccommodationId(int id);
    @Query("SELECT r FROM Room r WHERE r.accommodation.id = :hotelId AND NOT EXISTS (SELECT 1 FROM Reservation res WHERE res.room.id = r.id AND (res.checkinDate <= :endDate AND res.checkoutDate >= :startDate))")
    List<Room> findAvailableRoomsByDateRangeAndHotelId(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate, @Param("hotelId") int hotelId);

}
