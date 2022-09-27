const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const multer = require('multer');




var con=mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'sreejan'
});

con.connect(function(err){
    if(err) throw err;
    console.log('database connected...');
})




router.get('/view_all',function(req, res, next) {
    var getQuery="select * from `users`";
    con.query(getQuery,function(err,result){

        if(err) throw err;
        res.render('view_all', {records:result})
    });
});








// image upload
var storage = multer.diskStorage({
destination:function(req,file,cb){
    cb(null,'./uploads');
    },

 filename:function(req,file,cb){
    cb(null,file.fieldname + "_" + Date.now() + "_" + file.originalname);
},
});

var upload = multer({
storage:storage,
}).single("image");




// insert user to database
router.post('/add', upload, function(req, res, next) {
    
        var name=req.body.name;
        var email=req.body.email;
        var phone=req.body.phone;
        var bloodgroup=req.body.bloodgroup;
        var joiningdate=req.body.joiningdate;
        var branch=req.body.branch;
        var designation=req.body.designation;
        var image=req.file.filename;
        var bankname=req.body.bankname;
        var bankaccountnumber=req.body.bankaccountnumber;
        var ifsc=req.body.ifsc;
        var branchname=req.body.branchname;
        var exam=req.body.exam;
        var passyear=req.body.passyear;
        var subject=req.body.subject;
        var clas=req.body.clas;
        var firstname=req.body.firstname;
        var midname=req.body.midname;
        var lastname=req.body.lastname;
        var gender=req.body.gender;
        var identificationmark=req.body.identificationmark;
        var vehicle=req.body.vehicle;
        var registrationno=req.body.registrationno;
        var licenseno=req.body.licenseno;
        var validity=req.body.validity;
        var relation=req.body.relation;
        var dateofbirth=req.body.dateofbirth;
        var detail=req.body.detail;
        var idtype=req.body.idtype;
        var idnumber=req.body.idnumber;
        var issuedate=req.body.issuedate;
        var expdate=req.body.expdate;
        var mobileno=req.body.mobileno;
        var village=req.body.village;
        var postoffice=req.body.postoffice;
        var landmark=req.body.landmark;
        var policestation=req.body.policestation;
        var dist=req.body.dist;
        var state=req.body.state;
        var pin=req.body.pin;
        var emergencyno=req.body.emergencyno;
        var anotherad=req.body.anotherad;
    

    var insertQuery = 'insert into `users`  (`name`,`email`,`phone`,`bloodgroup`,`joiningdate`,`branch`,`designation`,`image`,`bankname`,`bankaccountnumber`,`ifsc`,`branchname`,`exam`,`passyear`,`subject`,`clas`,`firstname`,`midname`,`lastname`,`gender`,`identificationmark`,`vehicle`,`registrationno`,`licenseno`,`validity`,`relation`,`dateofbirth`,`detail`,`idtype`,`idnumber`,`issuedate`,`expdate`,`mobileno`,`village`,`postoffice`,`landmark`,`policestation`,`dist`,`state`,`pin`,`emergencyno`,`anotherad`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    var query = mysql.format(insertQuery,[name,email,phone,bloodgroup,joiningdate,branch,designation,image,bankname,bankaccountnumber,ifsc,branchname,exam,passyear,subject,clas,firstname,midname,lastname,gender,identificationmark,vehicle,registrationno,licenseno,validity,relation,dateofbirth,detail,idtype,idnumber,issuedate,expdate,mobileno,village,postoffice,landmark,policestation,dist,state,pin,emergencyno,anotherad]);
    con.query(query,function(err,response){
        if(err) throw err;
        console.log(response);
        res.render('add')
    });
  
});

router.post('/leav',  function(req, res, next) {
    
        var leave_type=req.body.leave_type;
        var form_date=req.body.form_date;
        var to_date=req.body.to_date;
        var description=req.body.description;
        

    var insertQuery = 'insert into `leav`  (`leave_type`,`form_date`,`to_date`,`description`) VALUES (?,?,?,?)';
    var query = mysql.format(insertQuery,[leave_type,form_date,to_date,description]);
    con.query(query,function(err,response){
        if(err) throw err;
        console.log(response);
        res.render('leave_request')
    });
});



router.get("", (req, res)=>{
    res.render('index', { title: "Home Page" })
});

router.get("/home", (req, res)=>{
    res.render("home")
});

router.get("/add", (req, res)=>{
    res.render("add")
});



router.get("/edit", (req, res)=>{
    res.render("edit")
});

router.get("/employee", (req, res)=>{
    res.render("employee")
});

router.get("/employee_register", (req, res)=>{
    res.render("employee_register")
});

router.get("/qualification_details", (req, res)=>{
    res.render("qualification_details")
});

