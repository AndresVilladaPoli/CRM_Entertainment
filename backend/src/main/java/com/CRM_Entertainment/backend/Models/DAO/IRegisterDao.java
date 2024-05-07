package com.CRM_Entertainment.backend.Models.DAO;

import com.CRM_Entertainment.backend.Models.Entity.User;

public interface IRegisterDao {

    void saveUser(User user);

    User findByUsername(String username);
    
    User findByEmail(String email);
}
