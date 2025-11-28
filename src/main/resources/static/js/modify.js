//게시판 글 수정
$(document).ready(function(){

    let uploadedImageUrl = '';

    // Firebase 초기화 설정
    const firebaseConfig = {
        apiKey: "AIzaSyAW51jwJDfL4GIbjJIkrhRG5Ctfe6pXJ-M",
        authDomain: "older-work.firebaseapp.com",
        projectId: "older-work",
        storageBucket: "older-work.firebasestorage.app",
        messagingSenderId: "164785229087",
        appId: "1:164785229087:web:6636ac7f554fb929e4f42a",
        measurementId: "G-YTSY92ZWFS"
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    // URL에서 board_idx 파라미터 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const board_idx = urlParams.get('board_idx');
    
    // 기존 게시글 데이터 불러오기
    $.ajax({
        url: `./api/board/findByIdx?board_idx=${board_idx}`,
        type: 'GET',
        success: function(data){
            console.log(data);
            $('#title').val(data.title);
            $('#content').val(data.content);
            uploadedImageUrl = data.img_url;
            // 이미지 미리보기 표시
            $('#profile-img').attr('src', data.img_url).show();
            // 파일 입력에 기존 이미지 URL 설정
            const fileInput = $('#file');
            fileInput.attr('data-original-url', data.img_url);
        },
        error: function(error){
            alert('게시글을 불러오는데 실패했습니다.');
        }
    });

    // 파일 선택 시 이미지 미리보기 및 업로드
    $('#file').on('change', function(event) {
        const file = event.target.files[0];
        if(file) {
            // 이미지 미리보기
            const reader = new FileReader();
            reader.onload = function(e) {
                $('#profile-img').attr('src', e.target.result).show();
            }
            reader.readAsDataURL(file);

            // Firebase Storage에 이미지 업로드
            const storageRef = firebase.storage().ref();
            const imageRef = storageRef.child('images/' + new Date().getTime() + '_' + file.name);
            
            imageRef.put(file).then(function(snapshot) {
                return snapshot.ref.getDownloadURL();
            }).then(function(downloadURL) {
                uploadedImageUrl = downloadURL;
                console.log('File available at', downloadURL);
            });
        } else {
            // 파일이 선택되지 않은 경우 기존 이미지 URL 사용
            uploadedImageUrl = $('#file').attr('data-original-url');
        }
    });

    // 수정 버튼 클릭 시
    $('#modify-success-btn').on('click', function(event){
        event.preventDefault();
        
        const formData = {
            board_idx: board_idx,
            img_url: uploadedImageUrl,
            title: $('#title').val(),
            content: $('#content').val()
        };

        $.ajax({
            url: `./api/board/update?board_idx=${board_idx}`,
            type: 'POST',
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function(response){
                alert('게시글이 수정되었습니다.');
                window.location.href = './list';
            },
            error: function(error) {
                console.error('오류 발생:', error);
                alert('게시글 수정 중 오류가 발생했습니다.');
            }
        });
    });

    $('#back').on('click', function(event){
        event.preventDefault();
        window.location.href = './view?board_idx=' + board_idx;
    });

});