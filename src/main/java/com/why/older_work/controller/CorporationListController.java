package com.why.older_work.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.why.older_work.dto.CorporationListDto;
import com.why.older_work.entity.CorporationList;
import com.why.older_work.service.CorporationListService;

@RestController
@RequestMapping("api/corporationlist")
public class CorporationListController {

    @Autowired
    private CorporationListService corporationlistService;
    
    @GetMapping("findAll")
    public List<Map<String,String>> findAll(
    		@RequestParam(value="c_idx") int c_idx){
    	return corporationlistService.findAll(c_idx);
    }
    
    @PostMapping("save") 
    public int save(
    		@RequestBody CorporationListDto corporationlist
    		) { 
    	return corporationlistService.save(corporationlist);
    	}


    
}
