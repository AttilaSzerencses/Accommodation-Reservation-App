package com.accommodationsite.accommodationreservationapp.repository;

import com.accommodationsite.accommodationreservationapp.model.Amenity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AmenityRepository extends JpaRepository<Amenity, Integer> {
}
