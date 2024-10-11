//1.npm install express mongoose
const express = require("express");
const mongoose = require('mongoose');
const app = express();

//2.使用mongoose.connect()方法连接数据库
mongoose.connect('mongodb://localhost/420');
//3.获取连接对象，通过连接对象来查看是否连接成功
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("已经连接数据库");
});

//4.创建一个Schema (Scheme中的字段是和数据库集合中的字段一一对应的)
var studenSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 5
    },
    email: {
        type: String,
        match: /^\w{2,}@\w{2,}\.com$/
    },
    age: {
        type: Number,
        default: 100,
        min: 0,
        max: 130
    },
    birthday: Date,
    adult: Boolean,
    message: [mongoose.Schema.Types.Mixed],
    hobbies: [String],
    scores: [{ subject: String, score: Number }],
    gender: {
        type: Number,
        enum: [0, 1],
        default: 0
    }
})

// @@@@@@先创建scheme，再根据scheme与mongoose.model()创建数据库集合


//5.根据scheme,通过mongoose.model()方法得到一个Model,mongoose.model()方法的第一个参数是Model的名字，在实际数据库生成集合的名字中会多一个s
var Student = mongoose.model('student', studenSchema);

//6.使用Model来创建对象，并且调用对象的save()方法将数据保存到数据库
app.get("/index", (req, res) => {
    //mongoose的常用方法
    //a. 直接通过Model调用的方法   find()  findById()  findOne() remove() findByIdAndRemove()  updateOne() updateMany()  findByIdAndUpdate()   where()
    //b. 通过对象调用的方法  new Student().save()
})

//1、查找所有符合条件的find
app.get("/findAll", async (req, res) => {
    let students = await Student.find({ name: "mazg" });
    res.json(students)
})

//2、根据id查找findById
app.get("/findById", async (req, res) => {
    let student = await Student.findById("625fb96aa73e236776839c73");
    res.json(student)
})

//3、查找一个findOne
app.get("/findOne", async (req, res) => {
    let student = await Student.findOne({ name: "mazg" });
    res.json(student)
})

//4、remove会删除所有符合条件的数据
app.get("/remove", async (req, res) => {
    let student = await Student.remove({ name: "mazg" });
    res.json(student)
})

//5、deleteOne会删除符合条件的第一条数据
app.get("/deleteone", async (req, res) => {
    let student = await Student.deleteOne({ name: "mazg" });
    res.json(student)
})

//6、根据id来删除数据 （会把删除后的数据给我们返回） findByIdAndRemove
app.get("/findByIdAndRemove", async (req, res) => {
    let student = await Student.findByIdAndRemove("625fbcd01a1e2146bbcd7b02");
    res.json(student)
})

//7、更新所有   updateMany
app.get("/updatemany", async (req, res) => {
    let student = await Student.updateMany({ name: "mazg" }, { $set: { name: "mazg2" } });
    res.json(student)
})

//8、更新一个    updateOne
app.get("/updateone", async (req, res) => {
    let student = await Student.updateOne({ name: "mazg2" }, { $set: { name: "mazg" } });
    res.json(student)
})

//9、根据id更新   findByIdAndUpdate
app.get("/findByIdAndUpdate", async (req, res) => {
    let student = await Student.findByIdAndUpdate("625fbda90c36e99c1c9b510c", { name: 'abc1' }, { new: true });
    res.json(student)
})

//10、根据条件从数据库查找、where,可以递进查询
app.get("/where", async (req, res) => {
    let student = await Student.where("age").gte(1).lte(110).where("name","abc1");
    res.json(student)
})

//11、保存  save
app.get("/save", (req, res) => {
    var stu = new Student({
        _id: new mongoose.Types.ObjectId(),
        name: 'mazg',
        email: "111@aa.com",
        birthday: new Date(),
        message: ['abc', 123],
        hobbies: ['篮球', '足球'],
        scores: [{ subject: "数学", score: 100 }, { subject: "语文", score: 88 }],
        gender: 1
    });
    stu.save(function (err, stu) {
        if (err) {
            res.send(err.message)
            return;
        };
        res.json(stu)
    });
})


app.listen(3000, () => {
    console.log("3000端口已启用")
})