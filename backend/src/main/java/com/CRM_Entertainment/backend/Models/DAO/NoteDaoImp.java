package com.CRM_Entertainment.backend.Models.DAO;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.CRM_Entertainment.backend.Models.Entity.Note;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
public class NoteDaoImp implements INoteDao {

    @PersistenceContext
    private EntityManager em;

     @SuppressWarnings("unchecked")
    @Transactional
    @Override
    public List<Note> findAll() {
        return em.createQuery("from Note").getResultList();
    }

    @Override
    @Transactional
    public void save(Note note) {
        if (note.getId() != null && note.getId() > 0) {
            em.merge(note);
        } else {
            em.persist(note);
        }
    }

    @Override
    @Transactional
    public Note findOne(Long id) {
        return em.find(Note.class, id);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Note note = findOne(id);
        if (note != null) {
            em.remove(note);
        }
    }
}
