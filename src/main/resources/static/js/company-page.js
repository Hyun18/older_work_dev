$(document).ready(function(){

    //게시판 버튼 클릭시 게시판 페이지로 이동
    boardButton();

    // 메뉴 기능
    menu();

    // 기업정보 관련 기능들
    corpInfo();

    // 담당자 정보 변경 기능
    corpManagerInfo();

    // 회원 탈퇴 기능
    corpWithdrawal();

    // 주소 검색 API
    addressSearch();

    // 로그인 상태 표시 기능
    corpLoginState();

    // 로그인 버튼 클릭시 로그인 페이지로 이동
    corpLogin();

    // 로그아웃 버튼 클릭시 로그아웃 처리
    corpLogout();

    // 구인공고 등록 버튼
    companyPage();

    // 스크롤 버튼
    scrollBtn();

    // 구인공고 관리 기능
    jobManage()

    // 지원자 관리 기능
    appManage();

});

// 게시판 버튼 클릭시 게시판 페이지로 이동
function boardButton(){
    $('#board-button').click(function(){
        location.href = './list';
    });
}

// 담당자 정보 변경 기능
function corpManagerInfo(){
    var check = {        
        current_pw : $('#current_pw').val(),
        m_name : $('#m_name').val() || '',
        m_tel : $('#m_tel').val() || '',
        m_email : $('#m_email').val() || '',
        m_part : $('#m_part').val() || '',
        m_pw : $('#m_pw').val() || '',
        m_pwCheck : $('#m_pwCheck').val() || ''
    }
    $.ajax({
        url: './api/corporation/update',
        type: 'POST',
        data: check,
        success: function(response) {
            if(!response) {
                alert('담당자 정보 변경에 실패했습니다.');
            } else {
                alert('담당자 정보가 변경되었습니다.');
            }
        }
    });
}

// 탈퇴 기능
function corpWithdrawal(){
    // 로그인 상태 확인
    $.ajax({
        url: './api/corporation/checkCorporationLogin',
        type: 'GET',
        success: function(response) {
            if(response) {
                // 로그인 상태면 회원 탈퇴 처리
                $.ajax({
                    url: './api/corporation/delCorporation',
                    type: 'delete',
                    success: function(response) {
                        if(response) {
                            alert('탈퇴가 완료되었습니다.');
                            location.href = './';
                        } else {
                            alert('탈퇴 처리에 실패했습니다.');
                        }
                    },
                    error: function() {
                        alert('서버 오류가 발생했습니다.');
                    }
                });
            } else {
                alert('로그인이 필요합니다.');
                location.href = './';
            }
        }
    });
}

//구인 공고 등록 버튼 눌리시 "company-page" 이동  

function companyPage() {
    $('#work-btn').click(function(){
        location.href = "./company-save-detail"
    });
}


// 지원자 상태별 카운트 업데이트
function updateApplicationCounts(applications) {
    //전체 지원자 상태
    const totalCount = applications.length;    
    //서류 검토중 상태
    const pendingCount = applications.filter(app => app.status === 'pending').length; //filter : 원하는 조건에 맞는 요소 필터
    //채용 완료 상태
    const hiredCount = applications.filter(app => app.status === 'hired').length;
    
    //전체 지원자 상태 표시
    $('#totalCount').text(totalCount);
     //서류 검토중 상태 표시
    $('#pendingCount').text(pendingCount);
    //채용 완료 상태 표시
    $('#hiredCount').text(hiredCount);
}

// // 지원자 상태 변경 처리 
// function updateApplicationStatus(selectElement) {
//     //지원자 id
//     const applicationId = $(selectElement).closest('.application-card').data('id');

//     const newStatus = $(selectElement).val();
    
//     $.ajax({
//         url: './api/user/updateStatus',
//         type: 'POST',
//         data: {
//             applicationId: applicationId,
//             status: newStatus
//         },
//         success: function(response) {
//             if(response.success) {
//                 applicant(); // 목록 새로고침
//             } else {
//                 alert('상태 변경에 실패했습니다.');
//             }
//         }
//     });
// }

