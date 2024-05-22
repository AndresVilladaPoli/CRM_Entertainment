package com.CRM_Entertainment.backend.Models.Entity;

import java.io.Serializable;

import jakarta.persistence.Table;

@jakarta.persistence.Entity
@Table(name = "Contact")
public class Contact implements Serializable {

    @jakarta.persistence.Id
    private Long Id;

    private String Name,Cellphone,Email,Direction, ContactType;

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getCellphone() {
        return Cellphone;
    }

    public void setCellphone(String cellphone) {
        Cellphone = cellphone;
    }

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public String getDirection() {
        return Direction;
    }

    public void setDirection(String direction) {
        Direction = direction;
    }

    public String getContactType() {
        return ContactType;
    }

    public void setContactType(String contactType) {
        ContactType = contactType;
    }

}

    

