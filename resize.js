// Anyone who has hooked into the resize event of the window object in
// Internet Explorer knows the pain - the event is fired twice for
// every single movement (once for horizontal and once for vertical).
// To make matters worse, if you drag the window size it doesn't get
// fried twice at the end, it gets fired numerous times throughout the
// resize.  The result of this is that if you are hooked into the
// event and are resizing some other elements (and probably
// re-rendering them too), performance suffers and the page seems
// unresponsive.

// Luckily there is a relatively straight-forward resolution to this:

Sys.Application.add_load(function(sender, args) {
    $addHandler(window, 'resize', window_resize);
});

var resizeTimeoutId;

function window_resize(e) {
     window.clearTimeout(resizeTimeoutId);
     resizeTimeoutId = window.setTimeout('doResizeCode();', 10);
}

// Essentially you queue up the resize handling code, and then if the
// window resize occurs again, you cancel it, and re-queue it.  This
// keeps happening until the resize is complete, at which point, your
// doResizeCode() function is actually executed.
