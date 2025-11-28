package com.why.older_work.entity;

public class UserSubList {
	private int usersub_idx;
	private int user_idx;
	private int detail_idx;
	private String projNo=null;
	private String created_date;
	private String result;
	
//	private String orgName=null;    // 운영 기관명
//	private String trnStatNm;       // 구인 형태 상태명 (예: 모집 중, 마감)
//	private String projRecuJtype;   // 프로젝트 구인 유형
	
    
	public int getDetail_idx() {
		return detail_idx;
	}
	public void setDetail_idx(int detail_idx) {
		this.detail_idx = detail_idx;
	}
	public String getProjNo() {
		return projNo;
	}
	public void setProjNo(String projNo) {
		this.projNo = projNo;
	}
	public int getUsersub_idx() {
		return usersub_idx;
	}
	public void setUsersub_idx(int usersub_idx) {
		this.usersub_idx = usersub_idx;
	}
	public int getUser_idx() {
		return user_idx;
	}
	public void setUser_idx(int user_idx) {
		this.user_idx = user_idx;
	}
	public String getCreated_date() {
		return created_date;
	}
	public void setCreated_date(String created_date) {
		this.created_date = created_date;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	
}
