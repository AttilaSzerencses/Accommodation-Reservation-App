package com.accommodationsite.accommodationreservationapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
@ComponentScan(basePackages = {"com.accommodationsite.accommodationreservationapp", "com.accommodationsite.accommodationreservationapp.config"})
public class AccommodationReservationAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(AccommodationReservationAppApplication.class, args);
    }

}
