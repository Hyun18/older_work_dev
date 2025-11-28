$(document).ready(function () {
    const countPerPage = 10; // 한 페이지에 표시할 게시글 수
    let currentPage = 1; // 현재 페이지 초기값


    // 게시판 제목 클릭 이벤트
    $('#board-title').click(function(){
        location.href = './list';
    });

    // 글쓰기 버튼 클릭 이벤트
    $('#write-btn').click(function(e) {
        if(!$(this).data('isLoggedIn')) {
            e.preventDefault();
            alert('로그인이 필요한 서비스입니다. 로그인 후 이용해주세요.');
            window.location.href = './';
            return;
        }
        // 로그인된 경우 글쓰기 페이지로 이동
        window.location.href = './write';
    });

    // 페이지 로드시 로그인 상태 확인
    checkLoginStatus();

    // 서버에서 총 게시글 수 가져오기
    function fetchTotalCount() {
        $.ajax({
            url: './api/board/totalCount',
            type: 'GET',
            success: function (totalCount) {
                const totalPages = Math.ceil(totalCount / countPerPage);
                initializePagination(totalPages);
            },
            error: function (error) {
                console.error('총 게시글 수를 가져오는 중 오류 발생:', error);
                alert('총 게시글 수를 가져오는 데 실패했습니다.');
            },
        });
    }

    // 특정 페이지의 게시글 데이터를 가져오는 함수 
    function fetchBoardList(page) {
        const start = (page - 1) * countPerPage;

        // 로딩 상태 표시
        const tbody = $('tbody');
        tbody.html('<tr><td colspan="5" style="text-align: center;">로딩 중...</td></tr>');

        $.ajax({
            url: './api/board/findAll',
            type: 'GET', 
            data: { start: start, count: countPerPage },
            success: function (data) {
                tbody.empty();

                // 게시글 데이터 추가
                data.forEach((board, index) => {
                    const row = `
                        <tr>
                            <td>${start + index + 1}</td>
                            <td><a href="./view?board_idx=${board.board_idx}">${board.title}</a></td>
                            <td>${board.id}</td>
                            <td>${board.created_date}</td>
                            <td>${board.view}</td>
                        </tr>
                    `;
                    tbody.append(row);
                });
            },
            error: function (error) {
                console.error('게시글 데이터를 가져오는 중 오류 발생:', error);
                tbody.html('<tr><td colspan="5" style="text-align: center; color: red;">게시글을 가져오지 못했습니다.</td></tr>');
            },
        });
    }

    // 페이지네이션 초기화
    function initializePagination(totalPages) {
        const pagination = $('#pagination');
        pagination.empty();

        // 이전 버튼 추가
        pagination.append(
            `<li class="page-item prev"><a href="#" data-page="prev">이전</a></li>`
        );

        // 페이지 번호 추가
        for (let i = 1; i <= totalPages; i++) {
            const pageItem = `<li class="page-item ${i === 1 ? 'active' : ''}"><a href="#" data-page="${i}">${i}</a></li>`;
            pagination.append(pageItem);
        }

        // 다음 버튼 추가
        pagination.append(
            `<li class="page-item next"><a href="#" data-page="next">다음</a></li>`
        );

        // 페이지 클릭 이벤트
        pagination.on('click', 'a', function (event) {
            event.preventDefault();
            const action = $(this).data('page');

            // 현재 페이지 계산
            if (action === 'prev' && currentPage > 1) {
                currentPage--;
            } else if (action === 'next' && currentPage < totalPages) {
                currentPage++;
            } else if (!isNaN(action)) {
                currentPage = action;
            }

            // 활성화 클래스 업데이트
            pagination.find('li').removeClass('active');
            pagination
                .find(`a[data-page="${currentPage}"]`)
                .parent()
                .addClass('active');

            // 해당 페이지의 데이터 로드
            fetchBoardList(currentPage);
        });

        // 첫 페이지 데이터 로드
        fetchBoardList(1);
    }

    // 페이지 로드 시 총 게시글 수 가져오기
    fetchTotalCount();

    
// 검색 버튼 클릭 이벤트 처리
function performSearch() {
    const searchType = $('#search-type').val(); // 검색 유형(제목/내용/작성자)
    const searchKeyword = $('#search-input').val(); // 검색어
    
    if(!searchKeyword.trim()) {
        // 검색어가 비어있으면 전체 목록 표시
        fetchBoardList(1);
        return;
    }
    
    // 검색 API 호출
    $.ajax({
        url: './api/board/search',
        type: 'GET',
        data: {
            searchType: searchType,
            keyword: searchKeyword,
            start: 0,
            count: 10
        },
        success: function(data) {
            const tbody = $('#board-list');
            tbody.empty();
            
            if(data.length === 0) {
                tbody.html('<tr><td colspan="5" style="text-align: center;">검색 결과가 없습니다.</td></tr>');
                return;
            }
            
            // 검색 결과 테이블에 표시
            data.forEach(function(item) {
                const row = `
                    <tr>
                        <td>${item.board_idx}</td>
                        <td>${item.title}</td>
                        <td>${item.id}</td>
                        <td>${item.created_date}</td>
                        <td>${item.view}</td>
                    </tr>
                `;
                tbody.append(row);
            });
        },
        error: function(error) {
            console.error('검색 중 오류 발생:', error);
            alert('검색 중 오류가 발생했습니다.');
        }
    });
}

// 검색 버튼 클릭 이벤트
$('#search-btn').click(performSearch);

// 엔터키 이벤트
$('#search-input').keypress(function(e) {
    if(e.which === 13) { // 엔터키의 keyCode는 13
        performSearch();
    }
});


// 로그인 상태 확인 및 글쓰기 버튼 활성화/비활성화
function checkLoginStatus() {
    // 기업회원 로그인 체크
    $.ajax({
        url: './api/corporation/checkCorporationLogin',
        type: 'GET',
        success: function(response) {
            if(response === true) { // 명시적으로 true 체크
                $('#write-btn').data('isLoggedIn', true);
            } else {
                // 개인회원 로그인 체크
                $.ajax({
                    url: './api/user/checkUserLogin', 
                    type: 'GET',
                    success: function(response) {
                        if(response === true) { // 명시적으로 true 체크
                            $('#write-btn').data('isLoggedIn', true);
                        } else {
                            $('#write-btn').data('isLoggedIn', false);
                        }
                    },
                    error: function() {
                        $('#write-btn').data('isLoggedIn', false);
                    }
                });
            }
        },
        error: function() {
            $('#write-btn').data('isLoggedIn', false);
        }
    });
}

});
