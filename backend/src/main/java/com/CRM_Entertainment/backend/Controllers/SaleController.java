package com.CRM_Entertainment.backend.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.CRM_Entertainment.backend.Models.DAO.ISaleDao;
import com.CRM_Entertainment.backend.Models.Entity.Sale;

@Controller
@RequestMapping("/Sale")
public class SaleController {

    @Autowired
    private ISaleDao saleDao;

    @GetMapping
    public List<Sale> getAllSales() {
        return saleDao.findAll();
    }

    @GetMapping("/{id}")
    public Sale getSale(@PathVariable Long id) {
        return saleDao.findOne(id);
    }

     @PostMapping
    public Sale createSale(@RequestBody Sale sale) {
        saleDao.save(sale);
        return sale;
    }

     @PutMapping("/{id}")
    public Sale updateSale(@PathVariable Long id, @RequestBody Sale saleDetails) {
        Sale sale = saleDao.findOne(id);
        if (sale != null) {
            sale.setProduct(saleDetails.getProduct());
            sale.setQuantity(saleDetails.getQuantity());
            sale.setPrice(saleDetails.getPrice());
            sale.setDate(saleDetails.getDate());
            saleDao.save(sale);
        }
        return sale;
    }

    @DeleteMapping("/{id}")
    public void deleteSale(@PathVariable Long id) {
        saleDao.delete(id);
    }

}
