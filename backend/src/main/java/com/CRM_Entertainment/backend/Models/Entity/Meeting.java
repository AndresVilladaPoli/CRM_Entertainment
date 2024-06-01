package com.CRM_Entertainment.backend.Models.Entity;

import java.io.Serializable;

import jakarta.persistence.Table;

@jakarta.persistence.Entity
@Table(name = "Meets")
public class Meeting implements Serializable {

    @jakarta.persistence.Id
    private Long IdMeet;

    private String ReasonMeeting,Hour,People;

    public Long getIdMeet() {
        return IdMeet;
    }

    public void setIdMeet(Long idMeet) {
        IdMeet = idMeet;
    }

    public String getReasonMeeting() {
        return ReasonMeeting;
    }

    public void setReasonMeeting(String reasonMeeting) {
        ReasonMeeting = reasonMeeting;
    }

    public String getHour() {
        return Hour;
    }

    public void setHour(String hour) {
        Hour = hour;
    }

    public String getPeople() {
        return People;
    }

    public void setPeople(String people) {
        People = people;
    }

}
