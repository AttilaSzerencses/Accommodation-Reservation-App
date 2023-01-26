package com.accommodationsite.accommodationreservationapp.service;

import com.accommodationsite.accommodationreservationapp.model.Amenity;
import com.accommodationsite.accommodationreservationapp.repository.AmenityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AmenityService {

    @Autowired
    private AmenityRepository amenityRepository;

    public Amenity addAmenity(Amenity amenity){
        return amenityRepository.save(amenity);
    }

    public List<Amenity> findAllAmenity(){
        return amenityRepository.findAll();
    }

    public Amenity findAmenityById(int id){
        return amenityRepository.findById(id).orElse(null);
    }

    public Amenity updateAmenity(Amenity amenity) { return amenityRepository.save(amenity); }

    public void deleteAmenityById(int id) { amenityRepository.deleteById(id);}
}
