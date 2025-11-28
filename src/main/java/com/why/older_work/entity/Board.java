package com.why.older_work.entity;

public class Board {

	private int board_idx;
 	private String id;           // 게시글 ID
    private String title;      // 제목     
    private String content;    // 내용
    private String created_date;
    private int view;
    private String img_url;

    public int getView() {
        return view;
    }
    public void setView(int view) {
        this.view = view;
    }
    public int getBoard_idx() {
        return board_idx;
    }
    public void setBoard_idx(int board_idx) {
        this.board_idx = board_idx;
    }
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public String getCreated_date() {
        return created_date;
    }
    public void setCreated_date(String created_date) {
        this.created_date = created_date;
    }
    public String getImg_url() {
        return img_url;
    }
    public void setImg_url(String img_url) {
        this.img_url = img_url;
    }
    

    
    
}

