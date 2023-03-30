package com.accommodationsite.accommodationreservationapp.repository;

import com.accommodationsite.accommodationreservationapp.model.Accommodation;
import com.accommodationsite.accommodationreservationapp.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccommodationRepository extends JpaRepository<Accommodation, Integer> {
    Optional<Accommodation> findByCity(String city);
    Optional<Accommodation> findByName(String name);
    Optional<List<Accommodation>> findAllByPersonId(int id);
    Optional<List<Accommodation>> findAllByStatus(String status);
    Optional<Accommodation> deleteByName(String name);
}
