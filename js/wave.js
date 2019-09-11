// 1：创建光环构造函数
function waveObj() {
    // 1.1：添加圆心
    this.x = [];
    this.y = [];
    // 1.2：添加半径
    this.r = [];
    // 1.1：添加显示状态
    this.alive = [];
}
//2：为构造函数添加属性 num=10
waveObj.prototype.num = 10;
//3：为构造函数添加方法init
waveObj.prototype.init = function () {
    //遍历，初始化全部数据
    for (var i = 0; i < this.num; i++) {
        //圆心为0
        this.x[i] = 0;
        this.y[i] = 0;
        //半径为0
        this.r[i] = 0;
        //全部不可见
        this.alive[i] = false;
    }
}
//4：为构造函数添加方法draw
waveObj.prototype.draw = function () {
    //4.1:保存画笔状态
    ctx2.save();
    ctx2.strokeStyle = "#fff";
    // 4.2：创建循环遍历所有光环
    for (var i = 0; i < this.num; i++) {
        // 4.3：判断当前光环是否显示
        if (this.alive[i]) {
            //4.4当前光环半径增加
            this.r[i] += deltaTime * 0.02;
            //4.5:如果光环半径大于100
            if (this.r[i] > 50) {
                // 4.6:将光环状态 改为false
                this.alive[i] = false;
                // this.r[i] = 20;
                return;
            }
            //4.7：开始画光环了，开始一条新路径
            ctx2.beginPath();
            //4.8:画光环
            ctx2.arc(this.x[i], this.y[i], this.r[i], 0, 2 * Math.PI);
            //4.9：描边
            ctx2.stroke();
        }
    }
    ctx2.restore();
}


waveObj.prototype.born = function (x,y) {
    for (var i = 0; i < this.num; i++) {
        if (!this.alive[i]) {
            this.alive[i] = true;
            this.x[i] = x;
            this.y[i] = y;
            this.r[i] = 20;
        }
    }
}


// 将wave.js添加到index.html
//在main.js中创建光环对象，并调用相应方法