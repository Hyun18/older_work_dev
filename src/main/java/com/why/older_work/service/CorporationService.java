package com.why.older_work.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.why.older_work.dao.CorporationDao;
import com.why.older_work.entity.Corporation;

@Service
public class CorporationService {

    @Autowired
    private CorporationDao corporationDao;
    
 // 기업회원 로그인 상태 확인
 		public Corporation checkCorporationLogin(String m_id, String m_pw) {
 			return corporationDao.checkCorporationLogin(m_id, m_pw);
 		}

    public int save(Corporation corporation) {
        return corporationDao.save(corporation);
    }
    
    public int update(Corporation corporation) {
    	return corporationDao.update(corporation);
    }
    
    public Corporation getByIdAndPw(Corporation corporation) {
    	return corporationDao.select(corporation);
    }
    
    public Corporation findByMId(String m_id) {
    	return corporationDao.findByMId(m_id);
    }
    
    public Corporation findByCIdx(int c_idx) {
    	return corporationDao.findByCIdx(c_idx);
    }
    
    public boolean delCorporation(int c_idx) {
        int rowsAffected = corporationDao.delCorporation(c_idx);
        return rowsAffected > 0; // 삭제된 행이 1개 이상이면 true, 아니면 false
    }

}
