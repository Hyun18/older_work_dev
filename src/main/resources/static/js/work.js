$(document).ready(function(){

    // 검색 입력 필드에 이벤트 리스너 추가
    $('#search').on('input', function() {
        const searchTerm = $(this).val().toLowerCase(); // 소문자로 변환하여 대소문자 구분 없이 검색
        const filteredJobs = jobData.filter(item => 
            item.dstrCd2Nm.toLowerCase().includes(searchTerm) || // 기관명으로 검색
            item.orgName.toLowerCase().includes(searchTerm) // 내용으로 검색
        );
        displayJobs(filteredJobs); // 필터링된 데이터 표시
    });

    //상세 페이지 이동
    $('.work-list').click(function(e){
    // 클릭된 work-list-item 찾기
    const $clickedItem = $(e.target).closest('.work-list-item');
    // 해당 아이템의 projNo 값 가져오기
    localStorage.setItem('projNo', $clickedItem.find('#projNo').text());
    const projNo = $clickedItem.find('#projNo').text();
    
    const serviceKey = 'HqALeey0CnI%2B2ECy5mGQtbrcIy%2FxqqTImPIDROuuVZ0nn%2BGYnRfh0tm8Vu0aIT3wV6BW9Eqzt%2FuLRtzQr92eBw%3D%3D';
    const url = `http://apis.data.go.kr/B552474/JobBsnInfoService/getJobBsnRecruitInfo?projNo=${projNo}&ServiceKey=${serviceKey}`;
    location.href=('./detail-work');        
    });

    
    //더보기 버튼 클릭시 노인일자리로 이동 및 모집중인 전체 구 확인
    $('#loadMore').click(function(){ 
        location.href='./work';
    });

     

     // 검색 버튼 클릭 이벤트
     $("#searchBtn").click(function() {

        //  // 모집중인 공고 체크
        //  if (!checkRecruitingStatus(json.response.body.items.item)) {    삭제
        //     return; 
        // } 
        
        // 검색 함수 호출
        searchWork();
        //페이지    
        getTotalCount();
        //정렬 함수 호출
        sort();

        //파이지네이션 숨김
        $('.pagination-area').hide();   //추가

    });

    // 엔터키 입력 이벤트
    $("#search").keypress(function(e) {
        if (e.keyCode === 13) {
            // 검색 함수 호출
            searchWork();
            //페이지    
            getTotalCount();
            //정렬 함수 호출
            sort();
            //파이지네이션 숨김
            $('.pagination-area').hide();   //추가
        }
    });
 
});


//상세 페이지 이동시 projNo 호출
function getProjNo(){
    const projNo = localStorage.getItem('projNo');      
    return projNo;
}




//검색 함수
function searchWork(){
    
    // 구.군 코드 매핑 객체
    const gucode = {
        강서구: 2644000000,
        금정구: 2641000000,
        기장군: 2671000000,
        남구: 2629000000,
        동구: 2617000000,
        동래구: 2626000000,
        진구: 2623000000,
        부산진구: 2623000000,
        북구: 2632000000,
        사상구: 2653000000,
        사하구: 2638000000,
        서구: 2614000000,
        수영구: 2650000000,
        연제구: 2647000000,
        영도구: 2620000000,
        중구: 2611000000,
        해운대구: 2635000000
    }
    // 검색 결과 영역 초기화
    $("#searchResult").empty();
    // 검색어 가져오기
    const searchText = $("#search").val();
    console.log(searchText);

    // 검색어가 없으면 경고창 띄우기
    if(searchText.trim() === ""){
        alert('검색어를 입력해주세요.');
        return;
    }
            
    const serviceKey = 'HqALeey0CnI%2B2ECy5mGQtbrcIy%2FxqqTImPIDROuuVZ0nn%2BGYnRfh0tm8Vu0aIT3wV6BW9Eqzt%2FuLRtzQr92eBw%3D%3D';
    const url = `http://apis.data.go.kr/B552474/JobBsnInfoService/getJobBsnRecruitList?ServiceKey=${serviceKey}`;
    $.ajax({
        // 목록 조회 API URL
        url: url, 
        type: 'GET',
        async: false,
        data: {
            pageNo: 1,
            numOfRows: 10,                   
            dstrCd1: '2600000000',  // 부산광역시 코드
            dstrCd2: gucode[searchText] || searchText   // 구 코드가 있으면 사용, 없으면 원래 검색어 사용
        },            
        success: function(xml){                
            const json = xmlToJson(xml);
            
            console.log('지역구 데이터', json);
            var count = json.response.body.totalCount;
            
           
            
            //기존 목록 초기화
            $('.work-list').empty();
            //출력
            output(json);

            //총 건수 출력            
            $('#totalCount').text(count);
            //지역구 출력
            $('#gugun').text(searchText);   //  추가 
        },
        error: function(){
            alert('데이터 호출에 실패했습니다.');
        }
    });
}

