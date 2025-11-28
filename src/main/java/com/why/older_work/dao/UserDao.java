package com.why.older_work.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.why.older_work.entity.User;

@Repository
public class UserDao {

    @Autowired
    SqlSession sqlSession;
    
    
 // 개인회원 로그인 상태 확인
	   public User checkUserLogin(String id, String pw) {
	       Map<String, String> params = new HashMap<>();
	       params.put("id", id); 
	       params.put("pw", pw);
	       return sqlSession.selectOne("UserMapper.checkUserLogin", params);
	   }

    //회원정보 조회
    public List<User> findAll(){
        return sqlSession.selectList("UserMapper.findAll");
    }

    //로그인
    public User getByIdAndPw(User user) {
        return sqlSession.selectOne("UserMapper.getByIdAndPw", user);
    }
    
    //회원 탈퇴
    public int delUser(User user) {
    	return sqlSession.update("UserMapper.delUser", user);
    }
    
    //개인 회원 탈퇴 여부 확인
    public String checkDelUser(User user) {
    	return sqlSession.selectOne("UserMapper.checkDelUser", user);
    }
    
    public User getById(String id) {
        return sqlSession.selectOne("UserMapper.getById", id);
    }

    
    
    //ID찾기(이름, 성별, 생년월일, 번호)
    public String findID(User user) {
        return sqlSession.selectOne("UserMapper.findID", user); 
    }
    
    //PW찾기(아이디, 생년월일) -> md5로 암호화된 비번 출력됨
    public String findPW(User user) {
        return sqlSession.selectOne("UserMapper.findPW", user); 
    }

    //PW 수정(아이디, 생년월일)
    public int updatePW(User user) {
        return sqlSession.update("UserMapper.updatePW", user); 
    }
    
    //개인회원 '기존 이름(name)' 확인
    public String IdentityVerification(User user) {
    	return sqlSession.selectOne("UserMapper.IdentityVerification", user);
    }
    
    //개인회원 '이름(name)' 수정
    public int updateName(User user) {
    	return sqlSession.update("UserMapper.updateName", user);
    }
    
    //개인회원 정보 수정
    public int update(User user) {
    	return sqlSession.update("UserMapper.update", user);
    }
    
    //회원가입
    public int save(User user) {
        return sqlSession.insert("UserMapper.save", user);
    }
}
