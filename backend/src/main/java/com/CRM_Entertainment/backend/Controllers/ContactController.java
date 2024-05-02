package com.CRM_Entertainment.backend.Controllers;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.CRM_Entertainment.backend.Models.Entity.Contact;
import com.CRM_Entertainment.backend.Models.DAO.IContactDao;
import com.CRM_Entertainment.backend.Models.DAO.ContactDaoImp;


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

     @GetMapping("/delete/{Id}")
    public String DeleteContact(@PathVariable Long Id)
    {
       if(Id>0)
       {
         contactDao.delete(Id);
       }

       return "redirect:/listcontact";
    }

}