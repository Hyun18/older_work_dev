$(document).ready(function(){

	//게시판 버튼 클릭시 게시판 페이지로 이동
	boardButton();
	
    // 메뉴 기능
    menu();

    // 회원정보 기능
    userInfo();

    // 비밀번호 기능
    userPassword();

    // 회원 탈퇴 기능
    userWithdrawal();

    // 주소 검색 API
    addressSearch();

    // 이름 수정 기능
    updateName();   //  userName -> updateName 변경

    // 회원정보 수정 기능
    userUpdate();

    // 비밀번호 수정 기능
    updatePW();    
    
    // 회원탈퇴 기능
    delUser();

    // 로그인 상태 표시 기능
    userLoginState();

    // 로그인 버튼 클릭시 로그인 페이지로 이동
    userLogin();

    // 로그아웃 버튼 클릭시 로그아웃 처리
    userLogout();
	
	// 스크롤 버튼          12-14 추가
	scrollBtn();

	// 마이페이지에서 기본값 입사지원현황   12-14 추가
	jobApplication();
	

	// 신청 내역 출력
	userJobManagement();
});

// 게시판 버튼 클릭시 게시판 페이지로 이동
function boardButton(){
    $('#board-button').click(function(){
        location.href = './list';
    });
}

// 이름 수정 기능
function updateName(){
    
    // 이름 변경 버튼 클릭시 본인인증 표시
    $('.name-change-btn').click(function(){ 
        $('.name-change-event').show();
    });

    // 이름 변경 취소 버튼 클릭시 본인인증 숨기기
    $('#name-cancel-btn').click(function(){
        $('.name-change-event').hide();
    });

    // 이름 변경 확인 버튼 클릭시 본인인증 정보 검증 후 새 이름 입력 표시
    $('#name-change-btn').click(function(){
        var chackInfo ={
            name : $('#now-name').val(),
            birthYear: $('#birth-date').val().substring(0,4),
            birthMonth: $('#birth-date').val().substring(4,6), 
            birthDay: $('#birth-date').val().substring(6,8),
			gender: $('input:radio[name="gender"]:checked').val(),  //이 부분 수정했습니다.
			//gender : $('#gender-male').val()||$('#gender-female').val(),
            phone : $('#phone').val(),
        }

        // 본인인증 정보가 모두 입력되었는지 확인
        if(!chackInfo.name || !chackInfo.birthYear || !chackInfo.phone || !chackInfo.gender) {
            alert('모든 정보를 입력해주세요.');
            //return;
        }

        // 본인인증 정보 검증 후 새 이름 입력
        $.ajax({
            url: './api/user/IdentityVerification',
            type: 'get',
            data: chackInfo,
            success: function(response) {
                if(response) {
                    $('.name-change-event').hide();
                    $('.new-name').show();
                } else {
                    alert('본인인증에 실패했습니다. 입력하신 정보를 다시 확인해주세요.');
                }
            },
            error: function() {
                alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
				console.error('본인 인증 실패:', error); //추가했습니다
				}
        });
    });

    // 새 이름 수정 버튼 클릭시 새 이름 업데이트
    $('#new-btn').click(function(){
        var newName = $('#new-name').val();
        $.ajax({
            url: './api/user/updateName',
            type: 'POST', 
            data: {
                name: newName
            },
            success: function(response) {
                alert('이름이 변경되었습니다.');
                $('.new-name').hide();
            },
            error: function(xhr, status, error) {
                alert('이름 변경에 실패했습니다. 잠시 후 다시 시도해주세요.');
            	console.error("이름 변경 실패:", error);
			}
        });
    });
    $('#new-cancel-btn').click(function(){
        $('.new-name').hide();
    });
}

// 회원정보 수정 기능
function userUpdate(){
    $('.submit').click(function(){
        // 입력된 값들 가져오기
        var email = $('#email').val() || $('#email').attr('placeholder');
        var phone = $('#phone').val() || $('#phone').attr('placeholder');
        var address = $('#address').val() || $('#address').attr('placeholder');

        // AJAX 요청으로 서버에 데이터 전송
        $.ajax({
            url: './api/user/update',
            type: 'POST',
            data: {
                email: email,
                phone: phone, 
                address: address
            },
            success: function(response) {
                // 로그아웃 처리 후 로그인 페이지로 이동
                userLogout();
            },
            error: function(xhr, status, error) {
                alert('회원정보 수정에 실패했습니다. 잠시 후 다시 시도해주세요.');
            }
        });
    });
}

