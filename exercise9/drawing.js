const tau = 2 * Math.PI;
function drawGrid(ctx, minor, major, stroke, fill) {
    minor = minor || 10;
    major = major || minor * 5;
    stroke = stroke || "#00FF00";
    fill = fill || "#009900";
    ctx.save(); // save canvas state
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    let width = ctx.canvas.width, height = ctx.canvas.height
    for (var x = 0; x < width; x += minor) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.lineWidth = (x % major == 0) ? 0.5 : 0.25
        ctx.stroke();
        if(x % major == 0 ) { ctx.fillText(x, x, 10);}
    }
    for(var y = 0; y < height; y += minor) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.lineWidth = (y % major == 0) ? 0.5 : 0.25
        ctx.stroke();
        if(y % major == 0 ) { ctx.fillText(y, 0, y + 10);}
    }
    ctx.restore(); // restore canvas state when the function is done

}

function drawPacMan(ctx, radius, mouth) {
    angle = 0.2 * Math.PI * mouth;
    ctx.save();
    ctx.fillStyle = "yellow";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.arc(0, 0, radius, angle, -angle);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

function drawAsteroid(ctx, radius, shape, options) {
    // console.log(`radius: ${radius}`)
    // console.log(`shape: ${shape}`)
    // console.log(`options ${options}`)
    options = options || {};
    ctx.strokeStyle = options.strokeStyle || "white";
    ctx.fillStyle = options.fill || "black";
    ctx.save();
    ctx.beginPath();
    for (let i = 0; i < shape.length; i++) {
        ctx.rotate(tau / shape.length);
        ctx.lineTo(radius + radius * options.noise * shape[i], 0);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    if(options.guide) {
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, tau);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = 0.2;
        ctx.arc(0, 0, radius + radius * options.noise, 0, tau);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, radius - radius * options.noise, 0, tau);
        ctx.stroke();
    }
    ctx.restore();
}

function drawAsteroid_original(ctx, radius, segments, options) {
    options = options || {};
    ctx.strokeStyle = options.strokeStyle || "white";
    ctx.fillStyle = options.fill || "black";
    ctx.save();
    ctx.beginPath();
    for (let i = 0; i < segments; i++) {
        ctx.rotate(tau / segments);
        ctx.lineTo(radius + radius * options.noise * (Math.random() - 0.5), 0);
    }
    ctx.closePath();
    ctx.fill();
    if(options.guide) {
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, tau);
        ctx.stroke();
    }
    ctx.restore();
}

function drawShip(ctx, radius, options) {
    options = options || {};
    ctx.save();
    // optionally draw the collision barrier
    if (options.guide) {
        ctx.strokeStyle = "white";
        ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, tau);
        ctx.stroke();
        ctx.fill();
    }
    // default values
    ctx.lineWidth = options.lineWidth || 2;
    ctx.strokeStyle = options.stroke || "white";
    ctx.fillStyle = options.fill || "black";
    let angle = (options.angle || 0.5 * Math.PI) / 2;

    // draw ship
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(
        Math.cos(Math.PI - angle) * radius,
        Math.sin(Math.PI - angle) * radius
    );
    ctx.lineTo(
        Math.cos(Math.PI + angle) * radius,
        Math.sin(Math.PI + angle) * radius 
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

function drawCurvyShip(ctx, radius, options) {
    options = options || {};
    ctx.save();
    // optionally draw the collision barrier
    if (options.guide) {
        ctx.strokeStyle = "white";
        ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, tau);
        ctx.stroke();
        ctx.fill();
    }
    // default values
    ctx.lineWidth = options.lineWidth || 2;
    ctx.strokeStyle = options.stroke || "white";
    ctx.fillStyle = options.fill || "black";
    let angle = (options.angle || 0.5 * Math.PI) / 2;
    let curve = (options.curve || 0.5)
    // draw ship
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(
        Math.cos(Math.PI - angle) * radius,
        Math.sin(Math.PI - angle) * radius
    );
    ctx.quadraticCurveTo(radius * curve - radius, 0,
        Math.cos(Math.PI + angle) * radius,
        Math.sin(Math.PI + angle) * radius 
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

function drawShip_old(ctx, x, y, radius, options) {
    options = options || {};
    ctx.save();
    // optionally draw the collision barrier
    if (options.guide) {
        ctx.strokeStyle = "white";
        ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, tau);
        ctx.stroke();
        ctx.fill();
    }
    // default values
    ctx.lineWidth = options.lineWidth || 2;
    ctx.strokeStyle = options.stroke || "white";
    ctx.fillStyle = options.fill || "black";
    let angle = (options.angle || 0.5 * Math.PI) / 2;

    // draw ship
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(
        x + Math.cos(Math.PI - angle) * radius,
        y + Math.sin(Math.PI - angle) * radius
    );
    ctx.lineTo(
        x + Math.cos(Math.PI + angle) * radius,
        y + Math.sin(Math.PI + angle) * radius 
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}