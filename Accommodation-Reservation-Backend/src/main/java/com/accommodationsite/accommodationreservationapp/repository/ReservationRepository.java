package com.accommodationsite.accommodationreservationapp.repository;

import com.accommodationsite.accommodationreservationapp.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    Optional<Reservation> findByPersonId(int userId);
    Optional<Reservation> deleteByPersonId(int userId);
}
