package com.accommodationsite.accommodationreservationapp.service;


import com.accommodationsite.accommodationreservationapp.model.Accommodation;
import com.accommodationsite.accommodationreservationapp.model.Reservation;
import com.accommodationsite.accommodationreservationapp.model.Room;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.nio.charset.StandardCharsets;


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

    @Async
    public void sendReactivationEmail(String toEmail, String subject, String link) throws MessagingException, IOException, MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setFrom("accommodationnoreply@gmail.com");
        helper.setTo(toEmail);
        helper.setSubject(subject);
        String html = loadHtmlTemplate("emailConfirmationTemplate.html");
        html = html.replace("${link}", link);
        helper.setText(html, true);

        mailSender.send(message);
        System.out.println("Reactivation Mail sent successfully!");
    }

    @Async
    public void sendReservationEmail(String toEmail, String subject, Room room, Accommodation accommodation, Reservation reservation, String firstName) throws MessagingException, IOException, MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setFrom("accommodationnoreply@gmail.com");
        helper.setTo(toEmail);
        helper.setSubject(subject);
        String html = loadHtmlTemplate("reservationEmailTemplate.html");
        html = html.replace("${firstName}", firstName);
        html = html.replace("${accommodationName}", accommodation.getName());
        html = html.replace("${roomName}", room.getName());
        html = html.replace("${roomDescription}", room.getDescription());
        html = html.replace("${checkInDate}", reservation.getCheckinDate().toString());
        html = html.replace("${checkOutDate}", reservation.getCheckoutDate().toString());
        html = html.replace("${reservationDate}", reservation.getReservationDate().toString());
        html = html.replace("${roomSize}", String.valueOf(room.getSize()));
        html = html.replace("${bedSize}", String.valueOf(room.getBedSize()));
        html = html.replace("${price}", String.valueOf(reservation.getPrice()));
        html = html.replace("${accommodationDescription}", accommodation.getCheckInDescriptionForEmail());
        helper.setText(html, true);

        mailSender.send(message);
        System.out.println("Reactivation Mail sent successfully!");
    }

    private String loadHtmlTemplate(String templateName) throws IOException {
        Resource resource = new ClassPathResource("templates/"+templateName);
        return StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
    }



}
