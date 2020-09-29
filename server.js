var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module
var io = require('socket.io')(http) //require socket.io module and pass the http object (server)
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(4, 'out'); //use GPIO pin 4 as output
var pushButton = new Gpio(17, 'in', 'both'); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled
var pushButton1 = new Gpio(27, 'in', 'both'); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled
var pushButton2 = new Gpio(22, 'in', 'both'); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled
var pushButton3 = new Gpio(23, 'in', 'both'); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled


http.listen(8080); //listen to port 8080

function handler(req, res) { //create server
    fs.readFile(__dirname + '/public/index.html', function (err, data) { //read file index.html in public folder
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' }); //display 404 on error
            return res.end("404 Not Found");
        }
        res.writeHead(200, { 'Content-Type': 'text/html' }); //write HTML
        res.write(data); //write data from index.html
        return res.end();
    });
}

io.sockets.on('connection', function (socket) {// WebSocket Connection
    var lightvalue = 0; //static variable for current status
    pushButton.watch(function (err, value) { //Watch for hardware interrupts on pushButton
        if (err) { //if an error
            console.error('There was an error', err); //output error message to console
            return;
        }
        lightvalue = value;
        socket.emit('light', lightvalue); //send button status to client
    });
    socket.on('light', function (data) { //get light switch status from client
        lightvalue = data;
        if (lightvalue != LED.readSync()) { //only change LED if status has changed
            LED.writeSync(lightvalue); //turn LED on or off
        }
    });
});

asdf
io.sockets.on('connection', function (socket1) {// WebSocket Connection
    var lightvalue1 = 0; //static variable for current status
    pushButton1.watch(function (err, value) { //Watch for hardware interrupts on pushButton
        if (err) { //if an error
            console.error('There was an error', err); //output error message to console
            return;
        }
        lightvalue1 = value;
        socket1.emit('light1', lightvalue1); //send button status to client
    });
    socket1.on('light1', function (data) { //get light switch status from client
        lightvalue1 = data;
        if (lightvalue1 != LED.readSync()) { //only change LED if status has changed
            LED.writeSync(lightvalue1); //turn LED on or off
        }
    });
});

io.sockets.on('connection', function (socket2) {// WebSocket Connection
    var lightvalue2 = 0; //static variable for current status
    pushButton2.watch(function (err, value) { //Watch for hardware interrupts on pushButton
        if (err) { //if an error
            console.error('There was an error', err); //output error message to console
            return;
        }
        lightvalue2 = value;
        socket2.emit('light', lightvalue2); //send button status to client
    });
    socket2.on('light', function (data) { //get light switch status from client
        lightvalue2 = data;
        if (lightvalue2 != LED.readSync()) { //only change LED if status has changed
            LED.writeSync(lightvalue2); //turn LED on or off
        }
    });
});

io.sockets.on('connection', function (socket3) {// WebSocket Connection
    var lightvalue3 = 0; //static variable for current status
    pushButton3.watch(function (err, value) { //Watch for hardware interrupts on pushButton
        if (err) { //if an error
            console.error('There was an error', err); //output error message to console
            return;
        }
        lightvalue3 = value;
        socket3.emit('light', lightvalue2); //send button status to client
    });
    socket3.on('light', function (data) { //get light switch status from client
        lightvalue3 = data;
        if (lightvalue3 != LED.readSync()) { //only change LED if status has changed
            LED.writeSync(lightvalue3); //turn LED on or off
        }
    });
});

process.on('SIGINT', function () { //on ctrl+c
    LED.writeSync(0); // Turn LED off
    LED.unexport(); // Unexport LED GPIO to free resources
    pushButton.unexport(); // Unexport Button GPIO to free resources
    pushButton1.unexport(); // Unexport Button GPIO to free resources
    pushButton2.unexport(); // Unexport Button GPIO to free resources
    pushButton3.unexport(); // Unexport Button GPIO to free resources
    process.exit(); //exit completely
});