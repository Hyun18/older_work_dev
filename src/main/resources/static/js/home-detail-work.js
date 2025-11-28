$(document).ready(function(){
    slideWork();
});

// 슬라이드 함수
function slideWork(){ 
    $.ajax({
        type: 'GET', 
        url: './api/detail/findAll',
        success: function(data) {
            console.log(data);
            
            data.forEach(function(item) {
                console.log(item);
                let startDate = item.hpNotiSdate;
                let endDate = item.hpNotiEdate;
                
                let today = new Date();
                let endDateObj = new Date(endDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
                item.trnStatNm = today > endDateObj ? '마감' : '모집중';
                
                startDate = startDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
                endDate = endDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');  
                
                $('.slider-wrapper').append(`
                    <div class="slide-content" data-detail_idx="${item.detail_idx}">
                        <span id="s1">${item.orgName}</span>
                        <span id="s2">사업체명: ${item.workPlace}</span>
                        <span id="s3">${item.content}</span>
                        <div id="status">
                            <span>${item.trnStatNm}</span>
                        </div>
                        <div id="s-info">
                            <span>${startDate} ~ ${endDate}</span>
                            <span>${item.dstrCd1Nm}/${item.dstrCd2Nm}</span>
                        </div>
                    </div>
                `);
            });
            
            // 슬라이드 클릭 이벤트 추가
            $('.slide-content').click(function() {
                const detail_idx = $(this).data('detail_idx');
                console.log('클릭된 detail_idx:', detail_idx);
                if (detail_idx) {
                    location.href = `old-detail-work?detail_idx=${detail_idx}`; // URL에 detail_idx 값을 포함시켜 이동
                } else {
                    console.error('detail_idx를 찾을 수 없습니다.');
                }
            });
        },
        error: function(xhr, status, error) {
            console.error('API 호출 에러:', status, error);                    
        }
    });
}
