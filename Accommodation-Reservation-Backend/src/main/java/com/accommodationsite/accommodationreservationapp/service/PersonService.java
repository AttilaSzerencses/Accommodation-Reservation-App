package com.accommodationsite.accommodationreservationapp.service;

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
        person.setActivated(false);
        return personRepository.save(person);
    }

    public List<Person> findAllPersons(){
        return personRepository.findAll();
    }

    public Person updatePerson(Person person){
        return personRepository.save(person);
    }

    public Person findPersonById(int id){ return personRepository.findById(id).orElse(null); }

    public Person findPersonByUserName(String userName){
       return personRepository.findByUsername(userName).orElse(null);
    }

    public Person findPersonByEmail(String email){
        return personRepository.findByEmail(email).orElse(null);
    }

    public void deletePersonByUserName(String userName){
        personRepository.deleteByUsername(userName);
    }

    public void deletePersonById(int id){ personRepository.deleteById(id); }

    public String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }

    public Person personActivation(String username){
        Person person = personRepository.findByUsername(username).orElse(null);
        if (person != null){
            person.setActivated(true);
        }
        return personRepository.save(person);
    }

}
