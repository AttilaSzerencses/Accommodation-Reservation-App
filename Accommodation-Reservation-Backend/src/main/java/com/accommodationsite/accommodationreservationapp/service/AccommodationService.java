package com.accommodationsite.accommodationreservationapp.service;

import com.accommodationsite.accommodationreservationapp.model.Accommodation;
import com.accommodationsite.accommodationreservationapp.repository.AccommodationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class AccommodationService {

    @Autowired
    private AccommodationRepository accommodationRepository;

    public Accommodation addAccommodation(Accommodation accommodation){
        return accommodationRepository.save(accommodation);
    }

    public List<Accommodation> findAllAccommodation(){
        return accommodationRepository.findAll();
    }

    public Accommodation findAccommodationByName(String name){
        return accommodationRepository.findByName(name).orElse(null);
    }

    public Accommodation findAccommodationByCity(String city){
        return accommodationRepository.findByAddress_City(city).orElse(null);
    }

    public Accommodation findAccommodationById(int id){
        return accommodationRepository.findById(id).orElse(null);
    }

    public Accommodation updateAccommodation(Accommodation accommodation){
        return accommodationRepository.save(accommodation);
    }

    public void deleteAccommodationById(int id){ accommodationRepository.deleteById(id); }

    public void deleteAccommodationByName(String name){
        accommodationRepository.deleteByName(name);
    }


}