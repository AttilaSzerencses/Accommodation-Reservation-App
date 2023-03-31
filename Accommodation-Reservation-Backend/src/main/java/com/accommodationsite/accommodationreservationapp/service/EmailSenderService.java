package com.accommodationsite.accommodationreservationapp.service;


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

        // Load the HTML template from a file
        String html = loadHtmlTemplate("emailConfirmationTemplate.html");

        // Replace the link placeholder with the actual link
        html = html.replace("${link}", link);

        helper.setText(html, true); // true indicates that it is HTML content

        mailSender.send(message);
        System.out.println("Reactivation Mail sent successfully!");
    }

    private String loadHtmlTemplate(String templateName) throws IOException {
        Resource resource = new ClassPathResource("templates/"+templateName);
        return StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
    }



}
