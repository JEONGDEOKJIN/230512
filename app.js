


// 🔷 '로그인 할 때 검증' , '로그인 유지되는 시간 관련' 
    
    // 'JWT 토큰' 
        // 존맛탱 토큰
        // 로그인이 유지되고 있는지, 만료 된 건지
        // 정상적인 토큰인지도
        
        // JSON Web Token 
        // 웹 표준으로 두 객체의 json 객체를 사용해서, 정보를 안정성 있게 전달. 

        // 사용할 정보를 자체적으로 가지고 있다. (우리가 필요한 유저 정보 같은)
        // JWT 로 발급한 토큰은 기본정보 (유저의 프로필) 
        // 민감한 정보는 안 된다. 

        // 토큰이 정상인지 검증! 해야 함. 
        // 정상인지는 '서명' 으로 검사 한다. (signature)

        // 주로, 로그인이 정상적인지 회원 인증 권한에서 사용한다. 

        // JWT은 유저가 로그인하면, 서버에서 유저의 정보를 가지고, 
            // 정상적인 루트로 로그인을 요청한 유저면, '토큰' 을 발급해서 전달한다. (영화표) 
            // 유저가 서버에 요청을 할 때, JWT 토큰을 포함해서 요청을 하면, 서버가 요청을 받고, 토큰이 썩은 토큰인지 검사해서,
            // 착한 토큰이면, 유저가 요청한 작업을 처리해주고, 응답해준다. 
            // EX) 영화표를 사면, 영화 시간이 몇시 까지, 인지 '유효 기간' 이 있다. '몇시 까지 와~' 이런거 
            // EX) 갖고 오면 > "시간 지났어요~ 아니면, 괜찮네요~" 라는 거
            // 토큰을 사용하는 이유는 '로그인 유지 시킬 때, 토큰 썩은지 여부를 판단해서 > 로그인 유지를 처리' 가 중요 ⭐⭐⭐⭐⭐⭐ 

        
        // JWT 를 쓰는 이유는, 안정성 있게 정보를 전달해서, 요청을 할 수 있다. 
            // 아무나 쓰면 안 되니까, '해싱 작업' '암호화' '인코딩' 작업을 한다. 
            // JWT 를 생성하면, 사용할 모듈이 '인코딩' '해싱작업' 을 해준다. 

            // HMAC : 해싱 기법을 적용해서, 메시지의 위변조를 방지하는 기법 
            // SHA256 : 해싱 알고리즘임, 전달한 문자열을 '암호화' 시킴. | 현재 암호화 알고리즘 중에서 가장 많이 사용함
                // 임의의 길이 메시지를 256 비트의 축약된 메시지로, 만들어 내는 해시 알고리즘 
                // 블록체인에서 한번 더 나옴!

    // 🔷 JWT 구조 
        
    // let header = {
    //     alg : "SHA256", // 헤더 안에 알고리즘 있음. 사용하는 해싱 알고리즘
    //     type : "JWT",   // 토큰의 타입 
    // } 

    // let payload = {
    //     // 토큰의 이름, 제목
    //         sub : "546534", 
    //     // 유저의 이름 (유저 프로필) 
    //         name : "fldsakdjf", 
    //     // 토큰 발급된 시간 (발급된지 얼마나 지났는지)
    //         lat : "123123123"   // 토큰이 발급되고 시간이 얼마나 지나는지 담아서 전달 
    // }

    // 이 2개의 객체를 이용해서 '서명' 을 만든다. 

    // 비밀키 생성
        // let signature = HMACSHA256(BASE64URL(header)) + BASE64URL(payload);
            // header 와 payload 내용을 base 64 로 변경하고 
            // sha256 알고리즘을 이용해서 
            // 서명 으로 만듦. 
            // 그래서 비밀키로 생성 
            // 즉, 값을 합쳐서 비밀키로 해싱

            // header : 타입과 알고리즘의 정보를 갖고 있음. 
            // payload : 유저의 정보, 만료 기간이 포함된 객체를 갖고 있다. 
            // signature : header 와 payload 를 인코딩하고, 합쳐서, 해싱(HMACSHA256)해서, '비밀키' 로 만든다.

    // 다른 토큰 (다음 수업 때 할 것)
        // refresh 토큰 : 접속에 관한 역할을 해주는 토큰을 발급해 주는 토큰 
        // access 토큰 : 접속을 유지하기 위해 필요한 토큰 


