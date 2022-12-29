package com.accommodationsite.accommodationreservationapp.repository;

import com.accommodationsite.accommodationreservationapp.model.Accommodation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccommodationRepository extends JpaRepository<Accommodation, Integer> {
    Optional<Accommodation> findByCity(String city);
    Optional<Accommodation> findByName(String name);
    Optional<Accommodation> deleteByName(String name);
}
