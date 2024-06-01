package com.CRM_Entertainment.backend.Models.DAO;

import java.util.List;
import org.springframework.stereotype.Repository;

import com.CRM_Entertainment.backend.Models.Entity.Meeting;


import jakarta.persistence.EntityManager;
import jakarta.persistence.Id;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;

@Repository
public class MeetingDaoImp implements IMeetingDao {

    @PersistenceContext
    private EntityManager entityManager;

    
    @PersistenceContext
    private EntityManager em;

    @SuppressWarnings("unchecked")
    @Transactional
    @Override
    public List<Meeting> findAll() {
        return em.createQuery("from Meets").getResultList();
    }

    @Override
    @Transactional
    public void save(Meeting meeting) {
        if (meeting.getIdMeet() != null && meeting.getIdMeet() > 0) {
            em.merge(meeting);
        } else {
            em.persist(meeting);
        }
    }

    @Override
    @Transactional
    public Meeting findOne(Long id) {
        return em.find(Meeting.class, id);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Meeting meeting = findOne(id);
        if (meeting != null) {
            em.remove(meeting);
        }
    }
}
