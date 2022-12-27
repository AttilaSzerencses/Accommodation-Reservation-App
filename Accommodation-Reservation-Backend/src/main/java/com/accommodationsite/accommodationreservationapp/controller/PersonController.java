package com.accommodationsite.accommodationreservationapp.controller;

import com.accommodationsite.accommodationreservationapp.model.Person;
import com.accommodationsite.accommodationreservationapp.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/person")
public class PersonController {
    @Autowired
    private PersonService personService;

    @GetMapping("/all")
    public ResponseEntity<List<Person>> getAllPersons() {
        List<Person> persons = personService.findAllPersons();
        return new ResponseEntity<>(persons, HttpStatus.OK);
    }

    @GetMapping("/find/{userName}")
    public ResponseEntity<Person> getPerson(@PathVariable("userName") String userName) {
        Person person = personService.findPersonByUserName(userName);
        return new ResponseEntity<>(person, HttpStatus.OK);
    }

    @PostMapping({"/registration"})
    public ResponseEntity<String> registerNewUser(@RequestBody Person person) {

        if (personService.findPersonByUserName(person.getUsername()) != null){
            return new ResponseEntity<>("The username already exists!",HttpStatus.BAD_REQUEST);
        } else if(personService.findPersonByEmail(person.getEmail()) != null){
            return new ResponseEntity<>("The email address already exists!",HttpStatus.BAD_REQUEST);
        } else {
            personService.addPerson(person);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Person> updatePerson(@RequestBody Person person) {
        Person updatePerson = personService.updatePerson(person);
        return new ResponseEntity<>(updatePerson, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{userName}")
    public ResponseEntity<?> deletePerson(@PathVariable("userName") String userName) {
        personService.deletePerson(userName);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
