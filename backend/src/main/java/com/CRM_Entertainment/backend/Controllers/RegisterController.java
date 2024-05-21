package com.CRM_Entertainment.backend.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.ui.Model;

import com.CRM_Entertainment.backend.Models.DAO.IRegisterDao;
import com.CRM_Entertainment.backend.Models.Entity.User;

@Controller
public class RegisterController {

     @Autowired
    private IRegisterDao registerDao;


   @GetMapping("/register")
    @ResponseBody
    public ResponseEntity<Object> registerForm() {
        User user = new User();
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    /*@GetMapping("/register")
    public String registerForm(Model model) {
        model.addAttribute("user", new User());
        return "register";
    }*/

    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<Object> registroSubmit(@RequestBody User user) {
        if (registerDao.findByUsername(user.getUsername()) != null) {
            return new ResponseEntity<>(new ErrorResponse("Username is already in use"), HttpStatus.BAD_REQUEST);
        }
        if (registerDao.findByEmail(user.getEmail()) != null) {
            return new ResponseEntity<>(new ErrorResponse("Email address is already in use"), HttpStatus.BAD_REQUEST);
        }
        registerDao.saveUser(user);
        return new ResponseEntity<>(new SuccessResponse("User registered successfully"), HttpStatus.OK);
    }

     public static class ErrorResponse {
        private String error;

        public ErrorResponse(String error) {
            this.error = error;
        }

        public String getError() {
            return error;
        }

        public void setError(String error) {
            this.error = error;
        }
    }

    public static class SuccessResponse {
        private String message;

        public SuccessResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
