(function($) {
    function wheel(id, location, radius, info) {
        this.ctx = document.getElementById(id).getContext('2d');
        this.location = location;
        this.radius = radius;
        this.info = info;
        this.init();
    }
    wheel.prototype = {
        init: function() {
            var i = 0
            var self = this;
            var ctx = self.ctx;
            var location = self.location;
            ctx.save();
            ctx.translate(location.x, location.y);
            ctx.rotate((i * 10) * Math.PI / 180);
            ctx.clearRect(-self.radius, -this.radius, 2 * this.radius, 2 * this.radius)
            self.draw();
            self.drawImage(function() {
                self.drawText();
                ctx.restore();
                self.drawArrow();
            })

            self.bindEvent();
        },
        draw: function() {
            var ctx = this.ctx;
            var location = this.location;
            ctx.beginPath();
            ctx.strokeStyle = "#dcdcdc"
            ctx.fillStyle = "red"
                //ctx.arc(location.x, location.y, this.radius, 0, 2 * Math.PI, false);
            ctx.arc(0, 0, this.radius, 0, 2 * Math.PI, false)
            ctx.fill();
            ctx.stroke();
            ctx.beginPath();
            ctx.fillStyle = "white"
                //ctx.arc(location.x, location.y, this.radius - 15, 0, 2 * Math.PI, false);
            ctx.arc(0, 0, this.radius - 15, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.stroke();
            var angle = 360 / this.info.length;
            var r = this.radius - 15
            ctx.beginPath();
            for (var i = 0; i < this.info.length; i++) {
                /*ctx.moveTo(location.x, location.y);
                ctx.lineTo(location.x + r * Math.sin(i * angle * Math.PI / 180), location.y - r * Math.cos(i * angle * Math.PI / 180));*/
                ctx.moveTo(0, 0);
                ctx.lineTo(r * Math.sin(i * angle * Math.PI / 180), -r * Math.cos(i * angle * Math.PI / 180));
                ctx.stroke();
            }

        },
        drawArrow: function() {
            var ctx = this.ctx;
            var location = this.location;
            var angle = (360 / this.info.length) * Math.PI / 180;
            var r = this.radius - 25
            ctx.beginPath()
            ctx.fillStyle = "#000"
            ctx.lineWidth = '3'
            ctx.strokeStyle = "#000"
            ctx.moveTo(location.x, location.y);
            ctx.lineTo(location.x + r * Math.sin(angle / 2), location.y - r * Math.cos(angle / 2));
            /*ctx.moveTo(0,0);
            ctx.lineTo(r*Math.sin(angle/2),-r*Math.cos(angle/2));*/
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(location.x + r * Math.sin(angle / 2), location.y - r * Math.cos(angle / 2), 10, 0, 2 * Math.PI, false)
                //ctx.arc(r*Math.sin(angle/2),  -r*Math.cos(angle/2), 10, 0, 2 * Math.PI, false)
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = "#ccc";
            ctx.arc(location.x, location.y, 10, 0, 2 * Math.PI, false);
            //ctx.arc(0,0, 10, 0, 2 * Math.PI, false);
            ctx.fill();
        },
        drawText: function() {
            var ctx = this.ctx;
            var location = this.location;
            var r = this.radius - 30;
            var angle = 360 / this.info.length;
            ctx.beginPath();
            ctx.fillStyle = '#333';

            for (var i = 0; i < this.info.length; i++) {
                /*var x = location.x + r * Math.sin(i * angle * Math.PI / 180);
                var y = location.y - r * Math.cos(i * angle * Math.PI / 180)*/
                var x = r * Math.sin(i * angle * Math.PI / 180);
                var y = -r * Math.cos(i * angle * Math.PI / 180)
                ctx.save();
                ctx.translate(x, y)
                ctx.rotate((angle / 2 + i * angle) * Math.PI / 180)
                ctx.fillText(this.info[i].text, r / 2, 0);
                ctx.restore();
            }
        },
        drawImage: function(callback) {
            var ctx = this.ctx;
            var location = this.location;
            var r = this.radius - 50;
            var angle = 360 / this.info.length;
            var self = this;
            for (var i = 0; i < this.info.length; i++) {
                (function(index, r, angle) {
                    var img = new Image();
                    var x = r * Math.sin(index * angle * Math.PI / 180);
                    var y = -r * Math.cos(index * angle * Math.PI / 180)
                    img.onload = function() {
                        ctx.save();
                        ctx.translate(x, y)
                        ctx.rotate((angle / 2 + index * angle) * Math.PI / 180)
                        ctx.drawImage(img, r / 2, 0, 50, 50)
                        ctx.restore();
                        callback();
                    }
                    img.src = self.info[index].img
                })(i, r, angle)
            }
        },
        bindEvent: function() {
            var self = this;
            var interval=""
            window.onclick = function(e) {
                if(interval!=""){
                    clearInterval(interval)
                    interval=""
                }else{
                    var x = e.pageX;
                var y = e.pageY;
                var left = self.location.x - self.radius;
                var right = self.location.x + self.radius;
                var top = self.location.y - self.radius;
                var bottom = self.location.y + self.radius;
                var num = 360;
                if (x >= left && x < right && y < bottom && y > top) {
                    var i = 0;
                    var flag = true;
                    interval= setInterval(function() {
                        if (num <= 0) {
                            clearInterval(interval)
                        } else {
                            if (flag) {
                                flag=false;
                                var ctx = self.ctx;
                                var location = self.location;
                                ctx.save();
                                num--;
                                ctx.translate(location.x, location.y);
                                ctx.rotate(num * 10);
                                ctx.rotate(Math.random() * 360 * Math.PI / 180);
                                ctx.clearRect(-self.radius, -this.radius, 2 * this.radius, 2 * this.radius)
                                self.draw();
                                self.drawImage(function() {
                                    self.drawText();
                                    ctx.restore();
                                    self.drawArrow();
                                    i++;
                                    flag=true;
                                });
                            }
                        }
                    }, 1)
                }
                }
              
            }
        }
    }
    $.fn.lucky_wheel = function(location, r, info) {
        new wheel($(this).attr('id'), location, r, info);
    }
})(jQuery)
