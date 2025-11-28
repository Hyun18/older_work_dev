package com.why.older_work.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.why.older_work.entity.Corporation;
import com.why.older_work.entity.QnA;
import com.why.older_work.entity.User;
import com.why.older_work.service.QnAService;

@RestController
@RequestMapping("api/qna")
public class QnAController {

    @Autowired
    QnAService qnaService;

    @PostMapping("save")
    public String save(
        @RequestParam(value = "user_idx") int user_idx,
        @RequestParam(value = "c_idx") int c_idx,
        @RequestParam(value = "title") String title,
        @RequestParam(value = "content") String content
    ) {
        User user = new User();
        Corporation corporation = new Corporation();

        int views = 0;
        
        QnA qna = new QnA();

        qna.setUser_idx(user_idx);
        qna.setC_idx(c_idx);
        qna.setTitle(title);
        qna.setContent(content);
        qna.setViews(views);

        qnaService.save(qna);
        
        return "ok";
    }
}
