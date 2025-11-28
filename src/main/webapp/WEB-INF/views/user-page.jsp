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
<title>개인마이페이지</title>

<link rel="stylesheet" href="./css/user-page.css"/>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/all.min.css" integrity="sha512-9xKTRVabjVeZmc+GUW8GgSmcREDunMM+Dt/GrzchfN8tkwHizc5RP4Ok/MXFFy5rIjJjzhndFScTceq5e6GvVQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/duotone.min.css" integrity="sha512-9xKTRVabjVeZmc+GUW8GgSmcREDunMM+Dt/GrzchfN8tkwHizc5RP4Ok/MXFFy5rIjJjzhndFScTceq5e6GvVQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
<!-- 주소 검색 API -->
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

<script src="./js/user-page.js"></script>

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
                    <span id="profile-name" >${sessionScope.loginUser.name}</span>
                    <span id="profile-id" >${sessionScope.loginUser.id}</span>
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
                                <li class="item-list-item" id="userInfo">내정보</li>
                                <li class="item-list-item" id="userPassword">비밀번호 변경</li>
                                <li class="item-list-item" id="userWithdrawal">회원탈퇴</li>
                            </ul>
                        </div>
                        <div class="item-title" >
                            <span class="item-title-text">
                                <i class="fa-solid fa-square"></i> 
                                신청 내역
                            </span>
                            <ul class="item-list" id="application" >
                                <li class="item-list-item" id="jobApplication">입사지원 현황</li>

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
                <span class="item-footer-text" id="user-login" style="display: none;">로그인</span>
                <span class="item-footer-text" id="user-logout" style="display: none;">로그아웃</span>
                <span class="item-footer-text" style="cursor: default;" >|</span>
                <span class="item-footer-text" id="customer-center" >고객센터</span>
            </div>
        </div>

        <!-- 오른쪽 컨텐츠 -->
        <div class="content" >

            <!-- 유저 회원정보 -->
            <div class="content-user-info" >
                <div class="info-header" >
                    <div class="info-header-left" >
                        <span class="header-text" >안내</span>
                    </div>
                    <div class="info-header-right" >
                        <span class="info-header-text" >고용24는 회원님의 개인정보를 신중히 취급하며, 회원님의 동의 없이 기재하신 회원정보를 공개하지 않습니다.</span>
                        <span class="info-header-text" >회원님의 개인정보를 안전하게 보호하기 위해 2차인증으로 본인인증 또는 비밀번호를 다시 입력해 주십시요.</span>
                        <span class="info-header-text" >휴대폰 입력을 안하시면 취업 소식을 받으실 수 없습니다.</span>
                    </div>
                </div>
                <div id="saveForm" >
                    <div class="user-info-form">
                        <div class="form-group">
                            <div class="label-area">
                                <label for="id">아이디</label>
                            </div>
                            <div class="input-area">
                                <input type="text" id="id" value="${sessionScope.loginUser.id}" readonly class="readonly-input">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="label-area">
                                <label for="name">이름</label>
                            </div>
                            <div class="input-area name-area">
                                <input type="text" id="name" value="${sessionScope.loginUser.name}" readonly class="readonly-input">
                                <button type="button" class="name-change-btn">
                                    <i class="fa-solid fa-pencil"></i>
                                    이름변경
                                </button>
                            </div>
                        </div>

                                    <!-- 이름 변경 버튼 이벤트-->
                                    <div class="name-change-event" style="display: none;">
                                        <div class="name-result-container">
                                            <p>서비스 이용 시 실명·연령확인을 위해<br>
                                                본인인증을 진행해 주세요.</p>
                                            <div class="name-group">
                                                <div class="name-input-group">                                        
                                                    <input type="text" id="now-name" placeholder="이름을 입력하세요.">
                                                    <div id="birth-area">
                                                        <input type="text" id="birth-date" placeholder="생년월일 8자리를 입력해주세요. ex) 19900101" maxlength="8">
                                                        <div id="birth-text"></div>  <!-- value= "남"/"여" -> value="M"/"F"로 변경했습니다(24.12.12)-->
                                                        <input type="radio" id="gender-male" name="gender" value="M" checked>
                                                        <input type="radio" id="gender-female" name="gender" value="F"> 
                                                    </div>
                                                    <input type="text" id="phone" placeholder="전화번호를 입력해주세요. ex) 01012345678" maxlength="11">
                                                    <div id="phone-text"></div>
                                                </div>
                                                <div class="name-btn-group">
                                                    <button type="button" id="name-change-btn">확인</button>
                                                    <button type="button" id="name-cancel-btn">취소</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 이름 변경 버튼 끝-->

                                    <!-- 새로운 이름 입력 -->
                                    <div class="new-name" style="display: none;">
                                        <div class="result-container">
                                            <p>새로운 이름을 입력해주세요.</p>
                                            <div class="new-name-group">
                                                <div class="new-name-input-group">
                                                    <input type="text" id="new-name" placeholder="이름을 입력하세요">
                                                </div>
                                                <div class="new-name-btn-group">
                                                    <button type="button" id="new-btn">수정</button>
                                                    <button type="button" id="new-cancel-btn">취소</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 새로운 이름 입력 끝 -->

                        <div class="form-group">
                            <div class="label-area">
                                <label for="email">이메일</label>
                            </div>
                            <div class="input-area">
                                <input type="text" id="email" value="" placeholder=""class="form-input">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="label-area">
                                <label for="phone">전화번호</label>
                            </div>
                            <div class="input-area">
                                <input type="text" id="phone" value="" placeholder="${sessionScope.loginUser.phone}" class="form-input">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="label-area">
                                <label for="address">주소</label>
                            </div>
                            <div class="input-area address-area">
                                <input type="text" id="address"  value="" placeholder="${sessionScope.loginUser.address}" class="form-input">
                                <button type="button" class="address-search-btn">
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                    주소검색
                                </button>
                            </div>
                        </div>
                        <div class="button-area">
                            <button type="button" class="submit">수정</button>
                            <button type="button" class="cancel">취소</button>
                        </div>
                    </div>

                   
                </div>
            </div>
            <!-- 유저끝 -->
            
            <!-- 유저 비밀번호 변경 -->
            <div class="content-user-pw" >
                <div class="pw-header" >
                    <div class="pw-header-left" >
                        <span class="header-text" >안내</span>
                    </div>
                    <div class="pw-header-right" >
                        <span class="pw-header-text" >비밀번호를 변경하시면 기존 로그인 계정은 로그아웃 됩니다.</span>
                        <span class="pw-header-text" >다음과 같은 비밀번호는 피해 주십시오.</span>
                        <span class="pw-header-text" >- 아이디와 같은 비밀번호</span>
                        <span class="pw-header-text" >- 주민등록번호, 생일, 학번, 일반전화 등 개인정보와 관련된 숫자</span>
                    </div>
                </div>
                <div id="pwForm" >

                    <div class="pw-info">
                        <div class="form-group">
                            <div class="label-area">
                                <label for="pw">현재 비밀번호</label>
                            </div>
                            <div class="input-area">
                                <input type="text" id="pw" value=""  class="readonly-input">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="label-area">
                                <label for="newPw">새로운 비밀번호</label>
                            </div>
                            <div class="input-area">
                                <input type="text" id="newPw" value=""  class="readonly-input">
								<div id="pw-text"></div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="label-area">
                                <label for="newPwCheck">새로운 비밀번호 확인</label>
                            </div>
                            <div class="input-area">
                                <input type="text" id="newPwCheck" value=""  class="readonly-input">
								<div id="pwCheck-text"></div>
                            </div>
                        </div>

                        <div class="button-area">
                            <button type="button" class="pw-submit">수정</button>
                            <button type="button" class="pw-cancel">취소</button>
                        </div>
                    </div>

                   
                </div>
            </div>
            <!-- 유저 비밀번호 끝 -->

			<!-- 회원탈퇴 -->
            <div class="withdrawal-container">		
					<h1 class="title">정말 탈퇴를 하실건가요?</h1>				
				<div class="withdrawal-content">
					<div class="notice-container">
						<div class="notice-item">
							<div class="notice-title">회원 탈퇴 시 서비스 이용에 제약이 있을 수 있습니다.</div>
						</div>
			
						<div class="notice-item">
							<div class="notice-title">노인 일자리 놀면뭐하노를 포함한 ID가 적용된 사이트에서 탈퇴 됩니다.</div>
						</div>
			
						<div class="notice-item">
							<div class="notice-title">회원 탈퇴 요청 전 확인 사항</div>
							<div class="notice-content">
								• 회원 아이디가 삭제되어 로그인 할 수 없습니다.<br>
								• 삭제된 정보는 이후 재가입하여도 복구되지 않습니다.
							</div>
						</div>
			
						<div class="notice-item">
							<div class="notice-title">회원 탈퇴 시 삭제정보</div>
							<div class="notice-content">
								• 회원정보(ID, 성명 등), 회원 게시글<br>
								• 즐겨찾기, 스크랩북록 등 관심정보<br>
								• 게시판 정보 등
							</div>
						</div>
					</div>
			
					<div class="button-group">
						<button class="btn btn-cancel">취소</button>
						<button class="btn btn-withdraw">탈퇴</button>
					</div>
				</div>
			</div>
			<!-- 회원탈퇴 끝 -->

            <!-- 입사지원 현황 -->
            

            <div class="job-management-container">                
                <div class="job-header">입사지원 현황</div>
                
                <div class="job-stats">
                    <div class="stat-card">
                        <div class="stat-icon"><i class="fas fa-file-alt"></i></div>
                        <div class="stat-info">
                            <span class="stat-label">전체 지원</span>
                            <span class="stat-number" id="totalApply">0</span>                            
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon"><i class="fas fa-hourglass-half"></i></div>
                        <div class="stat-info">
                            <span class="stat-label">진행중</span>
                            <span class="stat-number" id="inProgress">0</span>                            
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon"><i class="fas fa-check-circle"></i></div>
                        <div class="stat-info">
                            <span class="stat-label">최종합격</span>
                            <span class="stat-number" id="finalPass">0</span>                            
                        </div>
                    </div>
                </div>

                <!-- 탭 컨테이너 -->
                <div class="tab-container">                    
                    <button class="tab-button active" data-tab="ourJobs">우리 일자리</button>
                    <button class="tab-button" data-tab="apiJobs">API 일자리</button>
                </div>

                <!-- 접수 리스트 -->

                <div class="applications-container" id="applicationsContainer">
                    <div class="no-application-message">
                        <span>지원하신 정보가 없습니다.</span>
                    </div>

                    <!-- 우리 일자리 섹션 -->
                <div class="tab-content active" id="ourJobs">
                    <div class="applications-container" id="ourJobsContainer">
                        <!-- 우리 일자리 내용 -->
                    </div>
                </div>

                <!-- API 일자리 섹션 -->
                <div class="tab-content" id="apiJobs">
                    <div class="applications-container" id="apiJobsContainer">
                        <!-- API 일자리 내용 -->
                    </div>
                </div>

                


                
                    <!-- <div class="application-card">
                        <div class="applicant-header">
                            <h3 class="applicant-name" id="orgName">1</h3>
                            <span class="application-date">2</span>
                        </div>
                        <div class="applicant-details">
                            <p><i class="fas fa-briefcase"></i><span id="content">3</span></p>
                            <p><i class="fas fa-map-marker-alt"></i><span id="workArea">4</span></p>
                            <p><i class="fas fa-won-sign"></i> <span id="intCnt">5</span></p> 
                        </div>
                        <div class="application-actions">
                            <div class="action-buttons">
                                <button class="view-detail"><i class="fas fa-search"></i> 상세보기</button>
                                <button class="cancel-apply"><i class="fas fa-times"></i> 지원취소</button>
                            </div>
                        </div>
                    </div> -->


                    
                    
                </div>
            </div>

            
            <!--  관리 끝 -->


        </div>
    </div>






















<!-- 맨위 올라가기 버튼 -->
<button id="scrollToTopBtn">
    <i class="fa-solid fa-arrow-up"></i>
</button>
<!-- 맨위 올라가기 버튼  끝-->

</body>
</html>