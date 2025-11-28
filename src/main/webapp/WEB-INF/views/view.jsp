<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> 
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>게시글 보기</title>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <link rel="stylesheet" href="./css/view.css"/>
    <link rel="stylesheet" href="./css/my-style.css"/>
  
    <script src="./js/view.js"></script>    
   
    


</head>

<body>
    <jsp:include page="./include/header.jsp"/>
    <div style="margin-top: 100px;"></div>

	<input type="hidden" id="loginId" value="${sessionScope.loginUser.id}">
    <input type="hidden" id="loginCompanyId" value="${sessionScope.corporation.m_id}">
	<h2><span style="font-size:38px;" id="subject-title"></span></h2>
    <form id="viewFrm">
        <div id="img_url">이미지 : <span></span></div>
        <div id="subject">제목 : <span></span></div>
        <div id="id">아이디 : <span></span></div>
        <div id="created_date">작성일 : <span></span></div>
        <div id="content">내용 : <span></span></div>
        
        <c:if test="${empty sessionScope.loginUser && empty sessionScope.corporation}">
        <div id="buttonContainer">
            <a href="./list">뒤로가기</a>
        </div>
        </c:if>
        <c:if test="${not empty sessionScope.loginUser || not empty sessionScope.corporation}">
            <div id="buttonContainer">
                <button id="modify-btn">수정</button>
                <a href="./list">뒤로가기</a>
                <button id="delete-btn">삭제</button>
            </div>
        </c:if>
    </form>

	<footer class="footer1">
        <div class="footer-content1">
            <p>주소 : 부산광역시 해운대구 우동 123-45</p>
            <p >대표전화: 02-1234-5678 | 사업자등록번호: 123-45-67890</p>
            <p style="margin-top: 20px;">© 2024 놀면뭐하老. All rights reserved.</p>
            <P>본 페이지에 게시된 이메일주소 자동수집을 거부하며, 이를 위반시 정보통신망법에 의해 처벌됨을 유념하시기 바랍니다</P>
            
        </div>
    </footer>
   


</body>
</html>