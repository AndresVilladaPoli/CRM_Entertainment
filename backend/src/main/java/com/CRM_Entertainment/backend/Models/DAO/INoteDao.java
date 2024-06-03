package com.CRM_Entertainment.backend.Models.DAO;

import java.util.List;

import com.CRM_Entertainment.backend.Models.Entity.Note;

public interface INoteDao {

    public List<Note> findAll();
    
    public void save(Note note);

    public Note findOne(Long id);

    public void delete(Long id);
}
