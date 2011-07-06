// ==UserScript==
// @name           Better 5by5
// @namespace      *
// @description    Saves your timezone selection for the schedule for future visits.
// @include        http://5by5.tv/schedule
// ==/UserScript==

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js");
    script.addEventListener('load',
        function() {
            var script = document.createElement("script");
            script.textContent = "(" + callback.toString() + ")();";
            document.body.appendChild(script);
        },
    false);
    document.body.appendChild(script);
}

// the guts of this userscript
function main() {
    function updateCalendar() {
        var userTimezone = localStorage.getItem("5by5.timezone");
        if (userTimezone != null) {
            $calendar.attr('src', userTimezone);
        }
    }
    var $calendar = $('#calendar');
    var calendarSrc = $calendar.attr('src');
    
    var $timezones = $('[target*="calendar"]');
    $timezones.click(function(event) {
        var linkSrc = $(this).attr('href')
        localStorage.setItem("5by5.timezone", linkSrc);
        updateCalendar();
        return false;
    });
    
    updateCalendar();
}

// load jQuery and execute the main function
addJQuery(main);