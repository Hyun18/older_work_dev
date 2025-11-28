<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>놀면뭐하老 - 노인 일자리</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <link rel="stylesheet" href="${pageContext.request.contextPath}./css/style.css"/>
    <script src="./js/home.js"></script>
</head>
<body>

	<jsp:include page="./include/header.jsp"/>
    
     <main class="container">
        <section class="top-container">
            <div class="login-section">
                <h2 >로그인</h2>
                <div class="login-type">
                    <button id="company-login-btn"  class="btn login-btn">기업 로그인</button>
                    <button id="personal-login-btn" class="btn login-btn">개인 로그인</button>
                </div>
                <div class="int-area">
                    <input type="text" class="input-field"  autocomplete="off" required>
                    <label for="id">아이디</label>
                </div>
                <div class="int-area">
                    <input type="password" class="input-field" autocomplete="off" required >
                    <label for="id">비밀번호</label>
                </div>
                <div class="action-buttons">
                    <button id="login-btn" class="btn primary-btn">로그인</button>
                    <button id="signup-btn" class="btn secondary-btn">회원가입</button>
                </div>
            </div>
               
                <div class="search-section">
                
                
                    <!-- 슬라이더 컨테이너 -->
                    <div class="search-section">
                        <h2>일자리 검색</h2>
                        <div class="search-box">
                            <input type="text" class="search-input" placeholder="지역명을 입력하세요">
                            <button class="search-btn"><i class="fas fa-search"></i></button>
                        </div>
                        <!-- 슬라이더 구조 -->
                        <div class="job-slider-container">
                            <button class="slider-btn left"><i class="fas fa-chevron-left"></i></button>
                            <div class="job-slider">
                                <div class="job-slide">
                                    <div id="jobList" class="job-card">
                                      
                                    </div>
                                </div>
                                <!-- <div class="job-slide">
                                    <div class="job-card">
                                        <h3>다우기술 경력사원 대규모 인재영입</h3>
                                        <p style="font-size: 18px;">(주)다우기술</p>
                                        <p style="font-size: 18px;">~12.11(수)</p>
                                    </div>
                                </div>
                                <div class="job-slide">
                                    <div class="job-card">
                                        <h3>2024년 하반기 KT텔레캅 신입/경력사원 공개채용</h3>
                                        <p style="font-size: 18px;">케이티텔레캅(주)</p>
                                        <p style="font-size: 18px;">~12.11(수)</p>
                                    </div>
                                </div>
                                <div class="job-slide">
                                    <div class="job-card">
                                        <h3>2024년 상반기 신입 채용</h3>
                                        <p style="font-size: 18px;">(주)알파컴퍼니</p>
                                        <p style="font-size: 18px;">~01.15(월)</p>
                                    </div>
                                </div> -->
                            </div>
                            <button class="slider-btn right"><i class="fas fa-chevron-right"></i></button>
                        </div>
                    </div>
                    
                </div>
                
            
        </section>
    </main>

    <section class="board-container">
	        <h2 id="board-btn">자유게시판</h2>
	        <div class="board-cards" id="board-slider">
	            
	            
	        </div>
    	</section>
    
	<jsp:include page="./include/footer.jsp"/>
    
</body>
</html>
