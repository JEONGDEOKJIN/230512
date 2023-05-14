// jsonwebtoken,dotenv 설치
    // npm i jsonwebtoken dotenv 


const express = require("express").Router();
    // express 실행하고 > 실행한거 안에 있는 라우터 객체 실행 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 

const dot = require("dotenv").config();

const jwt = require('jsonwebtoken');
const router = require("./page");

router.post("/login" , (req, res) => {
    const name = "soon";
    const KEY = process.env.KEY

    let token = jwt.sign({
        // 토큰의 타입 
        type : jwt, 
        name : name, // 유저네임 
    
    }, KEY, {
        // 토큰의 유효시간 
        expiresIn : "3m",

        // 토큰 발급자 
        issuer : name
    })
    req.session.token = token;
        // 이걸 넣어줘야, undefined 가 안 뜸 

    res.render("page2");
        // 해석된 객체가 뜸 
        // 3분 이후에 

})

// ◼ 앞으로 할 것 
    // 다른 곳에 로그인 했으면 로그인을 중복 로그인을 방지해주자 
    // 데이터 베이스에 액세스 토큰을 저장하고 
    // 로그인을 하면 액세스 토큰을 갱신시켜주는 작업 

    // 이 세션이 있으면 > 로그인을 유지 
    // 세션 값 받아오는건, VERIFY 에서 token 받아오는 곳에서 하면 됨. 

// ◼ 오늘 해볼 것 
    // 1) 액세스 토큰 사용하는 역할, 이유, key 사용하는 이유, 서명, 
    // 2) 데이터 베이스 로그인 유지, 

    // 액세스 토큰 이용해서 로그인 유지 
    
    // 로그인 유지 토큰이 정상적으로 로그인 유지를 시킨다. 
    // 로그인 한 사람의 정보는 토큰의 payload 값을 해석하면, 로그인 유지중인 유저 프로필을 사용하면 된다. 


module.exports = router;