// 전체 지원자 확인
$(document).ready(function(){
    $.ajax({
        url: './api/corporation/currentUserIdx',
        type: 'get',       
        success: function(c_idx) {
            console.log('로그인 c_idx',c_idx);
            
            if(c_idx){
                const url = `./api/usersublist/CorporationList/${c_idx}`;
                $.ajax ({
                    url: url,
                    type: 'get',      
                    success: function(applications) {

                        console.log('aa',applications)
                        const applicationList = $('#applicationsContainer');
                        applicationList.empty();            
                        
                        
                       totalCount = 0;
                        
                        // 각 지원자 정보 표시
                        applications.forEach(app => {
                            console.log('app',app)
                            var birth_day = app.birth_day;
                            var birth_month = app.birth_month;
                            var birth_year = app.birth_year;

                             // 현재 날짜 구하기
                            const currentDate = new Date();

                            // 생일 설정 
                            const birthDate = new Date(birth_year, birth_month, birth_day); // 월은 0부터 시작하므로 5월은 4

                            // 나이 계산
                            let age = currentDate.getFullYear() - birthDate.getFullYear();
                            const monthDiff = currentDate.getMonth() - birthDate.getMonth();

                            if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
                                age--;
                            };

                            const applicationHtml = `
                                <div class="application-card" data-status="${app.status}">
                                    <div class="applicant-info">
                                        <div class="applicant-header">
                                            <h3 class="applicant-name">${app.name} (
                                            <span class="application-orgName">${app.orgName}</span>
                                            )</h3>
                                            <span class="application-date">${app.created_date}</span>
                                        </div>
                                        <div class="applicant-details">
                                            <p><i class="fa-solid fa-cake-candles"></i> 나이: ${age}세</p>
                                            <p><i class="fas fa-phone"></i> 연락처: ${app.phone}</p>
                                            <p><i class="fas fa-envelope"></i> 이메일: ${app.email}</p>
                                        </div>
                                        <div class="applicant-resume">
                                            <a href="#" class="resume-link">이력서 보기</a>
                                        </div>
                                    </div>
                                    <div class="application-actions">
                                        <select class="status-select" onchange="updateApplicationStatus(this)">
                                            <option value="pending" ${app.status === 'pending' ? 'selected' : ''}>서류 검토중</option>
                                            <option value="interview" ${app.status === 'interview' ? 'selected' : ''}>면접 예정</option>
                                            <option value="accepted" ${app.status === 'accepted' ? 'selected' : ''}>최종합격</option>
                                            <option value="rejected" ${app.status === 'rejected' ? 'selected' : ''}>불합격</option>
                                        </select>
                                        <div class="action-buttons">
                                            <button class="contact-btn"><i class="fa-solid fa-envelope"></i> 문자 보내기</button>
                                            <button class="schedule-btn"><i class="fas fa-calendar"></i> 면접 일정</button>
                                        </div>
                                    </div>
                                </div>
                            `;
                            applicationList.append(applicationHtml);

                            totalCount++;
                            $('#totalCount').html(totalCount);
                        });
            
                        //지원자 리스트를 받아 상태별로 카운터
                        updateApplicationCounts(applications);
                        $('#totalCount').html(totalCount);
                    },
                    error: function(error) {
                        console.error('지원자 목록을 불러오는데 실패했습니다:', error);
                    }
                });
            }
        }
    });
});

