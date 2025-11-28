package com.why.older_work.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.why.older_work.dao.QnADao;
import com.why.older_work.entity.QnA;

@Service
public class QnAService {

    @Autowired
    private QnADao qnaDao;

    public int save(QnA qna) {
        return qnaDao.save(qna);
    }
}
