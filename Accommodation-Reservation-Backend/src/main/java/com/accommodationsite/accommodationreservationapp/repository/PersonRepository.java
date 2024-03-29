package com.accommodationsite.accommodationreservationapp.repository;

import com.accommodationsite.accommodationreservationapp.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PersonRepository extends JpaRepository<Person, Integer> {
    Optional<Person> findByUsername(String username);
    Optional<Person> findByEmail(String email);
    Optional<Person> deleteByUsername(String username);
}
