
function extend(base, derived){
  var Derived = function(){
    base.apply(this, arguments);
    derived.apply(this, arguments);
  }
  import$(Derived, base);
  import$(Derived, derived);
  import$(Derived.prototype, base.prototype);
  import$(Derived.prototype, derived.prototype);
  return Derived;
}

function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) {
    if (typeof src[key] === 'function') {
      if (typeof obj[key] === 'function') var oldFn = obj[key];
      obj[key] = function() {
        if (!!oldFn) oldFn.apply(this, arguments);
        src[key].apply(this, arguments);
      }
    } else {
      obj[key] = src[key];
    }
  }
  return obj;
}

function Base(instanceVariable){
  this.instanceVariable = instanceVariable;
}
Base.staticVariable = 'Base'
Base.staticMethod = function(){
  console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
}

Base.prototype.instanceMethod = function(){
  console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
} 

function Derived(instanceVariable){
  this.instanceVariable = instanceVariable;
}
Derived.staticVariable = 'Derived'
Derived.staticMethod = function(){
  console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
}

Derived.prototype.instanceMethod = function(){
  console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
} 

Derived = extend(Base, Derived);

example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();

