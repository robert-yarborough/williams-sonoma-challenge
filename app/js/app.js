var app = (function (window) {
    'use strict';
    /* Export namespace to window object */
    window.app = window.app || {};
    //initialize all modules here...
    function init() {
        this.tmplMap = tmplMap.run();
        this.navMenu = navMenu.openHamburger();
        this.accordionMenu = accordionMenu.activateAccordion();
        this.gallery = gallery.setImageSrc();
        this.modal = modal.modalFn();
    }

    return {
        init: init
    }



})(window);
