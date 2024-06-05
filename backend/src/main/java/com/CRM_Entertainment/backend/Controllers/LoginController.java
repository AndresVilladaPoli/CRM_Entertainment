package com.CRM_Entertainment.backend.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;

import com.CRM_Entertainment.backend.Models.DAO.IUserDao;
import com.CRM_Entertainment.backend.Models.Dto.LoginRequest;
import com.CRM_Entertainment.backend.Models.Dto.PasswordEncryption;
import com.CRM_Entertainment.backend.Models.Entity.User;



@Controller

public class LoginController {

    @Autowired
    private IUserDao userDao;

    @Autowired
    private PasswordEncryption passwordEncryption;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        User user = userDao.findByUsername(loginRequest.getUsernameOrEmail());
        if (user == null) {
            user = userDao.findByEmail(loginRequest.getUsernameOrEmail());
        }
        
        if (user != null && passwordEncryption.checkPassword(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.ok("User logged in successfully");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username, email, or password");
        }
    }
}
