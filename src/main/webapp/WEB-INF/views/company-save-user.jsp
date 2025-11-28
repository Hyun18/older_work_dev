
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta >
    <title>기업 회원가입</title>
    
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

     <link rel="stylesheet" href="./css/company-save-user.css"/>

    <script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
    <script src="./js/company-save-user.js"></script>
    <script src="./js/gov-data.js"></script>
</head>
<body>
<jsp:include page="./include/header.jsp"/>
    <div class="form-container">
       
        <h1>기업회원관리 등록</h1>
        <div class="signup-form">
            <div class="form-group">
                <label for="code">사업자 등록조회 <span>*</span></label>
                <input style="width: 85%; margin-top: 5px;" type="text" id="code" name="code" placeholder="사업자등록번호(10자리 이상)">
                <input style="width: 85%; margin-top: 5px;" type="text" id="start_dt" name="start_dt" placeholder="시작시기">
                <input style="width: 85%; margin-top: 5px;" type="text" id="p_nm" name="p_nm" placeholder="대표자명">
                <button id="code-btn" type="button" class="btn">등록조회</button>
            </div>

            <div class="form-group">
                <label for="address">기업 주소 <span>*</span></label>
                <input style="width: 85%;" type="text" id="address" name="address">
                <button type="button" id="address-btn" class="btn">주소검색</button>
                
            </div>

            <div class="form-group">
                <label for="name">회사명 <span>*</span></label>
                <input style="width: 95%;"type="text" id="name" name="name" required>
            </div>


            <div class="form-group">
                <label for="type">업종 <span>*</span></label>
                <input style="width: 95%;"type="text" id="type" name="industry" required>
            </div>

            <div class="form-group">
                <label for="tel">회사 전화번호 <span>*</span></label>
                <input  style="width: 95%;"type="text" id="tel" name="tel">
            </div>

            <div class="form-group">
                <label for="employees">전체 직원수 <span>*</span></label>
                <input style="width: 95%;"type="text" id="employees" name="employees">
            </div>

            <div class="form-group">
                <label for="insurance">4대보험 가입여부 <span>*</span></label>
                <div style="display: flex; align-items: center;">
                    <input type="radio" id="insurance" name="insurance" value="가입" checked>
                    <label for="insurance-yes">가입</label>
                    <input type="radio" id="insurance" name="insurance" value="미가입">
                    <label for="insurance-no">미가입</label>
                </div>
            </div>

           

            <div class="form-group">
                <label for="fax">팩스 번호 <span>*</span></label>
                <input style="width: 95%;" type="text" id="fax" name="fax">
            </div>

            <div class="form-group">
                <label for="zone">행정 구역 <span>*</span></label>
                <select style="width: 98%;" id="zone" name="area" required>
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

            <div class="form-container2">
                <h1>담당자 등록</h1>
                <div class="form-group">
                    <label for="m_name">담당자명 <span>*</span></label>
                    <input style="width: 95%;" type="text" id="m_name" name="applicant-name" required>
                </div>

                <div class="form-group">
                    <label for="m_id">담당자 아이디 <span>*</span></label>
                    <input style="width: 85%;" type="text" id="m_id" name="applicant-id" required>
                    <button id="id-check-btn" type="button" class="btn">중복확인</button>
                </div>

                <div class="form-group">
                    <label for="m_pw">비밀번호 <span>*</span></label>
                    <input style="width: 95%;" type="password" id="m_pw" name="password" required>
                </div>
                <div id="pw-message"></div>

                <div class="form-group">
                    <label for="m_pw_check">비밀번호 확인 <span>*</span></label>
                    <input style="width: 95%;" type="password" id="m_pw_check" name="confirm-password" required>
                </div>
                <div id="pw-check-message"></div>

                <div class="form-group">
                    <label for="m_tel">담당자 연락처 <span>*</span></label>
                    <input style="width: 95%;" type="text" id="m_tel" name="applicant-phone" required>
                </div>

                <div class="form-group">
                    <label for="m_email">담당자 이메일 <span>*</span></label>
                    <input style="width: 95%;" type="email" id="m_email" name="applicant-email" required>
                </div>

                <div class="form-group">
                    <label for="m_part">담당자 부서 <span>*</span></label>
                    <input style="width: 95%;"type="text" id="m_part" name="department" required>
                </div>
            </div>

            <button id="submit-btn" type="submit" class="submit-btn">승인 요청</button>
        </div>
    </div>
    
    <jsp:include page="./include/footer.jsp"/>
</body>
</html>

