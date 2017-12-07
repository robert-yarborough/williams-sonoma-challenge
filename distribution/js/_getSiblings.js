/**
 * Get all siblings of an element
 * @param {Node} elem The element
 *
 * @return {Array} The siblings */


var _getSiblings = (function () {
    'use strict';
    window._getSiblings = window._getSiblings || {};

    function of(elem) {
        var siblings = [];
        var sibling = elem.parentNode.firstChild;

        for ( ; sibling; sibling = sibling.nextSibling ) {

            if ( sibling.nodeType === 1 && sibling !== elem ){
                 siblings.push( sibling );
            }

        }

        return siblings;
    }

    return {
        of: of
    }


})();
