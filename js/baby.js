//创建小鱼构造函数
var babyObj = function () {
    // 1.1:小鱼的位置坐标
    this.x=0;
    this.y=0;
    // 1.2:小鱼游动角度
    this.angle;
    // 1.3:小鱼眼睛身体尾巴图片
    this.babyEye = [];
    this.babyBody = [];
    this.babyTail = [];
    // 1.4:创建9个变量，完成图片切换
    this.babyEyeIndex = 0; //眼睛下标
    this.babyEyeStart = 0; //眼睛计时开始
    this.babyEyeEnd = 3000; //眼睛计时结束

    this.babyBodyIndex = 0; //身体下标
    this.babyBodyStart = 0; //身体计时开始
    this.babyBodyEnd = 4000; //身体计时结束

    this.babyTailIndex = 0; //尾巴下标
    this.babyTailStart = 0; //尾巴计时开始
    this.babyTailEnd = 20; //尾巴计时结束
}

// 2：为构造函数添加方法init
babyObj.prototype.init = function () {
    // 2.1:初始化小鱼位置和角度
    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;
    // console.log(this.x,this.y)
    this.angle = 0;
    //2.2:初始化图片  眼睛2张  身体20张  尾巴8张
    for (var i = 0; i < 2; i++) {
        this.babyEye[i] = new Image();
        this.babyEye[i].src = "src/babyEye" + i + ".png";
    }
    for (var i = 0; i < 20; i++) {
        this.babyBody[i] = new Image();
        this.babyBody[i].src = "src/babyFade" + i + ".png";
    }
    for (var i = 0; i < 8; i++) {
        this.babyTail[i] = new Image();
        this.babyTail[i].src = "src/babyTail" + i + ".png";
    }
}
// 3：为构造函数添加方法draw
babyObj.prototype.draw = function () {
    // 3.1：调整小鱼位置x,y
    this.x=lerpDistance(mom.x,this.x,0.99);
    this.y=lerpDistance(mom.y,this.y,0.99);
    // console.log(this.x,this.y)
    // 3.2：调整小鱼角度
    // 3.2.1：计算坐标差
    var deltaX=mom.x-this.x;
    var deltaY=mom.y-this.y;
    // 3.2.2：计算角度差
    var beta=Math.atan2(deltaY,deltaX)+Math.PI;
    // 3.2.3：函数修改小鱼角度
    this.angle=lerpAngle(beta,this.angle,0.9);
    // 3.3：保存画笔
    ctx2.save();
    // 3.4：设置画笔原点到小鱼身上
    ctx2.translate(this.x,this.y);
    // 3.5：设置画笔旋转角度
    ctx2.rotate(this.angle);
    // 3.6：绘制小鱼身体
    ctx2.drawImage(this.babyBody[0],-this.babyBody[0].width*0.5,-this.babyBody[0].height*0.5);
// 3.7：绘制小鱼尾巴
    ctx2.drawImage(this.babyTail[0],-this.babyTail[0].width*0.5+23,-this.babyTail[0].height*0.5);
// 3.8：绘制小鱼眼睛
    ctx2.drawImage(this.babyEye[0],-this.babyEye[0].width*0.5,-this.babyEye[0].height*0.5);
    // 3.9：恢复画笔2状态
    ctx2.restore();
    
}