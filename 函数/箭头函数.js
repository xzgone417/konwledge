// 5.00 箭头函数普通写法
// 报错arr0 is not definned
var arr0 = new Function;
// 想要这么写箭头函数，arr0必须是已经具有意义的方法名
arr0(()=>{
    console.log("我的普通箭头函数，这么写不对，见49行所谓的arr0必须是定义好的方法");
})

// 5   箭头函数匿名写法  
var arrs = ()=>{
    console.log("我的箭头函数");
}
arrs();

// 5.5  箭头函数传参
var arr1 =(item)=>{
    console.log(item);
}
arr1("我的箭头函数2");
//当箭头函数只有一个参数的时候，函数入参参数的小括号可以省略
//当箭头函数有返回值，并且其函数体只有一句话，可以省略函数体的大括号以及return
let arr = [1, 2, 3];
arr.forEach((item) => {
    console.log(item)
})
var arr2 = arr.map(item => item * 2)//两种写法均ok

var arr3 = arr.map((item) => {     //确实
    return item * 2
})
console.log(arr2)
console.log(arr3)