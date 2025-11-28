<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>회원가입</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

     <link rel="stylesheet" href="./css/mid_save-user.css"/>
    <script src="./js/home.js"></script>
</head>
<body>
    <div class="container">
        <h1>개인회원 또는 기업회원을 선택해 주세요.</h1>
        <div class="card-container">
            <!-- 개인회원 카드 -->
            <div class="card">
                <div class="icon">
                    <i class="fa-solid fa-building"></i>
                    <!-- <img src="user-icon.png" alt="개인회원 아이콘"> -->
                </div>
                <p class="title">개인회원</p>
                <button id="personal-btn" class="btn">가입하기</button>
            </div>
            <!-- 기업회원 카드 -->
            <div class="card">
                <div class="icon">
                    <i class="fa-solid fa-user"></i>
                    <!-- <img src="company-icon.png" alt="기업회원 아이콘"> -->
                </div>
                <p class="title">기업회원</p>
                <button id="company-btn" class="btn">가입하기</button>
            </div>
        </div>
    </div>

</body>
</html>



	
