// 大鱼一条，面向鼠标慢慢游动，碰到食物吃掉
// 大鱼喂小鱼
// 1:创建大鱼构造函数momObj
function momObj() {
    // 1.1:大鱼位置x,y
    this.x;
    this.y;
    // 1.2:大鱼游动角度
    this.angle;
    // 1.3：创建数组保存大鱼眼睛
    this.bigEye = [];
    // 1.4：创建数组保存大鱼身体
    this.bigBody = [];
    // 1.5：创建数组保存大鱼尾巴
    this.bigTail = [];
    //1.6：创建二个变量控制眼睛下标切换频率
    this.bigEyeIndex = 0;
    this.bigEyeStart = 0; //计时开始
    this.bigEyeEnd = 3000; //计时结束
    //1.7：创建二个变量控制尾巴下标切换频率
    this.bigTailIndex = 0;
    this.bigTailStart = 0; //计时开始
    this.bigTailEnd = 150; //计时结束
    //1.8：创建二个变量控制身体下标切换频率
    this.bigBodyIndex = 0;
    this.bigBodyStart = 0; //计时开始
    this.bigBodyEnd = 4000; //计时结束


}
// 2:为大鱼构造函数添加方法init
momObj.prototype.init = function () {
    // 2.1:初始化x,y在画布中心
    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;
    // 2.2:初始化流动角度0
    this.angle = 0;
    // 2.3:创建二个图片对象保存大鱼眼睛数组，并且下载图片
    for (var i = 0; i < 2; i++) {
        this.bigEye[i] = new Image;
        this.bigEye[i].src = "src/bigEye" + i + ".png"
    }
    // 2.4：创建八个图片对象保存大鱼身体数据，并且下载图片
    for (var i = 0; i < 8; i++) {
        this.bigBody[i] = new Image;
        this.bigBody[i].src = "src/bigSwim" + i + ".png"
    }
    // 2.5：创建八个图片对象，保存大鱼尾巴数组，并下载图片
    for (var i = 0; i < 8; i++) {
        this.bigTail[i] = new Image;
        this.bigTail[i].src = "src/bigTail" + i + ".png"
    }
    // console.log(this)
}
// 3:为大鱼构造函数添加方法draw绘制
momObj.prototype.draw = function () {
    // 3.0.1：累加大鱼眼睛计时，到3000切换下标
    this.bigEyeStart += deltaTime;
    // console.log(this.bigEyeStart)

    if (this.bigEyeStart > this.bigEyeEnd) {
        this.bigEyeIndex == 1 ? this.bigEyeIndex = 0 : this.bigEyeIndex = 1;
        // console.log(this.bigEyeIndex)
        this.bigEyeStart = 0;
        if (this.bigEyeIndex == 0) {
            this.bigEyeEnd = 3000;
        }
        if (this.bigEyeIndex == 1) {
            this.bigEyeEnd = 300;
        }
    }
    // 3.0.2：累加大鱼尾巴计时，到150切换下标
    this.bigTailStart += deltaTime;
    // console.log(this.bigEyeStart)

    if (this.bigTailStart > this.bigTailEnd) {
        this.bigTailIndex > 6 ? this.bigTailIndex = 0 : this.bigTailIndex++;
        // console.log(this.bigTailIndex)
        this.bigTailStart = 0;
    }
    // 3.0.2：累加大鱼身体计时，到150切换下标
    this.bigBodyStart += deltaTime;
    // console.log(this.bigBodyStart)

    if (this.bigBodyStart > this.bigBodyEnd) {
        this.bigBodyIndex > 6 ? this.bigBodyIndex = 0 : this.bigBodyIndex++;
        // console.log(this.bigBodyIndex)
        this.bigBodyStart = 0;
    }
    // 3.1:保存画笔2状态
    ctx2.save();
    // 3.2：将画布原点行动到大鱼身上中心
    ctx2.translate(canWidth * 0.5, canHeight * 0.5);
    // 3.3：设置大鱼旋转角度
    ctx2.rotate(this.angle);
    // 3.4：绘制大鱼

    ctx2.drawImage(this.bigBody[this.bigBodyIndex], -this.bigBody[this.bigBodyIndex].width * 0.5, -this.bigBody[this.bigBodyIndex].height * 0.5);
    ctx2.drawImage(this.bigTail[this.bigTailIndex], -this.bigTail[this.bigTailIndex].width * 0.5 + 30, -this.bigTail[this.bigTailIndex].height * 0.5);
    ctx2.drawImage(this.bigEye[this.bigEyeIndex], -this.bigEye[this.bigEyeIndex].width * 0.5, -this.bigEye[this.bigEyeIndex].height * 0.5);

    // 3.7：恢复画笔2状态
    ctx2.restore();
}
// 大鱼游戏入口
momObj.prototype.game = function (){
    ctx2.clearRect(0,0,canWidth,canHeight);
    this.draw();
}
// 4：将mom.js添加index.html文件中
// 5：在main.js中引入大鱼的初始化方法和draw方法