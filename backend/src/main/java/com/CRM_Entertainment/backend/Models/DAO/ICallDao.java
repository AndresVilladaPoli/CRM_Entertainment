package com.CRM_Entertainment.backend.Models.DAO;

import java.util.List;

import com.CRM_Entertainment.backend.Models.Entity.Call;


public interface ICallDao {

    List<Call> findAll();   

    void save(Call call);

    Call findOne(Long IdCall);
    
    void delete(Long IdCall);
}
