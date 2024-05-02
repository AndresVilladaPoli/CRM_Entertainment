package com.CRM_Entertainment.backend.Models.DAO;

import java.util.List;

import com.CRM_Entertainment.backend.Models.Entity.Contact;

public interface IContactDao {

    public List<Contact> findAll();       
    
    public void save(Contact contact);

    public Contact findOne(Long Id);

    public void delete(Long Id);

    
}