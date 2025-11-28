package com.why.older_work.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.why.older_work.entity.Board;
import com.why.older_work.service.BoardService;

@Controller
public class ViewController {
	@Autowired
	private BoardService boardService;

	@GetMapping("home")
	public String home() {
		return "home";
	}

	@GetMapping("")
	public String myhome() {
		return "my-home";
	}
	
	//일자리 신청 페이지
	@GetMapping("detail-work")
	public String detailwork() {
		return "detail-work";
	}

	//개인 아이디&비번 찾기
	@GetMapping("findIdAndPw")
	public String findidAndPw() {
		return "findIdAndPw";
	}
	
	//개인 로그인
	@GetMapping("user-login")
	public String userLogin() {
		return "user-login";
	}

	//개인 마이페이지
	@GetMapping("user-page")
	public String userpage() {
		return "user-page";
	}

	//개인 회원가입
	@GetMapping("save-user")
	public String save() {
		return "save-user";
	}
	
	// 기업 회원가입
	@GetMapping("company-save-user")
	public String companysave() {
		return "company-save-user";
	}
	//일자리 상세
	@GetMapping("old-detail-work")
	public String oldDetailWork() {
		return "old-detail-work";
	}
	
	//일자리유형
	@GetMapping("work-type")
	public String workType() {
		return "work-type";
	}
	
	//절차안내
	@GetMapping("job-method")
	public String jobmethod() {
		return "job-method";
	}
	
	//회원가입 선택(기업,개인)
	@GetMapping("mid_save-user")
	public String midesave() {
		return "mid_save-user";
	}

	//일자리
	@GetMapping("work")
	public String work() {
		return "work";
	}
	
	//게시판 글쓰기
	@GetMapping("/write")
    public String write() {
        return "write";
    }
	
	//자유게시판
    @GetMapping("/list")
    public String list() {
        return "list";
    }
     
    //게시판 상세보기
	  @GetMapping("/view")
	  public String view(@RequestParam int board_idx, Model model) {
	      Board board = boardService.findByIdx(board_idx);
	      model.addAttribute("board", board);
	      return "view";
	  }
	
	  //게시판 수정
	  @GetMapping("/modify")
	  public String modify(@RequestParam int board_idx, Model model) {
	      Board board = boardService.findByIdx(board_idx);
	      model.addAttribute("board", board);
	      return "modify";
	  }
	

	//detail-company
	  @GetMapping("company-save-detail")
	  public String saveDetail() {
		  return "company-save-detail";
	  }
	  
	//detail-company
	  @GetMapping("company-page")
	  public String companyPage() {
		  return "company-page";
	  }

	//우리일자리
	@GetMapping("our-work")
	public String ourWork() {
		return "our-work";
	}

}