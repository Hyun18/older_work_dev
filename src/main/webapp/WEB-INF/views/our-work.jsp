<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page isELIgnored="false" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>우리일자리 모집공고</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

<link rel="stylesheet" href="./css/work.css"/>

<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/twbs-pagination/1.4.2/jquery.twbsPagination.min.js" integrity="sha512-frFP3ZxLshB4CErXkPVEXnd5ingvYYtYhE5qllGdZmcOlRKNEPbufyupfdSTNmoF5ICaQNO6SenXzOZvoGkiIA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<script src="./js/our-work.js"></script>

</head>

<style>
	#header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
    /* 텍스트 스타일 */
    font-family: 'Arial', sans-serif;
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    }
/* 헤더 내부 텍스트 꾸미기 */
	#header h1 {
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 2px;
}
	#searchInput {
		width: 300px;
		height: 50px;
		border: 1px solid #dedede;
		border-radius: 5px;
		padding: 0 10px;
		margin-right: 10px;
		font-size: 20px;
	}
	#searchButton {
		width: 100px;
		height: 50px;
		background-color: #5c92ac;
		color: #fff;
		border: none;
		border-radius: 5px;
		padding: 5px 10px;
		font-size: 20px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}
	#searchButton:hover {
		background-color: #2d5f7a;
	}
	.sort-area button.active{
		background-color: var(--main-color1);
		color: #fff;
	}
	header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    background-color: #fff;
    padding: 10px 0;
	}
	
	header .inner {
	   width:var(--page-w);
	    height: 70px; /* 고정 높이 설정 */
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	    max-width: 1200px;
	    margin: 0 auto;
	    padding: 0 20px;
	}
	
	header .inner .title{
	    width: 150px;
	       
	}
	
	
	.logo {
	    height: 150px; /* 원하는 높이로 조정 */
	    width: auto; 
	    object-fit: contain; /* 이미지 비율 유지 */
	    vertical-align: middle; /* 수직 정렬 */
	    cursor: pointer;
	}
	
	.navbar {
	    display: flex;
	    align-items: center;
	}
	
	.navbar .nav-link {
	    margin: 0 30px;
	    font-size: 18px;
	    color: var(--color-sub);
	    font-weight: 700;
	    text-decoration: none;
	    
	}
	
	.navbar .nav-link:hover {
	    transform: scale(1.05);
	    font-size: 18px;
	}
	
/* 노인 일자리  */
.item-title {
    position: relative;
    display: inline-block;
    text-align: center;
  }
  
  .nav-link {
    font-size: 18px;
    font-weight: bold;
    color: var(--color-main);
    cursor: pointer;
    padding: 10px 15px;
    display: inline-block;
  }
  
  /* 드롭다운 리스트 스타일 */
  .item-list {
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    min-width: 150px;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transition: max-height 0.3s ease, opacity 0.3s ease;
  }
  
  .item-title:hover .item-list {
    max-height: 200px;
    opacity: 1;
  }
  
  .item-list-item {
    padding: 4px 15px;
  }
  
  .item-list-item a {
    color: var(--color-sub);
    text-decoration: none;
    display: block;
    transition: color 0.2s ease;
  }
  
  .item-list-item a:hover {
    color: var(--color-main);
  }
</style>


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
    <div style="margin-top: 100px;"></div>
    
	<div id="wrap">
		
		<div id="header">
			<!-- 구 검색 -->
			<input style="width:500px; margin-right:10px; "type="text" id="searchInput" placeholder="지역구 검색">
			<button id="searchButton">
				<i class="fa-solid fa-magnifying-glass">
					검색
				</i>
			</button>
		</div>
		 <!-- 데스크탑, 모바일 -->
	<div class="header">
		<div style="width:1200px; background:#5c92ac; color:#fff; margin:0 auto;margin-top:20px;"class="header-top">			
			<div class="header-top-area">
				<img src="./image/point.png" alt="지역" />
				<span id="gugun">부산 광역시</span>
			</div>
			<div class="header-top-title">
				<span>노인일자리 모집공고</span>
			</div>
		</div>
	</div>
	<div>
		<div class="header-bottom">
			<span>모집공고 목록</span>
		</div>
	</div>
	<div class="check-area">
		<input type="checkbox" id="check-all" />
		<label for="check-all">전체 선택</label>
		<input type="checkbox" id="check-1" class="check" />
		<label for="check-1">노인공익활동사업</label>
		<input type="checkbox" id="check-2" class="check" />
		<label for="check-2">공동체사업단</label>
		<input type="checkbox" id="check-3" class="check" />
		<label for="check-3">노인역량활용사업</label>
		<input type="checkbox" id="check-4" class="check" />
		<label for="check-4">시니어인터십</label>
		
	</div>
	<div class="sort-area">
		<button id="sort-start" data-index="1">
			<i class="fa-solid fa-list"></i>
			전체
		</button>
		<button id="sort-ing"  data-index="2">
			<i class="fa-solid fa-list"></i>
			모집중
		</button>
		<button id="sort-end"  data-index="3">
			<i class="fa-solid fa-list"></i>
			종료일순
		</button>
		<button id="sort-update"  data-index="4">
			<i class="fa-solid fa-list"></i>
			최근수정순
		</button>
		<div class="sort-area-right">
			검색결과 : 총 <span id="totalCount"></span>건
		</div>
	</div>

<!-- 데스크탑 -->
<div class="work-list d-list"></div>
		
	</div>
	<div class="pagination-area">
		<ul id="pagination-demo" class="pagination-sm"></ul>
	</div>
	
	<footer class="footer">
        <div class="footer-content">
            <p>주소 : 부산광역시 해운대구 우동 123-45</p>
            <p >대표전화: 02-1234-5678 | 사업자등록번호: 123-45-67890</p>
            <p style="margin-top: 20px;">© 2024 놀면뭐하老. All rights reserved.</p>
            <P>본 페이지에 게시된 이메일주소 자동수집을 거부하며, 이를 위반시 정보통신망법에 의해 처벌됨을 유념하시기 바랍니다</P>
            
        </div>
    </footer>
	
</body>



</html>