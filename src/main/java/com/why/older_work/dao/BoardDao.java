package com.why.older_work.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.why.older_work.entity.Board;

@Repository
public class BoardDao{

	@Autowired
	   private SqlSession s;

	    // 게시글 전체 조회
	    public List<Board> getAllBoards(HashMap<String,Integer> map) {
	        return s.selectList("BoardMapper.findAll",map);
	    }

		// 게시글 검색
		public List<Board> searchBoards(HashMap<String,Object> map) {
			return s.selectList("BoardMapper.search", map);
		}

		// 총 게시글 수 조회
		public int totalCount(){
			return s.selectOne("BoardMapper.totalCount");
		}


	    // 게시글 상세 조회
		public Board findByIdx(int board_idx) {
			return s.selectOne("BoardMapper.findByIdx", board_idx);
		}


	    // 게시글 생성
	    public int createBoard(Board board) {
	        return s.insert("BoardMapper.insert", board);
	    }

	    // 게시글 수정
	    public int updateBoard(Board board) {
	        return s.update("BoardMapper.update", board);
	    }

	    // 게시글 삭제
	    public int deleteBoard(int board_idx) {
	       return s.delete("BoardMapper.delete", board_idx);
	    }

	    // 조회수 증가  
	    public int incrementViewCount(int board_idx) {
	        return s.update("BoardMapper.incrementViewCount", board_idx);
	    }

}
