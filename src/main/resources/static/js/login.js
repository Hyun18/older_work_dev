$(document).ready(function () {
    var userType = null; // 로그인 유형을 저장하는 변수

    // 기업 로그인 버튼 클릭
    $('#company-login-btn').click(function () {
        userType = 'company';
        $('#login-btn').text('기업 로그인'); // 로그인 버튼 텍스트 변경
    });

    // 개인 로그인 버튼 클릭
    $('#personal-login-btn').click(function () {
        userType = 'personal';
        $('#login-btn').text('개인 로그인'); // 로그인 버튼 텍스트 변경
    });

    // 로그인 버튼 클릭
    $('#login-btn').click(loginHandler);
    
    // 엔터키 이벤트 처리
    $('#id, #pw').keypress(function(e) {
        if(e.keyCode === 13) { // 엔터키 코드
            loginHandler();
        }
    });

    function loginHandler() {
        if (!userType) {
            alert('로그인 유형을 선택하세요 (기업 또는 개인).');
            return;
        }

        var id = $('#id').val();
        var pw = $('#pw').val();

        if (!id || !pw) {
            alert('아이디와 비밀번호를 입력하세요.');
            return;
        }

        // AJAX 요청
        if (userType === 'company') {
            // 기업 로그인
            $.ajax({
                url: './api/corporation/login',
                type: 'POST',
                data: {
                    m_id: id,
                    m_pw: pw
                },
                success: function (response) {
                    console.log('서버 응답:', response)
                    if (response != '') {
                        window.location.href = './';
                    } else {
                        alert(response || '로그인 실패: 아이디 또는 비밀번호를 확인하세요.');
                    }
                },
                error: function () {
                    alert('기업 로그인에 실패했습니다.');
                }
            });
        } else if (userType === 'personal') {
            // 개인 로그인
            $.ajax({
                url: './api/user/login',
                type: 'GET',
                data: {
                    id: id,
                    pw: pw
                },
                success: function (response) {
                    console.log('서버 응답:', response)
					if (response != '') {
					   window.location.href = './';
					} else {
					   alert(response || '로그인 실패: 아이디 또는 비밀번호를 확인하세요.');
					}
                },
                error: function () {
                    alert('개인 로그인에 실패했습니다.');
                }
            });
        }
    }

    // 로그아웃
    $('#logout-btn').click(function () {
        if (!confirm('로그아웃 하시겠습니까?')) return;

        // 공통 로그아웃 처리
        $.ajax({
            url: './api/user/logout',
            type: 'POST',
            success: function () {
                location.href = './';
            },
            error: function () {
                // 기업 로그아웃 시도
                $.ajax({
                    url: './api/corporation/logout',
                    type: 'POST',
                    success: function () {
                        alert('로그아웃 되었습니다.');
                        location.href = './';
                    },
                    error: function () {
                        alert('로그아웃에 실패했습니다.');
                    }
                });
            }
        });
    });
});