//모집중인 공고 체크 함수
function checkRecruitingStatus(items) {
    let hasRecruiting = false;
    for(let i = 0; i < items.length; i++) {
        if(items[i].trnStatNm === '모집중') {
            hasRecruiting = true;
            break;
        }
    }
    if(!hasRecruiting) {
        alert('모집중인 공고가 없습니다.');
        
        //기존 목록 초기화
        $('.work-list').empty();
        return false;
    }
    return true;
}



//projNo 추출 함수
function projNo(items){
    var projNo = '';
    for(let i = 0; i < items.length; i++){
        projNo = items[i].projNo;
    }
    return projNo;
}

//페이지네이션
function getTotalCount(count){
    var totalCount = count;
    const serviceKey = 'HqALeey0CnI%2B2ECy5mGQtbrcIy%2FxqqTImPIDROuuVZ0nn%2BGYnRfh0tm8Vu0aIT3wV6BW9Eqzt%2FuLRtzQr92eBw%3D%3D';
    const url = `http://apis.data.go.kr/B552474/JobBsnInfoService/getJobBsnRecruitList?ServiceKey=${serviceKey}`;

    $.ajax({
        type: 'GET',
        url: url,
        async: false,
        data:{
            pageNo:1,
            numOfRows:10,
            dstrCd1:'2600000000',
        },
        success: function(data){
            var json = xmlToJson(data);
            var totalCount = json.response.body.totalCount;

            //기존 페이지네이션 제거
            if($('#pagination-demo').data("twbs-pagination")){
                
                $('#pagination-demo').twbsPagination('destroy');
            }
            
            //페이지네이션 새로 생성
            $('#pagination-demo').twbsPagination({
                totalPages: Math.ceil(totalCount/100),  //변경 50 -> 100
                visiblePages: 5,    
                first:'처음으로',
                last:'마지막으로',
                prev:'이전',
                next:'다음',
                onPageClick: function (event, page) {
                    //기존 목록 초기화
                    $('.work-list').empty();
                    //새로운 목록 호출
                    getItems(page,10);          //변경 50 -> 10
                    
                }
            });
        },
        error: function(xhr, status, error){
            console.error('API 호출 에러:', status, error);
        }
    });
  }



// 페이지 번호 추출 함수
function getItems(p,n){
     
    // 구 코드 매핑 객체
    const gucode = {
        강서구: 2644000000,
        금정구: 2641000000,
        기장군: 2671000000,
        남구: 2629000000,
        동구: 2617000000,
        동래구: 2626000000,
        진구: 2623000000,
        부산진구: 2623000000,
        북구: 2632000000,
        사상구: 2653000000   ,
        사하구: 2638000000,
        서구: 2614000000,
        수영구: 2650000000,
        연제구: 2647000000,
        영도구: 2620000000,
        중구: 2611000000,
        해운대구: 2635000000
    }
    // 검색어 가져오기
    const searchText = $("#search").val();

    const serviceKey = 'HqALeey0CnI%2B2ECy5mGQtbrcIy%2FxqqTImPIDROuuVZ0nn%2BGYnRfh0tm8Vu0aIT3wV6BW9Eqzt%2FuLRtzQr92eBw%3D%3D';
    const url = `http://apis.data.go.kr/B552474/JobBsnInfoService/getJobBsnRecruitList?ServiceKey=${serviceKey}`;

    
    
        $.ajax({
            type: 'GET',
            url: url,
            data:{
                pageNo:p,
                numOfRows:n,
                dstrCd1:'2600000000',
                dstrCd2:gucode[searchText] || searchText
            },
            success: function (data) {
                //xml을 json으로 변환
                var json = xmlToJson(data);
                //console.log('json1', json);

                //출력
                output(json);   // 출력 함수 호출

                //정렬 함수 호출
                sort();

                
            },
            error: function () {
                alert('데이터 호출에 실패했습니다.');
            }
        });
  }


  //출력 함수
