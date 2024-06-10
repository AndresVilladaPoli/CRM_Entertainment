package com.CRM_Entertainment.backend.Models.DAO;

import java.util.List;
import org.springframework.stereotype.Repository;

import com.CRM_Entertainment.backend.Models.Entity.Call;


import jakarta.persistence.EntityManager;
//import jakarta.persistence.Id;
//import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
//import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;

@Repository
public class CallDaoImp implements ICallDao {

    @PersistenceContext
    private EntityManager entityManager;

    
    @PersistenceContext
    private EntityManager em;

    @SuppressWarnings("unchecked")
    @Transactional
    @Override
    public List<Call> findAll() {
        return em.createQuery("from Calls").getResultList();
    }

    @Override
    @Transactional
    public void save(Call call) {
        if (call.getIdCall() != null && call.getIdCall() > 0) {
            em.merge(call);
        } else {
            em.persist(call);
        }
    }

    @Override
    @Transactional
    public Call findOne(Long IdCall) {
        return em.find(Call.class, IdCall);
    }

    @Override
    @Transactional
    public void delete(Long IdCall) {
        Call call = findOne(IdCall);
        if (call != null) {
            em.remove(call);
        }
    }
}
