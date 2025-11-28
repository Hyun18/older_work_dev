<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> 
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>놀면뭐하老 - 노인 일자리</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="./js/imgslide.js"></script>
    <link rel="stylesheet" href="./css/my-style.css"/>
     <link rel="stylesheet" href="./css/my-work.css"/>
    <script src="./js/home.js"></script>
    <script src="./js/login.js"></script>
    <script src="./js/work.js"></script>
    <script src="./js/home-detail-work.js"></script>
 
    
</head>
<body>
   <jsp:include page="./include/header.jsp"/>
   
   <main class="main-container" >
      <div id="banner">
                <video src="./image/배너영상22.mp4" muted autoplay playsinline loop></video>
        </div>
        
        
        
         <section class="top-container" >
         <div class="login-section">
            <!-- 로그인 유형 선택 -->
            <c:if test="${empty sessionScope.loginUser && empty sessionScope.corporation}">
               <h2>로그인</h2>
         
               <div class="login-type">
                  <button id="company-login-btn" class="btn login-btn">기업 로그인</button>
                  <button id="personal-login-btn" class="btn login-btn">개인 로그인</button>
               </div>
         
               <!-- 공통 입력 필드 -->
               <div class="int-area">
                  <input type="text" id="id" class="input-field" autocomplete="off" required>
                  <label for="id">아이디</label>
               </div>
               <div class="int-area">
                  <input type="password" id="pw" class="input-field" autocomplete="off" required>
                  <label for="pw">비밀번호</label>
               </div>
         
               <div class="action-buttons">
                  <button id="login-btn" class="btn primary-btn">로그인</button>
                  <button id="signup-btn" class="btn secondary-btn">회원가입</button>
               </div>
               <div style="text-align: center; margin-top: 10px;">
                  <a href="./findIdAndPw" class="find-id-pw">아이디/비밀번호 찾기</a>
               </div>
            </c:if>
         
            <!-- 로그인 후 상태 -->
            <c:if test="${not empty sessionScope.loginUser}">
               <p class="login-user">${sessionScope.loginUser.name}님 환영합니다.</p>
               <div style="display: flex; gap: 10px; justify-content: center;">
                  <button id="upage-btn" class="btn primary-btn">마이페이지</button>
                  <button id="logout-btn" class="btn primary-btn">로그아웃</button>
               </div>
            </c:if>
         
            <c:if test="${not empty sessionScope.corporation}">
                  <button  style="width:300px;"id="work-btn" class="btn primary-btn">구인공고 등록</button>
               <p class="login-user">${sessionScope.corporation.name}님 환영합니다.</p>
               <div style="display: flex; gap: 10px; justify-content: center;">
                  <button  id="cpage-btn" class="btn primary-btn">마이페이지</button>
                  <button  id="logout-btn" class="btn primary-btn">로그아웃</button>
               </div>
            </c:if>
         </div>
         

               <div class="slider-container">
               
                  <div class="slider-wrapper">
                     <!-- <div class="slide-content">
                        <span id="s1" name="사업체명"></span>
                           <span id="s2" name="모집인원"></span>
                           <span id="s3" name="사업내용"></span>
                           <div id="states" name="상태">
                               <span></span>
                           </div>
                           <div id="s-info"> 
                              <div>
                                   <span id="startDate"></span>
                                 <span>~</span>               
                                  <span id="endData2"></span>
                               </div>
                               <span id="????"></span>
                           </div>
                        </div> -->
                        
                        
                      
                  </div>
                     <button class="prev" onclick="PrevSlide()">&#10094;</button>
                      <button class="next" onclick="NextSlide()">&#10095;</button>
               </div>
            
         </section>
         
         
         
         <div class="search-section">
            <!-- 슬라이더 컨테이너 -->
            <div id="wrap">
               
            <!-- 데스크탑, 모바일 -->
            <div id="search-header">
               <div id="search-box">
               <!-- 구 검색 -->
                  <input type="text" id="search" placeholder="지역구를 입력하세요.">
                  <!-- 검색 버튼 -->
                  <button id="searchBtn">
                     <i class="fa-solid fa-magnifying-glass" style="width:40px;"></i>
                  </button>
               </div>
               <div class="search-header-top">
               
                  <img src="./image/point.png" alt="지역" />
                  
                  <div class="header-top-area" >
                     <span>부산 광역시</span>
                  </div>
                  <div class="search-header-top-title">
                     <span>노인일자리 모집공고</span>
                  </div>
               </div>
            </div>
            <div>
               <div class="search-header-bottom">
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
            <div class="work-list d-list">
            </div>
            <!-- 일자리 더보기 버튼 -->
            <button id="loadMore" style="display:none; margin-top: 20px;">일자리 더보기</button>
            
            
            </div>
            <section class="board-container">
                 <h2 id="board-btn">자유게시판</h2>
                 <div class="board-cards" id="board-slider">
                     
                     
                 </div>
            </section>
         </div>    
         
         
         
          
   </main>
   <jsp:include page="./include/footer.jsp"/>

</body>

</html>