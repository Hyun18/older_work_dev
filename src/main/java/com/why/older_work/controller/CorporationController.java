package com.why.older_work.controller;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.why.older_work.entity.Corporation;
import com.why.older_work.service.CorporationService;

@RestController
@RequestMapping("api/corporation")
public class CorporationController {

    @Autowired
    private CorporationService corporationService;

//    @Autowired
//    private DetailService detailService;
    
    
    
    //기업회원탈퇴
    @DeleteMapping("delCorporation")
    public ResponseEntity<String> delCorporation(
    		@RequestParam("c_idx") int c_idx){
    	boolean isDeleted = corporationService.delCorporation(c_idx);
    	if(isDeleted) {
    		return ResponseEntity.ok("Corporation deleted successfully");
    	}else {
    		return ResponseEntity.notFound().build();
    	}
    }
    
   //c_idx 찾기
    @GetMapping("findByCIdx")
    public ResponseEntity<Corporation> findByCIdx(@RequestParam("c_idx") int c_idx) {
        Corporation result = corporationService.findByCIdx(c_idx);
        if (result == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(result);
    }

    // 현재 로그인된 사용자의 idx 값을 반환하는 메서드 추가
    @GetMapping("currentUserIdx")
    public ResponseEntity<Integer> getCurrentUserIdx(HttpSession session) {
        Corporation corporation = (Corporation) session.getAttribute("corporation");
        if (corporation != null) {
            return ResponseEntity.ok(corporation.getC_idx()); // 예: getIdx() 메서드로 idx 값 반환
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }
    


    
    // 기업회원 로그인 상태 확인
    @GetMapping("/checkCorporationLogin")
    public ResponseEntity<Boolean> checkLogin(HttpSession session) {
        Object corporation = session.getAttribute("corporation"); // 세션에서 기업회원 정보 확인
        if (corporation != null) {
            return ResponseEntity.ok(true); 
        } else {
            return ResponseEntity.ok(false);
        }
    }
    
    
    @PostMapping("logout")
    public String logout(HttpSession session) {
        
        
        session.invalidate();
        return "ok";
    } 
    
    @PostMapping("getByMId")
	public Corporation getById(@RequestParam String m_id){
		return corporationService.findByMId(m_id);
	}
    
    @PostMapping("login")
    public Corporation login(
    		@RequestParam(value="m_id", required = true) String m_id,
    		@RequestParam(value="m_pw", required = true) String m_pw,
    		HttpSession session
    		) {
    	Corporation corporation = new Corporation();
    	corporation.setM_id(m_id);
    	corporation.setM_pw(m_pw);
    	
    	Corporation result = corporationService.getByIdAndPw(corporation);
    	
    	if(result!=null) {
    		session.setAttribute("corporation", result);
    		
    	}
    	
    	return result;
    	
    }
    
    
    //수정
    @PostMapping("update")
    public String update(
        @RequestParam(value = "current_pw") String currentPw,
        @RequestParam(value = "m_pw", required = false) String m_pw,
        @RequestParam(value = "m_name", required = false) String m_name,
        @RequestParam(value = "m_tel", required = false) String m_tel,
        @RequestParam(value = "m_email", required = false) String m_email,
        @RequestParam(value = "m_part", required = false) String m_part,
        @RequestParam(value = "m_id") String m_id
    ) {
        // m_id로 기존 회원 정보를 조회
        Corporation corporation = corporationService.findByMId(m_id);

        if (corporation != null && corporation.getM_pw().equals(md5(currentPw))) {
            // 입력된 값이 비어 있지 않은 경우에만 업데이트 수행
            if (m_pw != null && !m_pw.isEmpty()) {
                corporation.setM_pw(md5(m_pw));
            }
            if (m_name != null && !m_name.isEmpty()) {
                corporation.setM_name(m_name);
            }
            if (m_tel != null && !m_tel.isEmpty()) {
                corporation.setM_tel(m_tel);
            }
            if (m_email != null && !m_email.isEmpty()) {
                corporation.setM_email(m_email);
            }
            if (m_part != null && !m_part.isEmpty()) {
                corporation.setM_part(m_part);
            }

            corporationService.update(corporation);
            
            return "ok";
        } else {
            return "비밀번호가 일치하지 않거나, 회원 정보가 없습니다.";
        }
    }

    private String md5(String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(input.getBytes());
            byte[] byteData = md.digest();
            StringBuilder sb = new StringBuilder();
            for (byte b : byteData) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }



//    @PostMapping("upload")
//    public String upload(
//        @RequestParam(value = "work_place") String work_place,
//        @RequestParam(value = "member") String member,
//        @RequestParam(value = "gender") String gender,
//        @RequestParam(value = "age") String age,
//        @RequestParam(value = "status") String status,
//        @RequestParam(value = "type") String type,
//        @RequestParam(value = "license") String license,
//        @RequestParam(value = "level") String level,
//        @RequestParam(value = "content") String content,
//        @RequestParam(value = "employ") String employ,
//        @RequestParam(value = "hire") String hire,
//        @RequestParam(value = "holiday") String holiday,
//        @RequestParam(value = "pay") String pay,
//        @RequestParam(value = "time") String time,
//        @RequestParam(value = "benefit") String benefit,
//        @RequestParam(value = "etc") String etc
//    ) {
//        Detail detail = new Detail();
//        detail.setWork_place(work_place);
//        detail.setMember(member);
//        detail.setGender(gender);
//        detail.setAge(age);
//        detail.setStatus(status);
//        detail.setType(type);
//        detail.setLicense(license);
//        detail.setLevel(level);
//        detail.setContent(content);
//        detail.setEmploy(employ);
//        detail.setHire(hire);
//        detail.setHoliday(holiday);
//        detail.setPay(pay);
//        detail.setTime(time);
//        detail.setBenefit(benefit);
//        detail.setEtc(etc);
//
//        detailService.upload(detail);
//
//        return "ok";
//    }

    
    //회원가입
    @PostMapping("/save")
    public String save(
        @RequestParam(value = "code") String code,
        @RequestParam(value = "name") String name,
        @RequestParam(value = "p_nm") String p_nm,
        @RequestParam(value = "type") String type,
        @RequestParam(value = "tel") String tel,
        @RequestParam(value = "insurance") String insurance,
        @RequestParam(value = "fax") String fax,
        @RequestParam(value = "employees") String employees,
        @RequestParam(value = "address") String address,
        @RequestParam(value = "zone") String zone,
        @RequestParam(value = "m_id") String m_id,
        @RequestParam(value = "m_pw") String m_pw,
        @RequestParam(value = "m_name") String m_name,
        @RequestParam(value = "m_tel") String m_tel,
        @RequestParam(value = "m_email") String m_email,
        @RequestParam(value = "m_part") String m_part
    ) {
        Corporation corporation = new Corporation();
        corporation.setCode(code);
        corporation.setName(name);
        corporation.setP_nm(p_nm);
        corporation.setType(type);
        corporation.setTel(tel);
        corporation.setInsurance(insurance);
        corporation.setFax(fax);
        corporation.setEmployees(Integer.parseInt(employees));
        corporation.setAddress(address);
        corporation.setZone(zone);
        corporation.setM_id(m_id);
        corporation.setM_pw(m_pw);
        corporation.setM_name(m_name);
        corporation.setM_tel(m_tel);
        corporation.setM_email(m_email);
        corporation.setM_part(m_part);

        corporationService.save(corporation);

        return "ok";
    }
    
}
