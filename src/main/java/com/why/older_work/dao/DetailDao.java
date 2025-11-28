package com.why.older_work.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.why.older_work.entity.Detail;

@Repository
public class DetailDao {
    
    @Autowired
    private SqlSession s;

    public List<Detail> findAll() {
        return s.selectList("DetailMapper.findAll");
    }

    public int upload(Detail detail) {
        return s.insert("DetailMapper.upload", detail);
    }
    
    public Detail findByDetailIdx(int detail_idx) {
    	return s.selectOne("DetailMapper.findByDetailIdx",detail_idx);
    }
    
    public int detailUpdate(Detail detail) {
    	return s.update("DetailMapper.detailUpdate",detail);
    }

}
