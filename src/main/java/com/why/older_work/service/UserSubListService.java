package com.why.older_work.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.why.older_work.dao.UserSubListDao;
import com.why.older_work.dto.SubListDto;
import com.why.older_work.entity.User;
import com.why.older_work.entity.UserSubList;

@Service
public class UserSubListService {

	@Autowired
	UserSubListDao usersubdao;

    // 사용자의 신청 목록을 가져오는 메서드
    public List<SubListDto> getUserApplicationList(int userIdx) {
        return usersubdao.getUserApplicationList(userIdx);
    }
	
  //기업이 지원한 유저 확인
    public List<SubListDto> CorporationList(int c_idx) {
    	return usersubdao.CorporationList(c_idx);
    }
    
	//개인 일자리 중복 방지 > 중복 신청 개수 출력
	public int countSameSubList(UserSubList usersub) {
		return usersubdao.countSameSubList(usersub);
	}
	
	//[user-page]지원현황 > '지원완료' 개수 출력
	public int ApplicationCompleted(User user) {
		return usersubdao.ApplicationCompleted(user);
	}
	
	//[user-page]지원현황 > '진행중' 개수 출력
	public int countinProgress(User user) {
		return usersubdao.countinProgress(user);
	}
	
	//[user-page]지원현황 > '최종합격' 개수 출력
	public int countFinalPass(User user) {
		return usersubdao.countFinalPass(user);
	}
	
	//신청 취소
	public int cancelApplication(UserSubList usersub) {
		return usersubdao.cancelApplication(usersub);
	}

	
	public int subListSave(UserSubList usersub) {
		return usersubdao.subListSave(usersub);
	}
}
