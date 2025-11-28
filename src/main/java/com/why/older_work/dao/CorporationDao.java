package com.why.older_work.dao;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.why.older_work.entity.Corporation;

@Repository
public class CorporationDao {

    @Autowired
    private SqlSession s;
    
    
  //기업회원 로그인 상태 확인
    public Corporation checkCorporationLogin(String m_id, String m_pw) {
        Map<String, String> params = new HashMap<>();
        params.put("m_id", m_id);
        params.put("m_pw", m_pw);
        return s.selectOne("CorporationMapper.checkCorporationLogin", params);
    }


    //가입
    public int save(Corporation corporation) {
       return s.insert("CorporationMapper.save", corporation);
    }
    
    //수정
    public int update(Corporation corporation) {
    	return s.update("CorporationMapper.update", corporation);
    }
    
    //로그인
    public Corporation select(Corporation corporation) {
    	return s.selectOne("CorporationMapper.getByIdAndPw",corporation);
    }
    
    //아이디찾기
    public Corporation findByMId(String m_id) {
    	return s.selectOne("CorporationMapper.findByMId", m_id);
    }
    
    //idx찾기
    public Corporation findByCIdx(int c_idx) {
    	return s.selectOne("CorporationMapper.findByCIdx",c_idx);
    }
    
    //탈퇴
    public int delCorporation(int c_idx) {
    	return s.delete("CorporationMapper.delCorporation",c_idx);
    }
    
}
