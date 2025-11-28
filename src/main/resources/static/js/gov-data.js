//사업자 등록번호 조회
$(document).ready(function () {
    $('#code-btn').on('click', function () {
        const businessNumber = $('#code').val().trim(); // 사업자 등록번호
        const startDate = $('#start_dt').val().trim(); // 개업일자
        const businessName = $('#p_nm').val().trim(); // 대표자 성명

        // 입력값 검증
        if (businessNumber.length < 10) {
            alert('사업자 등록번호는 10자리 이상이어야 합니다.');
            return;
        }
        if (!startDate.match(/^\d{8}$/)) { // YYYYMMDD 형식 확인
            alert('개업일자는 YYYYMMDD 형식으로 입력해야 합니다.');
            return;
        }
        if (!businessName) {
            alert('대표자 성명을 입력해주세요.');
            return;
        }

        // API 호출
        validateBusinessRegistration(businessNumber, startDate, businessName);
    });

    function validateBusinessRegistration(businessNumber, startDate, businessName) {
        const serviceKey = 'jvCae38Wmk9xP8q0Ue5VVQj7j0fHJI9YwVjWjfygB9YSq7zXFcYv+GT5i88JukU3+mpoNkjiSEE/7ZMkTFq+og==';
        const apiUrl = `https://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=jvCae38Wmk9xP8q0Ue5VVQj7j0fHJI9YwVjWjfygB9YSq7zXFcYv%2BGT5i88JukU3%2BmpoNkjiSEE%2F7ZMkTFq%2Bog%3D%3D&returnType=json`;

        // Request Body 생성
        const requestBody = {
            businesses: [
                {
                    b_no: businessNumber,  // 사업자등록번호
                    start_dt: startDate,   // 개업일자 (YYYYMMDD)
                    p_nm: businessName     // 대표자 성명
                }
            ]
        };

        // AJAX 요청
        $.ajax({
            url: apiUrl,
            type: 'POST',
            data: JSON.stringify(requestBody),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
                if (data.data && data.data.length > 0) {
                    const result = data.data[0];
                    if (result.valid === '01') {
                        alert('유효한 사업자 등록정보입니다.');
                    } else {
                        alert('유효하지 않은 사업자 등록정보입니다.');
                    }
                } else {
                    alert('응답 데이터가 비어 있습니다.');
                }
            },
            error: function (xhr, status, error) {
                console.error('API 호출 중 오류 발생:', status, error);
                alert('사업자 등록정보 확인 중 오류가 발생했습니다.');
            }
        });
    }
});
