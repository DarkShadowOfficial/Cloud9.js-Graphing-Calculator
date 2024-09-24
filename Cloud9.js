let distance = (obj1, obj2) => {
  return Math.sqrt((obj1.x - obj2.x) ** 2 + (obj1.y - obj2.y) ** 2);
};
class Cloud {
  constructor(clear = true) {
    this.c = document.createElement("canvas");
    this.ctx = this.c.getContext("2d");
    this.objects = {};
    this.vars = {};
    this.bg = "white";
    this.classes = {};
    this.clear = clear;
  }
  InitializeScreen(w, h, color = "white") {
    this.c.width = w;
    this.c.height = h;
    document.body.appendChild(this.c);
    this.ctx.fillStyle = color;
    this.bg = color;
    this.ctx.fillRect(0, 0, w, h);
  }
  InitMouse() {
    this.mouse = { x: null, y: null, click: false };
    this.c.addEventListener("mousemove", (e) => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });
    this.c.addEventListener("mousedown", () => {
      this.mouse.click = true;
    });
    this.c.addEventListener("mouseup", () => {
      this.mouse.click = false;
    });
  }
  Message(
    message,
    x = this.c.width / 2,
    y = this.c.height / 2,
    color = "black"
  ) {
    this.ctx.fillStyle = color;
    this.ctx.fillText(message, x, y, this.c.width / 2);
  }
  ChangeVar(name, value) {
    this.vars[name] += value;
  }
  SetVar(name, value) {
    this.vars[name] = value;
  }
  GetVar(name) {
    return this.vars[name];
  }
  CreateCharacter(
    name,
    draw_function,
    behavior_function,
    vars = { x: this.c.width / 2, y: this.c.height / 2 }
  ) {
    this.objects[name] = new Character(draw_function, behavior_function, vars);
  }
  CreateCharacterClass(
    name,
    draw_function,
    behavior_function,
    vars = { x: this.c.width / 2, y: this.c.height / 2 }
  ) {
    this.classes[name] = {
      draw: draw_function,
      behavior: behavior_function,
      vars: vars,
    };
  }
  CreateCharacterFromClass(className, specificVars) {
    let clas = this.classes[className];
    let id = Math.round(Math.random() * 899999) + 100000;
    while (this.objects[`${className}${id}`] != undefined) {
      id = Math.round(Math.random() * 899999) + 100000;
    }
    this.objects[`${className}${id}`] = new Character(
      clas.draw,
      clas.behavior,
      {
        ...clas.vars,
        ...specificVars,
      }
    );
  }
  RunChararacter(name) {
    let char = this.objects[name];
    this.ctx.fillStyle = this.bg;
    this.clear ? this.ctx.fillRect(0, 0, this.c.width, this.c.height) : void 0;
    char.behavior(char.vars);
    char.draw(char.vars);
  }
  RunAll() {
    this.ctx.fillStyle = this.bg;
    this.clear ? this.ctx.fillRect(0, 0, this.c.width, this.c.height) : void 0;
    for (let i in this.objects) {
      let char = this.objects[i];
      char.behavior(char.vars);
      char.draw(char.vars);
    }
  }
  CharVar(name, varName, value, action) {
    let char = this.objects[name];
    switch (action) {
      case "get":
        return char.GetVar(varName);
      case "change":
        char.ChangeVar(varName, value);
        break;
      case "delete":
        char.DeleteVar(varName);
        break;
      default:
        char.SetVar(varName, value);
    }
  }
  Circle(x, y, size, color = "black") {
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    this.ctx.fill();
  }
  Square(x, y, size, color = "black") {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x - size / 2, y - size / 2, size, size);
  }
  Rect(x, y, w, h, color = "black") {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x - w / 2, y - h / 2, w, h);
  }
  Line(startCoords, endCoords, color = "black") {
    this.ctx.beginPath();
    this.ctx.strokeStyle = color;
    this.ctx.moveTo(startCoords.x, startCoords.y);
    this.ctx.lineTo(endCoords.x, endCoords.y);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}
class Character {
  constructor(draw_function, behavior_function, vars = {}) {
    this.draw = draw_function;
    this.behavior = behavior_function;
    this.vars = vars;
  }
  Coords() {
    return { x: this.vars.x, y: this.vars.y };
  }
  ChangeVar(name, value) {
    this.vars[name] += value;
  }
  SetVar(name, value) {
    this.vars[name] = value;
  }
  DeleteVar(name) {
    delete this.vars[name];
  }
  GetVar(name) {
    return this.vars[name];
  }
}
