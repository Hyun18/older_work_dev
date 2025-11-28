<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page isELIgnored="false" %>

<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>상세 정보</title>


<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />



<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
<link rel="stylesheet" href="./css/detail-work.css"/>
<script src="./js/detail-work.js"></script>


</head>
<body>
  	<jsp:include page="./include/header.jsp"/>
    <div style="margin-top: 100px;"></div> 
	
	<div class="detail-main">
		 <div class="inner">
			<div class="d-header">
				<div class="dh-inner">
					<div class="dh-left">
						<div class="l-top">
							<span id="orgName"></span>
						</div>
						<div class="l-bottem">
							<span id="content"></span>
							<span id="states"></span>							
						</div>
					</div>
					<div class="dh-right">
						<span id="startDate"> </span>
						<span id="projDate"> </span>
					</div>
				</div>
			</div>
		  <div class="d-content">
				<div class="d-inner">
					<div class="d-left">
						구인사항
					</div>
					<div class="d-center">
						<div>
							<span id="workArea1">• 근무지역</span>
							<span id="content1">• 근무내용</span>
							<span id="license1">• 자격증</span>							
							<span id="operPlan1">• 근로 여부</span>
						</div>
					</div>
					<div class="d-right">
						<div>
							<span id="workArea2"></span>
							<span id="content2"></span>
							<span id="license2"></span>
							<span id="operPlan2"></span>
						</div>
					</div>
				</div>
			</div>
			<div class="d-content">
				<div class="d-inner">
					<div class="d-left">
						근로조건
					</div>
					<div class="d-center">
						<div>
							<span id="recuAgeNm1">• 나이</span>
							<span id="intCnt1">• 모집인원</span>
							<span id="projTime1">• 소정 근로시간</span>
							<span id="pay1">• 임금</span>
							<span id="education1">• 교육</span>
						</div>
					</div>
					<div class="d-right">
						<div>
							<span id="recuAgeNm2"></span>
							<span id="intCnt2"></span>
							<span id="projTime2"></span>
							<span id="pay2"></span>
							<span id="education2"></span>
						</div>
					</div>
				</div>
			</div>
			<div class="d-content">
				<div class="d-inner">
					<div class="d-left">
						전형사항
					</div>
					<div class="d-center">
						<div>			
							<span id="endData1">• 마감일자</span>
							<span id="orgName1">• 구인담당자</span>
							<span id="addr1">• 주소</span>
						</div>
					</div>
					<div class="d-right">
						<div>
							<span id="endData2"></span>
							<div style="display: flex;">
								<span id="orgName2" style="margin-right: 10px;"></span> | 연락처 : <span id="telNum" style="margin-left: 5px;"></span>
							</div>
							<span id="addr2"></span>							
						</div>
					</div>
				</div>
			</div>
			<div id="btn">
				<input type="button" id="submit-btn" value="접수">
				<input type="button" id="list-btn" value="목록">
			</div> 
		</div>		
	</div>
	
	
	 <footer class="footer">
        <div class="footer-content">
            <p>주소 : 부산광역시 해운대구 우동 123-45</p>
            <p >대표전화: 02-1234-5678 | 사업자등록번호: 123-45-67890</p>
            <p style="margin-top: 20px;">© 2024 놀면뭐하老. All rights reserved.</p>
            <P>본 페이지에 게시된 이메일주소 자동수집을 거부하며, 이를 위반시 정보통신망법에 의해 처벌됨을 유념하시기 바랍니다</P>
            
        </div>
    </footer>
</html>