// 비밀번호 수정 기능
function  updatePW(){
    $('.pw-submit').click(function(){
                    
        var pw = $('#pw').val();        
        var newPw = $('#newPw').val();
        var newPwCheck = $('#newPwCheck').val();

        // 새 비밀번호와 확인이 일치하는지 검사
        if(newPw !== newPwCheck) {
            alert('새 비밀번호가 일치하지 않습니다.');
            return;
        }

        // 현재 비밀번호 확인
        if(!currentPwCheck(pw)) {
            return;
        }

        $.ajax({
            url: './api/user/updatePWinUserPage',
            type: 'post', 
            data: {
                pw: pw,
                newPw: newPw
            },
            success: function(response) {
				console.log(response);
                alert('비밀번호가 성공적으로 변경되었습니다.');
                // 로그아웃 처리 후 로그인 페이지로 이동
                userLogout();
            },
            error: function() {
                alert('비밀번호 변경에 실패했습니다. 잠시 후 다시 시도해주세요.');
            }
        });
    });

    // 취소 버튼 클릭시 입력값 초기화
    $('.pw-cancel').click(function(){
        $('#pw').val('');
        $('#newPw').val('');
        $('#newPwCheck').val('');
    });

}

// 현재 로그인된 회원의 비밀번호와 입력된 비밀번호 비교
function currentPwCheck(pw) {
    // isValid 변수는 참/거짓을 판단하는 논리값을 저장하는 플래그(flag) 변수
    // true로 초기화하고 비밀번호가 일치하지 않을 경우 false로 변경
    let isValid = true;
    $.ajax({
        url: './api/user/currentPwCheck', 
        type: 'get',
        data: {
            pw: pw
        },
        async: false,
        success: function(response) {
            if(response) {
				console.log("(일치)response > ", response);
            }else{
				alert('현재 비밀번호가 일치하지 않습니다.');
				isValid = false;
			}
        },
		error: function(xhr, status, error) {
		  console.error('currentPwCheck error:', error);
		}
    });
    return isValid;
}







//---- 아래 부터 수정 필요

