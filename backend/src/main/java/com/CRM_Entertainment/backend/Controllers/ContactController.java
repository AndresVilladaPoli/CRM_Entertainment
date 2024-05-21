package com.CRM_Entertainment.backend.Controllers;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseBody;

import com.CRM_Entertainment.backend.Models.Entity.Contact;
import com.CRM_Entertainment.backend.Models.DAO.IContactDao;
//import com.CRM_Entertainment.backend.Models.DAO.ContactDaoImp;

@Controller
public class ContactController{

   @Autowired
    private IContactDao contactDao;


 @GetMapping("/formcontact")
    @ResponseBody
    public ResponseEntity<Object> createContact() {
        Contact contact = new Contact();
        return new ResponseEntity<>(contact, HttpStatus.OK);
    }

    @PostMapping("/formcontact")
    @ResponseBody
    public ResponseEntity<Object> submitContactForm(@RequestBody Contact contact) {
        contactDao.save(contact);
        return new ResponseEntity<>(new SuccessResponse("Contact saved successfully"), HttpStatus.OK);
    }

    @DeleteMapping("/formcontact/delete/{Id}")
    @ResponseBody
    public ResponseEntity<Object> deleteContact(@PathVariable Long Id) {
        if (Id > 0) {
            contactDao.delete(Id);
            return new ResponseEntity<>(new SuccessResponse("Contact deleted successfully"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ErrorResponse("Invalid contact ID"), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/formcontact/{IdContact}")
    @ResponseBody
    public ResponseEntity<Object> editContact(@PathVariable(value = "IdContact") Long IdContact) {
        if (IdContact == null || IdContact <= 0) {
            return new ResponseEntity<>(new ErrorResponse("Invalid contact ID"), HttpStatus.BAD_REQUEST);
        }

        Contact contact = contactDao.findOne(IdContact);
        if (contact == null) {
            return new ResponseEntity<>(new ErrorResponse("Contact not found"), HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(contact, HttpStatus.OK);
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