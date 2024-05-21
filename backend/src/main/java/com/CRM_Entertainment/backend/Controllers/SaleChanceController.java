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

import com.CRM_Entertainment.backend.Models.DAO.ISaleChanceDao;
import com.CRM_Entertainment.backend.Models.Entity.SaleChance;

@Controller
public class SaleChanceController {

    @Autowired
    private ISaleChanceDao saleChanceDao;

    @GetMapping("/formchances")
    @ResponseBody
    public ResponseEntity<Object> createSaleChance() {
        SaleChance saleChance = new SaleChance();
        return new ResponseEntity<>(saleChance, HttpStatus.OK);
    }

    @PostMapping("/formchances")
    @ResponseBody
    public ResponseEntity<Object> submitSaleChance(@RequestBody SaleChance saleChance) {
        saleChanceDao.save(saleChance);
        return new ResponseEntity<>(new SuccessResponse("SaleChance created successfully"), HttpStatus.CREATED);
    }

    @PutMapping("/formchances/{Id}")
    @ResponseBody
    public ResponseEntity<Object> editSaleChance(@PathVariable(value = "Id") Long Id) {
        if (Id == null || Id <= 0) {
            return new ResponseEntity<>(new ErrorResponse("Invalid SaleChance ID"), HttpStatus.BAD_REQUEST);
        }

        SaleChance saleChance = saleChanceDao.findOne(Id);
        if (saleChance == null) {
            return new ResponseEntity<>(new ErrorResponse("SaleChance not found"), HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(saleChance, HttpStatus.OK);
    }

    public static class ErrorResponse {
        private String error;

        public ErrorResponse(String error) {
            this.error = error;
        }

        public String getError() {
            return error;
        }

        public void setError(String error) {
            this.error = error;
        }
    }

    public static class SuccessResponse {
        private String message;

        public SuccessResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
