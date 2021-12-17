var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');
const saltRounds = 10;

let jwt = require("jsonwebtoken");
let secretObj = require("../ignorefile/jwt");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', (req, res, next) => {
    var type = req.query.type;
    if(type == "signup"){
      //회원가입 정보 삽입
      try {
        // Mysql Api 모듈(CRUD)
        var dbconnect_Module = require('./dbconnect_Module');
    
        //Mysql 쿼리 호출정보 입력
        req.body.mapper = 'UserMapper';//mybatis xml 파일명
        req.body.crud = 'insert';//select, insert, update, delete 중에 입력
        req.body.mapper_id = 'insertUser';
    
        var myPlaintextPassword = req.body.is_Password;
        if(myPlaintextPassword != '' && myPlaintextPassword != undefined ){
          bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
              req.body.is_Password = hash;
              router.use('/', dbconnect_Module);
              next('route')
            });
          });
        }else{
          router.use('/', dbconnect_Module);
          next('route')
        }
      } catch (error) {
        console.log("Module > dbconnect error : "+ error);      
      }
    }else if(type == "dplicheck"){
      //이메일 중복체크
      try {
        // Mysql Api 모듈(CRUD)
        var dbconnect_Module = require('./dbconnect_Module');
    
        //Mysql 쿼리 호출정보 입력
        req.body.mapper = 'UserMapper';//mybatis xml 파일명
        req.body.crud = 'select';//select, insert, update, delete 중에 입력
        req.body.mapper_id = 'selectUserDpliCheck';
        router.use('/', dbconnect_Module);
        next('route')
      } catch (error) {
        console.log("Module > dbconnect error : "+ error);      
      }
    }else if(type == "signin"){
      //로그인 조회
      try {
        // Mysql Api 모듈(CRUD)
        var dbconnect_Module = require('./dbconnect_Module');
    
        //Mysql 쿼리 호출정보 입력
        req.body.mapper = 'UserMapper';//mybatis xml 파일명
        req.body.crud = 'select';//select, insert, update, delete 중에 입력
        req.body.mapper_id = 'selectLoginCheck';
    
        router.use('/', dbconnect_Module);
        next('route')
        
      } catch (error) {
        console.log("Module > dbconnect error : "+ error);      
      }
    }else if(type == "SessionState"){
      var userid = req.body.is_Email
      var name = req.body.is_UserName
      try {
        let token1 = jwt.sign(
        { email: userid },
        secretObj.secret,
        { expiresIn: '60m' })
       
        let token2 = jwt.sign(
        { username: name },
        secretObj.secret,
        { expiresIn: '60m' })
        res.send({"token1":token1, "token2":token2});
      } catch (error) {
        res.send(error)
      }
    }else if(type == "SessionConfirm"){
      try {
        let token1 = req.body.token1;
        let token2 = req.body.token2;
        
        if(token1 != undefined && token1 != '' & token2 != undefined && token2 != ''){
          let decoded1 = jwt.verify(token1, secretObj.secret);
          let decoded2 = jwt.verify(token2, secretObj.secret);
          res.send({"token1":decoded1.email, "token2":decoded2.username});
        }else{
          res.send({"token1":"", "token2":""});
        }
      } catch (error) {
        res.send(error)
      }
    }else if(type == "SessionSignin"){
      // 쿠키 정보로 사용자 인증 
      try {
        // Mysql Api 모듈(CRUD)
        var dbconnect_Module = require('./dbconnect_Module');
        //Mysql 쿼리 호출정보 입력
        req.body.mapper = 'UserMapper';//mybatis xml 파일명
        req.body.crud = 'select';//select, insert, update, delete 중에 입력
        req.body.mapper_id = 'selectSessionLoginCheck';
    
        router.use('/', dbconnect_Module);
        next('route')
        
      } catch (error) {
        console.log("Module > dbconnect error : "+ error);      
      }
    }else if(type == "pwreset"){
      //비밀번호 재설정시 이메일과 이름으로 회원정보 조회
      try {
        // Mysql Api 모듈(CRUD)
        var dbconnect_Module = require('./dbconnect_Module');
    
        //Mysql 쿼리 호출정보 입력
        req.body.mapper = 'UserMapper';//mybatis xml 파일명
        req.body.crud = 'select';//select, insert, update, delete 중에 입력
        req.body.mapper_id = 'selectLoginResetCheck';
    
        router.use('/', dbconnect_Module);
        next('route')
        
      } catch (error) {
        console.log("Module > dbconnect error : "+ error);      
      }
    }else if(type == "emailtoken"){
      // 이메일 인증 후 token으로 사용자 인증 
      try {
        // Mysql Api 모듈(CRUD)
        var dbconnect_Module = require('./dbconnect_Module');
    
        //Mysql 쿼리 호출정보 입력
        req.body.mapper = 'UserMapper';//mybatis xml 파일명
        req.body.crud = 'select';//select, insert, update, delete 중에 입력
        req.body.mapper_id = 'selectEmailTokenCheck';
    
        router.use('/', dbconnect_Module);
        next('route')
        
      } catch (error) {
        console.log("Module > dbconnect error : "+ error);      
      }
    }else if(type == "pwdmodify"){
      //비밀번호 재설정
      try {
        // Mysql Api 모듈(CRUD)
        var dbconnect_Module = require('./dbconnect_Module');
  
        //Mysql 쿼리 호출정보 입력
        req.body.mapper = 'UserMapper';//mybatis xml 파일명
        req.body.crud = 'update';//select, insert, update, delete 중에 입력
        req.body.mapper_id = 'updatePwdUser';
        
        var myPlaintextPassword = req.body.is_Password;
        if(myPlaintextPassword != '' && myPlaintextPassword != undefined ){
          bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
              req.body.is_Password = hash;
              router.use('/', dbconnect_Module);
              next('route')
            });
          });
        }else{
          router.use('/', dbconnect_Module);
          next('route')
        }
        
      } catch (error) {
        console.log("Module > dbconnect error : "+ error);      
      }
    }
  });
  
  module.exports = router;