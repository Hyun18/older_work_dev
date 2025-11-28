package com.why.older_work.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.why.older_work.dao.CorporationListDao;
import com.why.older_work.dto.CorporationListDto;

@Service
public class CorporationListService {
	
    @Autowired
    private CorporationListDao corporationListdao;

    public int save(CorporationListDto corporationList) {
        return corporationListdao.save(corporationList);
    }

    public List<Map<String, String>> findAll(int corporationIdx) {
        return corporationListdao.findAll(corporationIdx);
    }
}
