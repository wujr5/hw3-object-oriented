/******************************************
In file sort.js
First edited by Jiarong wu on 11/4/2014
Last edited by Jiarong wu on 11/6/2014
Tel:18819473271 Email:973430584@qq.com
*******************************************/

//看js的输出效果需要打开相应的html，这里是：inheritance.html

window.onload = function() {
	//定义基类构造函数
	function Base(name) {
		this.instanceVariable = name;
	}

	//定义基类静态属性
	Base.staticVariable = 'Base';
	//定义基类静态方法
	Base.staticMethod = function() {
		console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
	};
	//定义基类实例方法
	Base.prototype.instanceMethod = function() {
		console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
	};
	
	//定义继承类构造函数
	function Derived(name) {
		this.instanceVariable = name;
	}

	Derived.staticVariable = 'Derived'

	//定义extend函数，实现继承
	function extend(base, derived) {
		derived.staticMethod = function() {
			base.staticMethod.call(this);
			console.log("This is from Derived class instance-method, instance-variable is: " + this.staticVariable);
		};

		derived.prototype.instanceMethod = function() {
			base.prototype.instanceMethod.call(this);
			console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
		};
	}

	extend(Base, Derived);

	example = new Derived('example');
	Derived.staticMethod();
	example.instanceMethod();

	example = new Derived('example');
	otherExample = new Derived('other-example');
	Derived.staticMethod();
	example.instanceMethod();
	otherExample.instanceMethod();
}

