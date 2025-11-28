$(document).ready(function () {
    // 로그인 체크
    const loginUser = $('#id').val().trim();
    if (!loginUser) {
        alert('로그인이 필요한 서비스입니다.');
        window.location.href = './';
        return;
    }

    // Firebase 초기화
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    // 스토리지 초기화
    var storage = firebase.storage();
    var selectedMainImgBase64 = "";
    var uploadedImageUrl = ""; // 업로드된 이미지 URL 저장용 변수

    // 이미지 선택 및 업로드 처리
    $('#file').change(async function () {
        var file = $(this)[0].files[0];
        if (file) {
            try {
                // 미리보기 처리
                const base64 = await myFirebase.getBase64(file);
                $('#profile-img').attr('src', base64).show(); // 미리보기 표시
                selectedMainImgBase64 = base64; // base64 데이터 저장

                // Firebase 스토리지에 업로드
                uploadedImageUrl = await myFirebase.uploadBoardImage(storage, base64);
                console.log('업로드된 이미지 URL:', uploadedImageUrl); // URL 확인용 로그 추가
            } catch (error) {
                console.error('Error during upload:', error);
                alert('이미지 업로드 중 오류가 발생했습니다.');
            }
        }
    });

    // 폼 제출 이벤트 처리
    $('#submit-btn').on('click', async function (event) {
        event.preventDefault(); // 기본 폼 제출 동작 중단

        // 필수 입력값 검증
        const title = $('#title').val().trim();
        const id = $('#id').val().trim();
        const content = $('#content').val().trim();

        if (!title) {
            alert('제목을 입력해주세요.');
            $('#title').focus();
            return;
        }


        if (!content) {
            alert('내용을 입력해주세요.');
            $('#content').focus();
            return;
        }

        // 제목 길이 체크
        if (title.length > 22) {
            alert('제목은 22자를 초과할 수 없습니다.');
            $('#title').focus();
            return;
        }

        // 내용 길이 체크
        if (content.length > 1000) {
            alert('내용은 1000자를 초과할 수 없습니다.');
            $('#content').focus();
            return;
        }

        // 이미지 URL 확인
        if (!uploadedImageUrl) {
            alert('이미지를 선택하고 업로드해주세요.');
            return;
        }

        // 폼 데이터 가져오기
        const formData = {
            title: title,
            id: id,
            content: content,
            img_url: uploadedImageUrl // 이미지 URL 추가
        };

        console.log('전송할 폼 데이터:', formData); // 전송 데이터 확인용 로그 추가

        // 서버에 AJAX 요청 보내기
        $.ajax({
            url: './api/board/create',
            type: 'POST',
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function (response) {
                console.log('서버 응답:', response); // 서버 응답 확인용 로그 추가
                alert('게시글이 성공적으로 작성되었습니다.');
                window.location.href = './list';
            },
            error: function (error) {
                console.error('서버 오류:', error); // 자세한 오류 정보 로깅
                alert('게시글 작성 중 오류가 발생했습니다. 다시 시도해주세요.');
            }
        });
    });
});

// Firebase 설정
const firebaseConfig = {
    apiKey: "AIzaSyAW51jwJDfL4GIbjJIkrhRG5Ctfe6pXJ-M",
    authDomain: "older-work.firebaseapp.com",
    projectId: "older-work",
    storageBucket: "older-work.firebasestorage.app",
    messagingSenderId: "164785229087",
    appId: "1:164785229087:web:6636ac7f554fb929e4f42a",
    measurementId: "G-YTSY92ZWFS"
};

// Firebase 유틸리티 객체
var myFirebase = {
    getBase64: async function (file) {
        return new Promise(function (resolve, reject) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                resolve(reader.result);
            };
            reader.onerror = function (error) {
                reject(error);
            };
        });
    },

    uploadBoardImage: async function (storage, base64) {
        return new Promise(function (resolve, reject) {
            const timestamp = Date.now();
            const ref = storage.ref('board').child(`${timestamp}.png`);
            ref.putString(base64, 'data_url')
                .then(() => ref.getDownloadURL())
                .then((url) => resolve(url))
                .catch((err) => {
                    console.error('Firebase upload error:', err);
                    reject(err);
                });
        });
    }
};