//개인 마이페이지의 입사지원 현황(api 신청 내역) [수정 필요!!!!] (api 신청 내역 가져오기)
$(document).ready(function () {
    const DserviceKey = 'HqALeey0CnI+2ECy5mGQtbrcIy/xqqTImPIDROuuVZ0nn+GYnRfh0tm8Vu0aIT3wV6BW9Eqzt/uLRtzQr92eBw==';

    // 전체 카운트 변수
    let totalAppCount = 0; // 전체 지원 항목 수
    let totalInProgressCount = 0; // 전체 진행중 항목 수

    // API 일자리 처리
    $.ajax({
        url: './api/usersublist/getUserApplicationList',
        method: 'GET',
        success: function (data) {
            let appCount = 0; // API 일자리 항목 수
            let inProgressCount = 0; // 진행중 API 항목 수

            data.forEach(app => {
                const projNo = app.projNo; // projNo 값
                const createdDate = app.created_date || '날짜 없음';
                const usersubIdx = app.usersub_idx;
                // 외부 API 호출
                $.ajax({
                    url: `http://apis.data.go.kr/B552474/JobBsnInfoService/getJobBsnRecruitInfo`,
                    method: 'GET',
                    data: {
                        projNo: projNo,
                        ServiceKey: DserviceKey
                    },
                    success: function (xml) {
                        const json = xmlToJson(xml);
                        const app = json.response.body.item;


                        const orgName = app.orgName || '기관명 없음';
                        const content = app.content || '직무 내용 없음';
                        const workArea = app.workArea || '근무 지역 없음';
                        const intCnt = app.intCnt || '임금 정보 없음';                        
                        

                        const applicationHtml = `
                            <div class="application-card">
                                <div class="applicant-header">
                                    <h3 class="applicant-name" id="orgName">${orgName}</h3>
                                    <span class="application-date">${createdDate}</span>
                                </div>
                                <div class="applicant-details">
                                    <div>
                                        <p><i class="fas fa-briefcase"></i><span id="content">${content}</span></p>
                                        <p><i class="fas fa-map-marker-alt"></i><span id="workArea">${workArea}</span></p>
                                        <p><i class="fas fa-won-sign"></i> <span id="intCnt">${intCnt}</span></p>
                                    </div>
                                    <div>
                                        <span id="status">진행중</span>
                                    </div>
                                </div>
                                <div class="application-actions">
                                    <div class="action-buttons">
                                        <button class="view-detail" data-projNo="${projNo}">
                                            <i class="fas fa-search"></i> 
                                            상세보기
                                        </button>
                                        <button class="api-cancel-apply" data-usersub_idx="${usersubIdx}" >
                                            <i class="fas fa-times"></i> 
                                            지원취소
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `;   
                        $('#apiJobsContainer').append(applicationHtml);

                        // 카운트 업데이트
                        appCount++;
                        totalAppCount++; // 전체 지원 항목 수 증가
                        $('#totalApply').html(totalAppCount);
                    },
                    error: function (err) {
                        console.error('API 데이터 호출 오류:', err);
                    }
                });
            });

            totalInProgressCount += inProgressCount; // 진행중 수 추가
            $('#inProgress').html(totalInProgressCount); // 전체 진행중 항목 수 업데이트

            // '상세보기' 버튼 클릭 이벤트 처리 (이벤트 위임 방식)
            $(document).on('click', '.view-detail', function() {
                const projNo = $(this).attr('data-projNo')
                console.log('projNo from data():', projNo);

                if (projNo) {
                    window.location.href = `detail-work?projNo=${projNo}`;
                } else {
                    console.log("projNo is not defined");
                }
            });
        },
        error: function (err) {
            console.error('API일자리 호출 중 오류 발생:', err);
        }
    });

    // 우리일자리 처리
    $.ajax({
        url: './api/usersublist/getUserApplicationList',
        method: 'GET',
        success: function (data) {
            let appCount = 0; // 우리일자리 항목 수
            let inProgressCount = 0; // 진행중 우리일자리 항목 수

            const nullProjNoData = data.filter(app => app.projNo === null);

            nullProjNoData.forEach(app => {
                const createdDate = app.created_date || '날짜 없음';
                const detailIdx = app.detail_idx;
                const usersubIdx = app.usersub_idx;

                // OUR API 호출
                if (detailIdx) {
                    $.ajax({
                        url: './api/detail/findByDetailIdx',
                        method: 'GET',
                        data: { detail_idx: detailIdx },
                        success: function (data) {
                            console.log(data);
                            const applicationHtmlOUR = `
                                <div class="application-card">
                                    <div class="applicant-header">
                                        <h3 class="applicant-name" id="orgName">${data.orgName || '기관명 없음'}</h3>
                                        <span class="application-date">${createdDate || '날짜 없음'}</span>
                                    </div>
                                    <div class="applicant-details">
                                        <div>
                                            <p><i class="fas fa-briefcase"></i><span id="content">${data.content || '직무 내용 없음'}</span></p>
                                            <p><i class="fas fa-map-marker-alt"></i><span id="workArea">${data.workArea || '근무 지역 없음'}</span></p>
                                            <p><i class="fas fa-won-sign"></i> <span id="intCnt">${data.intCnt || '임금 정보 없음'}</span></p>
                                        </div>
                                        <div>
                                            <span id="status">진행중</span>
                                        </div>
                                    </div>
                                    <div class="application-actions">
                                        <div class="action-buttons">
                                            <button class="our-view-detail" data-detail_idx="${detailIdx}">
                                                <i class="fas fa-search"></i> 상세보기
                                            </button>
                                            <button class="our-cancel-apply" data-usersub_idx="${usersubIdx}">
                                                <i class="fas fa-times"></i> 지원취소
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `;
                            $('#ourJobsContainer').append(applicationHtmlOUR);

                            // 카운트 업데이트
                            appCount++;
                            totalAppCount++; // 전체 지원 항목 수 증가
                            $('#totalApply').html(totalAppCount);

                            // '상세보기' 버튼 클릭 이벤트 처리 (이벤트 위임 방식)
                            $(document).on('click', '.our-view-detail', function() {
                                const detailIdx = $(this).attr('data-detail_idx')
                                console.log('detail_idx from data():', detailIdx);

                                if (detailIdx) {
                                    window.location.href = `old-detail-work?detail_idx=${detailIdx}`;
                                } else {
                                    console.log("detail_idx is not defined");
                                }
                            });

                            
                        },
                        error: function (err) {
                            console.error('OUR 데이터 호출 오류:', err);
                        }
                    });
                }
            });

            totalInProgressCount += inProgressCount; // 진행중 수 추가
            $('#inProgress').html(totalInProgressCount); // 전체 진행중 항목 수 업데이트
            
        },
        error: function (err) {
            console.error('우리일자리 호출 중 오류 발생:', err);
        }
    });
});



