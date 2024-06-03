package com.CRM_Entertainment.backend.Models.DAO;

import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.stereotype.Repository;

import com.CRM_Entertainment.backend.Models.Entity.User;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;

@Repository
@Transactional
public class RegisterDaoImp implements IRegisterDao {

    @PersistenceContext
    private EntityManager entityManager;

    private static final String ALGORITHM = "AES";
    private static final byte[] KEY = "MySuperSecretKey".getBytes(); // Debe ser de 16 bytes para AES-128

    @Override
    public void saveUser(User user) {
        user.setUsername(encrypt(user.getUsername()));
        user.setEmail(encrypt(user.getEmail()));
        entityManager.persist(user);
    }

    @Override
    public User findByUsername(String username) {
        TypedQuery<User> query = entityManager.createQuery("SELECT u FROM User u WHERE u.username = :username", User.class);
        query.setParameter("username", encrypt(username));
        try {
            User user = query.getSingleResult();
            user.setUsername(decrypt(user.getUsername()));
            user.setEmail(decrypt(user.getEmail()));
            return user;
        } catch (NoResultException e) {
            return null;
        }
    }

    @Override
    public User findByEmail(String email) {
        TypedQuery<User> query = entityManager.createQuery("SELECT u FROM User u WHERE u.email = :email", User.class);
        query.setParameter("email", encrypt(email));
        try {
            User user = query.getSingleResult();
            user.setUsername(decrypt(user.getUsername()));
            user.setEmail(decrypt(user.getEmail()));
            return user;
        } catch (NoResultException e) {
            return null;
        }
    }

    private String encrypt(String data) {
        try {
            SecretKeySpec secretKey = new SecretKeySpec(KEY, ALGORITHM);
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.ENCRYPT_MODE, secretKey);
            return Base64.getEncoder().encodeToString(cipher.doFinal(data.getBytes()));
        } catch (Exception e) {
            throw new RuntimeException("Error encrypting data", e);
        }
    }

    private String decrypt(String encryptedData) {
        try {
            SecretKeySpec secretKey = new SecretKeySpec(KEY, ALGORITHM);
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.DECRYPT_MODE, secretKey);
            return new String(cipher.doFinal(Base64.getDecoder().decode(encryptedData)));
        } catch (Exception e) {
            throw new RuntimeException("Error decrypting data", e);
        }
    }

}
