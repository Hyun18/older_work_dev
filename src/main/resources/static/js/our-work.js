$(document).ready(function() {
    showJob();

    // 검색 입력 필드에 이벤트 리스너 추가
    $('#searchInput').on('input', function() {
        const searchTerm = $(this).val().toLowerCase(); // 소문자로 변환하여 대소문자 구분 없이 검색
        const filteredJobs = jobData.filter(item => 
            item.dstrCd2Nm.toLowerCase().includes(searchTerm) || // 기관명으로 검색
            item.orgName.toLowerCase().includes(searchTerm) // 내용으로 검색
        );
        displayJobs(filteredJobs); // 필터링된 데이터 표시
    });
});

let jobData = []; // 전체 데이터를 저장할 변수

function showJob() {
    $.ajax({
        url: './api/detail/findAll',
        type: 'get',
        success: function(data) {
            jobData = data; // 전체 데이터 저장
            displayJobs(jobData); // 초기에 모든 데이터 표시
        }
    });
}

function displayJobs(jobs) {
    $('.work-list').empty(); // 기존 리스트 초기화
    jobs.forEach(item => {
        $('.work-list').append(`
            <div class="work-list-item" onclick="location.href='old-detail-work?detail_idx=${item.detail_idx}'">
                <div class="work-list-item-left">
                    <div class="work-list-item-title">
                        <div>
                            <span id="orgName">${item.orgName}</span> | 
                            <span id="workPlace">${item.dstrCd1Nm}</span>
                            <span id="workPlace">${item.dstrCd2Nm}</span> | 
                            <span id="projNo">${item.c_idx}</span>
                        </div>            
                    </div>
                    <div class="work-list-item-content">
                        <span id="content">${item?.content?.length > 40 ? item.content.substring(0, 40) + '...' : item?.content || ''}</span>
                    </div>            
                </div>
                <div class="work-list-item-right">
                    <div class="work-list-item-period">
                        <span id="ing">${item.trnStatNm}</span>
                        <span id="hpNotiSdate">${item.hpNotiSdate} </span> ~ <span id="hpNotiEdate">${item.hpNotiEdate}</span>               
                    </div>
                    <span id="hpInvtCnt">모집인원 ${item.hpInvtCnt} | 지원인원 0 </span>
                </div>
            </div>
        `);
    });
}
