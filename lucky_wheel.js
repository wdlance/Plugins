(function($){
	function wheel(canvas,location,radius,block){
		this.ctx=canvas.getContext('2d');
		this.location=location;
		this.radius=radius;
		this.block=block;
	}
	wheel.prototype={
		init:function(){
			this.draw();
		},
		draw:function(){
		var ctx=this.ctx;
		var location=this.location;
		ctx.beginPath();
		ctx.strokeStyle="#dcdcdc"
		ctx.arc(location.x,location.y,this.radius,0,2*Math.PI,false);
		ctx.stroke()
	}
	}
	$.fn.lucky_wheel = function(obj){
		new wheel(obj);
	}
})(jquery)