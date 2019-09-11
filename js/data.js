// 功能：分数
// 创建分数构造函数dataObj
function dataObj() {
    //位置固定，所以只设置一个变量
    this.score=0;
}
// 为构造函数添加绘制方法init
dataObj.prototype.init = function () {
    

}
// 为构造函数添加绘制方法draw
dataObj.prototype.draw = function () {
    // 2.1:保存画笔2的状态
    ctx2.save();
    //2.2:修改画笔2填充样式
    ctx2.fillStyle = "#fff";
    //2.3修改画笔2文字大小
    ctx2.font = "36px Verdana";
    //2.4修改画笔2文字居中
    ctx2.textAlign = "center";
    //2.5绘制文件
    ctx2.fillText("SCORE: "+this.score,canWidth*0.5,canHeight*0.8)
    //2.6:恢复画笔2状态
    ctx2.restore();
}
// 将data.js添加到index.html中
//在main.js中创建对象，并调用相关方法

//为构造函数添加方法add
//type  大鱼吃的食物类型
//2 表示橙色食物  1 表示蓝色食物
dataObj.prototype.add=function(type){
    this.score+=100*type;
}