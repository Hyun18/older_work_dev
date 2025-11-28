$(document).ready(function () {
  
  //상세 페이지 호출  
  detailWork();

  //제출 버튼 클릭 이벤트
  submitBtn();

  //목록 버튼 클릭 이벤트
  listBtn();
  
});



//상세 페이지 호출
function detailWork(){

    const projNo = getProjNo();
    const serviceKey = 'HqALeey0CnI%2B2ECy5mGQtbrcIy%2FxqqTImPIDROuuVZ0nn%2BGYnRfh0tm8Vu0aIT3wV6BW9Eqzt%2FuLRtzQr92eBw%3D%3D';
    const url = `http://apis.data.go.kr/B552474/JobBsnInfoService/getJobBsnRecruitInfo?projNo=${projNo}&ServiceKey=${serviceKey}`;
        
  $.ajax({
    url: url,
    type: 'get',
    async: false,
    success: function(xml){
      console.log(xml);
      var json = xmlToJson(xml);
      console.log(json);
      setDataToHTML(json);
    }
  });
}

//상세 페이지 이동시 projNo 호출
function getProjNo(){
  const projNo = localStorage.getItem('projNo');
  console.log(projNo);
  return projNo;
}

  // 데이터를 html에 변경
  function setDataToHTML(json){

    var data = json.response.body.item; 
    console.log(data);
    
    $('#orgName').text(data.orgName);
    $('#content').text(data.content);
    $('#workArea2').text(data.workArea);
    $('#content2').text(data.content);
    $('#intCnt2').text(data.intCnt);
    $('#projTime2').text(data.projTime);
    $('#pay2').text(data.pay);
    $('#orgName2').text(data.orgName);
    $('#telNum').text(data.telNum);
    $('#workPlace2').text(data.workPlace);
    $('#recuAgeNm2').text(data.recuAgeNm);
    $('#addr2').text(data.addr);
    $('#license2').text(data.license);
    $('#operPlan2').text(data.operPlan);
    $('#education2').text(data.education);
    $('#projDate2').text(data.projDate);

    // 날짜 형식 변환 (20240101 ~ 20241231)
    let projDateStr = data.projDate;
    if(projDateStr) {
      let startDate = projDateStr.substring(0,8);
      let endDate = projDateStr.substring(11);
      
      startDate = startDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
      endDate = endDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
      console.log(startDate, endDate);
      
      $('#startDate').text(startDate);
      $('#endData2').text(endDate);
      $('#states').text(getDate(startDate, endDate));
      console.log(getDate(startDate, endDate));
    }
  }






// 현재 날짜 변수
 function getDate(s, e) {
  
  const today = getTodayMidnightMillis();
  const startDate = convertDateToMillis(s);
  const endDate = convertDateToMillis(e);
  if(today >= startDate && today <= endDate){
      return '모집중';

  }else{            
      return '마감';            
  }
  }




//날짜를 밀리초로 변환하는 함수
    function convertDateToMillis(dateString) {
        if(dateString==undefined){
            return getTodayMidnightMillis();
        }
        // 입력 날짜 문자열을 파싱하여 연, 월, 일 추출
        const year = parseInt(dateString.substring(0, 4), 10);
        const month = parseInt(dateString.substring(5, 7), 10) - 1; // 월은 0부터 시작
        const day = parseInt(dateString.substring(8, 10), 10);

        // 자정 시간으로 Date 객체 생성
        const date = new Date(year, month, day, 0, 0, 0, 0);

        // 밀리초 타임스탬프 반환
        return date.getTime();
    }





// 오늘 자정 밀리초 가져오는 함수
    function getTodayMidnightMillis() {
        // 현재 날짜
        const now = new Date();
    
        // 오늘 자정 시간으로 Date 객체 생성
        const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    
        // 밀리초 값 반환
        return midnight.getTime();
    }






//목록 버튼 클릭
function listBtn(){
$('#list-btn').on('click',function(){
  location.href = './work';
});
}



// 접수 버튼 클릭 이벤트
function submitBtn(){
  $('#submit-btn').on('click',function(){
    //유저 아이디 호출
	  submitWork()
  });
}


// 접수 처리 함수
function submitWork() {
	
  $.ajax({
    url: './api/usersublist/subListSave',
    type: 'post',
    data: {
      projNo: getProjNo()
    },
    success: function(response) {
		if (response.message === "중복 신청입니다.") {
		  alert('중복 신청입니다.');
		  return; 
		}
		if (response.message === "로그인이 필요한 서비스입니다.") {
		  alert('로그인이 필요한 서비스입니다.');
		  location.href = './';
		  return;
		}
		if (response.message === "접수가 완료되었습니다.") {
			alert('접수가 완료되었습니다.'); 
		}
    },
    error: function(xhr, status, error) {
      console.error('접수 중 오류 발생:', error);
      alert('접수 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  });
}






//xml을 json으로 변환하는 함수
function xmlToJson(xml) {
  // 반환할 객체 생성
  var obj = {};

  if (xml.nodeType == 1) {
    // 요소 노드
    // 속성 처리
    if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType == 3) {
    // 텍스트 노드
    obj = xml.nodeValue;
  }

  // 자식 노드 처리
  // 모든 텍스트 노드 내부에 있는 경우 텍스트를 연결하여 가져옵니다.
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


