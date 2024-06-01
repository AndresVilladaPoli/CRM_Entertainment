package com.CRM_Entertainment.backend.Models.DAO;

import java.util.List;

import com.CRM_Entertainment.backend.Models.Entity.Meeting;


public interface IMeetingDao {

    List<Meeting> findAll();   

    void save(Meeting meeting);

    Meeting findOne(Long IdMeet);
    
    void delete(Long IdMeet);
}
