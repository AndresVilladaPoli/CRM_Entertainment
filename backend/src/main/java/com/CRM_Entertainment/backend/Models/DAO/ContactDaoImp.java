package com.CRM_Entertainment.backend.Models.DAO;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.CRM_Entertainment.backend.Models.Entity.Contact;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository

public class ContactDaoImp implements IContactDao {

    @PersistenceContext
    
    private EntityManager em;

    @SuppressWarnings("unchecked")
    @Transactional
    @Override
    public List<Contact> findAll() 
    { 
      return em.createQuery("from Contact").getResultList();
    }

    @Override
    @Transactional
    public void save(Contact contact)
    {
        if(contact.getId() != null && contact.getId() > 0)
        {
          em.merge(contact);
        }
        else
        {
          em.persist(contact);
        }
        
    }


    @Override
    @Transactional
    public Contact findOne(Long Id) {

      return em.find(Contact.class, Id);
    }

    @Override
    @Transactional
    public void delete(Long Id) {
      
      Contact contact = findOne(Id);

      em.remove(contact);

    }

  }
