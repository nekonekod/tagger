const _ = require('lodash')

let search = _.debounce(() => {
    return console.log("making search request");
}, 1000);
search();
search();
search();
// call s.search after 3 seconds
setTimeout(function(){
    search()
    search()
}, 3000);
// timer to show passage of time
let i = 0;
let t = setInterval(function () {
    i += 1;
    console.log(i + " seconds elapsed");
    if (i > 5) {
        clearInterval(t);
    }
}, 1000);