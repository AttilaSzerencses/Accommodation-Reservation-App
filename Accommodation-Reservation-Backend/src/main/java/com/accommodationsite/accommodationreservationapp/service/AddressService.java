package com.accommodationsite.accommodationreservationapp.service;

import com.accommodationsite.accommodationreservationapp.model.Address;
import com.accommodationsite.accommodationreservationapp.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    public Address addAddress(Address address){
        return addressRepository.save(address);
    }

    public List<Address> findAllAddress(){
        return addressRepository.findAll();
    }

    public Address findAddressById(int id){
        return addressRepository.findById(id).orElse(null);
    }

    public Address updateAddress(Address address) { return addressRepository.save(address); }

    public void deleteAddressById(int id) { addressRepository.deleteById(id);}
}
