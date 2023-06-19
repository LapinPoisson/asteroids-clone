function extend(ChildClass, ParentClass) {
    var parent = new ParentClass();
    ChildClass.prototype = parent;
    ChildClass.prototype.super = parent.constructor;
    ChildClass.prototype.constructor = ChildClass;
}

function Mass(mass, radius, x, y, angle, x_speed, y_speed, rotation_speed) {
    this.x = x;
    this.y = y;
    this.mass = mass || 1;
    this.radius = radius || 50;
    this.angle = angle || 0;
    this.x_speed = x_speed || 0;
    this.y_speed = y_speed || 0;
    this.rotation_speed = rotation_speed || 0;
}

Mass.prototype.update = function(elapsed, ctx) {
    this.x += this.x_speed * elapsed;
    this.y += this.y_speed * elapsed;
    this.angle += this.rotation_speed * elapsed;
    this.angle %= (2 * Math.PI);
    if (this.x - this.radius > ctx.canvas.width) {
        this.x = -this.radius;
    }

    if (this.x + this.radius < 0) {
        this.x = ctx.canvas.width + this.radius;
    }

    if (this.y - this.radius > ctx.canvas.height) {
        this.y = -this.radius;
    }

    if (this.y + this.radius < 0) {
        this.y = ctx.canvas.height + this.radius;
    }
    
}

Mass.prototype.push = function(angle, force, elapsed) {
    this.x_speed += elapsed * (Math.cos(angle) * force) / this.mass;
    this.y_speed += elapsed * (Math.sin(angle) * force) / this.mass;
}

Mass.prototype.twist = function(force, elapsed) {
    this.rotation_speed += elapsed * force / this.mass;
}

Mass.prototype.speed = function() {
    return Math.sqrt(Math.pow(this.x_speed, 2) + Math.pow(this.y_speed, 2));
}

Mass.prototype.movement_angle = function() {
    return Math.atan2(this.y_speed, this.x_speed);
}

Mass.prototype.draw = function(c) {
    c.save();
    c.translate(this.x, this.y);
    c.rotate(this.angle);
    c.beginPath(); 
    c.arc(0, 0, this.radius, 0, 2 * Math.PI);
    c.lineTo(0, 0);
    c.strokeStyle = "#FFFFFF";
    c.stroke();
    c.restore();
}

function Ship(x, y, power) {
    this.super(10, 20, x, y, 1.5 * Math.PI);
    this.thrusterPower = power;
    this.thrusterOn = false;
}

extend(Ship, Mass);

Ship.prototype.draw = function(ctx, guide) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    // ctx.strokeStyle = "white";
    // ctx.lineWidth = 2;
    // ctx.fillStyle = "black";
    drawShip(ctx, this.radius, {
        // guide: guide,
        thruster: this.thrusterOn
    });
    ctx.restore();
}

Ship.prototype.update = function(elapsed) {
    this.push(this.angle, this.thrusterOn * this.thrusterPower, elapsed);
    Mass.prototype.update.apply(this, arguments);
}

function Asteroid(mass, x, y, x_speed, y_speed, rotation_speed) {
    var density = 1; // kg per square pixel
    var radius = Math.sqrt((mass / density) / Math.PI);
    this.super(mass, radius, x, y, 0, x_speed, y_speed, rotation_speed);
    this.circumference = 2 * Math.PI * this.radius;
    this.segments = Math.ceil(this.circumference / 15);
    this.segments = Math.min(25, Math.max(5, this.segments));
    this.noise = 0.2;
    this.shape = [];
    for (var i = 0; i < this.segments; i++) {
        this.shape.push(2 * (Math.random() - 0.5));
    }
}

extend(Asteroid, Mass);

Asteroid.prototype.update = function(elapsed) {
  if (this.x - this.radius + elapsed * this.x_speed > ctx.canvas.width) { this.x = -this.radius; }
  if (this.x + this.radius + elapsed * this.x_speed < 0) { this.x = ctx.canvas.width + this.radius; }
  if (this.y - this.radius + elapsed * this.y_speed > ctx.canvas.height) { this.y = -this.radius; }
  if (this.y + this.radius + elapsed * this.y_speed < 0) { this.y = ctx.canvas.height + this.radius; }
  this.x += elapsed * this.x_speed;
  this.y += elapsed * this.y_speed;
  this.angle = (this.angle + elapsed * this.rotation_speed) % (2 * Math.PI);
}

Asteroid.prototype.draw = function(ctx, guide) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    drawAsteroid(ctx, this.radius, this.shape, {
        guide: guide,
        noise: this.noise
    });
    ctx.restore();
}