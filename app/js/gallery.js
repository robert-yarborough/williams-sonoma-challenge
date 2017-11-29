var gallery = (function(window){
    'use strict';
    /* Export namespace to window object */
    window.gallery = window.gallery || {};

    /* Cache DOM elements */
    var container = document.querySelector('#gallery');
    var firstSmallImage = container.querySelector('.small-preview');
    var zoomedImage = container.querySelector('.zoomed-image');
    var labelParent = document.querySelector('.product_info');
    var labels = labelParent.getElementsByClassName('label');
    var btnElement = labelParent.getElementsByClassName('add_to_cart');
    console.log(btnElement);
    var previewState = [];




    function setImageSrc() {
        return zoomedImage.style.backgroundImage = 'url('+ firstSmallImage.src +')';
    }

    function zoom(event) {
        var elem = event.target;
        var match;

        if (elem.classList.contains("small-preview")) {
            var imageSrc = elem.src;
            zoomedImage.style.backgroundImage = 'url('+ imageSrc +')';
            previewState.push(elem.dataset);
            console.log(btnElement);

            match = Object.keys(previewState).filter(function(state) {
                var preview = previewState[state].id;
                var template = Object.keys(labels).filter(function (index) {
                    var selectedElement = labels[index];
                    var templateState = labels[index].dataset.label;

                    if (templateState === preview){
                        var selected = _nextUntil.get(selectedElement, '.breakline');
                        var unselected = _getSiblings.of(selectedElement);

                        selected.filter(function (select) {
                            selectedElement.style.display = "block";
                            select.classList.remove("selected");

                            if (select.classList.contains("add_to_cart")){
                                select.addEventListener('click', function () {
                                    alert('testing dialogue');
                                }, false)
                                //needs modal template
                            }

                            if (select.classList.contains("product_accordion")){
                                var row = select.querySelector('.accordion');

                                row.addEventListener('click', function (){
                                    this.classList.toggle('active');
                                    console.log(this.children);
                                    var panel = this.nextElementSibling;
                                    if (panel.style.maxHeight){
                                        panel.style.maxHeight = null;
                                    } else {
                                        panel.style.maxHeight = panel.scrollHeight + "px";
                                    }

                                }, false);
                            }

                            return select.classList.add("selected");
                        });

                        unselected.filter(function (unselect) {
                            if (unselect.classList.contains("selected")){
                                unselect.classList.remove("selected");
                                unselect.style.display = "block";
                            }else {
                                unselect.style.display = "none";
                            }
                        });


                    }

                });
                return template;
            });
        }
        return match;

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
      setImageSrc: setImageSrc,
      zoom: zoom,
      enlarge: enlarge,
      move: move,
      leave: leave

    }

})(window);
// TODO: find a cleaner way to initialize this method...
gallery.setImageSrc();