package com.why.older_work.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.why.older_work.entity.Board;
import com.why.older_work.service.BoardService;

@RestController
@RequestMapping("api/board")
public class BoardController {

	@Autowired
    private BoardService boardService;

    // 게시글 전체 조회
    @GetMapping("/findAll")
    public List<Board> getAllBoards(
        @RequestParam(defaultValue = "0") int start,
        @RequestParam(defaultValue = "10") int count
    ) {
        HashMap<String,Integer> map = new HashMap<>();
        map.put("start", start);
        map.put("count", count);
        
        return boardService.getAllBoards(map);
    }

    // 게시글 검색  
    @GetMapping("/search")
    public List<Board> searchBoards(
        @RequestParam String searchType,
        @RequestParam String keyword,
        @RequestParam(defaultValue = "0") int start,
        @RequestParam(defaultValue = "10") int count
    ) {
        HashMap<String,Object> map = new HashMap<>();
        map.put("searchType", searchType);
        map.put("keyword", keyword);
        map.put("start", start);
        map.put("count", count);
        return boardService.searchBoards(map);
    }


    // 총 게시글 수 조회
    @GetMapping("totalCount")
    public int totalCount(){
        return boardService.totalCount();
    }

    //게시글 상세 조회
    @GetMapping("/findByIdx")
    public Board getBoardByIdx(@RequestParam int board_idx) {
        return boardService.findByIdx(board_idx);
    }
    
     // 게시글 생성
     @PostMapping("/create")
     public ResponseEntity<Void> createBoard(@RequestBody Board board) {
         boardService.createBoard(board);
         return ResponseEntity.status(HttpStatus.CREATED).build();
     }

     
     
     // 게시글 수정
     @PostMapping("/update")
     public ResponseEntity<Void> updateBoard(@RequestBody Board board) {
         boardService.updateBoard(board);
         return ResponseEntity.status(HttpStatus.OK).build();
     }
     
     // 게시글 삭제
     @GetMapping("/delete")
     public ResponseEntity<Void> deleteBoard(@RequestParam int board_idx) {
         boardService.deleteBoard(board_idx);
         return ResponseEntity.status(HttpStatus.OK).build();
     }

     // 조회수 증가
     @GetMapping("/viewCount")
     public ResponseEntity<Board> incrementViewCount(@RequestParam int board_idx) {
         Board updatedBoard = boardService.incrementViewCount(board_idx);
         return ResponseEntity.ok(updatedBoard);
     }


}
