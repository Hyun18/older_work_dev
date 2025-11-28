$(document).ready(function() {
    
    // 확인 버튼
    $('#id-btn').click(function() {
        $('.id-result').hide();
    });
    // 취소 버튼
    $('#new-cancel-btn').click(function() {
        $('.new-pw').hide();
    });

    // 아이디 찾기 버튼
    $('#find-id-btn').click(function() {
        // 아이디 찾기 요청
        findId();
    });

    // 비밀번호 수정 버튼
    $('#update-pw-btn').click(function() {
        // 비밀번호 찾기 요청
        findUser();
    });

    // 새로운 비밀번호 확인 버튼
    $('#new-btn').click(function() {
        // 비밀번호 수정 요청
        checkPw();
        updatePw();
        //alert('비밀번호가 변경되었습니다.');
    });
  
});



// 아이디 찾기 요청
function findId() {
    var check = {
        name: $('#name').val(),
        gender: $('input[name="gender"]:checked').val(),
        birth_year: $('#birth-year').val(),  //이 부분 수정했습니다(24.12.10)
        birth_month: $('#birth-month').val(),
        birth_day: $('#birth-day').val(),
        phone: $('#phone').val(),
    }
    //아래 코드 수정했습니다(24.12.10).
    if(check.name == '' || check.gender == '' || check.birth_year == '' || check.birth_month == '' || check.birth_day == ''  || check.phone == '') {
        alert('정보를 입력해주세요.');
        return;
    }
    $.ajax({
        url: './api/user/findID',
        type: 'get',
        data: check,
        success: function(data) {
            console.log(data);

            if(data==""){
                alert('회원정보를 다시 확인해주세요.');                
            } else {
                
                $('.id-result').show();
                $('#found-id').text(data);
                $('#id').html(data);
            }
        },
        error: function(e) {
            alert('회원정보를 다시 확인해주세요.');       
        }
    });
    // 찾은 아이디를 비밀번호 찾기의 아이디 입력란에 자동 입력
    $('#id-btn').click(function() {
        var foundId = $('#found-id').text();
        $('#id').val(foundId);
    });
}

// 비밀번호 변수
var check = {
    pw: false,
    pwCheck: false,
}

// 회원정보 찾기
function findUser() {
    var check = { 
        id: $('#id').val(),
        birth_year: $('#pw-birth-year').val(),  //이 부분 수정했습니다(24.12.10)
        birth_month: $('#pw-birth-month').val(),
        birth_day: $('#pw-birth-day').val()
    }
    $.ajax({
        url: './api/user/findPW', //이 부분 수정했습니다(24.12.10)
        type: 'get',
        data: check,
        success: function(data) {
            if(data==""){
                alert('회원정보를 다시 확인해주세요.');
            } else {
                $('.new-pw').show();
            }
        },
        error: function(e) {
            console.log(e);
        }
    });
}


// 비밀번호 수정 요청
function updatePw() {
    var check = {
        newPw: $('#new-pw').val(),
        pwCheck: $('#new-pwCheck').val(),
    }
    $.ajax({
        url: './api/user/updatePW', //이 부분 수정했습니다(24.12.10)
        type: 'post',
        data:  check,
        success: function(data) {
            if($('#new-pw').val() == '' || $('#new-pwCheck').val() == '') {
                alert('비밀번호를 입력해주세요.');
                return;
            }
            
            checkPw();
            console.log(data);
         	alert('비밀번호가 성공적으로 변경되었습니다.'); //추가 했습니다(24.12.10)
			$('.new-pw').hide(); //추가했습니다(24.12.16)
			window.location.href = './'
			
		},
        error: function(e) {
            console.log(e);
         	alert('비밀번호 수정에 실패했습니다.'); //추가 했습니다(24.12.10)
        }
    });
}





// 확인 버튼 클릭 시
$(document).on('click', '#id-btn', function() {
    $('.id-result').hide();
});

// 비밀번호 수정 취소 버튼 클릭 시
$(document).on('click', '.cancel-btn', function() {
    $('.new-pw').hide();
});


// 숨기기 버튼 클릭 시
$(document).on('click', '#hide-find-id-btn', function() {
    $('.find-id-container').show();
    $('#hide-find-id-container').hide();
});










//비밀번호 유효성 체크
function checkPw() {    
$(document).ready(function() {
    $('#new-pw, #new-pwCheck').on('keyup', function(){
        var pw = $('#new-pw').val();
        var pwCheck = $('#new-pwCheck').val();

        // 비밀번호 유효성 검사 정규식 (특수문자 포함 8자리 이상)
        var pwRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        
            if(!pwRegex.test(pw)) {
                $('#pw-text')
                .text('비밀번호는 특수문자를 포함한 8자리 이상이어야 합니다.')
                .css('color', 'red')
                .show();
                check.pw = false;
                return;
            }else {
                $('#pw-text')
                .text('유효한 비밀번호입니다.')
                .css('color', 'green')
                .show();
                check.pw = true;                
            }
            
            if(pw === pwCheck) {
                $('#pw-check-text')
                .text('비밀번호가 일치합니다.')
                .css('color', 'green')
                .show();
                check.pwCheck = true;
                if(check.pw) {
                    $('#pw-text').hide();
                }
            }else {
                $('#pw-check-text')
                .text('비밀번호가 일치하지 않습니다.')
                .css('color', 'red')
                .show();
                check.pwCheck = false;
            }
            
        });
    });
}
