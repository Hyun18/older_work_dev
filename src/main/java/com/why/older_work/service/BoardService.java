package com.why.older_work.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.why.older_work.dao.BoardDao;
import com.why.older_work.entity.Board;

@Service
public class BoardService {

	 @Autowired
	    private BoardDao boardDao;

	    // 게시글 전체 조회
	    public List<Board> getAllBoards(HashMap<String,Integer> map) {
	        return boardDao.getAllBoards(map);
	    }

		// 게시글 검색
		public List<Board> searchBoards(HashMap<String,Object> map) {
			return boardDao.searchBoards(map);
		}

		// 총 게시글 수 조회
		public int totalCount(){
			return boardDao.totalCount();
		}

	     // 게시글 상세 조회

		 public Board findByIdx(int board_idx) {
			return boardDao.findByIdx(board_idx);
		}

	    // 게시글 생성
	    public int createBoard(Board board) {
	        return boardDao.createBoard(board);
	    }

	    // 게시글 수정
	    public int updateBoard(Board board) {
	        return boardDao.updateBoard(board);
	    }

	    // 게시글 삭제
	    public int deleteBoard(int board_idx) {
	        return boardDao.deleteBoard(board_idx);
	    }

	    public Board incrementViewCount(int board_idx) {
	        // 조회수 증가
	        boardDao.incrementViewCount(board_idx);
	        
	        // 업데이트된 게시글 반환
	        return boardDao.findByIdx(board_idx);
	    }

	  
}
