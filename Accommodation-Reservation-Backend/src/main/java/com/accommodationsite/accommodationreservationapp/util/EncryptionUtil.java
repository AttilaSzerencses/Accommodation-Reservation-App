package com.accommodationsite.accommodationreservationapp.util;

import org.springframework.stereotype.Component;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Component
public class EncryptionUtil {
    private static final String ALGORITHM = "AES";
    private static final String KEY = "mySecretKey12345";

    public String encrypt(String value) throws Exception {
        SecretKeySpec keySpec = new SecretKeySpec(KEY.getBytes(StandardCharsets.UTF_8), ALGORITHM);
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, keySpec);
        byte[] encryptedValue = cipher.doFinal(value.getBytes(StandardCharsets.UTF_8));
        return Base64.getEncoder().encodeToString(encryptedValue);
    }

    public String decrypt(String encryptedValue) throws Exception {
        SecretKeySpec keySpec = new SecretKeySpec(KEY.getBytes(StandardCharsets.UTF_8), ALGORITHM);
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, keySpec);
        byte[] decodedValue = Base64.getDecoder().decode(encryptedValue.getBytes(StandardCharsets.UTF_8));
        byte[] decryptedValue = cipher.doFinal(decodedValue);
        return new String(decryptedValue, StandardCharsets.UTF_8);
    }
}
