package com.CRM_Entertainment.backend.Models.Entity;

import java.io.Serializable;

import jakarta.persistence.Table;

@jakarta.persistence.Entity
@Table(name = "Calls")
public class Call implements Serializable {

    @jakarta.persistence.Id
    private Long IdCall;

    private String Reason;

    public Long getIdCall() {
        return IdCall;
    }

    public void setIdCall(Long idCall) {
        IdCall = idCall;
    }

    public String getReason() {
        return Reason;
    }

    public void setReason(String reason) {
        Reason = reason;
    }

    
}
