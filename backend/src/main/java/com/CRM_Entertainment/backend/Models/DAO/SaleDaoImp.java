package com.CRM_Entertainment.backend.Models.DAO;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.CRM_Entertainment.backend.Models.Entity.Sale;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
public class SaleDaoImp implements ISaleDao {

    @PersistenceContext
    private EntityManager em;

    @SuppressWarnings("unchecked")
    @Transactional
    @Override
    public List<Sale> findAll() {
        return em.createQuery("from Sale").getResultList();
    }

    @Override
    @Transactional
    public void save(Sale sale) {
        if (sale.getId() != null && sale.getId() > 0) {
            em.merge(sale);
        } else {
            em.persist(sale);
        }
    }

    @Override
    @Transactional
    public Sale findOne(Long id) {
        return em.find(Sale.class, id);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Sale sale = findOne(id);
        if (sale != null) {
            em.remove(sale);
        }
    }
}
