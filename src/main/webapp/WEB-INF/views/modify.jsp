<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>게시글 수정</title>

	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.3.0/firebase.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.3.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.3.0/firebase-storage.js"></script>

    <link rel="stylesheet" href="./css/modify.css"/>
  
    <script src="./js/modify.js"></script>    
</head>
<body>
	<jsp:include page="./include/header.jsp"/>
    <div style="margin-top: 100px;"></div>

	<h2>게시글 수정</h2>
    <form id="modifyFrm">
        <img id="profile-img" src="#" alt="이미지 미리보기" style="display:block;margin:0 auto; max-width:150px; max-height:150px;">
        <div>이미지 : <input type="file" id="file" accept="image/*"></div>
        <div>제목 : <input type="text" id="title"></div>
        <div>내용 : <textarea id="content"></textarea></div>
        
        <div id="buttonContainer">
            <button id="modify-success-btn" type="submit" >수정하기</button>
            <button id="back" >뒤로가기</button>
        </div>
        
    </form>
   

</body>
</html>