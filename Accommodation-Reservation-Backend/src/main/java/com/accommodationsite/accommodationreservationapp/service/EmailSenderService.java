package com.accommodationsite.accommodationreservationapp.service;


import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;


@Service
public class EmailSenderService {

    private JavaMailSender mailSender;

    public EmailSenderService(JavaMailSender mailSender){
        this.mailSender = mailSender;
    }
    @Async
    public void sendEmail(String toEmail, String subject, String body){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("accommodationnoreply@gmail.com");
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
        System.out.println("Mail sent successfully!");
    }



}
