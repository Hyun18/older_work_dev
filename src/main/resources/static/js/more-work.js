$(document).ready(function() {

const search = document.getElementById("#serchBtn");
        const LeadMore = document.getElementById("#LeadMore");

        search.addEventListener("click", () => {
            LeadMore.style.display = "block"; // 버튼 보이기
        });

});