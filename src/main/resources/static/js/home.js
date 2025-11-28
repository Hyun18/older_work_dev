//로그인 타입 선택
$(document).ready(function() {
    $('.login-btn').click(function() {
        $('.login-btn').removeClass('active');
        $(this).addClass('active');
    });

});

$(document).ready(function() {
    $('.slider-wrapper').click(function() {
        const detail_idx = $(this).data('detail_idx'); // slider-wrapper 요소의 data 속성에서 detail_idx를 가져옴
        console.log('클릭된 detail_idx:', detail_idx);
        if (detail_idx) {
            location.href = `old-detail-work?detail_idx=${detail_idx}`; // URL에 detail_idx 값을 포함시켜 이동
        } else {
            console.error('detail_idx를 찾을 수 없습니다.');
        }
    });
});


//회원가입 버튼
$(document).ready(function() {
    $('#signup-btn').click(function(){
        location.href='./mid_save-user';
    });
});

//기업회원 버튼
$(document).ready(function() {
    $('#company-btn').click(function(){
        location.href='./company-save-user';
    });
});

//개인회원 버튼
$(document).ready(function() {
    $('#personal-btn').click(function(){
        location.href='./save-user';
    });
});

//개인회원 마이페이지 버튼
$(document).ready(function() {
    $('#upage-btn').click(function(){
        location.href='./user-page';
    });
});

//기업회원 마이페이지 버튼
$(document).ready(function() {
    $('#cpage-btn').click(function(){
        location.href='./company-page';
    });
});

//자유게시판 버튼
$(document).on('click', '#board-btn', function() {
    location.href = './list';
});

//구인공고 버튼
$(document).ready(function() {
    $('#work-btn').click(function(){
        location.href='./company-save-detail';
    });
});


$(document).ready(function () {
    // 데이터를 가져와 게시판에 추가
    function fetchBoardData() {
        $.ajax({
            url: './api/board/findAll',
            type: 'GET',
            success: function (data) {
                const boardContainer = $('#board-slider');
                boardContainer.empty();

                // 최대 3개의 게시글만 표시
                const maxCards = 3;
                const displayData = data.slice(0, maxCards);

                displayData.forEach((board) => {
                    // board_idx로 이미지 URL 조회
                    $.ajax({
                        url: `./api/board/findByIdx?board_idx=${board.board_idx}`,
                        type: 'GET',
                        async: false,
                        success: function (boardDetail) {
                            const card = `
                                <div class="board-card" data-board-idx="${board.board_idx}" style="cursor:pointer">
                                    <img src="${boardDetail.img_url}" alt="공지사항" class="notice-img">
                                    <h3>${board.title}</h3>
                                    <p>${board.content}</p>
                                    <span>${board.created_date}</span>
                                </div>
                            `;
                            boardContainer.append(card);
                        },
                        error: function (error) {
                            console.error('이미지 URL을 가져오는 중 오류 발생:', error);
                        }
                    });
                });

                // board-card 클릭 이벤트 추가
                $('.board-card').on('click', function() {
                    const boardIdx = $(this).data('board-idx');
                    location.href = `/view?board_idx=${boardIdx}`;
                });
            },
            error: function (error) {
                console.error('데이터를 가져오는 중 오류 발생:', error);
            }
        });
    }

    // 초기 데이터 로드
    fetchBoardData();
});



// //노인 일자리 기능
// function work(){
//     $('.item-list').hide();
//     $('.item-title').click(function(){
//         let title = $(this).closest('.navbar');

//         title.find('.item-list').slideToggle();

//         $('.item-title').not(title).find('.item-list').slideUp();
//     })

//     // item-list 클릭 시 이벤트 전파 중지
//     $('.item-list').click(function(e) {
//         e.stopPropagation(); // 상위 엘리먼트들로의 이벤트 전파를 중단
//     });
// }

// 노인 일자리 슬라이더
document.addEventListener("DOMContentLoaded", function () {
    const itemTitle = document.querySelector(".item-title");
    const itemList = document.querySelector(".item-list");

    itemTitle.addEventListener("mouseover", function () {
        itemList.style.maxHeight = "200px"; // ul의 최대 높이
        itemList.style.opacity = "1"; // 보이도록 설정
    });

    itemTitle.addEventListener("mouseout", function () {
        itemList.style.maxHeight = "0"; // ul 숨김
        itemList.style.opacity = "0"; // 투명도 설정
    });
});