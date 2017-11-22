var gallery = (function(window){
    'use strict';
    /* Export namespace to window object */
    window.gallery = window.gallery || {};

    /* Cache DOM elements */
    var container = document.querySelector('#gallery');
    var firstSmallImage = container.querySelector('.small-preview');
    var zoomedImage = container.querySelector('.zoomed-image');
    var state = [];

    function setImageSrc() {
        return zoomedImage.style.backgroundImage = 'url('+ firstSmallImage.src +')';
    }


    function zoom(event) {
        var elem = event.target;
        if (elem.classList.contains("small-preview")) {
            var imageSrc = elem.src;
            zoomedImage.style.backgroundImage = 'url('+ imageSrc +')';
            state.push(elem);
            console.log(state);
        }

    }

    function enlarge() {
        // Make the dimensions larger then actual size of element
        this.style.backgroundSize = "150%";
    }

    function move(event) {
        // getBoundingClientRect gives us various information about the position of the element.
        var dimensions = this.getBoundingClientRect();

        // Calculate the position of the cursor inside the element (in pixels).
        var x = event.clientX - dimensions.left;
        var y = event.clientY - dimensions.top;

        // Calculate the position of the cursor as a percentage of the total width/height of the element.
        var xpercent = Math.round(100 / (dimensions.width / x));
        var ypercent = Math.round(100 / (dimensions.height / y));

        // Update the background position of the image.
        this.style.backgroundPosition = xpercent+'% ' + ypercent+'%';
    }

    function leave() {
        this.style.backgroundSize = "cover";
        this.style.backgroundPosition = "center";
    }

    container.addEventListener("click", zoom, false);
    zoomedImage.addEventListener("mouseenter", enlarge, false);
    zoomedImage.addEventListener("mousemove", move, false);
    zoomedImage.addEventListener("mouseleave", leave, false);

    return {
      /*init: init*/
      setImageSrc: setImageSrc,
      zoom: zoom,
      enlarge: enlarge,
      move: move,
      leave: leave

    }

})(window);
// TODO: find a cleaner way to initialize this method...
gallery.setImageSrc();