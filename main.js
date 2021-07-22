'use strict';

var countryList = [];

function init() {
    readCountryList();

    // When reloading, the browser keeps the value of the input, so, for
    // consistency, we should trigger the search at start, just to be sure
    // that the search term in the input *always* results in a filtered
    // country list.
    triggerSearch();
}

function onSearch(input) {
    var searchTerm = input.value.toLowerCase();

    for(var i = 0; i < countryList.length; i++) {
        var country = countryList[i];
        var result = textMatcher(searchTerm, country.text);
        result
            ? country.element.classList.remove('is-hidden')
            : country.element.classList.add('is-hidden');
    }
}

function textMatcher(value, target) {
    // If the target contains the value, it's a match.
    return target.indexOf(value) >= 0;
}

function triggerSearch() {
    var searchBox = document.querySelector('#search-box');
    onSearch(searchBox);
}

function readCountryList() {
    var listElements = document.querySelectorAll('.word-item');
    for(var i = 0; i < listElements.length; i++) {
        var listElement = listElements[i];
        countryList.push({
            // If the text is hanging from listElement... why not store just
            // the element, instead of the name and the element separatedly?
            // Because reading textContent represents a DOM access, and
            // accessing the DOM is expensive, so, let's cache this information
            // from the beginning.
            text: listElement.textContent.toLowerCase(),
            element: listElement
        });
    }
}

init();
