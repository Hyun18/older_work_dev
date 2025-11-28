
$(document).ready(function() {
  
    //아이디 중복 검사
   checkId();
    //비밀번호 유효성 검사
    checkPw();
    // 성별 체크
    checkGender();

    //회원가입
    $('.submit-btn').click(function() {
       
        // 회원가입 유효성 검사
        checkForm();

        // 회원가입
        saveUser();
        
    });


    // 주소 검색 API
    $('#address').click(function() {
        new daum.Postcode({
            oncomplete: function(data) {
                $('#address').val(data.address);
            }
        }).open();
    });
});

// 변수
var check = {
    id: $('#id').val(),
    pw: $('#pw').val(),
    pwCheck: $('#pwCheck').val(),
    name: $('#name').val(),
    birthYear: $('#birth-year option:selected').val(),
    birthMonth: $('#birth-month option:selected').val(),
    birthDay: $('#birth-day option:selected').val(),
    gender: $('input:radio[name="gender"]:checked').val(), //이 부분 수정했습니다.
    phone: $('#phone').val(),
    address: $('#address').val()
}

//회원가입
function saveUser() {
    $.ajax({
        url: './api/user/save',
        type: 'post',  //이 부분 수정했습니다.
        data: {
            id: $('#id').val(),
            pw: $('#pw').val(),
            name: $('#name').val(),
            birthYear: $('#birth-year option:selected').val(),
            birthMonth: $('#birth-month option:selected').val(),
            birthDay: $('#birth-day option:selected').val(),
            gender: $('input:radio[name="gender"]:checked').val(),  //이 부분 수정했습니다.
            phone: $('#phone').val(),
            address: $('#address').val()
        },
        success: function(data) {
            alert('회원가입 완료');
            location.replace('/'); // 메인페이지로 이동
        },
        error: function(e) {            
            alert('회원가입 실패');
        }
    });
}

// 회원가입 유효성 검사
function checkForm() {  
    var check = {
        id: $('#id').val(),
        pw: $('#pw').val(),
        pwCheck: $('#pwCheck').val(),
        name: $('#name').val(),
        birthYear: $('#birth-year option:selected').val(),
        birthMonth: $('#birth-month option:selected').val(),
        birthDay: $('#birth-day option:selected').val(),
        phone: $('#phone').val(),
        address: $('#address').val()
    }
   
       

    if(!check.id) {
        alert('아이디를 확인해주세요.');
        $('#id').focus();
        return;
    }
    if(!check.pw) {
        alert('비밀번호를 확인해주세요.');
        $('#pw').focus();
        return;
    }
    if(!check.pwCheck) {
        alert('비밀번호 확인을 확인해주세요.');
        $('#pwCheck').focus();
        return;
    }
    if(!check.name) {
        alert('이름을 확인해주세요.');
        $('#name').focus();
        return;
    }
    if(!check.birthYear) {
        alert('년도를 확인해주세요.');
        $('#birth-year').focus();
        return;
    }
    if(!check.birthMonth) {
        alert('월을 확인해주세요.');
        $('#birth-month').focus();
        return;
    }
    if(!check.birthDay) {
        alert('일을 확인해주세요.');
        $('#birth-day').focus();
        return;
    }
    if(!check.phone) {
        alert('전화번호를 확인해주세요.');
        $('#phone').focus();
        return;
    }
    if(!check.address) {
        alert('주소를 확인해주세요.');
        $('#address').focus();
        return;
    }
     if($('#check-id').text() !== '인증완료') {
         alert('아이디 중복확인을 해주세요.');    
        return;
     }
}

// 아이디 중복 검사
function checkId() {
        $('#check-id').click(function() {
             if(!$('#id').val()) { //빈칸검사
                 alert('아이디를 입력해주세요.');
                return;
            }           
            $.ajax({
                url: './api/user/getById',
                type: 'get',
                data: {
                    id: $('#id').val()
                },
                success: function(data) {
                    if(data == '') {
                        // 개인회원 중복체크 후 기업회원 중복체크
                        $.ajax({
                            url: './api/corporation/getByMId',
                            type: 'post', 
                            data: {
                                m_id: $('#id').val()
                            },
                            success: function(corpData) {
                                if(corpData == '') {
                                    alert("사용 가능한 아이디입니다.");                    
                                    check.id = true;
                                    $('#check-id')
                                    .text('인증완료')
                                    .css('pointer-events', 'none');
                                } else {
                                    alert("이미 사용중인 아이디입니다.");
                                    check.id = false;
                                }
                            }
                        });
                    } else {                   
                        alert("이미 사용중인 아이디입니다.");
                        check.id = false;
                    }
                }
            });
        });
    }

 //비밀번호 유효성 체크
 function checkPw() {    
    $(document).ready(function() {
        $('#pw, #pwCheck').on('keyup', function(){
            var pw = $('#pw').val();
            var pwCheck = $('#pwCheck').val();
    
            // 비밀번호 유효성 검사 정규식 (특수문자 포함 8자리 이상)
            var pwRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
            
            if(!pwRegex.test(pw)) {
                $('#pw').next('div')
                .text('비밀번호는 특수문자를 포함한 8자리 이상이어야 합니다.')
                .css('color', 'red');
                check.pw = false;
                return;
            }else {
                $('#pw').next('div')
                .text('유효한 비밀번호입니다.')  // 빈 텍스트 대신 성공 메시지 표시
                .css('color', 'green');
                check.pw = true;
            }
            
            if(pw === pwCheck) {
                $('#pwCheck').next('div')
                .text('비밀번호가 일치합니다.')
                .css('color', 'green');
                check.pw = true;
            }else {
                $('#pwCheck').next('div')
                .text('비밀번호가 일치하지 않습니다.')
                .css('color', 'red'); 
                check.pw = false;
            }
        });
    });
}

// 성별 체크
function checkGender() {   
    $(document).ready(function() {        
        $('#male, #female').on('click', function() {
            check.gender = true;
            
        });
    });
}