// 검색 기능 구현
function performSearch() {
    const searchTerm = $('#appSearchInput').val();
    
    $('.application-card').each(function() {
        const name = $(this).find('.applicant-name').text();
        const orgName = $(this).find('.application-orgName').text();
        const birth = $(this).find('.applicant-details p:first').text(); 
        const phone = $(this).find('.applicant-details p:eq(1)').text(); 
        const email = $(this).find('.applicant-details p:last').text();
        
        if (name.includes(searchTerm) ||                                     
            birth.includes(searchTerm) || 
            phone.includes(searchTerm) || 
            email.includes(searchTerm)  ||
            orgName.includes(searchTerm)) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}
//구인공고 관리
$(document).ready(function () {
    let detailData = []; 

    // 첫 번째 AJAX: 전체 데이터 가져오기
    $.ajax({
        url: './api/detail/findAll',
        type: 'GET',
        success: function (response) {
            console.log('findAll 데이터:', response);
            detailData = response;

            // 두 번째 AJAX: 기업 IDX 가져오기
            $.ajax({
                url: './api/corporation/currentUserIdx',
                type: 'GET',
                success: function (c_idx) {
                    console.log('기업 IDX:', c_idx);

                    const filteredData = detailData.filter(item => item.c_idx === c_idx);
                    console.log('필터링된 데이터:', filteredData);

                    // 세 번째 AJAX: 지원자 목록 가져오기
                    $.ajax({
                        url: `./api/usersublist/CorporationList/${c_idx}`,
                        type: 'GET',
                        success: function(applications) {
                            // detail_idx별 지원자 수 계산
                            const applicationCounts = {};
                            applications.forEach(app => {
                                applicationCounts[app.detail_idx] = 
                                    (applicationCounts[app.detail_idx] || 0) + 1;
                                   
                            });
                            
                            const applicationList = $('#postinglist');
                            applicationList.empty();

                            if (filteredData.length > 0) {
                                filteredData.forEach(item => {
                                    const applicationCount = applicationCounts[item.detail_idx] || 0;
                                    const applicationHtml = `                                
                                        <div class="posting-card">
                                            <div class="posting-info">
                                                <div class="posting-header">
                                                    <h3 class="company-name">${item.orgName || '회사명 없음'}</h3>
                                                    <span class="posting-date">${item.created_date || '날짜 없음'}</span>
                                                </div>
                                                <div class="posting-details">
                                                    <p><i class="fas fa-briefcase"></i> ${item.content || '직무 정보 없음'}</p>
                                                    <p><i class="fas fa-map-marker-alt"></i> ${item.workArea || '위치 정보 없음'}</p>
                                                    <p><i class="fas fa-won-sign"></i> ${item.intCnt || '급여 정보 없음'}</p>
                                                    <span class="status-badge ${item.trnStatNm === '진행중' ? 'active' : 'inactive'}">
                                                        ${item.trnStatNm || '상태 없음'}                                        
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="posting-actions">
                                                <select class="status-select">
                                                    <option value="pending">모집중</option>
                                                    <option value="interview">마감</option>
                                                </select>
                                                <div class="posting-buttons">
                                                    <button class="app-btn" data-detail-idx="${item.detail_idx}" data-org-name="${item.orgName}">
                                                        <i class="fa-solid fa-user"></i>
                                                        지원자확인 (${applicationCount})
                                                    </button>
                                                    <button class="edit-btn" data-detail-idx="${item.detail_idx}">
                                                        <i class="fas fa-edit"></i> 수정
                                                    </button>
                                                    <button class="delete-btn" data-detail-idx="${item.detail_idx}">
                                                        <i class="fas fa-trash"></i> 삭제
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    `;

                                    applicationList.append(applicationHtml);
                                });

                                $('#appSearchInput').on('input', performSearch);

                                $(document).on('click', '.app-btn', function() {
                                    
                                    // 1. 전체 지원자 관리 섹션으로 이동
                                    $('#appManage').trigger('click');
                                    $('.job-management-container').show();
                                    
                                    
                                    // 2. 검색창에 업체명 자동 입력
                                    const name = $(this).data('org-name');
                                    console.log('회사 이름:', name);
                                    
                                    // 약간의 지연을 추가하여 검색 입력 필드가 로드될 시간을 줍니다.
                                    setTimeout(() => {
                                        if ($('#appSearchInput').length) {
                                            $('#appSearchInput').val(name);
                                            // 3. 검색 함수 직접 호출
                                            performSearch();
                                        } else {
                                            console.error('검색 입력 필드를 찾을 수 없습니다.');
                                        }
                                        
                                    }, 100);
                                });
                            } else {
                                applicationList.append('<p>일치하는 데이터가 없습니다.</p>');
                            }
                        },
                        error: function(err) {
                            console.error('지원자 목록 가져오기 실패:', err);
                        }
                    });
                },
                error: function (err) {
                    console.error('기업 IDX 가져오기 실패:', err);
                }
            });
        },
        error: function (err) {
            console.error('findAll 데이터 가져오기 실패:', err);
        }
    });
});
















// 주소 검색 API
function addressSearch(){
    $('#address-btn').click(function() {
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

// 기업정보 관련 기능들
function corpInfo() {
    // 기업정보 폼 숨기기/보이기 처리
    $('.form-container').hide();
    $('#corpInfo').click(() => $('.form-container').show());
    $('.item-list-item').not('#corpInfo').click(() => $('.form-container').hide());
}

//담당자 정보 관련 기능들
function corpManagerInfo() {
    // 담당자 정보 폼 숨기기/보이기 처리
    $('.form-container2').hide();
    $('#corpManager').click(() => $('.form-container2').show());
    $('.item-list-item').not('#corpManager').click(() => $('.form-container2').hide());
}

// 비밀번호 변경 기능
function corpPw() {
    // 비밀번호 변경 폼 숨기기/보이기 처리
    $('.pw-form-container').hide();
    $('#corpPw').click(() => $('.pw-form-container').show());
    $('.item-list-item').not('#corpPw').click(() => $('.pw-form-container').hide());
}

// 회원탈퇴 기능 
function corpWithdrawal() {
    // 회원탈퇴 폼 숨기기/보이기 처리
    $('.corp-withdrawal-container').hide(); // 초기에 숨김 처리
    $('#corpWithdrawal').click(() => $('.corp-withdrawal-container').show());
    $('.item-list-item').not('#corpWithdrawal').click(() => $('.corp-withdrawal-container').hide());
}

// 구인공고 관리확인 //12-14 추가
function jobManage() {
    // 기본적으로 job-management-container는 숨기기
    $('.job-management-container1').hide();

    // company-page에 있을 때는 job-management-container를 보이게 설정
    if (window.location.href.includes('company-page')) {
        $('.job-management-container1').show(); // 'company-page' 페이지에 있을 때는 보이도록 설정
    }

    // jobManage 버튼 클릭 시 job-management-container를 보이게/숨기기
    $('#jobManage').click(() => {
        $('.job-management-container1').show(); // jobManage 클릭 시 보이기
    });

    // 다른 항목 클릭 시 job-management-container를 숨기기
    $('.item-list-item').not('#jobManage').click(() => {
        $('.job-management-container1').hide(); // 다른 항목 클릭 시 숨기기
    });
}



// 지원자 관리확인 //12-14 추가
function appManage() {
    // 기본적으로 job-management-container는 숨기기
    $('.job-management-container').hide();    

    // jobManage 버튼 클릭 시 job-management-container를 보이게/숨기기
    $('#appManage').click(() => {
        $('.job-management-container').show(); // jobManage 클릭 시 보이기
    });

    // 다른 항목 클릭 시 job-management-container를 숨기기
    $('.item-list-item').not('#appManage').click(() => {
        $('.job-management-container').hide(); // 다른 항목 클릭 시 숨기기
    });
}

//면접 일정 표시    //12-14 추가
$(document).ready(function() {
    //면접 일정 기능
    $('.schedule-btn').click(() => $('#interviewModal').show());
    // x 눌리시 종료
    $('.fa-xmark').click(() => $('#interviewModal').hide());
    
    
    $('.submit-btn').click(function(){
        $.ajax({
            url: './api/corporation/###',
            type: 'get',
            success: function(response) {
                alert('일정 입력이 등록 되었습니다.');
                $('#interviewModal').hide();
            },
            error: function() {
                alert('일정 입력 실패 되었습니다.');
            }
        });
    });
    
});




// 로그인 상태 표시
function corpLoginState() {
    // AJAX로 로그인 상태 확인
    $.ajax({
        url: './api/corporation/checkCorporationLogin',
        type: 'get',
        success: function(response) {
            console.log(response);
            if(response) {
                // 로그인 상태면 로그아웃 버튼 표시
                $('#corp-login').hide();
                $('#corp-logout').show();
            } else {
                // 비로그인 상태면 로그인 버튼 표시
                $('#corp-login').show(); 
                $('#corp-logout').hide();
                
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
function corpLogin() {
    $('#corp-login').click(function(){
        if(!confirm('로그인페이지로 이동합니다.')) 
            return;
        location.href = './';
    });
}

//로그아웃 버튼 클릭시 로그아웃 처리
function corpLogout() { 
    $('#corp-logout').click(function(){
        $.ajax({
            url: './api/corporation/logout',
        type: 'POST',
        success: function() {
            if(!confirm('로그아웃 하시겠습니까?')) 
                return;
            location.href = './';
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
