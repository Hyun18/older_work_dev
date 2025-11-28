function fetchCurrentUserIdx() {
    return $.ajax({
        url: './api/corporation/currentUserIdx',
        type: 'GET',
        success: function(data) {
            console.log('Current User IDX: ' + data);
            return data;
        },
        error: function(xhr, status, error) {
            console.error('Error: ' + xhr.status + ' ' + xhr.statusText);
        }
    });
}

function validateFields(fields) {
    let isValid = true;
    $('.error').remove();

    fields.forEach(function(field) {
        const value = $(field.id).val();
        console.log(`검증 중: ${field.id} 값:`, value);

        if (!value || (field.isNumeric && !/^\d+$/.test(value))) {
            isValid = false;
            console.error(`검증 실패: ${field.id}, 메시지: ${field.message}`);
            $(field.id).after('<span class="error">' + field.message + '</span>');
        }
    });

    return isValid;
}

$(document).ready(function() {
	const fieldsToValidate = [
        { id: '#dstrCd2Nm', message: '행정 구역을 선택하세요.' },
        { id: '#intCnt', message: '유효한 임금을 입력하세요.', isNumeric: true },
        { id: '#gender', message: '성별을 선택하세요.' },
        { id: '#jobType', message: '구인 유형을 입력하세요.' },
        { id: '#orgName', message: '운영 기관명을 입력하세요.' },
        { id: '#trnStatNm', message: '상태를 입력하세요.' },
        { id: '#hpInvtCnt', message: '모집 인원을 입력하세요.'},
        { id: '#hpNotiSdate', message: '공고 시작일을 입력하세요. (숫자만 입력하세요)', isNumeric: true },
        { id: '#hpNotiEdate', message: '공고 종료일을 입력하세요. (숫자만 입력하세요)', isNumeric: true },
        { id: '#addr', message: '주소를 입력하세요.' },
        { id: '#arrange', message: '정렬 기준을 입력하세요.' },
        { id: '#content', message: '상세 내용을 입력하세요.' },
        { id: '#hireCnt', message: '채용 인원을 입력하세요.', isNumeric: true },
        { id: '#projRecuJtype', message: '프로젝트 구인 유형을 입력하세요.' },
        { id: '#projTime', message: '프로젝트 시간을 입력하세요.' },
        { id: '#recuAgeNm', message: '모집 연령대를 입력하세요.' },
        { id: '#telNum', message: '연락처를 입력하세요.' },
        { id: '#workPlace', message: '근무지를 입력하세요.' },
        
    ];


	fetchCurrentUserIdx().done(function(data) {
		console.log('Returned data:', data); 
		var c_idx = data; // 여기서 JSON 응답의 idx 값에 접근 
		console.log('Fetched c_idx:', c_idx); 
	        if (!c_idx) {
	            console.error('유효한 c_idx를 가져오지 못했습니다.');
	            return c_idx;
	        }
	
	$('#submit-btn').on('click', function(){ 
		console.log('유효성 검증 시작'); 
			if (!validateFields(fieldsToValidate)) { 
				console.error('유효성 검증 실패'); 
				alert('입력값을 확인하세요.'); return; 
			} 
				console.log('유효성 검증 통과');
	

	        $.ajax({
	            url: './api/detail/upload',
	            type: 'POST',
				async: false,
	            data: {
					    dstrCd2Nm: $('#dstrCd2Nm').val(),
					    intCnt: $('#intCnt').val(),
					    gender: $('#gender').val(),
					    jobType: $('#jobType').val(),
					    orgName: $('#orgName').val(),
					    trnStatNm: $('#trnStatNm').val(),
					    hpInvtCnt: $('#hpInvtCnt').val(),
					    hpNotiSdate: $('#hpNotiSdate').val(),
					    hpNotiEdate: $('#hpNotiEdate').val(),
					    addr: $('#addr').val(),
					    arrange: $('#arrange').val(),
					    content: $('#content').val(),
					    education: $('#education').val(),
					    projDate: $('#projDate').val(),
					    hireCnt: $('#hireCnt').val(),
					    license: $('#license').val(),
					    operPlan: $('#operPlan').val(),
					    projRecuJtype: $('#projRecuJtype').val(),
					    projTime: $('#projTime').val(),
					    recuAgeNm: $('#recuAgeNm').val(),
					    telNum: $('#telNum').val(),
						workArea: $('#workArea').val(), //누락되어 있었음
					    workPlace: $('#workPlace').val(),
					    etc: $('#etc').val()
	            },
	            success: function(response) { 
					console.log('Response:' , response); // 응답 텍스트를 출력 
					alert('등록이 완료되었습니다.'); 
					location.href = './';
	            },
	            error: function(error, status, xhs) {
	                alert('등록 실패');
					console.error('Error: ' , JSON.stringify(error));
	            }
	        })
	    })
	})

	
});

	
    

