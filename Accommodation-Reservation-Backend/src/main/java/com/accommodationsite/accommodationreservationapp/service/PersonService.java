package com.accommodationsite.accommodationreservationapp.service;

import com.accommodationsite.accommodationreservationapp.exception.UserNotFoundException;
import com.accommodationsite.accommodationreservationapp.model.Person;
import com.accommodationsite.accommodationreservationapp.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PersonService {
    @Autowired
    private PersonRepository personRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;

    public Person addPerson(Person person){
        person.setPassword(getEncodedPassword(person.getPassword()));
        person.setRole("user");
        return personRepository.save(person);
    }

    public List<Person> findAllPersons(){
        return personRepository.findAll();
    }

    public Person updatePerson(Person person){
        return personRepository.save(person);
    }

    public Person findPersonByUserName(String userName){
       return personRepository.findByUsername(userName).orElse(null);
    }

    public Person findPersonByEmail(String email){
        return personRepository.findByEmail(email).orElse(null);
    }

    public void deletePerson(String userName){
        personRepository.deleteByUsername(userName);
    }

    public String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }

}
