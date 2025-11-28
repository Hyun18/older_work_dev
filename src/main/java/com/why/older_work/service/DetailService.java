package com.why.older_work.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.why.older_work.dao.DetailDao;
import com.why.older_work.entity.Detail;

@Service
public class DetailService {
    
    @Autowired
    private DetailDao detailDao;

    public List<Detail> findAll() {
        return detailDao.findAll();
    }

    public int upload(Detail detail) {
        return detailDao.upload(detail);
    }
    
    public Detail findByDetailIdx(int detailIdx) {
        return detailDao.findByDetailIdx(detailIdx);
    }
    
    public int detailUpdate(Detail detail) {
    	return detailDao.detailUpdate(detail);
    }
    
}
