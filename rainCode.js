var streams = [];
var symbolSize = 40;

function setup()
{
    createCanvas(
        window.innerWidth,
        window.innerHeight
    );

    var x = 0;
    var y = 0;

    for (let i = 0; i <= width / symbolSize; i++) {
        y = random(-500, 0)
        stream = new Stream();
        stream.generateSymbols(x, y);

        streams.push(stream);
        x += symbolSize;

    }

    textSize(symbolSize);
}

function draw()
{
    background(0);
    streams.forEach(function(stream) {
        stream.render();
    });
}

function Symbol(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.value;

    this.setToRandomSymbol = function() {
        this.value = String.fromCharCode(0x30A0 + round(random(0, 95)));
    }

    this.render = function() {
        fill(0, 255, 70);
        text(this.value, this.x, this.y);
        this.rain()
        if(round(random(0, 500)) == 99)
            this.setToRandomSymbol();
    }

    this.rain = function() {
        this.y = (this.y >= height + symbolSize) ? 0 : this.speed + this.y;
    }

}


function Stream()
{
    this.symbols = [];
    this.totalSymbols = round(random(5, 30));
    this.speed = random(2, 7);

    this.generateSymbols = function(x, y) {
        for (let i = 0; i < this.totalSymbols; i++) {
            symbol = new Symbol(x, y, this.speed);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y -= symbolSize;
        }
    }

    this.render = function() {
        this.symbols.forEach(symbol => symbol.render());
    }
}