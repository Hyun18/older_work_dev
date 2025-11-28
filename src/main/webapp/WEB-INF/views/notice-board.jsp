<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> 
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">


<title>구인공고 관리</title>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/twbs-pagination/1.4.2/jquery.twbsPagination.min.js"></script>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twbs-pagination/1.4.2/twbsPagination.min.css" />


    <link rel="stylesheet" href="./css/notice.css"/>
    <script src="./js/list.js"></script>    
     
</head>


<body>
    <div class="container">
        <div class="header">입사지원 현황</div>

        <div class="tabs">
            <div class="tab active">전체 <span>(1)</span></div>
            <div class="tab">지원서 작성중 <span>(0)</span></div>
        </div>

        <div class="status-summary">
            <div class="status-card">
                지원완료<br><span>0</span>
            </div>
            <div class="status-card">
                진행 진행중<br><span>0</span>
            </div>
            <div class="status-card">
                최종발표<br><span>0</span>
            </div>
        </div>

        <div class="application-list">
            <div class="application">
                <div class="application-info">
                    <h4>조은공업(주)</h4>
                    <p>생산관리/금형관리 정규직 모집</p>
                    <p>2024.12.12 10:47</p>
                </div>
                <div class="application-status">지원취소완료</div>
            </div>
        </div>

        <div class="filters">
            <select>
                <option>지난 1개월</option>
                <option>지난 3개월</option>
                <option>지난 6개월</option>
            </select>
            <select>
                <option>열람여부 전체</option>
                <option>열람완료</option>
                <option>미열람</option>
            </select>
            <select>
                <option>마감여부 전체</option>
                <option>마감</option>
                <option>미마감</option>
            </select>
            <input type="text" placeholder="키워드 입력">
        </div>
    </div>
    
    
    
    

</body>
</html>