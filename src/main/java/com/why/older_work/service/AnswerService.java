package com.why.older_work.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.why.older_work.dao.AnswerDao;
import com.why.older_work.entity.Answer;

@Service
public class AnswerService {

    @Autowired
    private AnswerDao answerDao;

    public int save(Answer answer) {
        return answerDao.save(answer);
    }
}
