package com.why.older_work.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.why.older_work.dto.SubListDto;
import com.why.older_work.entity.User;
import com.why.older_work.entity.UserSubList;
import com.why.older_work.service.DetailService;
import com.why.older_work.service.UserService;
import com.why.older_work.service.UserSubListService;

@RestController
@RequestMapping("api/usersublist")
public class UserSubListController {

    @Autowired
    UserService userService;
    
    @Autowired
    UserSubListService usersubService;
    
    @Autowired
    DetailService detailService;
	
    
    //전역
    public final String LOGIN_USER = "loginUser";
    
    
    @GetMapping("getUserApplicationList")
    public List<SubListDto> getUserApplicationList(HttpSession session) {
        User me = (User) session.getAttribute(LOGIN_USER); 
        
        UserSubList usersub = new UserSubList();
        
        usersub.setUser_idx(me.getUser_idx());
        
        // 서비스에서 신청한 공고 리스트를 받아옴
        List<SubListDto> sublistdto = usersubService.getUserApplicationList(me.getUser_idx());
        
        return sublistdto;
    }
    
    //기업이 지원한 유저 확인 
    @GetMapping("CorporationList/{c_idx}") 
    public List<SubListDto> CorporationList(
	    @PathVariable int c_idx
	    ) { 
	    return usersubService.CorporationList(c_idx); 
    }

    
    //[UserSubList.java] 개인유저 일자리 신청 리스트 저장
    @PostMapping("subListSave") 
    public ResponseEntity<Map<String, String>> subListSave(
    		@RequestParam(value = "projNo", required=false) String projNo,
    		@RequestParam(value = "detail_idx", required=false) Integer detail_idx,
  		  	HttpSession session
            ) {
        User me = (User) session.getAttribute(LOGIN_USER);
        
        System.out.println("projNo > " + projNo);
        System.out.println("detail_idx > " + detail_idx);
        
        if (me == null) {
            // 로그인되지 않은 경우
            Map<String, String> response = new HashMap<>();
            response.put("message", "로그인이 필요한 서비스입니다.");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }

        int user_idx = me.getUser_idx();
        System.out.println("저장된 user_idx: " + user_idx);

        
        UserSubList usersub = new UserSubList();
        usersub.setUser_idx(user_idx);
        usersub.setProjNo(projNo);
        
        if(detail_idx != null) {
        	usersub.setDetail_idx(detail_idx);
        }
        
        //개인 일자리 중복 방지 > 신청 개수 출력
        int checkDuplicate = usersubService.countSameSubList(usersub);
        System.out.println(checkDuplicate);
        
        if(checkDuplicate > 0) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "중복 신청입니다.");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        
        //유저 신청 리스트 저장 처리
        usersubService.subListSave(usersub);

        //정상적으로 접수가 완료되었음을 메시지로 반환
        Map<String, String> response = new HashMap<>();
        response.put("message", "접수가 완료되었습니다.");
        
        return ResponseEntity.ok(response);  //성공적으로 응답
    }
    
	//신청 취소
    @PostMapping("cancelApplication") 
    public int cancelApplication(        
            @RequestParam(value = "usersub_idx") int usersub_idx
            ) {
        	UserSubList usersub = new UserSubList();
        	usersub.setUsersub_idx(usersub_idx);
        
        	int result = usersubService.cancelApplication(usersub);
        	return result; // 취소 처리 결과 반환 
    }
	 
    
    //[user-page]지원현황 > 지원완료 개수 출력
    @GetMapping("ApplicationCompleted")
    public int ApplicationCompleted(HttpServletRequest request) {
	   
		   HttpSession session = request.getSession(false);
		   User me = (User) session.getAttribute(LOGIN_USER);
   	
       if (me != null) {
    	   return usersubService.ApplicationCompleted(me);
       }
       System.out.println("로그인이 필요합니다.");
       return 0;
    }
   
	//[user-page]지원현황 > '진행중' 개수 출력
	   @GetMapping("countinProgress")
	   public int countinProgress(HttpServletRequest request) {
		   
		   HttpSession session = request.getSession(false);
		   User me = (User) session.getAttribute(LOGIN_USER);
		   
		   if (me != null) {
			   return usersubService.countinProgress(me);
		   }
		   System.out.println("로그인이 필요합니다.");
		   return 0;
	   }
   
	   //[user-page]지원현황 > '최종합격' 개수 출력 [수정 필요]
	   @GetMapping("countFinalPass")
	   public int countFinalPass(HttpServletRequest request) {
		   HttpSession session = request.getSession(false);
		   
		    // 세션이 없으면 로그인되지 않은 상태로 간주
		    if (session == null || session.getAttribute(LOGIN_USER) == null) {
		        System.out.println("로그인되지 않은 상태입니다.");
		        return -1;  // 로그인되지 않은 상태를 처리
		    }
		    
		    // 세션에서 로그인된 사용자 정보를 가져옵니다.
		    User me = (User) session.getAttribute(LOGIN_USER);
		    
		    if (me != null) {
		        return usersubService.countFinalPass(me);
		    }
		    
		    return -1;  // 사용자 정보가 없으면 처리 불가
		}
	   
}