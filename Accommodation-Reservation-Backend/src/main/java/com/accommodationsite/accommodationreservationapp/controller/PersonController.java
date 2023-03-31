package com.accommodationsite.accommodationreservationapp.controller;

import com.accommodationsite.accommodationreservationapp.model.Person;
import com.accommodationsite.accommodationreservationapp.service.EmailSenderService;
import com.accommodationsite.accommodationreservationapp.service.PersonService;
import com.accommodationsite.accommodationreservationapp.util.EncryptionUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    @Autowired
    private EmailSenderService emailSenderService;

    @Autowired
    private EncryptionUtil encryptionUtil;

    private Logger logger = LoggerFactory.getLogger(PersonController.class);

    @GetMapping("/all")
    public ResponseEntity<List<Person>> getAllPersons() {
        List<Person> persons = personService.findAllPersons();
        return new ResponseEntity<>(persons, HttpStatus.OK);
    }

    @GetMapping("/findByUserName/{userName}")
    public ResponseEntity<Person> getPersonByUserName(@PathVariable("userName") String userName) {
        Person person = personService.findPersonByUserName(userName);
        return new ResponseEntity<>(person, HttpStatus.OK);
    }

    @GetMapping("/findByUserEmail/{userEmail}")
    public ResponseEntity<Person> getPersonByUserEmail(@PathVariable("userEmail") String userEmail) {
        Person person = personService.findPersonByEmail(userEmail);
        return new ResponseEntity<>(person, HttpStatus.OK);
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<Person> getPersonByUserId(@PathVariable("id") int id) {
        Person person = personService.findPersonById(id);
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
            try {
                String encryptedUserName = encryptionUtil.encrypt(person.getUsername());
                emailSenderService.sendReactivationEmail(person.getEmail(), "Account verification", "http://localhost:4200/user-activation?username="+encryptedUserName);
            }catch( Exception e ){
                logger.info("Error Sending Email: " + e.getMessage());
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/accountActivation/{username}")
    public ResponseEntity<String> accountActivation(@PathVariable("username") String username) throws Exception {
        String decryptedUserName = encryptionUtil.decrypt(username);
        if (personService.findPersonByUserName(decryptedUserName) == null || personService.findPersonByUserName(decryptedUserName).getActivated()){
            return new ResponseEntity<>("The username does not exists!",HttpStatus.BAD_REQUEST);
        } else {
            personService.personActivation(decryptedUserName);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

    }

    @PutMapping("/update")
    public ResponseEntity<Person> updatePerson(@RequestBody Person person) {
        Person updatePerson = personService.updatePerson(person);
        return new ResponseEntity<>(updatePerson, HttpStatus.OK);
    }

    @DeleteMapping("/deleteByUserName/{userName}")
    public ResponseEntity<?> deletePersonByUserName(@PathVariable("userName") String userName) {
        personService.deletePersonByUserName(userName);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<?> deletePersonById(@PathVariable("id") int id) {
        personService.deletePersonById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
