package com.why.older_work.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.why.older_work.dto.SubListDto;
import com.why.older_work.entity.User;
import com.why.older_work.entity.UserSubList;

@Repository
public class UserSubListDao {
	
	@Autowired
    private SqlSession sqlSession;
	
	
	//개인 일자리 출력
    public List<SubListDto> getUserApplicationList(int userIdx) {
        return sqlSession.selectList("UserSubListMapper.getUserApplicationList", userIdx);
    }
    
    //기업이 지원한 유저 확인
    public List<SubListDto> CorporationList(int c_idx) {
    	return sqlSession.selectList("UserSubListMapper.CorporationList", c_idx);
    }
	
	//개인 일자리 중복 방지 > 중복 신청 개수 출력
	public int countSameSubList(UserSubList usersub) {
		return sqlSession.selectOne("UserSubListMapper.countSameSubList", usersub);
	}
	
	//[user-page]지원현황 > '지원완료' 개수 출력
	public int ApplicationCompleted(User user) {
		return sqlSession.selectOne("UserSubListMapper.ApplicationCompleted", user);
	}
	
	//[user-page]지원현황 > '진행중' 개수 출력
	public int countinProgress(User user) {
		return sqlSession.selectOne("UserSubListMapper.countinProgress", user);
	}
	
	//[user-page]지원현황 > '최종합격' 개수 출력
	public int countFinalPass(User user) {
		return sqlSession.selectOne("UserSubListMapper.countFinalPass", user);
	}
	
	
	//신청 취소
	public int cancelApplication(UserSubList usersub) {
		return sqlSession.delete("UserSubListMapper.cancelApplication", usersub);
	}
	
    public int subListSave(UserSubList usersub) {
        return sqlSession.insert("UserSubListMapper.subListSave", usersub);
    }
	
}
