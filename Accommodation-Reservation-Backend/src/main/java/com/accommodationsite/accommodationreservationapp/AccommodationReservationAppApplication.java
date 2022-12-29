package com.accommodationsite.accommodationreservationapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class AccommodationReservationAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(AccommodationReservationAppApplication.class, args);
    }

}
