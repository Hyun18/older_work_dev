$(document).ready(function () {

    
    

    // URL에서 board_idx 추출
    const urlParams = new URLSearchParams(window.location.search);
    const boardIdx = urlParams.get('board_idx'); // board_idx 값 가져오기

    if (!boardIdx) {
        alert('게시글 식별자가 누락되었습니다.');
        return;
    }

	//삭제 버튼 클릭 이벤트 리스너 추가
	    $('#delete-btn').on('click', function (event) {
	        event.preventDefault();
	        if (confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
	            deleteBoard(boardIdx);
	        }
	    });

	// 수정 버튼 클릭 이벤트 리스너 추가
	    $('#modify-btn').on('click', function(event) {
	        event.preventDefault();
	        // 현재 로그인한 사용자 ID와 게시글 작성자 ID 비교
			const currentUserId = $('#loginId').val(); // 현재 로그인한 사용자 ID (hidden input 등으로 전달 필요)
			const postAuthorId = $('#id span').text();
			const loginCompanyId = $('#loginCompanyId').val();
			console.log(currentUserId);
			console.log(postAuthorId);
			console.log(loginCompanyId);
			
			// 사용자 타입에 따라 처리
	        if (currentUserId === postAuthorId) {
	            window.location.href = `/modify?board_idx=${boardIdx}`;
	        }else if (loginCompanyId === postAuthorId) {
			    window.location.href = `/modify?board_idx=${boardIdx}`;
			}else {
	            alert('자신이 작성한 게시글만 수정할 수 있습니다.');
	        }
	    });

    // 게시판 상세 데이터 불러오기
    fetchBoardDetail(boardIdx);

        

});


function fetchBoardDetail(boardIdx) {
    $.ajax({
        url: `./api/board/findByIdx?board_idx=${boardIdx}`, // 서버 API 호출
        type: 'GET',
        success: function (data) {
            // 가져온 데이터를 화면에 표시
			$('#subject-title').text(data.title); // h2 태그 안의 span에 제목 표시
            $('#img_url span').html(`<img src="${data.img_url}" alt="게시글 이미지" style="max-width:50%; height:auto; display: block; margin: 0 auto;">`);
            $('#subject span').text(data.title);
            $('#id span').text(data.id);
            $('#created_date span').text(data.created_date);
            $('#content span').text(data.content);
            

            // 조회수 증가 처리
            increaseViewCount(boardIdx);
        },
        error: function (error) {
            console.error('게시글 데이터를 불러오는 중 오류 발생:', error);
            alert('게시글을 불러오는데 실패했습니다.');
        }
    });
}

//조회수 증가
function increaseViewCount(boardIdx) {
    $.ajax({
        url: `./api/board/viewCount?board_idx=${boardIdx}`, // 조회수 증가 API 호출
        type: 'GET',
        error: function () {
            console.error('조회수 증가 실패');
        }
    });
}


// 게시글 삭제
function deleteBoard(boardIdx) {
    // 현재 로그인한 사용자의 ID 가져오기
    const loginId = $('#loginId').val();
    const loginCompanyId = $('#loginCompanyId').val();
    const postId = $('#id span').text();

    // 게시글 작성자와 로그인한 사용자 ID 비교
    if (postId === loginId || postId === loginCompanyId) {
        $.ajax({
            url: `./api/board/delete?board_idx=${boardIdx}`,
            type: 'GET',
            success: function () {
                alert('게시글이 삭제되었습니다.');
                window.location.href = './list';
            },
            error: function (error) {
                console.error('게시글 삭제 중 오류 발생:', error);
                alert('게시글 삭제에 실패했습니다.');
                window.location.href = './list';
            }
        });
    } else {
        alert('자신이 작성한 게시글만 삭제할 수 있습니다.');
        window.location.href = './list';
    }
}