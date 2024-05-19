package com.CRM_Entertainment.backend.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

import com.CRM_Entertainment.backend.Models.DAO.ISaleChanceDao;
import com.CRM_Entertainment.backend.Models.Entity.SaleChance;

@Controller
public class SaleChanceController {

    @Autowired
    private ISaleChanceDao saleChanceDao;

    @GetMapping("/formchances")
    public String CreateSaleChance(Model model) 
    {

        SaleChance saleChance = new SaleChance();

        model.addAttribute("Title", "Sales Chances");
        model.addAttribute("saleChance", saleChance);


        return "formchances";
    }

    @PutMapping("/formchances/{Id}")   
    public String EditSaleChance(@PathVariable(value = "Id") Long Id, Model model) {
    
        if (Id == null || Id <= 0) {
            return "redirect:/chanceslist";
        }
        
        SaleChance saleChance = saleChanceDao.findOne(Id);
    
        if (saleChance == null) {
            return "redirect:/chanceslist";
        } 
    
        model.addAttribute("title", "Edit Sale Chance");
        model.addAttribute("saleChance", saleChance);
    
        return "formchances";
    }
}
