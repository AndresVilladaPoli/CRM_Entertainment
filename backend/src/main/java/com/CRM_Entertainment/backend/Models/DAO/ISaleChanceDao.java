package com.CRM_Entertainment.backend.Models.DAO;

import java.util.List;

import com.CRM_Entertainment.backend.Models.Entity.SaleChance;

public interface ISaleChanceDao {

    public List<SaleChance> findAll();       
    
    public void save(SaleChance saleChance);

    public SaleChance findOne(Long Id);

    public void delete(Long Id);
}
