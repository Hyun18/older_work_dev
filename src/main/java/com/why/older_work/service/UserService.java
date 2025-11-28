package com.why.older_work.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.why.older_work.dao.UserDao;
import com.why.older_work.entity.User;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;
    
    // 개인회원 로그인 상태 확인
		public User checkUserLogin(String id, String pw) {
			return userDao.checkUserLogin(id, pw);
		}

    //회원정보 조회
    public List<User> findAll(){
        return userDao.findAll();
    }

    //로그인 함수 호출 시 사용
    public User getByIdAndPw(User user) {
        return userDao.getByIdAndPw(user);
    }
    
    //회원 탈퇴
    public int delUser(User user) {
    	return userDao.delUser(user);
    }
    
    //개인 회원 탈퇴 여부 확인
    public String checkDelUser(User user) {
    	return userDao.checkDelUser(user);
    }

    public User getById(String id) {
        return userDao.getById(id);
    }

        
    //ID찾기(이름, 성별, 생년월일, 번호)
    public String findID(User user) {
        return userDao.findID(user); 
    }
    
    //PW찾기(아이디, 생년월일)
    public String findPW(User user) {
        return userDao.findPW(user); 
    }
    
    //PW 수정(아이디, 생년월일)
    public int updatePW(User user) {
        return userDao.updatePW(user); 
    }
    
    //개인회원 '기존 이름(name)' 확인
    public String IdentityVerification(User user) {
    	return userDao.IdentityVerification(user);
    }
    
    //개인회원 '이름' 수정
    public int updateName(User user) {
    	return userDao.updateName(user);
    }
    
    //개인 회원 정보 수정
    public int update(User user) {
    	return userDao.update(user);
    }

    //회원가입
    public int save(User user) {
        return userDao.save(user);
    }
}
