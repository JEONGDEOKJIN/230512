const router = require("express").Router();
    // 가져오고 > 실행하고 > 라우터 메소드를 라우터 변수에 담는다. 

const dot = require("dotenv").config();
    // 검증할 때, key 값이 필요할 테니까 
    // 이게 뭐지❓❓❓❓❓❓ 

const jwt = require("jsonwebtoken")


router.post('/' , (req, res) => {
    const token = req.session.token;

    // 토큰이 유효한지 검증!
    const key = process.env.KEY;
    
    jwt.verify(token , key, (err, decoded) => {
        if (err) {
            console.log("썩은 토큰");
            res.send("토큰 썩었으~ or 변조 되었으~")
        } else {
            // 해석된 객체
            console.log(decoded);
            res.send(decoded)
        }
    })
        // 'veryfy 메소드' 가 '토큰이 유효한지' 를 검증
        // 첫 번째 매개변수가 토큰을 전달, 
        // 두 번째 매개변수로 'key' 를 전달, 
        // 세 번째 매개변수로 '콜백함수' 를 전달
            // 콜백함수의 매개변수로 첫번째는 '에러 내용 객체' (실패하면 에러 내용 객체)
            // 콜백 함수의 매개변수 두 번째 '해석된 객체' (성공하면 해석된 객체)
})



// 내보내기 
module.exports = router;