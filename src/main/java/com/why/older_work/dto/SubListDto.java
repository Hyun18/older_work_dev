package com.why.older_work.dto;

public class SubListDto {
	private int usersub_idx = 0;
	private Long user_idx;
	private int detail_idx;
	private String projNo=null;
	private String created_date;
	
	private String orgName=null;    // 운영 기관명
	private String trnStatNm;       // 구인 형태 상태명 (예: 모집 중, 마감)
	private String projRecuJtype;   // 프로젝트 구인 유형
	
	private String name;			//user 정복
	private String email=null;
	private int birth_year;
	private int birth_month;
	private int birth_day;
	private String phone;
	private String address;
	
	private String arrange;         // 정렬 기준
	
	private String hpNotiSdate;     // 공고 시작일
	private String hpNotiEdate;     // 공고 종료일
	public int getUsersub_idx() {
		return usersub_idx;
	}
	public void setUsersub_idx(int usersub_idx) {
		this.usersub_idx = usersub_idx;
	}
	public Long getUser_idx() {
		return user_idx;
	}
	public void setUser_idx(Long user_idx) {
		this.user_idx = user_idx;
	}
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
	public String getCreated_date() {
		return created_date;
	}
	public void setCreated_date(String created_date) {
		this.created_date = created_date;
	}
	public String getOrgName() {
		return orgName;
	}
	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}
	public String getTrnStatNm() {
		return trnStatNm;
	}
	public void setTrnStatNm(String trnStatNm) {
		this.trnStatNm = trnStatNm;
	}
	public String getProjRecuJtype() {
		return projRecuJtype;
	}
	public void setProjRecuJtype(String projRecuJtype) {
		this.projRecuJtype = projRecuJtype;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public int getBirth_year() {
		return birth_year;
	}
	public void setBirth_year(int birth_year) {
		this.birth_year = birth_year;
	}
	public int getBirth_month() {
		return birth_month;
	}
	public void setBirth_month(int birth_month) {
		this.birth_month = birth_month;
	}
	public int getBirth_day() {
		return birth_day;
	}
	public void setBirth_day(int birth_day) {
		this.birth_day = birth_day;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getArrange() {
		return arrange;
	}
	public void setArrange(String arrange) {
		this.arrange = arrange;
	}
	public String getHpNotiSdate() {
		return hpNotiSdate;
	}
	public void setHpNotiSdate(String hpNotiSdate) {
		this.hpNotiSdate = hpNotiSdate;
	}
	public String getHpNotiEdate() {
		return hpNotiEdate;
	}
	public void setHpNotiEdate(String hpNotiEdate) {
		this.hpNotiEdate = hpNotiEdate;
	}
	
}
