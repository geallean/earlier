//定义zombie类产生zombie对象

/**
 * 定义一个zombie类产生对象，es5利用构造函数原型继承方式实现类的继承
 * 这是和父类，各种不同的僵尸，撑杆僵尸，旗帜僵尸，快跑僵尸都是僵尸的子类
 * @param {[type]} name [description]
 */
function Zombie(name) {
    this.name = name;
    this.width = 166;
    this.height = 144;
}

Zombie.prototype.attack = function() {

}

Zombie.prototype.die = function() {

}

Zombie.prototype.move = function() {
	console.log(`move是父类中的方法……，${this.name} is moving^^^^^`)
}


// 子类

function PoleVaultingZombie(name) {
    Zombie.call(this, name);
}

//寄生组合继承模式
inherit(Zombie, PoleVaultingZombie);


PoleVaultingZombie.prototype.jump = function() {
	console.log(`jump是子类中的方法…………，${this.name} is jumping ^^^`)
}



//寄生组合的继承模式
function inherit(SuperClass, SubClass) {
    var o = Object.create(SuperClass.prototype);
    SubClass.prototype = o;
    o.constructor = SubClass;
}