package com.CRM_Entertainment.backend.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.CRM_Entertainment.backend.Models.DAO.ICallDao;
import com.CRM_Entertainment.backend.Models.Entity.Call;

@Controller
public class CallController {

    @Autowired
    private ICallDao callDao;

    @GetMapping("/formcalls")
    @ResponseBody
    public ResponseEntity<Object> createCall() {
        Call call = new Call();
        return new ResponseEntity<>(call, HttpStatus.OK);
    }
}