function callWrite() {
    writeOnePoint();
}
    
// class Source
function Source() {
    // index into array 
    this.currIndex = 0;

    this.hexArray = 
        new Array( 5, 5, 5, -1, -12, -19, -25, -28, -28, -30, 
                   -30, -30, -31, -30, -30, -40, -52, -49, -46, 14,
                   97, 124, 77, 16, -25, -38, -43, -48, -49, -48,
                   -43, -38, -37, -37, -33, -20, -6, 1, 7, 7, 10, 7);
    
    // Return the next value in array
    this.getNext = function() {
        return this.hexArray[this.currIndex++];
    }

    // Reset currIndex so we can start over...
    this.reset = function() {
        this.currIndex = 0;
    }
    
    // return length of array.
    this.length = function() {
        return this.hexArray.length;
    }

    // Return number of samples remaining
    this.samples = function() {
        return (this.hexArray.length - this.currIndex);
    }
}

// Use to clear ahead of the present location:
function clearAheadOfCursor(x)
{
    var y= 30;
    var w=5;
    var h = 250;
    
    context.clearRect ( x , y , w , h );
}


var ourSample = new Source;

// Write one point, and calls itself with setTimeout
function writeOnePoint() {

    var originX = 10;
    var originY = 200;
    
    
    
    if (typeof writeOnePoint.currentX == 'undefined'){
        writeOnePoint.currentX    = originX;
    }
    if (typeof writeOnePoint.currentY == 'undefined'){
        writeOnePoint.currentY    = originY;
    }
    
    var t;
    var pixelsPerSample = 4;
    
    context.beginPath();
    context.strokeStyle = '#f00';
    context.lineWidth = 2; //lineWidth;
    
//    if (writeOnePoint.currentX > ($(window).width() -  50))
    if (writeOnePoint.currentX > 800)
    {
        writeOnePoint.currentX = originX;
        clearAheadOfCursor(writeOnePoint.currentX -1);
    }

    clearAheadOfCursor(writeOnePoint.currentX +1);

    context.moveTo(writeOnePoint.currentX, writeOnePoint.currentY);
    
    if (ourSample.samples() > 0)
    {
        var offsetY  = ourSample.getNext(); 

        writeOnePoint.currentX += pixelsPerSample;
        writeOnePoint.currentY = originY - offsetY;
        
        context.lineTo(writeOnePoint.currentX, writeOnePoint.currentY);
        context.stroke();

//        t = setTimeout("callWrite()", 25);

    }
    else {
        ourSample.reset();
//        t = setTimeout("callWrite()", 25);
    }
    t = setTimeout("writeOnePoint()", 20);
}


    
    

