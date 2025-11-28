package com.why.older_work.entity;

public class Answer {
	private int qna_idx=0;
	private int answer_idx=0;
	private String answer=null;
	private String created_date=null;

	public int getAnswer_idx() {
		return answer_idx;
	}
	public void setAnswer_idx(int answer_idx) {
		this.answer_idx = answer_idx;
	}
	public int getQna_idx() {
		return qna_idx;
	}
	public void setQna_idx(int qna_idx) {
		this.qna_idx = qna_idx;
	}
	public String getAnswer() {
		return answer;
	}
	public void setAnswer(String answer) {
		this.answer = answer;
	}
	public String getCreated_date() {
		return created_date;
	}
	public void setCreated_date(String created_date) {
		this.created_date = created_date;
	}

	
}