// 🔷 오늘 사용할 모듈 
    // express, jsonwebtoken, dotenv, ejs 도 설치 해야 함 

    // dotenv 어플리케이션 만들면서, 설정값들을 이곳에 작성함 
        // 이유는?
            // '보안' 
            // 즉, 민감한 정보를 탈취 당하지 않기 위해, .env 파일에 작성해 둔다.
            // 패스워드를 소스코드에 작성하면, 해킹될 수 있으니까. 
        // 비밀키, 암호, API 토큰 등등을 저장해 놓는다.
        // 

    // express 설치
        const express = require("express");

    // jwp 모듈 가져오기 
        const jwt = require("jsonwebtoken")

    // dotenv 모듈 가져오면서, config 메소드 실행
        const dot = require("dotenv").config();
            // [해석]
                // config 실행하면 > env 파일을 읽어서 적용
                // env 파일은 '루트경로, 최상단!' 에 만들기 

            // .env 파일 만든 이유 
                // jwt 토큰을 만들 것 임. 
                // 이때, 비밀키를 가지고, 토큰을 만들어서, 암호화, 시킬 예정. 
                // 이때, '비밀키' 는 탈취 되면 안 돼 
                // so, env 파일에, '비밀키' 를 넣을 예정. 
        // 키 가져오기 
        const KEY = process.env.KEY;
            // process.env 객체에, 우리가 env 파일에 설정한 이름으로 키값이 들어있다. 

    // path
        const path = require("path")


// 서버 인스턴스 넣어주기
    const app = express();



// 🔷로그인 하면, 토큰을 만들어주는 페이지 만들기

    // view 엔진 파일 경로   
        app.set("views" , path.join(__dirname, "page"));
            // 이게 view 엔진 파일 경로, 라는 걸 어떻게 알아? 다른 것의 경로 일 수도 있잖아 ❓❓❓❓❓
    // 사용할 view 엔진은 ejs 
        app.set("view engine" , "ejs")
    // 깊은 객체 사용 여부에 대한 설정 , 깊은 객체 사용 안 하니까, false, body 객체 사용하기 위해서
        app.use(express.urlencoded({extended : false}))

        app.get("/" , (req, res) => {
            res.render("main");
        })

        app.post("/login" , (req, res) => {
            // 로그인을 하면, 정상적으로, 했다 가정하고, 
            // 토큰을 발급!
            // 유저 정보는 변수로 만들어주자! 

            const name = "user1"; // 이 친구가 로그인 함. 
            const KEY = process.env.KEY;

            // sign 이라는 메소드로 JWT 토큰을 생성 
            let token = jwt.sign({
                // 타입은 JWT
                type : "JWT", 
                // 유저 이름 
                name : name
            }, KEY, // 이 KEY 를 가지고 복호화 를 한다. 
            {
                // 토큰을 유지시킬 만료시간, 유효시간 
                expiresIn : "5m",   // 5분 유지 
                // 토큰 발급한 사람
                issuer : "user1"
            })
            res.send(JSON.stringify(token)); 

                // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwibmFtZSI6InVzZXIxIiwiaWF0IjoxNjgzODU4NDk4LCJleHAiOjE2ODM4NTg3OTgsImlzcyI6InVzZXIxIn0.3oMh07izFiHmf74rCUklg0nByENmD53ocqNS49tPTf4"
                    // . 으로 구분 
                    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. : 헤더 
                    // ".eyJ0eXBlIjoiSldUIiwibmFtZSI6InVzZXIxIiwiaWF0IjoxNjgzODU4NDk4LCJleHAiOjE2ODM4NTg3OTgsImlzcyI6InVzZXIxIn0 : 페이로드
                    // .3oMh07izFiHmf74rCUklg0nByENmD53ocqNS49tPTf4" : 서명
                    // 이렇게 토큰이 구성됨 

                // 매개변수
                    // 첫 번째 매개변수 : header 객체 
                    // 두 번째 매개변수 : 비밀키
                    // 세 번째 매개변수 : payload 값을 넘길 것 임. 


        })



// 🔷 서버 대기 상태 만들기
const PORT = 8050;
app.listen (PORT, () => {
    console.log("듣고 있어요~")
});







