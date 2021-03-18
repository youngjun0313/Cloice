var express = require('express');
var app  = express();

var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');
const fs = require('fs');
const mime = require('mime');

app.use(express.json({ limit : "50mb" }));

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded({ limit:"50mb", extended: false }));

var db = mysql.createConnection({
    host: '192.249.18.100',
    port: '3306',
    user: 'cloice',
    password: 'cloice1234',
    database: 'cloicedb'
})

db.connect(function(error){
    if(error) console.log(error)
    else console.log("connected")
});

app.listen(3333, () => {
    console.log("server connected");
});

//회원가입용
app.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const nickname = req.body.nickname;
    const gender = req.body.gender;

    //res.send를 무조건 해줘야지 then 함수에서 응답을 할 수 있다.
    db.query("INSERT INTO users (email, password, nickname, gender) VALUES (?,?,?,?)", [email, password, nickname, gender], (err, result) => {
        if(err) {
            console.log(err);
            res.send({ message: "회원 가입 실패" });
        }
        console.log("회원 정보 입력 완료")
        res.send(result)
    })
})

//로그인용
app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE email = ? AND password = ?",
        [email, password],
        (err, result) => {
            if(err) {
                res.send({ err: err })   
            }
            
            if(result.length > 0) {
                res.send(result);
                console.log(result[0].email);
            } else {
                console.log("로그인 실패");
                res.send({ message: "Wrong email/password combination" });
            }
    })
})

//이메일 중복확인
app.post("/dupemail", (req, res) => {
    const email = req.body.email;

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, result) => {
            if(err) {
                res.send({ err: err })   
            }
            
            if(result.length > 0) {
                res.send({ message: "중복된 이메일" });
                console.log("중복된 이메일");
            } else {
                res.send(result);
                console.log("이메일 생성 가능");
            }
    })
})

//닉네임 중복확인
app.post("/dupnick", (req, res) => {
    const nickname = req.body.nickname;

    db.query(
        "SELECT * FROM users WHERE nickname = ?",
        [nickname],
        (err, result) => {
            if(err) {
                res.send({ err: err })   
            }
            
            if(result.length > 0) {
                res.send({ message: "중복된 닉네임" });
                console.log("중복된 닉네임");
            } else {
                res.send(result);
                console.log("닉네임 생성 가능");
            }
    })
})

//파일 업로드 및 디비에 위치 저장
app.post('/uploadCloth', (req, res) => {

    const email = req.body.email;
    const base64Image = req.body.base64Image;
    const clothName = req.body.clothName;
    const brand = req.body.brand;
    const price = req.body.price;
    const st_casual = req.body.st_casual;
    const st_dandy = req.body.st_dandy;
    const st_street = req.body.st_street;
    const st_hiphop = req.body.st_hiphop;
    const memo = req.body.memo;

    var matches = base64Image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};
     
    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }
     
    response.type = matches[1];
    response.data = new Buffer.from(matches[2], 'base64');
    let decodedImg = response;
    let imageBuffer = decodedImg.data;
    let type = decodedImg.type;
    let extension = mime.getExtension(type);
    let fileName = Date.now() + "." + extension;
    try {
        fs.writeFileSync("./images/" + fileName, imageBuffer, 'utf8');
        db.query(
            "INSERT INTO files (email, file, clothName, brand, price, st_casual, st_dandy, st_street, st_hiphop, memo) VALUES (?,?,?,?,?,?,?,?,?,?)", 
            [email, "http://10.0.2.2:3333/server/images/" + fileName, clothName, brand, price, st_casual, st_dandy, st_street, st_hiphop, memo], 
            (err, result) => {
                console.log(err)
                if(err) {
                    res.send({ err: err });
                }
                
                res.send(result);
        })
    } catch (e) {
        console.log(e)
    }

})

//옷장 정보 받아오기
app.get('/getCloset', (req, res) => {
    const email = req.query.email;

    db.query("SELECT * FROM files WHERE email = ?",
        [email],
        (err, result) => {
            if(err) {
                console.log(err);
                res.send({ err: err });
            }

            res.send(result)

            // const imageURL = result[0].BASE_FILE;
            // const nickname = result[0].NICK;
            // const text = result[0].POST_TEXT;

            // res.send({imageURL: imageURL, nickname: nickname, text: text});
    })
})

//피드 받아오기
app.get('/feed', (req, res) => {
    db.query("SELECT * FROM posts",
    (err, result) => {
        if(err) {
            res.send({ err: err })
        }

        const base64Iamge = result[0].BASE_FILE;
        const nickname = result[0].NICK;
        const text = result[0].POST_TEXT;

        res.send({base64Iamge: base64Iamge, nickname: nickname, text: text});
    })    
})