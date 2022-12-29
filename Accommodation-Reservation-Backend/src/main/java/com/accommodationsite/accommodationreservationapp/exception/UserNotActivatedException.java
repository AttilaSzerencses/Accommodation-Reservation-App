package com.accommodationsite.accommodationreservationapp.exception;

public class UserNotActivatedException  extends RuntimeException {
    public UserNotActivatedException(String message){
        super(message);
    }
}