router.get("/personal_details", (req, res)=>{
    res.render("personal_details")
});

router.get("/family_details", (req, res)=>{
    res.render("family_details")
});

router.get("/document_details", (req, res)=>{
    res.render("document_details")
});

router.get("/address_details", (req, res)=>{
    res.render("address_details")
});

router.get("/view_all", (req, res)=>{
    res.render("view_all")
});

router.get("/update", (req, res)=>{
    res.render("update")
});
router.get("/left", (req, res)=>{
    res.render("left")
});

router.get("/delete", (req, res)=>{
    res.render("delete")
});

router.get("/leave_request", (req, res)=>{
    res.render("leave_request")
});




router.get('/edit:id',function(req, res, next) {
var id=req.params.id;

var getQuery="select * from `users` where `id`=?";
var query=mysql.format(getQuery,id);
con.query(query,function(err,result){
    if(err) throw err;
    var string=JSON.stringify(result);
    var json = JSON.parse(string);
    
res.render('edit', {records:json})

});
});



router.post('/update/', upload, function(req, res, next ) {
    
    var id =req.body.id;
    var name=req.body.name;
    var email=req.body.email;
    var phone=req.body.phone;
    var bloodgroup=req.body.bloodgroup;
    var joiningdate=req.body.joiningdate; 
    var branch=req.body.branch;
    var designation=req.body.designation;
    // var image=req.file.filename;
    var bankname=req.body.bankname;
    var bankaccountnumber=req.body.bankaccountnumber;
    var ifsc=req.body.ifsc;
    var branchname=req.body.branchname;
    var exam=req.body.exam;
    var passyear=req.body.passyear;
    var subject=req.body.subject;
    var clas=req.body.clas;
    var firstname=req.body.firstname;
    var midname=req.body.midname;
    var lastname=req.body.lastname;
    var gender=req.body.gender;
    var identificationmark=req.body.identificationmark;
    var vehicle=req.body.vehicle;
    var registrationno=req.body.registrationno;
    var licenseno=req.body.licenseno;
    var validity=req.body.validity;
    var relation=req.body.relation;
    var dateofbirth=req.body.dateofbirth;
    var detail=req.body.detail;
    var idtype=req.body.idtype;
    var idnumber=req.body.idnumber;
    var issuedate=req.body.issuedate;
    var expdate=req.body.expdate;
    var mobileno=req.body.mobileno;
    var village=req.body.village;
    var postoffice=req.body.postoffice;
    var landmark=req.body.landmark;
    var policestation=req.body.policestation;
    var dist=req.body.dist;
    var state=req.body.state;
    var pin=req.body.pin;
    var emergencyno=req.body.emergencyno;
    var anotherad=req.body.anotherad;

    
    
var updateQuery = 'UPDATE `users` SET `name`=? ,`email`=?,`phone`=?,`bloodgroup`=?,`joiningdate`=?,`branch`=?,`designation`=?,`bankname`=?,`bankaccountnumber`=?,`ifsc`=?,`branchname`=?, `exam`=?,`passyear`=?,`subject`=?,`clas`=?,`firstname`=?,`midname`=?,`lastname`=?,`gender`=?,`identificationmark`=?,`vehicle`=?,`registrationno`=?,`licenseno`=?,`validity`=?,`relation`=?,`dateofbirth`=?,`detail`=?,`idtype`=?,`idnumber`=?,`issuedate`=?,`expdate`=?,`mobileno`=?,`village`=?,`postoffice`=?,`landmark`=?,`policestation`=?,`dist`=?,`state`=?,`pin`=?,`emergencyno`=?,`anotherad`=? where `id`=?';
var query = mysql.format(updateQuery,[name,email,phone,bloodgroup,joiningdate,branch,designation,bankname,bankaccountnumber,ifsc,branchname,exam,passyear,subject,clas,firstname,midname,lastname,gender,identificationmark,vehicle,registrationno,licenseno,validity,relation,dateofbirth,detail,idtype,idnumber,issuedate,expdate,mobileno,village,postoffice,landmark,policestation,dist,state,pin,emergencyno,anotherad,id]);
con.query(query,function(err,response,result){
    if(err) throw err;
    console.log(response);
    res.render('update',{records:result});
});
});




router.get('/delete:id',function(req, res, next) {
    var id=req.params.id;
    
    var deleteQuery="delete  from `users` where `id`=?";
    var query=mysql.format(deleteQuery,id);
    con.query(query,function(err){

        if(err) throw err;
        var getQuery= "select * from `users`";
        con.query(getQuery,function(err,result){

            res.render('view_all', {records:result})
           
        })
    
    });
    });


    
module.exports = router;





