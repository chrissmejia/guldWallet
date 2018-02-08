jQuery(function ($) {

    'use strict';
    // --------------------------------------------------------------------
    // jQuery for page scrolling feature - requires jQuery Easing plugin
    // --------------------------------------------------------------------

    (function () {
        $('a.page-scroll').on('click', function (e) {
            console.log("fired");
            e.preventDefault();
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
        });
    }());

    // --------------------------------------------------------------------
    // Closes the Responsive Menu on Menu Item Click
    // --------------------------------------------------------------------

    (function () {
        $('.navbar-collapse ul li a').on('click', function () {
            if ($(this).attr('class') != 'dropdown-toggle active' && $(this).attr('class') != 'dropdown-toggle') {
                $('.navbar-toggle:visible').trigger('click');
            }
        });
    }());

}); // JQuery end

var background = document.getElementById('background');
background.playbackRate = 0.8;

/*
var typed3 = new Typed('#text', {
    strings: ['A new <i>secure</i> internet ', 'A new <strong>better</strong> internet', 'A new decentralized internet'],
    typeSpeed: 80,
    backSpeed: 50,
    smartBackspace: true, // this is a default
    loop: false
});
*/

$(document).ready(function () {
    function welcomeCenter() {
        var height = $(window).height();
        var welcome = $('#welcome').outerHeight();
        $('#background').height(height);

        var free_space = height - welcome //- (welcome + 140);  // menu adjustment
        free_space = free_space - (free_space * 0.1) // 0.1 of adjust to top
        var off_top = (free_space / 2);
        if (off_top < 1) {
            off_top = 3;
        }

        $('#welcome').css("margin-top", off_top + "px");
        $(".header").height(height);
    }

    $(window).resize(function () {
        welcomeCenter();
    });

    $(window).resize();
});

$(window).on('load', function () {
    var labels = ['days', 'hours', 'minutes', 'seconds'],
        nextYear = '2018/04/07 14:00',
        template = _.template($('#seminar-countdown-template').html()),
        currDate = '00:00:00:00:00',
        nextDate = '00:00:00:00:00',
        parser = /([0-9]{2})/gi,
        $example = $('#seminar-countdown');
    // Parse countdown string to an object
    function strfobj(str) {
        var parsed = str.match(parser),
            obj = {};
        labels.forEach(function (label, i) {
            obj[label] = parsed[i]
        });
        return obj;
    }
    // Return the time components that diffs
    function diff(obj1, obj2) {
        var diff = [];
        labels.forEach(function (key) {
            if (obj1[key] !== obj2[key]) {
                diff.push(key);
            }
        });
        return diff;
    }
    // Build the layout
    var initData = strfobj(currDate);
    labels.forEach(function (label, i) {
        $example.append(template({
            curr: initData[label],
            next: initData[label],
            label: label
        }));
    });
    // Starts the countdown
    $example.countdown(nextYear, function (event) {
        var newDate = event.strftime('%D:%H:%M:%S'),
            data;
        if (newDate !== nextDate) {
            currDate = nextDate;
            nextDate = newDate;
            // Setup the data
            data = {
                'curr': strfobj(currDate),
                'next': strfobj(nextDate)
            };
            // Apply the new values to each node that changed
            diff(data.curr, data.next).forEach(function (label) {
                var selector = '.%s'.replace(/%s/, label),
                    $node = $example.find(selector);
                // Update the node
                $node.removeClass('flip');
                $node.find('.curr').text(data.curr[label]);
                $node.find('.next').text(data.next[label]);
                // Wait for a repaint to then flip
                _.delay(function ($node) {
                    $node.addClass('flip');
                }, 50, $node);
            });
        }
    });
});