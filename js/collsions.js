//本文件完成游戏中的碰撞检测，也就是大鱼吃食物

// 功能一：大鱼碰撞到食物
var eatFoodIndex=-1;
function momFoodCollison() {
    for (var i = 0; i < food.num; i++) {
        if (food.alive[i] == true) {
            var x1 = mom.x;
            var y1 = mom.y;
            var x2 = food.x[i];
            var y2 = food.y[i];
            var distance = calLength2(x1, y1, x2, y2);
            if (distance < 30) {
                food.alive[i]=false;
                // 5.1:累加分数
                //（1）判断食物类型
                var type=1;
                if(food.foodType[i]!="blue"){type=2;}
                //(2)累加分数
                data.add(type);
                wave.born(food.x[i],food.y[i]);
                // wave.x[i]=food.x[i];
                // wave.y[i]=food.y[i];
                // wave.alive[i]=true;
            }
        }
    }
}