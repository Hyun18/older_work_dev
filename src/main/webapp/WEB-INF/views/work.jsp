<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page isELIgnored="false" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>노인일자리 모집공고</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

<link rel="stylesheet" href="./css/work.css"/>

<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/twbs-pagination/1.4.2/jquery.twbsPagination.min.js" integrity="sha512-frFP3ZxLshB4CErXkPVEXnd5ingvYYtYhE5qllGdZmcOlRKNEPbufyupfdSTNmoF5ICaQNO6SenXzOZvoGkiIA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="./js/work.js"></script>
<script src="./js/work2.js"></script>


</head>

<style>
   #wrap-header {
	  margin-top: 8rem;
      display: flex;
      justify-content:center;
      align-items: center;
      padding: 10px 0;
   }
   #search {
      width: 500px;
      height: 50px;
      border: 1px solid #dedede;
      border-radius: 5px;
      padding: 0 10px;
      margin-right: 10px; 
      font-size: 20px;
     
   }
   #searchBtn {
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
   #searchBtn:hover {
      background-color: #4d7d95;
   }
   
   .sort-area button.active{
      color: #fff;
   }
</style>


<body>

<jsp:include page="./include/header.jsp"/> 

   <div id="wrap">
      
      <div id="wrap-header">
         <!-- 구 검색 -->
         <input type="text" id="search" placeholder="지역구를 입력하세요.">
         <!-- 검색 버튼 -->
         <button id="searchBtn">
            <i class="fa-solid fa-magnifying-glass">검색</i>
         </button>
      </div>
       <!-- 데스크탑, 모바일 -->
   <div class="wrap-header">
      <div class="header-top">         
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
   
   <jsp:include page="./include/footer.jsp"/>
</body>



</html>