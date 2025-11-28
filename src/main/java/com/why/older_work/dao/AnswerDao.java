package com.why.older_work.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.why.older_work.entity.Answer;

@Repository
public class AnswerDao {

    @Autowired
    private SqlSession sqlSession;

    public int save(Answer answer) {
        return sqlSession.insert("AnswerMapper.save", answer);
    }
}