// 우리지원 취소
$(document).ready(function() {
    $(document).on('click', '.our-cancel-apply','.api-cancel-apply', function (event) {
        // 클릭된 버튼에서 `usersub_idx` 추출
        const detailIdx = $(event.target).closest('.our-cancel-apply').attr('data-usersub_idx');
        

            // POST 요청으로 취소 API 호출
            $.ajax({
                url: './api/usersublist/cancelApplication',
                method: 'POST',
                data: {
                    usersub_idx: detailIdx
                },
                success: function (response) {
                    if(!confirm('지원취소 하시겠습니까?')){
                        return 
                    }
                    alert('지원취소 되었습니다.');
                    
                    location.reload();
                },
                error: function (err) {
                    console.error(`취소 실패: usersub_idx = ${detailIdx}`, err);

                }
            });
        });
            
});



// api지원 취소
$(document).ready(function() {
    $(document).on('click', '.api-cancel-apply', function (event) {
        // 클릭된 버튼에서 `usersub_idx` 추출
        const api = $(event.target).closest('.api-cancel-apply').attr('data-usersub_idx');

            // POST 요청으로 취소 API 호출
            $.ajax({
                url: './api/usersublist/cancelApplication',
                method: 'POST',
                data: {
                    usersub_idx: api
                },
                success: function (response) {
                    if(!confirm('지원취소 하시겠습니까?')){
                        return 
                    }
                    alert('지원취소 되었습니다.');                    
                    location.reload();
                },
                error: function (err) {
                    console.error(`취소 실패: usersub_idx = ${api}`, err);

                }
            });
        });
            
});

   







//회원탈퇴 기능
function delUser(){
    $('.btn-withdraw').click(function(){
        if(!confirm('정말 탈퇴하시겠습니까?')) {
            return;
        }

        $.ajax({
            url: './api/user/delUser',
            type: 'POST',
            success: function(response) {
                alert('그동안 이용해주셔서 감사합니다. 다음에 또 만나요.');
                window.location.href = './';
            },
            error: function() {
                alert('회원 탈퇴에 실패했습니다. 잠시 후 다시 시도해주세요.');
            }
        });
    });
}



//상세 보기 누르시 detail-work 이동
$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const projNo = urlParams.get('projNo');
    console.log('projNo:', projNo);

    if (projNo) {
        const serviceKey = 'HqALeey0CnI%2B2ECy5mGQtbrcIy%2FxqqTImPIDROuuVZ0nn%2BGYnRfh0tm8Vu0aIT3wV6BW9Eqzt%2FuLRtzQr92eBw%3D%3D';
        const url = `http://apis.data.go.kr/B552474/JobBsnInfoService/getJobBsnRecruitInfo?projNo=${projNo}&ServiceKey=${serviceKey}`;

        $.ajax({
            url: url,
            type: 'get',
            dataType: 'xml',
            success: function(xml) {                
                // XML을 JSON으로 변환
                var json = xmlToJson(xml);
                console.log('json:', json);
                
                // JSON 데이터에서 실제 item을 추출
                var items = json.response.body.item;

                // item이 배열 형태일 수도, 객체일 수도 있으므로 확인
                if (Array.isArray(items)) {
                    // 여러 개의 item이 있을 때
                    items.forEach(item => {
                        setDataToHTML(item);
                    });
                } else {
                    // 단일 item일 때
                    setDataToHTML(items);
                }
            },
            error: function(xhr, status, error) {
                console.error('API 호출 오류:', error);
            }
        });
    }
});

