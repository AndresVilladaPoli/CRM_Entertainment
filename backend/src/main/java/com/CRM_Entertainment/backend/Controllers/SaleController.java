package com.CRM_Entertainment.backend.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.CRM_Entertainment.backend.Models.DAO.ISaleDao;
import com.CRM_Entertainment.backend.Models.Entity.Sale;

@Controller
@RequestMapping("/Sale")
public class SaleController {

    @Autowired
    private ISaleDao saleDao;

    @GetMapping
    @ResponseBody
    public ResponseEntity<List<Sale>> getAllSales() {
        List<Sale> sales = saleDao.findAll();
        return new ResponseEntity<>(sales, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Object> getSale(@PathVariable Long id) {
        Sale sale = saleDao.findOne(id);
        if (sale == null) {
            return new ResponseEntity<>(new ErrorResponse("Sale not found"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(sale, HttpStatus.OK);
    }


    @PostMapping
    @ResponseBody
    public ResponseEntity<Object> createSale(@RequestBody Sale sale) {
        saleDao.save(sale);
        return new ResponseEntity<>(new SuccessResponse("Sale created successfully"), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Object> updateSale(@PathVariable Long id, @RequestBody Sale saleDetails) {
        Sale sale = saleDao.findOne(id);
        if (sale == null) {
            return new ResponseEntity<>(new ErrorResponse("Sale not found"), HttpStatus.NOT_FOUND);
        }
        sale.setProduct(saleDetails.getProduct());
        //sale.setQuantity(saleDetails.getQuantity());
        sale.setName(saleDetails.getName());
        sale.setState(saleDetails.getState());
        sale.setPrice(saleDetails.getPrice());
        sale.setDate(saleDetails.getDate());
        saleDao.save(sale);
        return new ResponseEntity<>(new SuccessResponse("Sale updated successfully"), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Object> deleteSale(@PathVariable Long id) {
        Sale sale = saleDao.findOne(id);
        if (sale == null) {
            return new ResponseEntity<>(new ErrorResponse("Sale not found"), HttpStatus.NOT_FOUND);
        }
        saleDao.delete(id);
        return new ResponseEntity<>(new SuccessResponse("Sale deleted successfully"), HttpStatus.OK);
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
