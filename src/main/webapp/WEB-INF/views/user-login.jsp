<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="java.util.Calendar" %>
<%
    int currentYear = Calendar.getInstance().get(Calendar.YEAR);
	int targetYear = currentYear - 54;
    request.setAttribute("currentYear", currentYear);
    request.setAttribute("targetYear", targetYear);
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>로그인</title>


<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/all.min.css" integrity="sha512-9xKTRVabjVeZmc+GUW8GgSmcREDunMM+Dt/GrzchfN8tkwHizc5RP4Ok/MXFFy5rIjJjzhndFScTceq5e6GvVQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<link rel="stylesheet" href="./css/user-login.css"/>

<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

<script src="./js/user-login.js"></script>

</head>
<body>	

<div class="container">
    <div class="header-top-area">
        <img src="./image/로고.png" alt="로고">
    </div>
    <span id="login-text">서비스를 이용하시려면 로그인 해주세요.<a href="./save-user">회원가입</a></span>
    <div class="input-group">
        <div class="id-group">
            <input type="text" id="id" placeholder="아이디를 입력하세요">
        </div>            
    </div>
    
    <div class="input-group">
        <input type="password" id="pw" placeholder="비밀번호를 입력하세요">
        <div style="font-size: 12px; margin: 10px 0 0 5px;"></div>
    </div>

    <div class="btn-group">
        <button type="button" id="login-btn">로그인</button>
    </div>
    <div class="find-group">
        <a href="#"><span id="find-id">아이디 찾기</span></a>|
        <a href="#"><span id="find-pw">비밀번호 찾기</span></a>        
    </div>       
</div>

	
</body>
</html>