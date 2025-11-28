$(document).ready(function () {
    // URL에서 detail_idx 추출
    const urlParams = new URLSearchParams(window.location.search);
    const detail_idx = urlParams.get('detail_idx'); // detail_idx 값 가져오기
		
    if (!detail_idx || isNaN(detail_idx)) {
        console.error('detail_idx가 유효하지 않습니다:', detail_idx);
        alert('잘못된 접근입니다.');
        return;
    } else { console.log('추출된 detail_idx:', detail_idx);
	
	}

    console.log('detail_idx:', detail_idx);

    // 상세 데이터 가져오기
    detailWork(detail_idx);
	
	submitBtn(detail_idx);
	listBtn();
    
      
});

function detailWork(detail_idx) {
    console.log('AJAX 요청을 보낼 detail_idx:', detail_idx);

    $.ajax({
        url: `./api/detail/findByDetailIdx?detail_idx=${detail_idx}`, // detail_idx를 URL 파라미터로 전달
        type: 'GET',
        success: function (response) {
            console.log('서버 응답:', response);
            displayDetail(response); // response를 사용하여 상세 데이터를 표시
        },
        error: function (xhr) {
            console.error(`상태 코드: ${xhr.status}, 응답 메시지: ${xhr.responseText}`);
            alert('데이터를 가져오는 중 오류가 발생했습니다.');
        }
    });
}

function displayDetail(detail) {
    const boardContainer = $('.detail-main');

    const card = `
        <div class="inner">
            <div class="d-header">
                <div class="dh-inner">
                    <div class="dh-left">
                        <div class="l-top">
                            <span id="orgName">${detail.orgName}</span>
                        </div>
                        <div class="l-bottem">
                            <span id="content">${detail.content}</span>
                            <span id="states">${detail.trnStatNm}</span>
                        </div>
                    </div>
                    <div class="dh-right">
                        <span id="startDate">${detail.hpNotiSdate}</span>
                        <span id="projDate">${detail.projDate}</span>
                    </div>
                </div>
            </div>
            <div class="d-content">
                <div class="d-inner">
                    <div class="d-left">구인사항</div>
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
                            <span id="workArea2">${detail.workArea}</span>
                            <span id="content2">${detail.content}</span>
                            <span id="license2">${detail.license}</span>
                            <span id="operPlan2">${detail.operPlan}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-content">
                <div class="d-inner">
                    <div class="d-left">근로조건</div>
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
                            <span id="recuAgeNm2">${detail.recuAgeNm}</span>
                            <span id="intCnt2">${detail.intCnt}</span>
                            <span id="projTime2">${detail.projTime}</span>
                            <span id="pay2">${detail.intCnt}</span>
                            <span id="education2">${detail.education}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-content">
                <div class="d-inner">
                    <div class="d-left">전형사항</div>
                    <div class="d-center">
                        <div>
                            <span id="endData1">• 마감일자</span>
                            <span id="orgName1">• 구인담당자</span>
                            <span id="addr1">• 주소</span>
                        </div>
                    </div>
                    <div class="d-right">
                        <div>
                            <span id="endData2">${detail.hpNotiEdate}</span>
                            <div style="display: flex;">
                                <span id="orgName2" style="margin-right: 10px;">${detail.orgName}</span> | 연락처: <span id="telNum" style="margin-left: 5px;">${detail.telNum}</span>
                            </div>
                            <span id="addr2">${detail.addr}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div id="btn">
                <input type="button" id="submit-btn" value="접수">
                <input type="button" id="list-btn" value="목록">
            </div>
        </div>
    `;
    boardContainer.append(card);
}

// 제출 버튼 클릭 이벤트
function submitBtn(detail_idx) {
    $(document).off('click').on('click', '#submit-btn', function() {
        submitWork(detail_idx);
    });
}

// 목록 버튼 클릭
function listBtn() {
    $(document).on('click', '#list-btn', function() {
        location.href = './our-work';
    });
}

// 접수 처리 함수
function submitWork(detail_idx) {

    $.ajax({
        url: './api/usersublist/subListSave',
        type: 'post',
        data: {
			detail_idx: detail_idx,
        },
        success: function (response) {
			if (response.message === "중복 신청입니다.") {
			  alert('중복 신청입니다.');
			  return; 
			}
			if (response.message === "로그인이 필요한 서비스입니다.") {
			  alert('로그인이 필요한 서비스입니다.');
			  location.href = './';
			  return;
			}
			if (response.message === "접수가 완료되었습니다.") {
				alert('접수가 완료되었습니다.');  
                alert('접수하신정보는 개인페이지에서 확인가능합니다.');
                location.href = './';
				return;
			}
        },
        error: function (xhr, status, error) {
            console.error('접수 중')
		}
	}
)}