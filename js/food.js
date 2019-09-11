// 功能1：创建食物功能

// 1:创建食物构造函数  foodObj
var foodObj = function () {
    // 1.1:添加食物状态属性alive  true显示，false隐藏
    this.alive = [];
    // 1.2：创建两个图片对象，蓝色食物和黄色食物
    this.blue = new Image();
    this.orange = new Image();
    // 1.3：创建位置数组x,y 保存食物位置
    this.x = [];
    this.y = [];
    // 1.4：创建数据保存图片宽度和高度(宽高相同，都设定为l)
    this.l = [];
    // 1.5：创建数组保存速度spd  生长向上漂浮
    this.spd = [];
    // 1.6：创建数组保存食物类型  "blue"  "orange"
    this.foodType = [];
    // 1.7:创建数组保存第几个海藻
    this.aneNo = [];
};
// 2:为食物构造函数添加属性 num=30
foodObj.prototype.num = 30;
// 3:为食物构造函数增加方法init
foodObj.prototype.init = function () {

    // 3.1：创建循环，遍历所有食物，设定初始状态
    for (var i = 0; i < this.num; i++) {
        //临时将alive全部设置为true，这样就可以看到食物了
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.l[i] = 0;
        this.aneNo[i] = 0;
        this.foodType[i] = Math.random() < 0.9 ? "blue" : "orange";
        this.spd[i] = Math.random() * 0.017;
    }
    // console.log(this)
    //3.2：下载食物图片
    this.blue.src = "src/blue.png";
    this.orange.src = "src/orange.png";
    // console.log(this.foodType)
}

//食物函数调用汇总
foodObj.prototype.game = function () {
    this.die();
    this.foodNum();
    this.draw();
}
// 4:为食物构造函数增加方法draw
foodObj.prototype.draw = function () {
    // 4.1：创建循环遍历每个食物
    for (var i = 0; i < this.num; i++) {
        //4.2: 判断当前食物是否alive，是就绘制
        if (this.alive[i]) {
            //4.3：判断当前食物类型
            var pic = this.foodType[i] == "blue" ? this.blue : this.orange;
            // console.log(pic)
            //4.4~4.6：判断当前食物宽度<=14，修改l,否则，修改y
            if (this.l[i] <= 14) {

                this.l[i] += this.spd[i] * deltaTime;
                // console.log(this.l[i])
            } else {
                this.y[i] -= this.spd[i] * deltaTime * 3;
            };
            //4.7：绘制当前食物
            ctx1.drawImage(pic, this.x[i], this.y[i], this.l[i], this.l[i]);

        }
    }
}
// 5:将food.js引入到index.html中
//6:
// 功能2：监听画布上活动食物是否有15个，不足15个，挑一个食物出来
// 6.1：创建全局函数，监听画布上食物的数量，不足15个:挑
foodObj.prototype.foodNum = function () {
    var count = 0;
    for (var i = 0; i < this.num; i++) {
        if (this.alive[i] == true) {
            count++;
        }
    }
    if(count < 15) {
        this.sendFood();
    }
}
//6.2：创建全局函数：挑，按下标取第一个
foodObj.prototype.sendFood = function () {
    for (var i = 0; i < this.num; i++) {
        if (this.alive[i] == false) {
            this.born(i);
            return;
        }
    }
}
//6.3为构造函数添加出生食物方法
foodObj.prototype.born = function (i) {
    this.aneNo[i] = parseInt(Math.random() * ane.num)
    // 将海藻终点坐标赋值给当前食物
    this.x[i] = ane.headx[this.aneNo[i]];
    this.y[i] = ane.heady[this.aneNo[i]];
    // 修改当前食物状态 true
    this.alive[i] = true;
    // 修改当前食物宽度0
    this.l[i] = 0;
    // 修改当前食物类型
    this.foodType[i] = Math.random() < 0.9 ? "blue" : "orange";
    // 修改当前食物速度
    this.spd[i] = Math.random() * 0.017;
}
//6.4:在main.js  gameloop中调用监听画布全局函数

//7:如果当前食物漂出屏幕，尺寸不正常了，将食物状态改为隐藏
foodObj.prototype.die = function () {
    for (var i = 0; i < this.num; i++) {
        if (this.y[i] < 10 || this.l>15) {
            this.alive[i] = false;
        }
        // 被大鱼吃掉了，在此执行有延迟，出无限加分BUG
        // if (eatFoodIndex >= 0) {
        //     this.alive[eatFoodIndex] = false;
        // }
    }
}