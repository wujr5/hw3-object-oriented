window.onload = function() {
    function Base(instancevariable) {
	    this.instanceVariable = instancevariable;             //the instance variable.
    }

    Base.prototype.instanceMethod = function() {              //add a instance func to base's prototype.
        console.log("This is from Base class instance-method, static-variable is: " + this.instanceVariable);
    };
    
    Base.staticVariable = 'Base';                             //the static varialbe.
    
    Base.staticMethod = function() {                          //the static fuc.
        console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
    };

    function Derived(instancevariable) {                      
    	this.instanceVariable = instancevariable;             //derived's instance variable.
    	Derived.staticVariable = 'Derived';                   //add a static variable.
    }

    function extend(base, derived) {
        derived.staticMethod = function() {                   
        	base.staticMethod.call(this);                     //call base's static method.
            console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
        }
        derived.prototype.instanceMethod = function() {
            base.prototype.instanceMethod.call(this);         //call base's instance method.
            console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
        }
    }

    extend(Base, Derived);



    example = new Derived('example');                         //test codes here!
    Derived.staticMethod();
    example.instanceMethod();

    /*
    example = new Derived('example');
    otherExample = new Derived('other-example');
    Derived.staticMethod();
    example.instanceMethod();
    otherExample.instanceMethod();
    */
};                                                            //the end!
