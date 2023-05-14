const express = require("express");
const router = express.Router();
    // 익스프레스 중 라우터 써서 라우터 받는다. 

// 라우터에 GET 방식 요청이 오면
    router.get("/" , (req, res) => {
        res.render("page");
    })


// 내보내기 
    module.exports = router;