function setDataToHTML(data) {
    
    console.log('Setting data to HTML:', data);
    
    $('#orgName').text(data.orgName);       // 운영 기관명
    $('#content').text(data.content);       // 직무 내용
    $('#workArea2').text(data.workArea);    // 근무 지역
    $('#content2').text(data.content);      // 직무 내용 (중복)
    $('#intCnt2').text(data.intCnt);        // 모집 인원 
    $('#projTime2').text(data.projTime);    // 근무 시간 
    $('#pay2').text(data.pay);              // 임금 정보 
    $('#orgName2').text(data.orgName);      // 운영 기관명  (중복)
    $('#telNum').text(data.telNum);         // 문의 전화번호
    $('#workPlace2').text(data.workPlace);  // 근무지 
    $('#recuAgeNm2').text(data.recuAgeNm);  // 모집 연령 
    $('#addr2').text(data.addr);            // 주소 
    $('#license2').text(data.license);      // 자격증 요건 
    $('#operPlan2').text(data.operPlan);    // 운영 계획
    $('#education2').text(data.education);  // 교육 정보
    $('#projDate2').text(data.projDate);    // 사업 기간


    // 날짜 형식 변환 (예시)
    let projDateStr = data.projDate;
    if (projDateStr) {
        let startDate = projDateStr.substring(0, 8);
        let endDate = projDateStr.substring(11);

        startDate = startDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
        endDate = endDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');

        $('#startDate').text(startDate);
        $('#endData2').text(endDate);
        $('#states').text(getDate(startDate, endDate));
        console.log(getDate(startDate, endDate));
    }
}

function formatDate(dateStr) {
    return dateStr.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3').trim();
}



function getDate(startDate, endDate) {
    // 간단한 날짜 상태 예시
    return "진행중";  // 예시로 "진행중" 상태를 반환
}


//xml을 json으로 변환하는 함수
function xmlToJson(xml) {
    // 반환할 객체 생성
    var obj = {};
  
    if (xml.nodeType == 1) {
      // 요소 노드
      // 속성 처리
      if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType == 3) {
      // 텍스트 노드
      obj = xml.nodeValue;
    }
  
    // 자식 노드 처리
    // 모든 텍스트 노드 내부에 있는 경우 텍스트를 연결하여 가져옵니다.
    var textNodes = [].slice.call(xml.childNodes).filter(function(node) {
      return node.nodeType === 3;
    });
    if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
      obj = [].slice.call(xml.childNodes).reduce(function(text, node) {
        return text + node.nodeValue;
      }, "");
    } else if (xml.hasChildNodes()) {
      for (var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof obj[nodeName] == "undefined") {
          obj[nodeName] = xmlToJson(item);
        } else {
          if (typeof obj[nodeName].push == "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(xmlToJson(item));
        }
      }
    }
    return obj;
  }

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // 주소 검색 API
  function addressSearch(){
      $('.address-search-btn').click(function() {
          new daum.Postcode({
              oncomplete: function(data) {
              $('#address').val(data.address);
          }
      }).open();
      });
  }


  // 메뉴 기능
  function menu() {
  // 초기에 모든 item-list 숨기기
  $('.item-list').hide();

  // item-title-text 클릭 이벤트
  $('.item-title-text').click(function() {
      // 현재 클릭된 item-title-text의 부모인 item-title 찾기
      let title = $(this).closest('.item-title');
      
      // 현재 item-title의 item-list 토글
      title.find('.item-list').slideToggle();
      
      // 다른 모든 item-title의 item-list 숨기기
      $('.item-title').not(title).find('.item-list').slideUp();
  });

  // item-list 클릭 시 이벤트 전파 중지
  $('.item-list').click(function(e) {
          e.stopPropagation(); // 상위 엘리먼트들로의 이벤트 전파를 중단
      });

  }

  // 회원정보 관련 기능들
  function userInfo() {
      // 회원정보 폼 숨기기/보이기 처리
      $('.content-user-info').hide();
      $('#userInfo').click(() => $('.content-user-info').show());
      $('.item-list-item').not('#userInfo').click(() => $('.content-user-info').hide());
  }

  // 비밀번호 변경 기능
  function userPassword() {
      // 비밀번호 변경 폼 숨기기/보이기 처리
      $('.content-user-pw').hide();
      $('#userPassword').click(() => $('.content-user-pw').show());
      $('.item-list-item').not('#userPassword').click(() => $('.content-user-pw').hide());
  }

  // 회원탈퇴 기능 
  function userWithdrawal() {
      // 회원탈퇴 폼 숨기기/보이기 처리
      $('.withdrawal-container').hide();
      $('#userWithdrawal').click(() => $('.withdrawal-container').show());
      $('.item-list-item').not('#userWithdrawal').click(() => $('.withdrawal-container').hide());
  }

  // 신청 내역 기능
  function userApply() {
      // 신청 내역 폼 숨기기/보이기 처리
      $('.content-user-apply').show();
      $('#userApply').click(() => $('.content-user-apply').show());
      $('.item-list-item').not('#userApply').click(() => $('.content-user-apply').hide());
  }

