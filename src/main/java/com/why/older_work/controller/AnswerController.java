package com.why.older_work.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.why.older_work.entity.Answer;
import com.why.older_work.entity.Corporation;
import com.why.older_work.entity.QnA;
import com.why.older_work.service.AnswerService;

@RestController
@RequestMapping("api/answer")
public class AnswerController {

    @Autowired
    AnswerService answerService;

    @PostMapping("/save")
    public String save(
        @RequestParam(value = "qna_idx") int qna_idx,
        @RequestParam(value = "answer") String aser
    ) {
        QnA qna = new QnA();

        Answer answer = new Answer();
        
        answer.setQna_idx(qna_idx);
        answer.setAnswer(aser);

        answerService.save(answer);
        
        return "ok";
    }
}
