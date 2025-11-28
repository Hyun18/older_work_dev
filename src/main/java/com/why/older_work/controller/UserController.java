package com.why.older_work.controller;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.why.older_work.entity.User;
import com.why.older_work.entity.UserSubList;
import com.why.older_work.service.DetailService;
import com.why.older_work.service.UserService;
import com.why.older_work.service.UserSubListService;

@RestController
@RequestMapping("api/user")
public class UserController {

    @Autowired
    UserService userService;
    
    @Autowired
    UserSubListService usersubService;
    
    @Autowired
    DetailService detailService;

    //전역
    public final String LOGIN_USER = "loginUser";
    //PW 수정 시 사용
    public String ChPWfuncid;
    //탈퇴한 회원 확인 시 사용
    public final char DELETE_USER = 'y';
    
    
    
    //개인회원 로그인 상태 확인
    @GetMapping("/checkUserLogin")
    public ResponseEntity<Boolean> checkUserLogin(HttpSession session) {
        Object loginUser = session.getAttribute("loginUser"); // 세션에서 로그인 사용자 정보 확인
        if (loginUser != null) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }
    }

    
    
    //개인회원 정보 조회
    @GetMapping("findAll")
    public List<User> findAll(){
        return userService.findAll();
    }   
    
    //로그아웃
    @PostMapping("logout")
    public String logout(HttpServletRequest request){
        
    	//세션이 있으면 기존 세션 반환, 없으면 null 반환
    	HttpSession session = request.getSession(false);                                              
        
    	if(session != null){
            session.invalidate(); //세션 제거
        }
        
        System.out.println("------로그아웃되었습니다.------");
        
        return "redirect:/";
    }

    //로그인
    @GetMapping("login")
    public String login(
        @RequestParam(value="id", required=true) String id,
        @RequestParam(value="pw", required=true) String pw,
        HttpSession session
    ){

        User user = new User();
        user.setId(id);
        user.setPw(pw);
        
        User result = userService.getByIdAndPw(user);
       
        
        if(result!=null){
            //"loginUser" 세션 생성      
        	
        	session.setAttribute(LOGIN_USER, result);
        	
        	//세션 생성 시간 출력
        	sessionCreatedate(session);
        	
        	//객체 출력
        	User me = (User) session.getAttribute(LOGIN_USER);
        	
        	String delUserCheck = userService.checkDelUser(user);
        	
        	//회원 탈퇴 체크(del_user = 'y'면 로그인 안 됨)
        	if(delUserCheck.charAt(0) == DELETE_USER) {
        		System.out.println("탈퇴한 회원입니다. 회원가입이 필요합니다.");
        		session.invalidate(); //세션 제거
        		
        		return "redirect:/save-user";
        	}
        	
        	System.out.println("[login]me.getId > " + me.getId());
        	System.out.println("[login]me.getPw > " + me.getPw());
        	System.out.println("[login]me.getName > " + me.getName());
        	System.out.println("[login]me.getGender > " + me.getGender());
        	System.out.println("[login]me.getPhone > " + me.getPhone());
        	System.out.println("[login]me.getDel_user > " + me.getDel_user());
        	System.out.println("[login]me.getUser_idx > " + me.getUser_idx());
        	
          System.out.println("--------login 종료------");
            
            return "로그인 성공";
        }

//        <!-- 세션 확인용, 삭제 -->
//          <c:if test="${not empty sessionScope.loginUser}">
//        	<h2>${sessionScope.loginUser.id}님 안녕하세요</h2>
//        	</c:if>
        
        return "";
    }

        
    //세션 생성 유무 확인(서버 확인)
    @GetMapping("sessionState")
    public String sessionState(HttpSession session){
        // 세션에서 "loginUser" 속성 가져오기
        User me = (User) session.getAttribute(LOGIN_USER);
        
        if (me != null) {
            // 세션이 생성, "loginUser"가 존재하는 경우
        	
            System.out.println("-------(성공)sessionState 종료------");
        	System.out.println("pw > " + me.getId());
            
            return me.getId(); 
        } else {
            // 세션이 없거나 "loginUser" 속성이 존재하지 않는 경우
            System.out.println("(로그인 필요)세션이 생성되지 않았습니다.");
        
            System.out.println("-------(에러)sessionState 종료------");
            
            //return = null -> 로그인 필요/ return 값O -> submitWork() 실행
            return "";
        }
        
    }
    
    
    //회원 탈퇴
    @PostMapping("delUser")
    public String delUser(HttpSession session) {
        User me = (User) session.getAttribute(LOGIN_USER);

        if (me != null) {
            userService.delUser(me);
            session.invalidate(); // 세션 종료
            return "회원 탈퇴 완료";
        }

        return "로그인 후 이용해 주세요.";
    }
    
    //개인 회원 탈퇴 여부 확인(탈퇴 시 > 'y' 리턴)
    @GetMapping("checkDelUser")
    public String checkDelUser(HttpSession session) {
    	
        User me = (User) session.getAttribute(LOGIN_USER);
        
    	return userService.checkDelUser(me);
    }
    
    //일자리 지원 결과 유저 데이터 반영
    
    
    //아이디로 회원 정보 찾기([save-user.jsp]회원 가입 시 중복 확인)
    @GetMapping("getById")
    public User getById(@RequestParam String id) {
        return userService.getById(id);
    }
       
    
    //ID 찾기([findIdAndPw.jsp]에서 사용 / 로그인 X)
    @GetMapping("findID") 
    public String findID(
    		@RequestParam(value = "name") String name,
    		@RequestParam(value = "gender") String gender,
    		@RequestParam(value = "birth_year") int birth_year,
    		@RequestParam(value = "birth_month") int birth_month,
    		@RequestParam(value = "birth_day") int birth_day,
    		@RequestParam(value = "phone") String phone
    		) {
    	
    	User user = new User();
    	
    	user.setName(name);
    	user.setGender(gender);
    	user.setBirth_year(birth_year);
    	user.setBirth_month(birth_month);
    	user.setBirth_day(birth_day);
    	user.setPhone(phone);
    	
        String foundId = userService.findID(user);
        return foundId;     	
    }
    
    //PW 찾기 -> MD5로 암호화된 값이 출력됨[findIdAndPw.jsp]에서 사용/ 로그인 X)
    @GetMapping("findPW") 
    public String findPW(    		
    		@RequestParam(value = "id") String id,
    		@RequestParam(value = "birth_year") int birth_year,
    		@RequestParam(value = "birth_month") int birth_month,
    		@RequestParam(value = "birth_day") int birth_day
    		) {
    	
    	User user = new User();
    	
    	user.setId(id);
    	user.setBirth_year(birth_year);
    	user.setBirth_month(birth_month);
    	user.setBirth_day(birth_day);
    	    	
        String foundPW = userService.findPW(user);
        System.out.println(foundPW);
       
        ChPWfuncid = id;
        
        return foundPW;   
    }
    
    //기존 PW 리턴(비밀번호 변경 시 본인 확인용으로 [user-page.jsp]에서 사용/ 로그인 상태) 
	@GetMapping("currentPwCheck")
    public boolean currentPwCheck(
    		@RequestParam(value = "pw") String check_pw,
    		HttpSession session) {
		
    	User me = (User) session.getAttribute(LOGIN_USER);
    	
    	String currentPw = me.getPw();
    	System.out.println("현재 pw > " + currentPw);
    	
    	String md5_check_pw = encryptMD5(check_pw);
    	System.out.println("md5_check_pw > " + md5_check_pw);
    	
    	if (md5_check_pw != null && md5_check_pw.equals(currentPw)) {
    	    return true;
    	}
    	
    	System.out.println("현재 pw > " + currentPw + "| md5_check_pw > " + md5_check_pw);
    	System.out.println("back-end > 현재 비밀번호가 일치하지 않습니다.");
		
		return false;
    }
	
	//기존 PW 리턴(비밀번호 변경 시 본인 확인용으로 [user-page.jsp]에서 사용/ 로그인 상태) 
    @PostMapping("updatePWinUserPage") 
    public String updatePWinUserPage(    		
    		@RequestParam(value = "newPw") String ch_pw,
    		HttpSession session){
    	
    	User me = (User) session.getAttribute(LOGIN_USER);
    	
    	System.out.println("ch_pw > " + ch_pw);
    	
    	if(me != null) {
    		System.out.println(me.getId());
    		
    		me.setId(me.getId());
    		
            //MD5 암호화된 비밀번호 설정
            String encryptedPw = encryptMD5(ch_pw);
            me.setPw(encryptedPw);
            
            userService.updatePW(me);
            
            System.out.println("encryptedPw > " + encryptedPw);
            System.out.println("---updatePWinUserPage 정상 종료----");
            
            return encryptedPw;
    	}
    	
        return "로그인이 필요한 서비스입니다.";
    }
    
    
    //PW 수정 -> 비밀번호 찾기 시 바로 비밀번호 수정(findIdAndPw.jsp에서 사용/ 로그인 X)
    @PostMapping("updatePW") 
    public String updatePW(
            @RequestParam(value = "newPw") String changepw,
            @RequestParam(value = "pwCheck" , required = false) String pwCheck
    		) {
    	
    	User user = new User();
    	
    	System.out.println("ChPWfuncid > " + ChPWfuncid);
    	
    	user.setId(ChPWfuncid);
    	
    	ChPWfuncid = null;
    	
        //MD5 암호화된 비밀번호 설정
        String encryptedPw = encryptMD5(changepw);
        user.setPw(encryptedPw);
        
        userService.updatePW(user);
        
        //md5(pw) 리턴
        return encryptedPw;
    }

    
    //개인회원 '이름' 변경 시 본인 확인[MyPage: user-page.jsp]
    @GetMapping("IdentityVerification")
    public String IdentityVerification(
    		@RequestParam(value = "name") String name,
    		@RequestParam(value = "birthYear") int birth_year,
    		@RequestParam(value = "birthMonth") int birth_month,
    		@RequestParam(value = "birthDay") int birth_day,
    		@RequestParam(value = "gender") String gender,
    		@RequestParam(value = "phone") String phone
    		) {
    	
        User user = new User();
        
        user.setName(name);
        user.setBirth_year(birth_year);
        user.setBirth_month(birth_month);
        user.setBirth_day(birth_day);
        user.setGender(gender);
        user.setPhone(phone);
    	
        String foundNAME = userService.IdentityVerification(user);
        
        if(foundNAME == null) {
        	System.out.println("데이터를 다시 입력해 주세요.");
        	System.out.println(foundNAME);
        
        	return null;
        }
        
    	return foundNAME;
    }
    
    //개인회원 '이름' 수정[MyPage: user-page.jsp]
    @PostMapping("updateName")
    public String updateName(
    		@RequestParam(value = "name") String ch_name,
    		HttpSession session 
    		) {
    	
    	User me = (User) session.getAttribute(LOGIN_USER);
    	System.out.println("[update]me.getId > " + me.getId());
    	
    	User user = new User();
    	
    	if(me != null) {            
        	user.setId(me.getId());
        	user.setPw(me.getPw());
        	user.setPhone(me.getPhone());
        	user.setAddress(me.getAddress());
    		
    		user.setName(ch_name);
    		
    		userService.update(user);
    	}
    	
    	System.out.println("정보 갱신을 위해 재로그인이 필요합니다.");
    	return "ok";
    }
    
    //개인회원 정보 수정
    @PostMapping("update")
    public String update(
            @RequestParam(value = "email") String ch_email,
            @RequestParam(value = "name") String ch_name,
            @RequestParam(value = "phone") String ch_phone,
            @RequestParam(value = "address") String ch_address,
    		HttpSession session , HttpServletRequest request, HttpServletResponse response
    		) {
    	
    	User me = (User) session.getAttribute(LOGIN_USER);
    	
    	System.out.println("[update]me.getId > " + me.getId());
    	
        User user = new User();
    	
    	user.setId(me.getId());
        
    	if(me != null) {            
    		user.setEmail(ch_email);
            user.setName(ch_name);
            user.setPhone(ch_phone);
            user.setAddress(ch_address);
            
        	userService.update(user);
    	}
    	
    	System.out.println("정보 갱신을 위해 재로그인이 필요합니다.");
    	
    	return "ok";
    }
    
    //개인회원 회원가입
    @PostMapping("save")
    public String save(
        @RequestParam(value = "id" ,defaultValue = "1")  String id,
        @RequestParam(value = "pw" ,defaultValue = "2") String pw,
        @RequestParam(value = "name" ,defaultValue = "3") String name,
        @RequestParam(value = "email" ,defaultValue = "10") String email,
        @RequestParam(value = "birthYear" ,defaultValue = "4") int birthYear,
        @RequestParam(value = "birthMonth" ,defaultValue = "5") int birthMonth,
        @RequestParam(value = "birthDay" ,defaultValue = "6") int birthDay,
        @RequestParam(value = "gender" ,defaultValue = "5") String gender,
        @RequestParam(value = "phone" ,defaultValue = "8") String phone,
        @RequestParam(value = "address" ,defaultValue = "9") String address
    ) {
    	
        User user = new User();
        
        user.setId(id);
        user.setPw(pw);
        user.setName(name);
        user.setEmail(email);
        user.setBirth_year(birthYear);
        user.setBirth_month(birthMonth);
        user.setBirth_day(birthDay);
        user.setGender(gender);
        user.setPhone(phone);
        user.setAddress(address);

        userService.save(user);

        //저장된 후 user_idx 값을 사용
        int user_Idx = user.getUser_idx();
        System.out.println("저장된 user_idx: " + user_Idx);
        
        return "redirect:/";
    }
    
    
    //[함수 영역]
    
    public void sessionCreatedate(HttpSession session) {
    	
        // 예시로 세션 생성 시간을 가져옴 (실제 웹 애플리케이션에서는 session 객체 사용)
        long creationTime = session.getCreationTime();  // 밀리초 단위로 반환됨

        // 밀리초를 Date 객체로 변환
        Date creationDate = new Date(creationTime);

        // Date를 사람이 읽을 수 있는 형식으로 변환
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String formattedDate = sdf.format(creationDate);

        // 결과 출력
        System.out.println("Session Creation Time: " + formattedDate);
    }
    
    // 객체의 타입을 확인하고, 해당 객체에 대해 처리를 수행하는 메서드
    public static void checkAndPrint(Object obj) {
        // 객체가 String 타입인지 확인
        if (obj instanceof String) {
            String str = (String) obj;  // 안전하게 String으로 캐스팅
            System.out.println("String 객체: " + str);
        }
        // 객체가 Integer 타입인지 확인
        else if (obj instanceof Integer) {
            Integer integer = (Integer) obj;  // 안전하게 Integer로 캐스팅
            System.out.println("Integer 객체: " + integer);
        }
        // 객체가 User 타입인지 확인
        else if (obj instanceof User) {
            User user = (User) obj;  // 안전하게 User로 캐스팅
            System.out.println("User 객체: " + user);
        }
        else {
            System.out.println("알 수 없는 타입: " + obj.getClass().getName());
        }
    }
    
    // MD5 암호화 함수
    private String encryptMD5(String pw) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(pw.getBytes());
            byte[] byteData = md.digest();
            
            // 바이트 배열을 16진수로 변환
            StringBuilder hexString = new StringBuilder();
            for (byte b : byteData) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
    
}