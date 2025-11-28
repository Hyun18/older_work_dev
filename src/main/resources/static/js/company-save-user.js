$(document).ready(function(){
   
    //담당자 아이디 중복 검사
     checkM_id();

     //담당자 비밀번호 유효성 검사
     checkM_pw();

    
      //주소 검색
      $('#address-btn').on('click', function () {
         new daum.Postcode({
             oncomplete: function (data) {
                 console.log(data);
                 $('#address').val(data.address);
             }
         }).open();
     });


     $('#submit-btn').on('click', function(){        
      
     //회원가입 정보 검사
     var code = $('#code').val();
     var name = $('#name').val();
     var p_nm = $('#p_nm').val();
     var type = $('#type').val();
     var tel = $('#tel').val();
     var insurance = $('#insurance').val();
     var fax = $('#fax').val();
     var employees = $('#employees').val();
     var address = $('#address').val();
     var zone = $('#zone').val();
     var m_id = $('#m_id').val();
     var m_pw = $('#m_pw').val();
     var m_pw_check = $('#m_pw_check').val();
     var m_name = $('#m_name').val();
     var m_tel = $('#m_tel').val();
     var m_email = $('#m_email').val();
     var m_part = $('#m_part').val();

     
    
     
     //빈칸 검사

     if(code.length == 0){
         alert('사업자등록번호를 입력해주세요.');
         return;
     }else if(address.length == 0){
         alert('기업 주소를 입력해주세요.');
         return;
     }else if(name.length == 0){
         alert('회사명을 입력해주세요.');
         return;
     }else if(type.length == 0){
         alert('업종을 입력해주세요.');
         return;
     }else if(tel.length == 0){
         alert('회사전화번호를 입력해주세요.');
         return;
     }else if(employees.length == 0){
         alert('전체 직원수를 입력해주세요.');
         return;
     }else if(fax.length == 0){
         alert('팩스 번호를 입력해주세요.');
         return;
     }else if(zone.length == 0){
         alert('행정 구역을 선택해주세요.');
         return;
     }else if(m_name.length == 0){
         alert('담당자명을 입력해주세요.');
         return;
     }else if(m_id.length == 0){
         alert('담당자 아이디를 입력해주세요.');
         return;
     }else if(m_pw.length == 0){
         alert('비밀번호를 입력해주세요.');
         return;
     }else if(m_pw_check.length == 0){
         alert('비밀번호 확인을 입력해주세요.');
         return;
     }else if(m_tel.length == 0){
         alert('담당자 연락처를 입력해주세요.');
         return;
     }else if(m_email.length == 0){
         alert('담당자 이메일을 입력해주세요.');
         return;
     }else if(m_part.length == 0){
         alert('담당자 부서를 입력해주세요.');
         return;
     }

     
     //회원가입
     $.ajax({
         url: 'api/corporation/save',
         type: 'post',
         data: {
             code: $('#code').val(),
             name: $('#name').val(),
             p_nm: $('#p_nm').val(),
             type: $('#type').val(),
             tel: $('#tel').val(),
             insurance: $('#insurance').val(),
             fax: $('#fax').val(),
             employees: $('#employees').val(),
             address: $('#address').val(),
             zone: $('#zone').val(),
             m_id: $('#m_id').val(),
             m_pw: $('#m_pw').val(),
             m_pw_check: $('#m_pw_check').val(),
             m_name: $('#m_name').val(),
             m_tel: $('#m_tel').val(),
             m_email: $('#m_email').val(),
             m_part: $('#m_part').val()

         },
         success: function(data){
             alert('회원가입이 완료되었습니다.');
             location.href='./my-home';
         },
         error: function(error){
             alert('회원가입에 실패하였습니다.');
         }

     });
    
     
 });   
     
});


//담당자 비밀번호 유효성 검사
function checkM_pw() {    
 var pwValid = false;
 var pwMatch = false;

 $('#m_pw, #m_pw_check').on('keyup', function(){
     var pw = $('#m_pw').val();
     var pwCheck = $('#m_pw_check').val();

     // 비밀번호 유효성 검사 정규식 (문자, 숫자, 특수문자 포함 8자리 이상)
     var pwRegex = 
     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
     
     if(!pwRegex.test(pw)) {
         $('#pw-message')
         .text('비밀번호는 문자, 숫자, 특수문자를 모두 포함한 8자리 이상이어야 합니다.')
         .css('color', 'red');
         pwValid = false;
     } else {
         $('#pw-message')
         .text('유효한 비밀번호입니다.')
         .css('color', 'green');
         pwValid = true;
     }
     
     if(pw === pwCheck && pw !== '') {
         $('#pw-check-message')
         .text('비밀번호가 일치합니다.')
         .css('color', 'green');
         pwMatch = true;
     } else if (pwCheck !== '') {
         $('#pw-check-message')
         .text('비밀번호가 일치하지 않습니다.')
         .css('color', 'red'); 
         pwMatch = false;
     } else {
         $('#pw-check-message').text('');
         pwMatch = false;
     }
 });

 return pwValid && pwMatch;
}


//담당자 아이디 중복 검사

var valid = {
 id: false
}

function checkM_id() {
 $(document).ready(function(){
     $('#id-check-btn').on('click', function(){
         
         if($('#m_id').val() == ''){
             alert('아이디를 입력해주세요.');
             return;
         }

         $.ajax({
             url: 'api/corporation/getByMId',
             type: 'post',
             data: {
                 m_id: $('#m_id').val()
             },
             success: function(data){
                 if(data == ''){
                     // 기업 회원 중복 체크 후 개인 회원 중복 체크
                     $.ajax({
                         url: 'api/user/getById',
                         type: 'get',
                         data: {
                             id: $('#m_id').val()
                         },
                         success: function(userData){
                             if(userData == ''){
                                 alert('사용 가능한 아이디입니다.');
                                 valid.id = true;
                                 $('#id-check-btn')
                                 .text('인증완료')
                                 .css('pointer-events', 'none');
                             } else {
                                 alert('이미 사용 중인 아이디입니다.');
                                 valid.id = false;
                             }
                         }
                     });
                 } else {
                     alert('이미 사용 중인 아이디입니다.');
                     valid.id = false;
                 }
             }
         });
     });
 });
}


