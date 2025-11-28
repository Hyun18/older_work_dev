<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>일자리참여방법</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

   <link rel="stylesheet" href="./css/job-method.css"/>
    <script src="./js/home.js"></script>
</head>
<body>
 
  <jsp:include page="./include/header.jsp"/>
  <div style="margin-top: 100px;"></div>

    <div class="container">
        <h1 class="title">단계별 신청 절차</h1>
        <div class="steps">
          <div class="step">1단계<br><span>모집 확인</span></div>
          <div class="step">2단계<br><span>신청서 제출</span></div>
          <div class="step">3단계<br><span>상담 및 면접</span></div>
          <div class="step">4단계<br><span>선발 및 안내</span></div>
          <div class="step">5단계<br><span>세부 활동내용 확정</span></div>
          <div class="step">6단계<br><span>협약서 작성</span></div>
          <div class="step">7단계<br><span>참여자교육</span></div>
          <div class="step">8단계<br><span>활동 실시</span></div>
        </div>
    
        <table class="process">
          <thead>
            <tr>
              <th>단계</th>
              <th>신청 절차</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1.모집 확인</td>
              <td>홈페이지, 주민센터 게시판, 언론 등을 통해 모집 기간 확인</td>
            </tr>
            <tr>
              <td>2.신청서 제출</td>
              <td>수행기관 방문 후 신청서 제출<br><span class="note">※ 신청일 기준 최근 3개월 이내 발급분</span></td>
            </tr>
            <tr>
              <td>3.상담 및 면접</td>
              <td>희망 활동, 적합성, 활동 능력(보험, 의사소통 등) 면담</td>
            </tr>
            <tr>
              <td>4.선발 및 안내</td>
              <td>자격정보 확인, 선발 기준에 따라 안내</td>
            </tr>
            <tr>
              <td>5.세부 활동내용 확정</td>
              <td>활동지역, 분야 등을 고려하여 확정</td>
            </tr>
            <tr>
              <td>6.협약서 작성</td>
              <td>조건을 명시한 협약서 작성</td>
            </tr>
            <tr>
              <td>7.참여자교육</td>
              <td>교육 프로그램 참여</td>
            </tr>
            <tr>
              <td>8.활동 실시</td>
              <td>본격적인 활동 시작</td>
            </tr>
          </tbody>
        </table>
      </div>

      <jsp:include page="./include/footer.jsp"/>
    
</body>
</html>
