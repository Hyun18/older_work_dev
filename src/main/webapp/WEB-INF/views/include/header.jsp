<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

	 <link rel="stylesheet" href="./css/my-style.css"/>
	 <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
	 <script src="./js/home.js"></script>

</head>
<body>
	<header class="header">
        <div class="inner">
        	<a href="./">
            	<img id="logo" class="title" src="./image/로고.png" />
            </a>
            <nav class="navbar">
                <div class="item-title">
                    <span class="nav-link">노인일자리</span> <!-- 고정된 부분 -->
                    <ul class="item-list">
                        <li class="item-list-item"><a href="./our-work">우리일자리</a></li>
                        <li class="item-list-item"><a href="./work">API 일자리</a></li>
                    </ul>
                  </div>
                <a href="./work-type" id="work-type" class="nav-link">일자리유형</a>
                <a href="./job-method" id="job-method-btn" class="nav-link">일자리참여방법</a>
                <a href="./list" id="board-btn" class="nav-link">자유게시판</a>
            </nav>
        </div>
    </header>
</body>
</html>