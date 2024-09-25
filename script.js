let cloud = new Cloud(false);
cloud.InitializeScreen(500, 500, "#2f2f2f");
cloud.InitMouse();
for (let name of Object.getOwnPropertyNames(Math)) {
    globalThis[name.toLowerCase()] = Math[name];
}
cloud.CreateCharacterClass('graph', vars => {
    cloud.Line({x: cloud.c.width/2, y: 0}, {x: cloud.c.width/2, y: cloud.c.height}, "white");
    cloud.Line({x: 0, y: cloud.c.height/2}, {x: cloud.c.width, y: cloud.c.height/2}, "white");
    vars.count > 2 ? cloud.Line({x: vars.oldx, y: vars.oldy}, {x: vars.x, y: vars.y}, vars.color) : void(0);
    cloud.Square(10, vars.i*20 + 10, 20, vars.color);
    cloud.Message(vars.equation, 30, vars.i*20+10, vars.color);
}, vars => {
    vars.oldx = vars.x;
    vars.oldy = vars.y;
    vars.x += 5;
    vars.y = cloud.c.height/2 - vars.graph((vars.x - cloud.c.width/2)*vars.xscale)/vars.yscale;
    vars.count++;
}, {x: -1, y: -1, oldx: -1, oldy: -1, count: 0})
let equations = document.querySelector('#eqs');
let xscale = document.querySelector('#xscale');
let yscale = document.querySelector('#yscale');
let btn = document.querySelector('#graph');
let i = 0;
function graph(eq, xs, ys, equ) {
    cloud.CreateCharacterFromClass('graph', {graph: eq, xscale: xs, yscale: ys, color: `rgb(${Math.random()*80 + 175}, ${Math.random()*100 + 155}, ${Math.random()*70 + 185})`, equation: equ, i: i});
    i++;
}
let xScale = 1;
let yScale = 1;
btn.onclick = () => {
    i = 0;
    xScale = xscale.value;
    yScale = yscale.value;
    cloud.objects = [];
    cloud.ctx.clearRect(0, 0, 500, 500);
    let eqs = equations.value.split(", ");
    eqs.forEach(eq => {
        graph(x => eval(eq.toLowerCase()), xScale, yScale, eq);
    });
    function animate() {
        cloud.RunAll();
        let mousex = cloud.mouse.x;
        let mousey = cloud.mouse.y;
        document.querySelector('#coords').innerHTML = `(${(mousex - cloud.c.width/2 - 5)*xScale}, ${(cloud.c.height/2 - mousey + 5)*yScale})`;
        requestAnimationFrame(animate);
    }
    animate()
}
