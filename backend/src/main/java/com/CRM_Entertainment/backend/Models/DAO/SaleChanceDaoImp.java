package com.CRM_Entertainment.backend.Models.DAO;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.CRM_Entertainment.backend.Models.Entity.SaleChance;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
public class SaleChanceDaoImp implements ISaleChanceDao {

    @PersistenceContext
    private EntityManager em;

    @SuppressWarnings("unchecked")
    @Transactional
    @Override
    public List<SaleChance> findAll() 
    { 
      return em.createQuery("from chance").getResultList();
    }

    @Override
    @Transactional
    public void save(SaleChance saleChance)
    {
        if(saleChance.getId() != null && saleChance.getId() > 0)
        {
          em.merge(saleChance);
        }
        else
        {
          em.persist(saleChance);
        }
        
    }

    @Override
    @Transactional
    public SaleChance findOne(Long Id) {

      return em.find(SaleChance.class, Id);
    }

    @Override
    @Transactional
    public void delete(Long Id) {
      
      SaleChance saleChance = findOne(Id);

      em.remove(saleChance);

    }

}
