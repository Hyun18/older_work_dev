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
<title>아이디/비밀번호 찾기</title>


<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/all.min.css" integrity="sha512-9xKTRVabjVeZmc+GUW8GgSmcREDunMM+Dt/GrzchfN8tkwHizc5RP4Ok/MXFFy5rIjJjzhndFScTceq5e6GvVQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/duotone.min.css" integrity="sha512-9xKTRVabjVeZmc+GUW8GgSmcREDunMM+Dt/GrzchfN8tkwHizc5RP4Ok/MXFFy5rIjJjzhndFScTceq5e6GvVQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<link rel="stylesheet" href="./css/findIdAndPw.css"/>
<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

<script src="./js/findIdAndPw.js"></script>

</head>
<body>
	<jsp:include page="./include/header.jsp"/>
   
    

<div class="container">
    <!-- 아이디 찾기 컨테이너 -->
    <main>
        <div>
        <div class="find-id-container">
            <span id="find-text">아이디 찾기</span>
            <div>
                <div class="input-group nameGen">
                    <label for="name" style="margin-right: 30px;">이름</label>
                    <div class="name-group">            
                        <input type="text" id="name" placeholder="이름을 입력하세요">
                    </div>   
                    <label style="margin-left: 30px;">성별</label>     
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
                
                <div class="input-group phone-group">        
                    <label for="phone" style="margin-right: 25px; display: flex; align-items: center;">연락처</label>
                    <div>
                        <input type="text" id="phone" placeholder="숫자만 입력하세요." maxlength="11">
                    </div>
                </div>       
            </div>

            <div class="btn-group">
                <button type="button" id="find-id-btn">아이디 찾기</button>
                <button type="button" class="cancel-btn">취소</button>
            </div>
            
            <!-- 아이디 찾기 결과 -->
            <div class="id-result" style="display: none;">
                <div class="result-container">
                    <p>회원님의 아이디는 <span id="found-id"></span> 입니다.</p>
                    <button type="button" id="id-btn">확인</button>
                </div>
            </div>
        </div>

        
    </div>
        
        <!-- 비밀번호 찾기 컨테이너 -->
        <div class="update-pw-container">
            <span id="find-text">비밀번호 수정</span>
            <div id="pw">
                <div class="input-group" style="height: 62px;">
                    <label for="id">아이디</label>
                    <div class="id-group">            
                        <input type="text" id="id" placeholder="아이디를 입력하세요">
                    </div>
                </div>
                <div class="input-group birth-group" style="height: 62px;">
                    <label for="birth">생년월일</label>
                    <select id="pw-birth-year">
                        <option value="" id="birth-year">년</option>
                        <c:forEach var="year" begin="1921" end="${targetYear}">
                            <option value="${year}">${year}</option>
                        </c:forEach>
                    </select>
                    <select id="pw-birth-month">
                        <option value="" style="width: 40%;">월</option>
                        <c:forEach var="month" begin="1" end="12">
                            <option value="${month}">${month}</option>
                        </c:forEach>
                    </select>
                    <select id="pw-birth-day" style="margin-right: 0px;">
                        <option value="" id="birth-day">일</option>
                        <c:forEach var="day" begin="1" end="31">
                            <option value="${day}" >${day}</option>
                        </c:forEach>
                    </select>
                </div>
            </div>
            
            

            <div class="btn-group">
                <button type="button" id="update-pw-btn">수정</button>
                <button type="button" class="cancel-btn">취소</button>
            </div>            
            
            <!-- 새로운 비밀번호 입력 -->
            <div class="new-pw" style="display: none;">
                <div class="result-container">
                    <p>새로운 비밀번호를 입력해주세요.</p>
                    <div class="pw-group">
                        <div class="pw-input-group">
                            <input type="text" id="new-pw" placeholder="비밀번호를 입력하세요">
                            <div id="pw-text"></div>
                            <input type="text" id="new-pwCheck" placeholder="다시한번 입력하세요">
                            <div id="pw-check-text"></div>
                        </div>
                        <div class="pw-btn-group">
                            <button type="button" id="new-btn">확인</button>
                            <button type="button" id="new-cancel-btn">취소</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </main>
</div>

	
</body>
</html>