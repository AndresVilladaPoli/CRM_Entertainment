package com.CRM_Entertainment.backend.Controllers;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RestController;

import com.CRM_Entertainment.backend.Models.Entity.Contact;
import com.CRM_Entertainment.backend.Models.DAO.IContactDao;
//import com.CRM_Entertainment.backend.Models.DAO.ContactDaoImp;

@Controller
public class ContactController{

   @Autowired
    private IContactDao contactDao;


@GetMapping("/formcontact")
    public String CreateContact(Model model) 
    {

        Contact contact = new Contact();

        model.addAttribute("Title", "Contacts form");
        model.addAttribute("contact", contact);


        return "formcontact";
    }

    @PostMapping("/formcontact")
    public String submitContactForm(@ModelAttribute Contact contact) 
    {
        contactDao.save(contact);
        return "redirect:/success";
    }

     @DeleteMapping("/formcontact/delete/{Id}")
    public String DeleteContact(@PathVariable Long Id)
    {
       if(Id>0)
       {
         contactDao.delete(Id);
       }else{
        return "redirect:/error";
       }

       return "redirect:/contactlist";
    }

    @PutMapping("/formcontact/{IdContact}")   
    public String EditContact(@PathVariable(value = "IdContact") Long IdContact, Model model) {
    
        if (IdContact == null || IdContact <= 0) {
            return "redirect:/contactlist";
        }
        
        Contact contact = contactDao.findOne(IdContact);
    
        if (contact == null) {
            return "redirect:/contactlist";
        } 
    
        model.addAttribute("title", "Edit Contact");
        model.addAttribute("contact", contact);
    
        return "formcontact";
    }
}