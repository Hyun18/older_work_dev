$(document).ready(function(){
    // 로그인 버튼 클릭 이벤트
    $('#login-btn').click(function(){
        login();
    });

    //엔터키 로그인
    $(document).on('keyup', function(event){
        if(event.keyCode == 13){
            $("#login-btn").trigger('click');
        }
    });
});

// 로그인 요청
function login(){
    // 아이디와 비밀번호 유효성 검사
    checkIdAndPw();
    $.ajax({
        url: './api/user/login',
        type: 'get',
        data: {
            id: $('#id').val(), 
            pw: $('#pw').val()
        },
        success: function(data){
            console.log(data);
            if(data==''){
                alert("가입된 계정이 아닙니다.");
            }else{
              location.replace('./');
            }              
        },
        error: function(e){
            alert('로그인 실패');
        }
    });
}


// 아이디와 비밀번호 유효성 검사
function checkIdAndPw(){
    var check = {
        id: $('#id').val(),
        pw: $('#pw').val()
    }
    if(!check.id){
        alert('아이디를 확인해주세요.');
        $('#id').focus();
        return;
    }
    if(!check.pw){
        alert('비밀번호를 확인해주세요.');
        $('#pw').focus();
        return;
    }
}

// 아이디 찾기
function findId(){   
    $('#find-id').click(function(){
        alert('아이디 찾기');   
    });
}

// 비밀번호 찾기
function findPw(){
    $('#find-pw').click(function(){
        alert('비밀번호 찾기');
    });
}

