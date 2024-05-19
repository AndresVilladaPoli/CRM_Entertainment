package com.CRM_Entertainment.backend.Models.DAO;

import java.util.List;

import com.CRM_Entertainment.backend.Models.Entity.Sale;

public interface ISaleDao {

    List<Sale> findAll();   

    void save(Sale sale);

    Sale findOne(Long id);
    
    void delete(Long id);
}
