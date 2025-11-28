package com.why.older_work.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.why.older_work.entity.Corporation;
import com.why.older_work.entity.Detail;
import com.why.older_work.entity.User;
import com.why.older_work.service.CorporationService;
import com.why.older_work.service.DetailService;

@RestController
@RequestMapping("api/detail")
public class DetailController {

	@Autowired
	DetailService detailService;
	
	@Autowired
	CorporationService CorporationService;
	
	 // 개인회원 로그인 상태 확인
    @GetMapping("/checkCorporationLogin")
    public ResponseEntity<Boolean> checkCorporationLogin(HttpSession session) {
        Object loginCor = session.getAttribute("loginCor"); // 세션에서 로그인 사용자 정보 확인
        if (loginCor != null) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }
    }
    public final String LOGIN_CORPORATION = "loginCor";
	
	@GetMapping("findAll")
    public List<Detail> findAll() {
        return detailService.findAll();
    }
	
	@GetMapping("/findByCIdx")
    public Corporation findByCIdx(
    		@RequestParam (value="c_idx")int c_idx
    		) {
    	Corporation corporation = new Corporation();
    	corporation.setC_idx(c_idx);
    	
    	Corporation result = CorporationService.findByCIdx(c_idx);
    	
    	
    	return result;
    }
	
	@GetMapping("findByDetailIdx")
	public Detail findByDetailIdx(
			@RequestParam (value="detail_idx")int detail_idx
			) {
		Detail detail = new Detail();
		detail.setDetail_idx(detail_idx);
		
		Detail result = detailService.findByDetailIdx(detail_idx);
		
		return result;
	}
	
	/* 수정 */
	@PostMapping("detailUpdate")
	public String detailUpdate(
	    @RequestParam(value = "detail_idx") int detailIdx,
	    @RequestParam(value = "dstrCd1Nm", required = false) String dstrCd1Nm,
	    @RequestParam(value = "dstrCd2Nm", required = false) String dstrCd2Nm,
	    @RequestParam(value = "intCnt", required = false) String intCnt,
	    @RequestParam(value = "gender", required = false) String gender,
	    @RequestParam(value = "jobType", required = false) String jobType,
	    @RequestParam(value = "orgName", required = false) String orgName,
	    @RequestParam(value = "trnStatNm", required = false) String trnStatNm,
	    @RequestParam(value = "hpInvtCnt", required = false) String hpInvtCnt,
	    @RequestParam(value = "hpNotiSdate", required = false) String hpNotiSdate,
	    @RequestParam(value = "hpNotiEdate", required = false) String hpNotiEdate,
	    @RequestParam(value = "addr", required = false) String addr,
	    @RequestParam(value = "arrange", required = false) String arrange,
	    @RequestParam(value = "content", required = false) String content,
	    @RequestParam(value = "education", required = false) String education,
	    @RequestParam(value = "projDate", required = false) String projDate,
	    @RequestParam(value = "hireCnt", required = false) String hireCnt,
	    @RequestParam(value = "license", required = false) String license,
	    @RequestParam(value = "operPlan", required = false) String operPlan,
	    @RequestParam(value = "projRecuJtype", required = false) String projRecuJtype,
	    @RequestParam(value = "projTime", required = false) String projTime,
	    @RequestParam(value = "recuAgeNm", required = false) String recuAgeNm,
	    @RequestParam(value = "telNum", required = false) String telNum,
	    @RequestParam(value = "workArea", required = false) String workArea,
	    @RequestParam(value = "workPlace", required = false) String workPlace,    
	    @RequestParam(value = "etc", required = false) String etc
	) {
	    // detail_idx로 기존 Detail 객체를 조회
	    Detail detail = detailService.findByDetailIdx(detailIdx);

	    if (detail != null) {
	        // 입력된 값이 비어 있지 않은 경우에만 업데이트 수행
	        if (dstrCd1Nm != null && !dstrCd1Nm.isEmpty()) {
	            detail.setDstrCd1Nm(dstrCd1Nm);
	        }
	        if (dstrCd2Nm != null && !dstrCd2Nm.isEmpty()) {
	            detail.setDstrCd2Nm(dstrCd2Nm);
	        }
	        if (intCnt != null && !intCnt.isEmpty()) {
	            detail.setIntCnt(intCnt);
	        }
	        if (gender != null && !gender.isEmpty()) {
	            detail.setGender(gender);
	        }
	        if (jobType != null && !jobType.isEmpty()) {
	            detail.setJobType(jobType);
	        }
	        if (orgName != null && !orgName.isEmpty()) {
	            detail.setOrgName(orgName);
	        }
	        if (trnStatNm != null && !trnStatNm.isEmpty()) {
	            detail.setTrnStatNm(trnStatNm);
	        }
	        if (hpInvtCnt != null && !hpInvtCnt.isEmpty()) {
	            detail.setHpInvtCnt(hpInvtCnt);
	        }
	        if (hpNotiSdate != null && !hpNotiSdate.isEmpty()) {
	            detail.setHpNotiSdate(hpNotiSdate);
	        }
	        if (hpNotiEdate != null && !hpNotiEdate.isEmpty()) {
	            detail.setHpNotiEdate(hpNotiEdate);
	        }
	        if (addr != null && !addr.isEmpty()) {
	            detail.setAddr(addr);
	        }
	        if (arrange != null && !arrange.isEmpty()) {
	            detail.setArrange(arrange);
	        }
	        if (content != null && !content.isEmpty()) {
	            detail.setContent(content);
	        }
	        if (education != null && !education.isEmpty()) {
	            detail.setEducation(education);
	        }
	        if (projDate != null && !projDate.isEmpty()) {
	            detail.setProjDate(projDate);
	        }
	        if (hireCnt != null && !hireCnt.isEmpty()) {
	            detail.setHireCnt(hireCnt);
	        }
	        if (license != null && !license.isEmpty()) {
	            detail.setLicense(license);
	        }
	        if (operPlan != null && !operPlan.isEmpty()) {
	            detail.setOperPlan(operPlan);
	        }
	        if (projRecuJtype != null && !projRecuJtype.isEmpty()) {
	            detail.setProjRecuJtype(projRecuJtype);
	        }
	        if (projTime != null && !projTime.isEmpty()) {
	            detail.setProjTime(projTime);
	        }
	        if (recuAgeNm != null && !recuAgeNm.isEmpty()) {
	            detail.setRecuAgeNm(recuAgeNm);
	        }
	        if (telNum != null && !telNum.isEmpty()) {
	            detail.setTelNum(telNum);
	        }
	        if (workArea != null && !workArea.isEmpty()) {
	            detail.setWorkArea(workArea);
	        }
	        if (workPlace != null && !workPlace.isEmpty()) {
	            detail.setWorkPlace(workPlace);
	        }
	        if (etc != null && !etc.isEmpty()) {
	            detail.setEtc(etc);
	        }

	        detailService.detailUpdate(detail);
	        return "ok";
	    } else {
	        return "fail";
	    }
	}


	@PostMapping("upload")
	public String upload(
			  @RequestParam(value = "dstrCd2Nm",defaultValue = "3") String dstrCd2Nm,
			  @RequestParam(value = "intCnt",defaultValue = "4") String intCnt,
			  @RequestParam(value = "gender",defaultValue = "6") String gender,
			  @RequestParam(value = "jobType",defaultValue = "7") String jobType,
			  @RequestParam(value = "orgName",defaultValue = "8") String orgName,
			  @RequestParam(value = "trnStatNm",defaultValue = "1") String trnStatNm,
			  @RequestParam(value = "hpInvtCnt",defaultValue = "1") String hpInvtCnt,
			  @RequestParam(value = "hpNotiSdate",defaultValue = "1") String hpNotiSdate,
			  @RequestParam(value = "hpNotiEdate",defaultValue = "1") String hpNotiEdate,
			  @RequestParam(value = "addr",defaultValue = "1") String addr,
			  @RequestParam(value = "arrange",defaultValue = "1") String arrange,
			  @RequestParam(value = "content",defaultValue = "1") String content,
			  @RequestParam(value = "education",required = false) String education,
			  @RequestParam(value = "projDate",defaultValue = "1") String projDate,
			  @RequestParam(value = "hireCnt",defaultValue = "1") String hireCnt,
			  @RequestParam(value = "license",required = false) String license,
			  @RequestParam(value = "operPlan",required = false) String operPlan,
			  @RequestParam(value = "projRecuJtype",defaultValue = "1") String projRecuJtype,
			  @RequestParam(value = "projTime",defaultValue = "1") String projTime,
			  @RequestParam(value = "recuAgeNm",defaultValue = "1") String recuAgeNm,
			  @RequestParam(value = "telNum",defaultValue = "1") String telNum,
			  @RequestParam(value = "workArea",defaultValue = "1") String workArea,
		      @RequestParam(value = "workPlace",defaultValue = "1") String workPlace,	
		      @RequestParam(value = "etc",required = false) String etc,
		      HttpSession session
		      
		) {
		
		Corporation cor = (Corporation) session.getAttribute("corporation");
		
		Detail detail = new Detail();
		
		String dstrCd1Nm = "부산";
		
		detail.setC_idx(cor.getC_idx());
		detail.setDstrCd1Nm(dstrCd1Nm); //부산
		detail.setDstrCd2Nm(dstrCd2Nm);
		detail.setIntCnt(intCnt);
		detail.setGender(gender);
		detail.setJobType(jobType);
		detail.setOrgName(orgName);
		detail.setTrnStatNm(trnStatNm);
		detail.setHpInvtCnt(hpInvtCnt);
		detail.setHpNotiSdate(hpNotiSdate);
		detail.setHpNotiEdate(hpNotiEdate);
		detail.setAddr(addr);
		detail.setArrange(arrange);
		detail.setContent(content);
		detail.setEducation(education);
		detail.setProjDate(projDate);
		detail.setHireCnt(hireCnt);
		detail.setLicense(license);
		detail.setOperPlan(operPlan);
		detail.setProjRecuJtype(projRecuJtype);
		detail.setProjTime(projTime);
		detail.setRecuAgeNm(recuAgeNm);
		detail.setTelNum(telNum);
		detail.setWorkArea(workArea);
		detail.setWorkPlace(workPlace);
		detail.setEtc(etc);
		
		detailService.upload(detail);
	
		return "ok";
	  }
}