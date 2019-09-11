// 功能：完成海藻类
// 1.创建海藻构造函数 aneObj
function aneObj() {
    // 1.1：创建变量保存起点坐标x (起点坐标y是固定值600)
    this.rootx = [];
    // 1.2：创建变量保存终点坐标x
    this.headx = [];
    // 1.3：创建变量保存终点坐标y
    this.heady = [];
    // 1.4:创建变量保存摆动幅度amp(20~50)
    this.amp = [];
    // 1.5:创建变量保存-1~1之间值
    this.alpha = 0;
}
// 2.为海藻构造函数添加属性 num=50
aneObj.prototype.num = 50;
// 3.为海藻构造函数添加方法 init
aneObj.prototype.init = function () {
    for (var i = 0; i < this.num; i++) {
        // 初始化起点坐标
        this.rootx[i] = i * 16 + 20 * Math.random();
        //初始化终点坐标x(初始值是一条直线)
        this.headx[i] = this.rootx[i]
        //初始化终点坐标y
        this.heady[i] = canHeight - 250 + Math.random() * 50;
        //初始化海藻摆动幅度
        this.amp[i] = 20 + Math.random() * 30;
    }
}
// 4.为海藻构造函数添加方法  draw
aneObj.prototype.draw = function () {
        // 4.1：计算非常小的小数
        this.alpha += deltaTime * 0.0008;
        //4.2:依据小数，通过正弦函数获取-1~+1,大约4~5s一个周期
        var l = Math.sin(this.alpha);
        // console.log(l)
        // 4.3：保存画笔1状态，避免其它元素影响海藻
        ctx1.save();
        // 4.4:设置海藻颜色，宽度，顶部圆角
        ctx1.strokeStyle="#3b154e"
        ctx1.globalAlpha=0.6;
        ctx1.lineCap="round";
        ctx1.lineWidth=20;
        // 4.5：创建循环遍历每个海藻
        for (var i = 0; i < this.num; i++) {
            // 4.6：创建新路径
            ctx1.beginPath();
            //         4.7：移动起点坐标,绘制起点
            ctx1.moveTo(this.rootx[i], canHeight);
            // 4.8重新计算终点坐标x
            this.headx[i] = this.rootx[i] + l * this.amp[i];
            // 4.9：绘制二次贝塞尔曲线  控制点 x,y，终点x,y
            ctx1.quadraticCurveTo(this.rootx[i],  canHeight- 100, this.headx[i], this.heady[i]);
            // 4.10:搭边
            ctx1.stroke();           
        }
        // 4.11：恢复画笔1状态
        ctx1.restore()
    }

        // 5.将ane.js引入index,html文件中
        // 6.在main.js的init中初始化海藻对象，在gameloop中调用draw