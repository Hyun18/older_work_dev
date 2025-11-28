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
<title>회원가입</title>

<link rel="icon" href="./image/logo-icon.png"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/all.min.css" integrity="sha512-9xKTRVabjVeZmc+GUW8GgSmcREDunMM+Dt/GrzchfN8tkwHizc5RP4Ok/MXFFy5rIjJjzhndFScTceq5e6GvVQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<link rel="stylesheet" href="./css/save-user.css"/>



<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
<script src="https://www.gstatic.com/firebasejs/7.3.0/firebase.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.3.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.3.0/firebase-storage.js"></script>
<!-- 주소 검색 API -->
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script src="./js/save-user.js"></script>


</head>
<body>
	
<jsp:include page="./include/header.jsp"/>
<div style="margin-top: 100px;"></div>

<div class="container">
    <form id="saveForm">
    	<div class="header-top-area">
            <h1>개인회원관리 등록</h1>
        </div>
        <div class="input-group">
            <label for="id">아이디</label>
			<div class="id-group">
				<input type="text" id="id" placeholder="아이디를 입력하세요">
				<button type="button" id="check-id">중복확인</button>
			</div>            
        </div>
        
        <div class="input-group">
            <label for="pw">비밀번호</label>
            <input type="password" id="pw" placeholder="비밀번호를 입력하세요">
			<div style="font-size: 12px; margin: 10px 0 0 5px;"></div>
        </div>
		
        
        <div class="input-group">
            <label for="pwCheck">비밀번호 확인</label>
            <input type="password" id="pwCheck" placeholder="비밀번호를 다시 입력하세요">
			<div style="font-size: 12px; margin: 10px 0 0 5px;"></div>
        </div>

        <div class="input-group">
            <label for="name">이름</label>           
			<input type="text" id="name" placeholder="이름을 입력하세요">			
        </div>
        
        <div class="input-group">
            <label for="email">메일</label>           
			<input type="text" id="email" placeholder="메일을 입력하세요">			
        </div>

		<div class="input-group">
			<label>성별</label>
			<div class="radio-group">
				<input type="radio" id="male" name="gender" value="M" checked/>
				<label for="male">남</label>
				<input type="radio" id="female" name="gender" value="F"/>
				<label for="female">여</label>
			</div>
		</div>

		<div class="input-group birth-group">
            <label for="birth">생년월일</label>
			<select id="birth-year">
				<option value="" id="birth-year">년</option>
				<c:forEach var="year" begin="1921" end="${targetYear}">
					<option value="${year}">${year}</option>
				</c:forEach>
			</select>
			<select id="birth-month">
				<option value="" style="width: 40%;">월</option>
				<c:forEach var="month" begin="1" end="12">
					<option value="${month}">${month}</option>
				</c:forEach>
			</select>
			<select id="birth-day" style="margin-right: 0px;">
				<option value="" id="birth-day">일</option>
				<c:forEach var="day" begin="1" end="31">
					<option value="${day}" >${day}</option>
				</c:forEach>
			</select>
        </div>
        
        <div class="input-group">
            <label for="phone">전화번호</label>
            <input type="text" id="phone" placeholder="숫자만 입력하세요">
        </div>
        
        <div class="input-group">
            <label for="address">주소</label>
            <input type="text" id="address" placeholder="주소를 입력하세요">
        </div>
        
        <div class="btn-group">
            <button type="button" class="submit-btn">가입하기</button>
            <button type="button" class="cancel-btn" onclick="location.href='/'">취소</button>
        </div>
    </form>
</div>

	<jsp:include page="./include/footer.jsp"/>
</body>
</html>