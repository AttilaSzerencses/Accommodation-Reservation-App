package com.accommodationsite.accommodationreservationapp.service;

import com.accommodationsite.accommodationreservationapp.exception.UserNotFoundException;
import com.accommodationsite.accommodationreservationapp.model.Person;
import com.accommodationsite.accommodationreservationapp.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {
    private final PersonRepository personRepository;

    @Autowired
    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public Person addPerson(Person person){
        return personRepository.save(person);
    }

    public List<Person> findAllPersons(){
        return personRepository.findAll();
    }

    public Person updatePerson(Person person){
        return personRepository.save(person);
    }

    public Person findPersonById(int id){
       return personRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User by id "+id+" was not found"));
    }

    public void deletePerson(int id){
        personRepository.deleteById(id);
    }

}
