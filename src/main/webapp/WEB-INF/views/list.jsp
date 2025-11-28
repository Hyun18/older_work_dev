<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> 
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">


<title>자유게시판</title>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/twbs-pagination/1.4.2/jquery.twbsPagination.min.js"></script>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twbs-pagination/1.4.2/twbsPagination.min.css" />


    <link rel="stylesheet" href="./css/list.css"/>
    <script src="./js/list.js"></script>    
     
</head>

<body>

	<jsp:include page="./include/header.jsp"/>
	 <div style="margin-top: 100px;"></div>
	<h2 id="board-title">자유게시판</h2>
	
	<div class="search-container">
		<select id="search-type">
			<option value="title">제목</option>
			<option value="id">아이디</option>
		</select>
		<input type="text" id="search-input" placeholder="검색어를 입력하세요">
		<button id="search-btn">검색</button>
	</div>
	
   		<table class="board-table">
        <thead>
            <tr>
                <td>번호</td>   
                <td>제목</td>
                <td>아이디</td>
                <td>작성일</td>
                <td>조회수</td>
            </tr>
        </thead>
        <tbody id="board-list">
           
        </tbody>
    </table>
    <div class="pagination-container">
        <ul id="pagination" class="pagination">
            <!-- 페이지네이션 버튼이 여기에 생성됩니다. -->
        </ul>
    </div>
    
   
	    <div class="button-container">	     	
	        <button id="write-btn" class="write-btn">글쓰기</button>
	    </div>
    
	  
    


</body>
</html>