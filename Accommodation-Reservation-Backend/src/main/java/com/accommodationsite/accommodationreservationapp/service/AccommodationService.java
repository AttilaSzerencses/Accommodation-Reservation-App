package com.accommodationsite.accommodationreservationapp.service;

import com.accommodationsite.accommodationreservationapp.model.Accommodation;
import com.accommodationsite.accommodationreservationapp.model.Person;
import com.accommodationsite.accommodationreservationapp.repository.AccommodationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
public class AccommodationService {

    @Autowired
    private AccommodationRepository accommodationRepository;

    @Autowired
    private PersonService personService;

    public Accommodation addAccommodation(Accommodation accommodation){
        if(accommodation.getPerson().getRole().equals("user")){
            Person person = accommodation.getPerson();
            person.setRole("accommodationProvider");
            personService.updatePerson(person);
        }
        return accommodationRepository.save(accommodation);
    }

    public List<Accommodation> findAllAccommodation(){
        return accommodationRepository.findAll();
    }

    public Accommodation findAccommodationByName(String name){
        return accommodationRepository.findByName(name).orElse(null);
    }

    public Accommodation findAccommodationByCity(String city){
        return accommodationRepository.findByCity(city).orElse(null);
    }

    public List<Accommodation> findAllAccommodationByPersonId(int userId){
        return accommodationRepository.findAllByPersonId(userId).orElse(null);
    }

    public List<Accommodation> findAllAccommodationByStatus(String status){
        return accommodationRepository.findAllByStatus(status).orElse(null);
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

    public String saveImageForAccommodationAndReturnPath(MultipartFile image) {
        if (image.isEmpty()) {
            System.out.println("Can't save the file because it's empty.");
        } {
            String fileName = StringUtils.cleanPath(image.getOriginalFilename());
            String fileExtension = StringUtils.getFilenameExtension(fileName);
            String newFileName = UUID.randomUUID().toString() + "." + fileExtension;
            Path path = Paths.get("src/main/resources/images/" + newFileName);
            Path path2 = Paths.get("target/classes/images/"  + newFileName);
            try {
                Files.copy(image.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
                Files.copy(image.getInputStream(), path2, StandardCopyOption.REPLACE_EXISTING);
                return "http://localhost:8080/images/"+newFileName;
            } catch (IOException e) {
                System.out.println("Something is bad with the file, so we can't save it.");
            }
            return "";
        }
    }


}
