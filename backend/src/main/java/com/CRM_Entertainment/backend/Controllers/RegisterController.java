package com.CRM_Entertainment.backend.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.ui.Model;

import com.CRM_Entertainment.backend.Models.DAO.IRegisterDao;
import com.CRM_Entertainment.backend.Models.Entity.User;

@Controller
public class RegisterController {

     @Autowired
    private IRegisterDao registerDao;


    @GetMapping("/register")
    public String registerForm(Model model) {
        model.addAttribute("user", new User());
        return "register";
    }

    @PostMapping("/register")
    public String registroSubmit(@ModelAttribute User user, Model model) {
        if (registerDao.findByUsername(user.getUsername()) != null) {
            model.addAttribute("error", "Username is already in use");
            return "register";
        }
        if (registerDao.findByEmail(user.getEmail()) != null) {
            model.addAttribute("error", "Email address is already in use");
            return "register";
        }
        registerDao.saveUser(user);
        return "redirect:/successregistration";
    }
}
