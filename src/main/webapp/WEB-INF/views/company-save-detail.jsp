
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta >
    <title>기업 구인업로드</title>
    
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

     <link rel="stylesheet" href="./css/company-save-user.css"/>

    <script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
    <script src="./js/company-save-detail.js"></script>
    
    <style>
    .signup-form{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    
    }
   
    </style>
    
    
</head>
<body>
<jsp:include page="./include/header.jsp"/>
    <div class="form-container">
       
        <h1>기업회원 구인정보 등록</h1>
        <div class="signup-form">
        
        	 <div class="form-group">
                <label for="dstrCd2Nm">행정 구역 <span>*</span></label>
                <select id="dstrCd2Nm" name="area" required>
                    <option value="dstrCd2Nm">행정 구역을 선택하세요</option>
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

            <!-- 임금 -->
            <div class="form-group">
                <label for="intCnt">임금<span>*</span></label>
                <input type="text" id="intCnt" name="intCnt" placeholder="예: 3000000" required>
            </div>

            <!-- 성별 -->
            <div class="form-group">
                <label for="gender">성별</label>
                <select id="gender" name="gender">
                    <option value="">선택하세요</option>
                    <option value="남성">남성</option>
                    <option value="여성">여성</option>
                    <option value="무관">무관</option>
                </select>
            </div>

            <!-- 구인 유형 -->
            <div class="form-group">
                <label for="jobType">구인 유형<span>*</span></label>
                <input type="text" id="jobType" name="jobType" placeholder="예: 인턴형">
            </div>

            <!-- 운영 기관명 -->
            <div class="form-group">
                <label for="orgName">운영 기관명<span>*</span></label>
                <input type="text" id="orgName" name="orgName" required>
            </div>

             <!-- 구인 형태 상태명 -->
            <div class="form-group">
                <label for="trnStatNm">구인 형태</label>
                <select id="trnStatNm" name="trnStatNm">
                    <option value="">선택하세요</option>
                    <option value="모집중">모집중</option>
                    <option value="마감">마감</option>
                </select>
            </div>


            <!-- 모집 인원 -->
            <div class="form-group">
                <label for="hpInvtCnt">모집 인원<span>*</span></label>
                <input type="text" id="hpInvtCnt" name="hpInvtCnt" placeholder="예: 인턴형 1명, 연수형 0명">
            </div>

            <!-- 공고 기간 -->
            <div class="form-group">
                <label for="hpNotiSdate">공고 시작일<span>*</span></label>
                <input type="text" id="hpNotiSdate" name="hpNotiSdate" placeholder="날짜를 숫자로만 입력하세요. (예:20250101)">
            </div>
            <div class="form-group">
                <label for="hpNotiEdate">공고 종료일<span>*</span></label>
                <input type="text" id="hpNotiEdate" name="hpNotiEdate" placeholder="날짜를 숫자로만 입력하세요. (예:20250101)">
            </div>

            <!-- 주소 -->
            <div class="form-group">
                <label for="addr">주소<span>*</span></label>
                <input type="text" id="addr" name="addr" placeholder="예: 부산광역시 XX구 XX로">
            </div>

            <!-- 정렬 기준 -->
            <div class="form-group">
                <label for="arrange">부서배치<span>*</span></label>
                <input type="text" id="arrange" name="arrange" placeholder="예: 관리팀">
            </div>

            <!-- 상세 내용 -->
            <div class="form-group">
                <label for="content">상세 내용<span>*</span></label>
                <textarea id="content" name="content" rows="4"></textarea>
            </div>

            <!-- 학력 요구사항 -->
            <div class="form-group">
                <label for="education">직무교육</label>
                <input type="text" id="education" name="education" placeholder="예: 자체안전교육 필수">
            </div>

            <!-- 프로젝트 날짜 -->
            <div class="form-group">
                <label for="projDate">인턴(연수기간)</label>
                <input type="text" id="projDate" name="projDate" placeholder="20250101~20250110">
            </div>

            <!-- 채용 인원 -->
            <div class="form-group">
                <label for="hireCnt">고용예정인원<span>*</span></label>
                <input type="number" id="hireCnt" name="hireCnt" placeholder="1">
            </div>

            <!-- 필요 자격증 -->
            <div class="form-group">
                <label for="license">필요 자격증</label>
                <input type="text" id="license" name="license" placeholder="예: 운전면허증">
            </div>

            <!-- 운영 계획 -->
            <div class="form-group">
                <label for="operPlan">근무조건</label>
                <textarea id="operPlan" name="operPlan" rows="4"></textarea>
            </div>

            <!-- 프로젝트 구인 유형 -->
            <div class="form-group">
                <label for="projRecuJtype">모집분야<span>*</span></label>
                <input type="text" id="projRecuJtype" name="projRecuJtype" placeholder="시설관리 및 감시원">
            </div>

            <!-- 프로젝트 시간 -->
            <div class="form-group">
                <label for="projTime">근무(활동)시간<span>*</span></label>
                <input type="text" id="projTime" name="projTime" placeholder="예: 주30시간 , 9:00~17:00">
            </div>

            <!-- 모집 연령대 -->
            <div class="form-group">
                <label for="recuAgeNm">모집 연령대<span>*</span></label>
                <input type="text" id="recuAgeNm" name="recuAgeNm" placeholder="예: 60대">
            </div>

            <!-- 연락처 -->
            <div class="form-group">
                <label for="telNum">연락처<span>*</span></label>
                <input type="tel" id="telNum" name="telNum" placeholder="예: 010-1234-5678">
            </div>

            <!-- 근무 지역 -->
            <div class="form-group">
                <label for="workArea">근무 지역<span>*</span></label>
                <input type="text" id="workArea" name="workArea" placeholder="예: 부산 동래구 ㅇㅇ어린이집">
            </div>

            <!-- 근무지 -->
            <div class="form-group">
                <label for="workPlace">사업장명<span>*</span></label>
                <input type="text" id="workPlace" name="workPlace" placeholder="예: ㅇㅇ어린이집">
            </div>

            <!-- 기타 사항 -->
            <div class="form-group">
                <label for="etc">기타 사항</label>
                <textarea id="etc" name="etc" rows="4"></textarea>
            </div>


            <button id="submit-btn" type="submit" class="submit-btn">승인 요청</button>
        </div>
    </div>
    
    <jsp:include page="./include/footer.jsp"/>
</body>
</html>

