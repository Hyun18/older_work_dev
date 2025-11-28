<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> 
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>게시글 작성</title>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.3.0/firebase.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.3.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.3.0/firebase-storage.js"></script>

    <link rel="stylesheet" href="./css/write.css"/>
   
    <script src="./js/write.js"></script>

      
   <!--  <script src="./js/view.js"></script>    --> 
</head>
 
<body>
    <jsp:include page="./include/header.jsp"/>
    <div style="margin-top: 100px;"></div>
	<h2>게시글 작성</h2>
    <form id="writeFrm">
    
        <div>제목 : <input id="title" type="text" name="subject"></div>
   
        <!-- 로그인 된 사용자의 아이디를 가져와서 읽기 전용으로 설정 -->
        <div>아이디 : <input id="id" type="text" name="id"  value="${not empty sessionScope.loginUser ? sessionScope.loginUser.id : (not empty sessionScope.corporation ? sessionScope.corporation.m_id : '')}"  readonly/></div>
        <!-- <div>아이디 : <input id="id" type="text" name="id"  value="${not empty sessionScope.LOGIN_USER ? sessionScope.LOGIN_USER.id : (not empty sessionScope.COPRATION_USER ? sessionScope.COPRATION_USER.id : '')}"  readonly/></div> -->
        
        <div>내용 : <textarea id="content" name="content"></textarea></div>
        <div>이미지 : <input id="file" type="file" name="image" accept="image/*"></div>
       

        <img id="profile-img" src="#" alt="이미지 미리보기" style="display:none; margin:0 auto; max-width:150px; max-height:150px;">
        <div id="button-container">
            <button id="submit-btn" type="submit">글작성</button>
            <a href="./list">뒤로가기</a>
        </div>
    </form>

   
    
   
    
</body>
</html>