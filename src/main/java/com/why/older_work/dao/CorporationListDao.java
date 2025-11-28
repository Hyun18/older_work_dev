package com.why.older_work.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.why.older_work.dto.CorporationListDto;

@Repository
public class CorporationListDao {

    @Autowired
    private SqlSession sqlSession;

    private static final String NAMESPACE = "CorporationListMapper";

    public int save(CorporationListDto corporationList) {
        return sqlSession.insert(NAMESPACE + ".save", corporationList);
    }

    public List<Map<String, String>> findAll(int corporationIdx) {
        return sqlSession.selectList(NAMESPACE + ".findAll", corporationIdx);
    }
}
