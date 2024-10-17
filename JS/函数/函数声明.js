// 1  普通函数没有返回值,没有传参
function foo() {
  console.log("我的普通函数无返回值无传参");
}
foo();
// 1.5 普通函数有返回值，无传参
function foore() {
  return "我的普通函数有返回值,无传参";
}
console.log(foore());
// 1.6  普通函数无返回值，有传参
function fooi(item) {
  console.log(item);
}
fooi("普通函数无返有参");
// 1.9  普通函数有反有参
function foorei(item) {
  return item;
}
console.log(foorei("普通函数有反有参"));

// 2
let foo2 = function () {
  console.log("我的匿名函数");
}; //调用之前一定要价格分号;
foo2();

// 3  自调用函数的前面一定要有一个分号隔绝,但是自调用函数不管屁股后面的事
(function () {
  console.log("我的自调用函数括号在外");
})();
// 3.5  自调用函数的调用括号写在大括号里面,同样的它也需要分号间隔
(function () {
  console.log("我的自调用函数声明括号在内");
})();
// 3.55  自调用函数传参
(function (item) {
  console.log(item);
})("我的自调用函数声明传参"); //如果后置括号内容为空则输出undefined，由内容则向自调用函数传参

// 4   new一个函数对象,之后就可以调用这个函数对象了,但是无论如何，只是单纯对象，
var foo4 = new Function(console.log("new一个函数对象1"));
foo4(console.log("new一个函数对象2"));
foo4(console.log("new一个函数对象3"));
// 括号里面的无法复用，也无法传参,错了，Function最后一个参数是函数体，前面的全是参数,不能是未定义变量形式 //  let 函数名 = new Function(“参数...”, ”函数体”)
var foo5 = new Function("a", "b", "c", "d", 'console.log(a + b + c + d)');
foo5(1, 2, 3, 4);foo5(1,1);foo5(1,null,null,null);foo5(1,1,undefined,undefined);

