<!-- <%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> -->



<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>일자리 유형</title>
    <link rel="stylesheet" href="./css/my-styles.css">
    <link rel="stylesheet" href="./css/worktype.css">
</head>
<body>
<jsp:include page="./include/header.jsp"/>
    <div class="container">
        <!-- 제목 -->
        <h1 class="main-title">일자리유형</h1>

        <!-- 지역사회에 공헌하는 사회활동 -->
        <section class="job-section">
            <h2 class="section-title">지역사회에 공헌하는 사회활동</h2>
            <div class="job-card large">
                <div class="job-icon">
                    <img src="./image/설명.png" alt="노인공익활동사업 아이콘">
                </div>
                <div class="job-details">
                    <h3 class="job-title">노인공익활동사업</h3>
                    <ul>
                        <li><strong>참여대상:</strong> 만 65세 이상 기초연금수급자</li>
                        <li><strong>활동분야:</strong> 노노케어, 취약계층 지원, 공공시설 봉사, 환경보호 활동</li>
                        <li><strong>활동기간:</strong> 10~12개월</li>
                        <li><strong>활동시간:</strong> 월 30시간 이상(주 3시간 이내)</li>
                        <li><strong>활동비:</strong> 월 29만 원</li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- 경력과 경험을 활용한 일자리 -->
        <section class="job-section">
            <h2 class="section-title">경력과 경험을 활용한 일자리</h2>
            <div class="job-cards-grid">
                <!-- 노인일자리형 -->
                <div class="job-card">
                    <div class="job-icon">
                        <img src="./image/회의.png" alt="노인일자리형 아이콘">
                    </div>
                    <div class="job-details">
                        <h3 class="job-title">노인일자리형사업</h3>
                        <ul>
                            <li><strong>참여대상:</strong> 만 65세 이상</li>
                            <li><strong>근무내용:</strong> 교육시설 학습보조, 시니어 컨선턴트,</li>
                            <li><span> 취약계층 공익증진 서비스, 노인맞춤돌봄 서비스 등</span>
                            <li><strong>근무기간:</strong> 10개월</li>
                            <li><strong>근무시간:</strong> 월 60시간</li>
                            <li><strong>급여:</strong> 월76만원</li>
                            <li><font style="font-size: 12px;">*급여는 근로계약에 따라 다름</font></li>
                        </ul>
                    </div>
                </div>
                <!-- 공동체사업단 -->
                <div class="job-card">
                    <div class="job-icon">
                        <img src="./image/카페.png" alt="공동체사업단 아이콘">
                    </div>
                    <div class="job-details">
                        <h3 class="job-title">공동체사업단</h3>
                        <ul>
                            <li><strong>참여대상:</strong> 만 60세 이상</li>
                            <li><strong>근무내용:</strong> 소규모 매장(식품제조, 카페 등) 및 아파트 택배, 지하철 택배 등</li>
                            <li><font style="font-size: 12px;">*근무기간, 시간, 급여는 근로계약에 따라 다름</font></li>
                        </ul>
                    </div>
                </div>
                <!-- 취업알선형 -->
                <div class="job-card">
                    <div class="job-icon">
                        <img src="./image/경비.png" alt="취업알선형 아이콘">
                    </div>
                    <div class="job-details">
                        <h3 class="job-title">취업알선형</h3>
                        <ul>
                            <li><strong>참여대상:</strong> 만 60세 이상</li>
                            <li><strong>근무내용:</strong> 시험감독관, 주유원, 단순노무직(경비 등), 관리사무직 등</li>
 							<li><font style="font-size: 12px;">*근무기간, 시간, 급여는 근로계약에 따라 다름</font></li>                        </ul>
                    </div>
                </div>
                <!-- 시니어인턴십 -->
                <div class="job-card">
                    <div class="job-icon">
                        <img src="./image/인턴쉽.png" alt="시니어인턴십 아이콘">
                    </div>
                    <div class="job-details">
                        <h3 class="job-title">시니어인턴십</h3>
                        <ul>
                            <li><strong>참여대상:</strong> 만 60세 이상</li>
                            <li><strong>근무내용:</strong> 버스 운전원, 조리사, 제조 종사자, 서비스직 등</li>
                            <li><font style="font-size: 12px;">*제외 직종 30개 외 기업직종에 따라 참여 가능</font></li>
                            <li><strong>근로시간:</strong> 기관 근로계약에 따라 다름</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <jsp:include page="./include/footer.jsp"/>
</body>
</html>