// 입사지원현황 
function jobApplication() {
    // 기본적으로 job-management-container는 숨기기
    $('.job-management-container').hide();

    // user-page에 있을 때는 job-management-container를 보이게 설정
    if (window.location.href.includes('user-page')) {
        $('#application').show();
        $('.job-management-container').show(); // 'user-page' 페이지에 있을 때는 보이도록 설정
    }

    // jobApplication 버튼 클릭 시 job-management-container를 보이게/숨기기
    $('#jobApplication').click(() => {
        $('.job-management-container').show(); 
    });

    // 다른 항목 클릭 시 job-management-container를 숨기기
    $('.item-list-item').not('#jobApplication').click(() => {
        $('.job-management-container').hide(); // 다른 항목 클릭 시 숨기기
    });
}




// 로그인 상태 표시
function userLoginState() {
    // AJAX로 로그인 상태 확인
    $.ajax({
        url: './api/user/checkUserLogin',
        type: 'get',
        success: function(response) {
            console.log(response);
            if(response) {
                // 로그인 상태면 로그아웃 버튼 표시
                $('#user-login').hide();
                $('#user-logout').show();
            } else {
                // 비로그인 상태면 로그인 버튼 표시
                $('#user-login').show(); 
                $('#user-logout').hide();
                
                alert('로그인을 하신후에 이용가능합니다.');
                window.location.href = './';
            }
        },
        error: function() {
            console.log('로그인 상태 확인 실패');
        }
    });
}

//로그인 버튼 클릭시 로그인 페이지로 이동
function userLogin() {
    $('#user-login').click(function(){
        if(!confirm('로그인페이지로 이동합니다.')) 
            return;
        window.location.href = './';
    });
}

//로그아웃 버튼 클릭시 로그아웃 처리
function userLogout() { 
    $('#user-logout').click(function(){
        $.ajax({
            url: './api/user/logout',
        type: 'POST',
        success: function() {
            if(!confirm('로그아웃 하시겠습니까?')) 
                return;
            window.location.href = './';
            }
        });
    });
}

// 페이지 위로 올라가기
function scrollBtn(){
    var scrollToTopBtn = document.getElementById("scrollToTopBtn");
    var contentElement = document.querySelector('.content');

    function scrollFunction() {
        if (window.scrollY > 100 || contentElement.scrollTop > 20) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        contentElement.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    window.addEventListener('scroll', scrollFunction);
    contentElement.addEventListener('scroll', scrollFunction);
    scrollToTopBtn.addEventListener('click', scrollToTop);
}


// 페이지 위로 올라가기
function scrollBtn(){
    var scrollToTopBtn = document.getElementById("scrollToTopBtn");
    var contentElement = document.querySelector('.content');

    function scrollFunction() {
        if (window.scrollY > 100 || contentElement.scrollTop > 20) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        contentElement.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    window.addEventListener('scroll', scrollFunction);
    contentElement.addEventListener('scroll', scrollFunction);
    scrollToTopBtn.addEventListener('click', scrollToTop);
}

// 일자리 탭
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
});