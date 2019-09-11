// 功能1：创建很多全局变量，保证游戏中不同角度可以相互调用
// 功能2：创建游戏所有角色对象
// 功能3：调用所有角色绘制方法

// 1:创建全局变量，使得不同JS文件可以互相调用变量
// 1.1：创建两个全局变量，保存两个画布
var can1;
var can2;
// 1.2：创建两个全局变量，保存两个画笔
var ctx1;
var ctx2;
// 1.3：创建两个全局变量保存画布宽度和高度
var canWidth;
var canHeight;
// 1.4：创建两个全局变量，保存两帧画面之间的时间差，第二帧要等第一帧画完再开始，这个变量就是记录第一帧使用的时间
var lastTime;
var deltaTime;
// 1.5:创建背景图变量
var bgimg;
//1.6:创建全局变量，保存海藻对象
var ane;
// 1.7:创建全局变量，保存食物对象
var food;
// 1.8:创建全局变量，保存大鱼对象
var mom;
// 1.9:创建全局变量，保存鼠标位置
var mx=0;
var my=0;
// 1.10:创建全局变量，显示分数
var data;
// 1.11:创建全局变量，显示光环
var wave;

// 2：创建函数game
function game() {
    init();
    gameloop();
};
// 3:创建函数init
function init() {
    // 3.1:初始化两个画布对象
    can1 = document.getElementById("canvas1");
    can2 = document.getElementById("canvas2");
    // console.log(can1, can2);
    // 3.2：初始化两个画笔对象
    ctx1 = can1.getContext("2d");
    ctx2 = can2.getContext("2d");
    // 3.3：初始化画布宽度和高度
    canWidth = can1.width;
    canHeight = can1.height;
    // console.log(can1,can2,ctx1,ctx2,canWidth,canHeight);
    // 3.4：初始化时间差
    // 3.5:记录没有绘图开始时间
    lastTime = Date.now();
    // 3.6:时间差初始化为0
    deltaTime = 0;
    //3.7:初始化背景图片对象
    bgimg = new Image();
    bgimg.src = "src/background.jpg";
    //3.8:初始化海藻对象
    ane = new aneObj();
    ane.init();
    //3.8:初始化食物对象
    food = new foodObj();
    food.init();
     //3.9:初始化大鱼对象
     mom = new momObj();
     mom.init();
    //  3.11:为画布2绑定鼠标移动事件
    can2.addEventListener("mousemove",handleMove);
    // 3.12:初始化分数
    data=new dataObj();
     // 3.13:创建光环对象，初始化光环
     wave=new waveObj();
     wave.init();
};
// 4.创建函数gameloop
function gameloop() {
    // 4.1:创建一个定时器，执行gameloop，递归调用
    requestAnimationFrame(gameloop);
    // 4.2：获取刚才绘制完成时间点
    var now = Date.now();
    // 4.3：将完成的时间点，减去绘制前的时间，得到绘制的时间差
    deltaTime = now - lastTime;
    // 4.4：保存上一个时间点
    lastTime = now;
    //4.5:绘制背景图片
    drawbgImage();
    //4.6:绘制海藻
    ane.draw();
    //4.7:绘制食物
    food.game();
    //4.8:绘制大鱼
    mom.game();
    //4.9:大鱼吃食物
    momFoodCollison();
     //4.10:显示分数
     data.draw();
     //4.11:显示光环
     wave.draw();
};
// 5:网页加载成功后调用game
document.body.onload = game;
//6.处理鼠标移动事件handleMove
function handleMove(event){
mx=event.offsetX;
my=event.offsetY;

//以下代码可直接修改大鱼的坐标，但不满足低耦合，高内聚原则，应该让大鱼自己去改变自己的内容，
//而不是在其它板块内改变大鱼的坐标
// mom.x=event.offsetX;
// mom.y=event.offsetY;
// console.log(mom)
}