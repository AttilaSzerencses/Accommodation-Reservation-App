package com.accommodationsite.accommodationreservationapp.controller;

import com.accommodationsite.accommodationreservationapp.model.Address;
import com.accommodationsite.accommodationreservationapp.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/request/address")
public class AddressController {
    @Autowired
    private AddressService addressService;

    @PostMapping({"/add"})
    public void addAddress(@RequestBody Address address) {
        addressService.addAddress(address);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Address>> getAllAddresses() {
        List<Address> addresses = addressService.findAllAddress();
        return new ResponseEntity<>(addresses, HttpStatus.OK);
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<Address> getAddressById(@PathVariable("id") int id) {
        Address address  = addressService.findAddressById(id);
        return new ResponseEntity<>(address, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Address> updateAddress(@RequestBody Address address) {
        Address updateAddress= addressService.updateAddress(address);
        return new ResponseEntity<>(updateAddress, HttpStatus.OK);
    }

    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<?> deleteAddressById(@PathVariable("id") int id) {
        addressService.deleteAddressById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