function output(json) {

    var itemArray = json.response.body.items.item;
    
    $.each(itemArray, function (index, item) {
        

        //시작일, 종료일
        var startDate = item.hpNotiSdate.substring(0,8);
        var endDate = item.hpNotiEdate.substring(0,8);
        
        startDate = startDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
        endDate = endDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
            


        //상태 변수 설정
        var status = item.trnStatNm;
        if(status === '완료'){
            status = '마감';
        } 

        // API 호출 부분은 동일하게 유지
        const serviceKey = 'HqALeey0CnI%2B2ECy5mGQtbrcIy%2FxqqTImPIDROuuVZ0nn%2BGYnRfh0tm8Vu0aIT3wV6BW9Eqzt%2FuLRtzQr92eBw%3D%3D';
        const url = `http://apis.data.go.kr/B552474/JobBsnInfoService/getJobBsnRecruitInfo?projNo=${item.projNo}&ServiceKey=${serviceKey}`;
        // API 호출을 동기식으로 처리
        $.ajax({
            type: 'GET',
            url: url,
            async: false,
            success: function(data) {
                var json = xmlToJson(data);
                // append를 사용하여 요소 추가                
                $('.work-list').append(`
                    <div class="work-list-item">
                        <div class="work-list-item-left">
                            <div class="work-list-item-title">
                                <div>
                                    <span id="orgName">${item.orgName}</span> | 
                                    <span id="workPlace">${item.dstrCd1Nm}</span>
                                    <span id="workPlace">${item.dstrCd2Nm}</span> | 
                                    <span id="projNo">${item.projNo}</span>
                                </div>            
                            </div>
                            <div class="work-list-item-content">
                                <span id="content">${json.response.body.item.content.length > 40 ? json.response.body.item.content.substring(2, 40) + '...' : json.response.body.item.content}</span>
                            </div>            
                        </div>
                        <div class="work-list-item-right">
                            <div class="work-list-item-period">
                                <span id="ing">${status}</span>
                                <span id="hpNotiSdate">${startDate} </span> ~ <span id="hpNotiEdate">${endDate}</span>               
                            </div>
                            <span id="hpInvtCnt">모집인원 ${item.hpInvtCnt} | 지원인원 0 </span>
                        </div>
                    </div>
                `);
            },
            error: function(xhr, status, error) {
                console.error('API 호출 에러:', status, error);                    
            }
        });
    });
}

//정렬 함수
function sort() {

    $('.sort-area button').on('click', function () {
        $('.sort-area button').removeClass('active');
        $(this).addClass('active');
        const index = $(this).data('index');
        if(index == 1){
            $('.work-list-item').each(function() {
                $(this).show();
            });
        }else if(index == 2){

            $('.work-list-item').each(function() {
                const status = $(this).find('#ing').text();
                if (status === '마감') {
                    $(this).hide();
                } else {
                    $(this).show();
                    
                }
            });
        }else if(index == 3){
            //getItems(1,10);
        }else if(index == 4){
            //etItems(1,10);
        }

    });

    $('.sort-area button[data-index="2"]').trigger('click');
   
}

//체크 함수
function check() {
// "전체 선택" 체크박스 클릭 이벤트
    $('#check-all').on('click', function () {
    const isChecked = $(this).prop('checked');
        $('.check-area .check').prop('checked', isChecked);
    });

// 개별 체크박스 클릭 이벤트
$('.check-area').on('click', '.check', function () {
        const allChecked = $('.check-area .check').length === $('.check-area .check:checked').length;
        $('#check-all').prop('checked', allChecked);
    });
}




//xml을 json으로 변환하는 함수
function xmlToJson(xml) {
    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) {
    // element
    // do attributes
    if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
    }
    } else if (xml.nodeType == 3) {
    // text
    obj = xml.nodeValue;
    }

    // do children
    // If all text nodes inside, get concatenated text from them.
    var textNodes = [].slice.call(xml.childNodes).filter(function(node) {
    return node.nodeType === 3;
    });
    if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
    obj = [].slice.call(xml.childNodes).reduce(function(text, node) {
        return text + node.nodeValue;
    }, "");
    } else if (xml.hasChildNodes()) {
    for (var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof obj[nodeName] == "undefined") {
        obj[nodeName] = xmlToJson(item);
        } else {
        if (typeof obj[nodeName].push == "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
        }
    }
}
    return obj;
}






