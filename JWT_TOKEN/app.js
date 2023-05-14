// 🔷 이번 파일 목표! 
    // 검증! 할거야!! 
    // 게시판 혼자 짤 줄 알면 만드는 건 어렵지 않아. ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐
    // 우리는 게시판 위주로 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 


// 🔷 프로젝트 시작 (안 보고 할 수 있게 연습! | 시작할 때 하는 기본 셋팅 ⭐⭐⭐⭐⭐)
    // packjason
    // express
    // page 폴더 
    // 경로연결 view 
    // view engin ejs 
    // body 객체 사용 


// 설치할 모듈 
    // npm init -y
    // npm i express ejs


// 모듈 가져오기 
    const express = require("express");
    const path = require("path");
    const session = require("express-session");
    const pageRouter = require('./routers/page');
    const tokenRouter = require('./routers/token');
    const verifyRouter = require('./routers/verify');



// 서버 인스턴스 생성 
const app = express();

// 세션을 사용하기 위해 설치할 모듈
    // npm i express-session
    // 이 모듈을 써서, 세션을 사용할 것 임.
    // 요청과 응답 간, 미들웨어로 추가해줄 것 



// view 엔진 파일 경로 
    app.set("views" , path.join(__dirname, "page"));
        // 혹시 views 라는 폴더를 쓰는건, view 엔진이라고 정해져 있어서? 그래서 view 엔진 경로 인가❓❓❓❓❓

// 사용할 view 엔진은 ejs 
    app.set("view engine" , "ejs");

// 깊은 객체 사용 여부 false | body 객체 사용하기 위해서 
    app.use(express.urlencoded({extended : false}))

// 세션 
    app.use(session({
        // 세션을 발급할 때, 사용할 key 
        // 이것도 나중에는 소스코드에 노출 안 되게, 바꿔 놓아야 함. 
        // so, 이것도 env 로 빼놓기 
        
        // 이 키가 있어야 해석이 될 수 있음. 
        secret : process.env.KEY2, 

        // 세션이 변경되거나, 저장하고 불러올 때나, 다시 불러올 때, 다시 저장할지 여부 
        resave : false, 
            // 다시 저장 안 할거야~ 라는 선택 

        // 세션에 저장할 때, 초기화 할지 여부 
        saveUninitialized : true, 

    }))

// 미들웨어로 추가~ 
app.use(pageRouter);
app.use(tokenRouter);
app.use("/useVerify" , verifyRouter)        // 앞에 붙는 경로 하나 만들고, verifyRouter 만듦


// 서버 듣고 있게 하기
    app.listen(8020, () => {
        console.log("듣는중🙇‍♂️")
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

// ◼ 음... 
    // 미들웨어, 정상인걸 확인하고, 또 뭘 하지? ❓❓❓ 
    // 음... 세션? 토큰? 