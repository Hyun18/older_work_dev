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
<title>기업페이지</title>

<link rel="stylesheet" href="./css/company-page.css"/>
<!-- <link rel="stylesheet" href="./css/detail-work.css"/> -->


<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/all.min.css" integrity="sha512-9xKTRVabjVeZmc+GUW8GgSmcREDunMM+Dt/GrzchfN8tkwHizc5RP4Ok/MXFFy5rIjJjzhndFScTceq5e6GvVQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/duotone.min.css" integrity="sha512-9xKTRVabjVeZmc+GUW8GgSmcREDunMM+Dt/GrzchfN8tkwHizc5RP4Ok/MXFFy5rIjJjzhndFScTceq5e6GvVQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />

<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
<!-- 주소 검색 API -->
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

<script src="./js/company-page.js"></script>

</head>
<body>

		<header class="header">
	        <div class="inner">
	        	<a href="./">
	            	<img id="logo" class="title" src="./image/로고.png" />
	            </a>
	            <nav class="navbar">
	                <div class="hitem-title">
	                    <span class="nav-link">노인일자리</span> <!-- 고정된 부분 -->
	                    <ul class="hitem-list">
	                        <li class="hitem-list-item"><a href="./our-work">우리일자리</a></li>
	                        <li class="hitem-list-item"><a href="./work">API 일자리</a></li>
	                    </ul>
	                  </div>
	                <a href="./work-type" id="work-type" class="nav-link">일자리유형</a>
	                <a href="./job-method" id="job-method-btn" class="nav-link">일자리참여방법</a>
	                <a href="./list" id="board-btn" class="nav-link">자유게시판</a>
	            </nav>
	        </div>
	    </header>
	    <div style="margin-top: 100px;"></div>
 

    <!-- 컨테이너 -->
    <div class="main-container">
        <!-- 프로필 -->
        <div class="profile-container" >
            <!-- 프로필 헤더 -->
            <div class="profile-header" >
                <div class="profile-img" >
                    <img src="./image/기본프로필.png" alt="프로필 이미지" id="profile" />
                    <i class="fa-solid fa-gear"></i>
                    <input type="file" id="profile-upload" style="display: none;"/>
                </div>
                <div class="profile-info" >
                    <span id="profile-name" >${sessionScope.corporation.name}</span>
                    <span id="profile-m_id" >${sessionScope.corporation.m_id}</span>
                    <span id="profile-m_name" >${sessionScope.corporation.m_name}</span>
                </div>
            </div>

            <!-- 컨텐츠 -->
            <div class="profile-content" >
                <div class="profile-content-header" >

                    <div class="item" >

                        <div class="item-title" >
                            <span class="item-title-text" >
                                <i class="fa-solid fa-square"></i> 
                                기본 설정
                            </span>
                            <ul class="item-list" >
                                <li class="item-list-item" id="corpInfo">기업 정보</li>
                                <li class="item-list-item" id="corpManager">담당자 정보</li>
                                <li class="item-list-item" id="corpWithdrawal">기업 탈퇴</li>
                            </ul>
                        </div>
                        <div class="item-title" >
                            <span class="item-title-text" >
                                <i class="fa-solid fa-square"></i> 
                                채용 관리
                            </span>
                            <ul class="item-list" >
                                <li class="item-list-item" id="jobManage">구인공고 관리</li> 
                                <li class="item-list-item" id="appManage">전체 지원자 관리</li> 
                            </ul>
                        </div>                        
                        <div class="item-title" >
                            <span id="board-button" class="item-title-text" >
                                <i class="fa-solid fa-square"></i> 
                               자유게시판
                            </span>
                            
                        </div>                

                    </div>   
                </div>                
            </div>
            <!-- 컨텐츠 끝 -->

            <!-- 프로필 푸터 -->
            <div class="item-footer" >
                <span class="item-footer-text" id="corp-login" style="display: none;">로그인</span>
                <span class="item-footer-text" id="corp-logout" style="display: none;">로그아웃</span>
                <span class="item-footer-text" style="cursor: default;" >|</span>
                <span class="item-footer-text" id="customer-center" >고객센터</span>
            </div>
        </div>

        <!-- 오른쪽 컨텐츠 -->
        <div class="content" >

            <!-- 기업 회원정보 -->
            <div class="form-container"  >
                <div class="corp-header" >
                    <div class="corp-header-left" >
                        <span class="corp-header-text" >안내</span>
                    </div>
                    <div class="corp-header-right" >
                        <span class="corp-header-text">기업정보를 입력해주세요.</span>
                    </div>
                </div>    
                <div class="signup-form">
                    <div class="signup-form">
                        <div class="corp-group">
                            <label for="code" style="width: 130px;">사업자 등록조회</label>
                            <div class="input-group" style="margin-right: 30px;">
                                <input style="margin-bottom: 10px;" type="text" id="code" name="code" readonly placeholder='${sessionScope.corporation.code}'>
                                <input style="margin-bottom: 0px;" type="text" id="p_nm" name="p_nm" readonly placeholder='${sessionScope.corporation.p_nm}'>
                            </div>
                            <div class="corp-group insurance-group">
                                <label for="insurance" style="text-align: center;">4대보험 가입여부</label>
                                <div style="display: flex; align-items: center; justify-content: center;">
                                    <input style="margin:0" type="radio" id="join" name="insurance" value="가입" checked >
                                    <input type="radio" id="no-join" name="insurance" value="미가입">
                                </div>
                            </div>                            
                        </div>
            
                        <div class="corp-group">
                            <label for="address">기업 주소</label>
                            <input type="text" id="address" name="address" style="width: 85%;" placeholder='${sessionScope.corporation.address}'>
                            <button type="button" id="address-btn">주소검색</button>
                        </div>
            
                        <div class="corp-group">
                            <label for="name">회사명</label>
                            <input type="text" id="name" name="name" required placeholder='${sessionScope.corporation.name}'>
                        </div>
            
            
                        <div class="corp-group">
                            <label for="type">업종</label>
                            <input type="text" id="type" name="industry" required placeholder='${sessionScope.corporation.type}'>
                        </div>
            
                        <div class="corp-group">
                            <label for="tel">회사 전화번호</label>
                            <input type="text" id="tel" name="tel" placeholder='${sessionScope.corporation.tel}'>
                        </div>
            
                        <div class="corp-group">
                            <label for="employees">전체 직원수</label>
                            <input type="text" id="employees" name="employees" placeholder='${sessionScope.corporation.employees}'>
                        </div>            
            
                        <div class="corp-group">
                            <label for="fax">팩스 번호</label>
                            <input type="text" id="fax" name="fax" placeholder='${sessionScope.corporation.fax}'>
                        </div>
            
                        <div class="corp-group">
                            <label for="zone">행정 구역</label>
                            <select id="zone" name="area" required >
                                <option value="">행정 구역을 선택하세요</option>
                                <option value="중구">부산광역시 중구</option>
                                <option value="서구">부산광역시 서구</option>
                                <option value="동구">부산광역시 동구</option>
                                <option value="영도구">부산광역시 영도구</option>
                                <option value="부산진구">부산광역시 부산진구</option>
                                <option value="동래구">부산광역시 동래구</option>
                                <option value="남구">부산광역시 남구</option>
                                <option value="북구">북산광역시 북구</option>
                                <option value="해운대구">부산광역시 해운대구</option>
                                <option value="사하구">부산광역시 사하구</option>
                                <option value="금정구">부산광역시 금정구</option>
                                <option value="강서구">부산광역시 강서구</option>
                                <option value="연제구">부산광역시 연제구</option>
                                <option value="수영구">부산광역시 수영구</option>
                                <option value="사상구">부산광역시 사상구</option>
                                <option value="기장군">부산광역시 기장군</option>            
                            </select>
                        </div>
                        <div class="corp-btn">
                            <button class="corp-submit" id="corp-submit">확인</button>
                            <button class="corp-cancel" id="corp-cancel">취소</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 기업 회원정보 끝 -->

            <!-- 담당자 정보 -->
            <div class="form-container2">
                <div class="corp-header" >
                    <div class="corp-header-left" >
                        <span class="corp-header-text" >안내</span>
                    </div>
                    <div class="corp-header-right" >
                        <span class="corp-header-text">담당자 정보를 입력해주세요.</span>
                    </div>
                </div> 
                <div class="corp-form">

                    <div class="corp-group">
                        <label for="m_id">아이디</label>
                        <input style="width: 95%;" type="text" id="m_id" name="applicant-id" readonly required placeholder='${sessionScope.corporation.m_id}'>
                    </div>

                    <div class="corp-group">
                        <label for="current_pw">비밀번호</label>
                        <input style="width: 95%;" type="password" id="current_pw" name="applicant-pw"  required>
                    </div>                    

                    <div class="corp-group">
                        <label for="m_name">이름</label>
                        <input style="width: 95%;" type="text" id="m_name" name="applicant-name"  placeholder='${sessionScope.corporation.m_name}'>
                    </div>

                    <div class="corp-group">
                        <label for="m_tel">연락처</label>
                        <input style="width: 95%;" type="text" id="m_tel" name="applicant-phone"  placeholder='${sessionScope.corporation.m_tel}'>
                    </div>

                    <div class="corp-group">
                        <label for="m_email">이메일</label>
                        <input style="width: 95%;" type="email" id="m_email" name="applicant-email"  placeholder='${sessionScope.corporation.m_email}'>
                    </div>

                    <div class="corp-group">
                        <label for="m_part">부서</label>
                        <input style="width: 95%;"type="text" id="m_part" name="department"  placeholder='${sessionScope.corporation.m_part}'>
                    </div>
                    <div class="manager-btn">
                        <button class="corp-submit" id="manager-submit">확인</button>
                        <button class="corp-cancel" id="manager-cancel">취소</button>
                    </div>

                    <div class="new-pw-container">
                        <div class="corp-group" style="margin-top: 80px; margin-bottom: 30px;">
                            <label for="m_pw">새 비밀번호</label>
                            <input style="width: 95%;" type="password" id="m_pw" name="applicant-pw">
                            <div id="pw-check"></div>
                        </div> 
                        <div class="corp-group">
                            <label for="m_pwCheck">새 비밀번호 확인</label>
                            <input style="width: 95%;" type="password" id="m_pwCheck" name="applicant-pwCheck"   >
                            <div id="pw-check2"></div>
                        </div> 

                    </div>
                </div>
            </div>

            <!-- 기업 담당자 탈퇴 -->
            <div class="corp-withdrawal-container">		
                <h1 class="title">정말 탈퇴를 하실건가요?</h1>				
                <div class="corp-withdrawal-content">
                    <div class="notice-container">
                        <div class="notice-item">
                            <div class="notice-title">기업 담당자 탈퇴 시 서비스 이용 제약 안내</div>
                        </div>
            
                        <div class="notice-item">
                            <div class="notice-title">탈퇴 시 해당 기업의 모든 서비스 이용이 중단됩니다.</div>
                        </div>
            
                        <div class="notice-item">
                            <div class="notice-title">회원 탈퇴 요청 전 필수 확인사항</div>
                            <div class="notice-content">
                                • 기업 담당자 계정이 삭제되어 더 이상 로그인이 불가능합니다.<br>
                                • 기업의 구인공고 게시 및 관리가 불가능해집니다.<br>
                                • 진행 중인 채용절차가 있다면 모두 중단됩니다.
                            </div>
                        </div>
            
                        <div class="notice-item">
                            <div class="notice-title">탈퇴 시 삭제되는 정보</div>
                            <div class="notice-content">
                                • 기업 담당자 개인정보(ID, 성명, 연락처 등)<br>
                                • 기업 정보(사업자등록번호, 기업소개, 위치 등)<br>
                                • 등록한 구인공고 및 채용 관련 모든 게시물
                            </div>
                        </div>
                    </div>
            
                    <div class="corp-withdrawal-btn">
                        <button class="corp-cancel" id="withdrawal-cancel">취소</button>
                        <button class="corp-submit" id="withdrawal-submit">탈퇴</button>
                    </div>
                </div>
            </div>
            <!-- 회원탈퇴 끝 -->

            <!-- 구인공고 관리 -->
            <div class="job-management-container1">
                <div class="jobReg">
                    <div class="job-header">구인공고 관리</div>
                    <button id="work-btn"><i class="fas fa-plus"></i> 새 구인공고 등록</button>
                </div>
            
                <div class="job-stats">
                    <div class="stat-card">
                        <div class="stat-icon"><i class="fas fa-file-alt"></i></div>
                        <div class="stat-info">
                            <span class="stat-label">전체 공고</span>
                            <span class="stat-number" id="totalCount1">0</span>                            
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon"><i class="fas fa-users"></i></div>
                        <div class="stat-info">
                            <span class="stat-label">모집중</span>
                            <span class="stat-number" id="pendingCount1">0</span>                            
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon"><i class="fas fa-check-circle"></i></div>
                        <div class="stat-info">
                            <span class="stat-label">마감</span>
                            <span class="stat-number" id="hiredCount1">0</span>                            
                        </div>
                    </div>
                </div>
            
                <div class="job-filter-section">
                    <div class="search-box">
                        <input type="text" id="searchInput" placeholder="공고 검색">
                        <button class="search-btn"><i class="fas fa-search"></i></button>
                    </div>
                    
                    <div class="filter-options">
                        <select class="filter-select" id="statusFilter">
                            <option value="all">전체 상태</option>
                            <option value="pending">모집중</option>
                            <option value="rejected">마감</option>
                        </select>
                    </div>
                </div>

                <!-- 공고 보여주기 -->

                <div class="posting-list" id="postinglist">

                    <!-- <div class="posting-card">
                        <div class="posting-info">
                            <div class="posting-header">
                                <h3 class="company-name">ㅇㅇ어린이집</h3>
                                <span class="posting-date">2024-12-16</span>
                            </div>
                            <div class="posting-details">
                                <p><i class="fas fa-briefcase"></i> 시설관리 및 감시원</p>
                                <p><i class="fas fa-map-marker-alt"></i> 부산 동래구</p>
                                <p><i class="fas fa-won-sign"></i> 3,000,000원</p>
                                <span class="status-badge active">진행중</span>
                            </div>
                        </div>
                        <div class="posting-actions">
                            <select class="status-select" id="posting-selection">
                                <option value="pending">모집중</option>
                                <option value="interview">마감</option>
                            </select>
                            <div class="action-buttons">
                                <button class="edit-btn"><i class="fas fa-edit"></i> 수정</button>
                                <button class="delete-btn"><i class="fas fa-trash"></i> 삭제</button>
                            </div>                            
                        </div>
                    </div> -->

                </div>                
                <!-- 공고 보여주기 끝-->

            </div>
            <!-- 구인공고 관리 끝 -->

            <!-- 지원자 관리  -->
            <div class="job-management-container">
                <div class="jobReg">
                    <div class="job-header">지원자 관리</div>
                </div>
                
                <div class="job-stats">
                    <div class="stat-card">
                        <div class="stat-icon"><i class="fas fa-file-alt"></i></div>
                        <div class="stat-info">
                            <span class="stat-label">전체 지원자</span>
                            <span class="stat-number" id="totalCount">0</span>                            
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon"><i class="fas fa-users"></i></div>
                        <div class="stat-info">
                            <span class="stat-label">심사중</span>
                            <span class="stat-number" id="pendingCount">0</span>                            
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon"><i class="fas fa-check-circle"></i></div>
                        <div class="stat-info">
                            <span class="stat-label">채용완료</span>
                            <span class="stat-number" id="hiredCount">0</span>                            
                        </div>
                    </div>
                </div>

                <div class="job-filter-section">
                    <div class="search-box">
                        <input type="text" id="appSearchInput" placeholder="지원자 검색">
                        <i class="fa-solid fa-xmark"></i>
                        <button class="search-btn"><i class="fas fa-search"></i></button>
                    </div>
                    
                    <div class="filter-options">
                        <select class="filter-select" id="statusFilter">
                            <option value="all">전체 상태</option>
                            <option value="pending">서류 검토중</option>
                            <option value="interview">면접 예정</option>
                            <option value="accepted">최종합격</option>
                            <option value="rejected">불합격</option>
                        </select>
                    </div>
                </div>
                
                <!-- 지원자 보여주기 -->
                <div class="applications-container" id="applicationsContainer">
                    
                    <div class="application-card">
                        <div class="applicant-info">
                            <div class="applicant-header">
                                <h3 class="applicant-name">김청수 (
                                    <span class="application-date">업체명</span>
                                    )</h3>
                                <span class="application-date">2024.03.15</span>
                            </div>
                            <div class="applicant-details">
                                <p><i class="fa-solid fa-cake-candles"></i> 나이: 87세</p>
                                <p><i class="fas fa-phone"></i> 연락처: 010-1234-5678</p>
                                <p><i class="fas fa-envelope"></i> 이메일: kim@email.com</p>
                            </div>
                            <div class="applicant-resume">
                                <a href="#" class="resume-link">이력서 보기</a>
                            </div>
                        </div>
                        <div class="application-actions">
                            <select class="status-select" id="job-selection">
                                <option value="pending">서류 검토중</option>
                                <option value="interview">면접 예정</option>
                                <option value="accepted">최종합격</option>
                                <option value="rejected">불합격</option>
                            </select>
                            <div class="action-buttons">
                                <button class="contact-btn"><i class="fa-solid fa-envelope"></i> 메일 보내기</button>
                                <button class="schedule-btn"><i class="fas fa-calendar"></i> 면접 일정</button>
                            </div>
                        </div>
                    </div>

                <!-- 지원자 보여주기 끝 -->

                <!-- 면접 일정 모달 -->
                <div id="interviewModal" class="modal">
                    <div class="modal-content">
                        <span class="close"><i class="fa-solid fa-xmark"></i></span>
                        <h2>면접 일정 설정</h2>
                        <form id="interviewForm">
                            <div class="form-group">
                                <label>면접 날짜</label>
                                <input type="date" id="interviewDate" required>
                            </div>
                            <div class="form-group">
                                <label>면접 시간</label>
                                <input type="time" id="interviewTime" required>
                            </div>
                            <div class="form-group">
                                <label>면접 장소</label>
                                <input type="text" id="interviewLocation" required>
                            </div>
                            <div class="form-group">
                                <label>메모</label>
                                <textarea id="interviewNotes"></textarea>
                            </div>
                            <button type="submit" class="submit-btn">일정 확정</button>
                        </form>
                    </div>
                </div>
                <!-- 면접 일정 모달 끝-->

            </div>
            <!-- 지원자 관리 끝 -->

            





        </div>


    </div>
	


<!-- 맨위 올라가기 버튼 -->
<button id="scrollToTopBtn">↑</button>
<!-- 맨위 올라가기 버튼  끝-->

<!-- <footer class="footer1">
    <div class="footer-content1">
        <p>주소 : 부산광역시 해운대구 우동 123-45</p>
        <p >대표전화: 02-1234-5678 | 사업자등록번호: 123-45-67890</p>
        <p style="margin-top: 20px;">© 2024 놀면뭐하老. All rights reserved.</p>
        <P>본 페이지에 게시된 이메일주소 자동수집을 거부하며, 이를 위반시 정보통신망법에 의해 처벌됨을 유념하시기 바랍니다</P>
        
    </div>
</footer>
 -->
</body>
</html>