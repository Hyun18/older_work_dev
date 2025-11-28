package com.why.older_work.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.why.older_work.entity.QnA;

@Repository
public class QnADao {

    @Autowired
    private SqlSession sqlSession;

    public int save(QnA qna) {
        return sqlSession.insert("QnAMapper.save", qna);
    }
}
