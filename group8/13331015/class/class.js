// 基类Base
function Base(variable) { 
	this.instanceVariable = variable;
}
Base.prototype.instanceMethod = function() {
	console.log("This is from Base class instance-method, static-variable is: " + this.instanceVariable);
};
Base.staticVariable = "Base";
Base.staticMethod = function() {
	console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
};

// 派生类Derived
function Derived(variable) {
	this.instanceVariable = variable;
}
Derived.staticVariable = "Derived";
function extend(base, derived) {
	derived.prototype = new base;
	derived.staticMethod = function() {
		base.staticMethod.call(this);
		console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
	}
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