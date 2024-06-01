package com.CRM_Entertainment.backend.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.CRM_Entertainment.backend.Models.DAO.IMeetingDao;
import com.CRM_Entertainment.backend.Models.Entity.Meeting;

@Controller
public class MeetingController {

    @Autowired
    private IMeetingDao meetingDao;

    @GetMapping("/formeetings")
    @ResponseBody
    public ResponseEntity<Object> createMeeting() {
        Meeting meeting = new Meeting();
        return new ResponseEntity<>(meeting, HttpStatus.OK);
    }
}