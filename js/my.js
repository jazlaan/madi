
function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
}



$(document).ready(function(){


	$(".selector").flatpickr({
		enableTime: true,
		minDate: "today",
		dateFormat: "F j, Y, H:i",
		mode: "range"
	});

	$(".selector2").flatpickr({
	    dateFormat: "d.m.y",
	});
	                    
	$("#theplaceyouwant").instastream({
	    instaToken: '2684549374.1677ed0.0ded345b258a4aab825bf178906471d1',
	    instaUser: '2684549374',
	    instaResults: 10,
	    instaMenu: 'yes'
	});



    $(".mapholder").hide();
	$("#mapbuttonclose").hide();
    $("#mapbuttonopen").click(function(){
        $("#mapbuttonopen").hide();
        $("#mapbuttonclose").show();
        $(".mapholder").slideDown('slow');
        $("#mapbuttonclose").click(function(){
            $("#mapbuttonclose").hide();
            $("#mapbuttonopen").show()
            $(".mapholder").slideUp('slow');
        })

    });

    $(".flighsheduleholder").hide();

	$("#palnebutton").click(function(){
		$('.flighsheduleholder').slideToggle();
	})

	$("#sel2").click(function() {  
    	$(".heighautdgest6").addClass("heighautdgest3");      
  	});


	



  		var fixed = false;
	    $(document).scroll(function() {
		    if ($(this).scrollTop() > 250) {
			    if (!fixed) {
			    fixed = true;
			    // $('#to-top').css({position:'fixed', display:'block'});
			    $('#to-top').show("slow", function() {
			        $('#to-top').css({
			            position: 'fixed',
			            display: 'block'
			        });
			    });
			    }
			    } else {
			    if (fixed) {
			    fixed = false;
			    $('#to-top').hide("slow", function() {
			        $('#to-top').css({
			            display: 'none'
			        });
			    });
			    }
		    }
    });


    $("select").change(function(){
        $(this).find("option:selected").each(function(){
            var optionValue = $(this).attr("value");
            if(optionValue){
                $(".box").not("." + optionValue).hide();
                $("." + optionValue).show();
            } else{
                $(".box").hide();
            }
        });
    }).change();


});



  
    var sel1 = document.querySelector('#sel1');
    var sel2 = document.querySelector('#sel2');
    var options2 = sel2.querySelectorAll('option');

    function giveSelection(selValue) {
      sel2.innerHTML = '';
      for(var i = 0; i < options2.length; i++) {
        if(options2[i].dataset.option === selValue) {
          sel2.appendChild(options2[i]);
        }
      }
    }

    giveSelection(sel1.value);




  	$.global = new Object();

    $.global.item = 1;
    $.global.total = 0;


    var WindowWidth = $(window).width();
    var SlideCount = $('#slides li').length;
    var SlidesWidth = SlideCount * WindowWidth;

    $.global.item = 0;
    $.global.total = SlideCount; 

    $('.slide').css('width',WindowWidth+'px');
    $('#slides').css('width',SlidesWidth+'px');

    $("#slides li:nth-child(1)").addClass('alive');

    $('#left').click(function() { Slide('back'); }); 
    $('#right').click(function() { Slide('forward'); });

	setInterval(function(){

    Slide('forward');

    }, 3800);


    function Slide(direction){

    if (direction == 'back') { var $target = $.global.item - 1; }
    if (direction == 'forward') { var $target = $.global.item + 1; }  

    if ($target == -1) { DoIt($.global.total-1); } 
    else if ($target == $.global.total) { DoIt(0); }  
    else { DoIt($target); }


    }

    function DoIt(target){

    var $windowwidth = $(window).width();
    var $margin = $windowwidth * target; 
    var $actualtarget = target+1;

    $("#slides li:nth-child("+$actualtarget+")").addClass('alive');

    $('#slides').css('transform','translate3d(-'+$margin+'px,0px,0px)');    

    $.global.item = target; 

    $('#count').html($.global.item+1);

    }

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! flatpickr v2.5.1, @license MIT */
function Flatpickr(element, config) {
    var self = this;

    self._ = {};
    self._.afterDayAnim = afterDayAnim;
    self.changeMonth = changeMonth;
    self.changeYear = changeYear;
    self.clear = clear;
    self.close = close;
    self._createElement = createElement;
    self.destroy = destroy;
    self.isEnabled = isEnabled;
    self.jumpToDate = jumpToDate;
    self.open = open;
    self.redraw = redraw;
    self.set = set;
    self.setDate = setDate;
    self.toggle = toggle;

    function init() {
        if (element._flatpickr) destroy(element._flatpickr);

        element._flatpickr = self;

        self.element = element;
        self.instanceConfig = config || {};
        self.parseDate = Flatpickr.prototype.parseDate.bind(self);
        self.formatDate = Flatpickr.prototype.formatDate.bind(self);

        setupFormats();
        parseConfig();
        setupLocale();
        setupInputs();
        setupDates();
        setupHelperFunctions();

        self.isOpen = false;

        self.isMobile = !self.config.disableMobile && !self.config.inline && self.config.mode === "single" && !self.config.disable.length && !self.config.enable.length && !self.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (!self.isMobile) build();

        bind();

        if (self.selectedDates.length || self.config.noCalendar) {
            if (self.config.enableTime) {
                setHoursFromDate(self.config.noCalendar ? self.latestSelectedDateObj || self.config.minDate : null);
            }
            updateValue();
        }

        if (self.config.weekNumbers) {
            self.calendarContainer.style.width = self.daysContainer.clientWidth + self.weekWrapper.clientWidth + "px";
        }

        self.showTimeInput = self.selectedDates.length > 0 || self.config.noCalendar;

        if (!self.isMobile) positionCalendar();

        triggerEvent("Ready");
    }

    function bindToInstance(fn) {
        return fn.bind(self);
    }

    function updateTime(e) {
        if (self.config.noCalendar && !self.selectedDates.length)
            // picking time only
            self.selectedDates = [self.now];

        timeWrapper(e);

        if (!self.selectedDates.length) return;

        if (!self.minDateHasTime || e.type !== "input" || e.target.value.length >= 2) {
            setHoursFromInputs();
            updateValue();
        } else {
            setTimeout(function () {
                setHoursFromInputs();
                updateValue();
            }, 1000);
        }
    }

    function setHoursFromInputs() {
        if (!self.config.enableTime) return;

        var hours = (parseInt(self.hourElement.value, 10) || 0) % (self.amPM ? 12 : 24),
            minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60,
            seconds = self.config.enableSeconds ? parseInt(self.secondElement.value, 10) || 0 : 0;

        if (self.amPM) hours = hours % 12 + 12 * (self.amPM.textContent === "PM");

        if (self.minDateHasTime && compareDates(self.latestSelectedDateObj, self.config.minDate) === 0) {

            hours = Math.max(hours, self.config.minDate.getHours());
            if (hours === self.config.minDate.getHours()) minutes = Math.max(minutes, self.config.minDate.getMinutes());
        }

        if (self.maxDateHasTime && compareDates(self.latestSelectedDateObj, self.config.maxDate) === 0) {
            hours = Math.min(hours, self.config.maxDate.getHours());
            if (hours === self.config.maxDate.getHours()) minutes = Math.min(minutes, self.config.maxDate.getMinutes());
        }

        setHours(hours, minutes, seconds);
    }

    function setHoursFromDate(dateObj) {
        var date = dateObj || self.latestSelectedDateObj;

        if (date) setHours(date.getHours(), date.getMinutes(), date.getSeconds());
    }

    function setHours(hours, minutes, seconds) {
        if (self.selectedDates.length) {
            self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
        }

        if (!self.config.enableTime || self.isMobile) return;

        self.hourElement.value = self.pad(!self.config.time_24hr ? (12 + hours) % 12 + 12 * (hours % 12 === 0) : hours);

        self.minuteElement.value = self.pad(minutes);

        if (!self.config.time_24hr) self.amPM.textContent = hours >= 12 ? "PM" : "AM";

        if (self.config.enableSeconds) self.secondElement.value = self.pad(seconds);
    }

    function onYearInput(event) {
        var year = event.target.value;
        if (event.delta) year = (parseInt(year) + event.delta).toString();

        if (year.length === 4) {
            self.currentYearElement.blur();
            if (!/[^\d]/.test(year)) changeYear(year);
        }
    }

    function bind() {
        if (self.config.wrap) {
            ["open", "close", "toggle", "clear"].forEach(function (el) {
                var toggles = self.element.querySelectorAll("[data-" + el + "]");
                for (var i = 0; i < toggles.length; i++) {
                    toggles[i].addEventListener("click", self[el]);
                }
            });
        }

        if (window.document.createEvent !== undefined) {
            self.changeEvent = window.document.createEvent("HTMLEvents");
            self.changeEvent.initEvent("change", false, true);
        }

        if (self.isMobile) return setupMobile();

        self.debouncedResize = debounce(onResize, 50);
        self.triggerChange = function () {
            triggerEvent("Change");
        };
        self.debouncedChange = debounce(self.triggerChange, 300);

        if (self.config.mode === "range" && self.daysContainer) self.daysContainer.addEventListener("mouseover", function (e) {
            return onMouseOver(e.target);
        });

        document.body.addEventListener("keydown", onKeyDown);

        if (!self.config.static) (self.altInput || self.input).addEventListener("keydown", onKeyDown);

        if (!self.config.inline && !self.config.static) window.addEventListener("resize", self.debouncedResize);

        if (window.ontouchstart) window.document.addEventListener("touchstart", documentClick);

        window.document.addEventListener("click", documentClick);
        (self.altInput || self.input).addEventListener("blur", documentClick);

        if (self.config.clickOpens) (self.altInput || self.input).addEventListener("focus", open);

        if (!self.config.noCalendar) {
            self.prevMonthNav.addEventListener("click", function () {
                return changeMonth(-1);
            });
            self.nextMonthNav.addEventListener("click", function () {
                return changeMonth(1);
            });

            self.monthNav.addEventListener("wheel", function (e) {
                e.preventDefault();
            });

            self.monthNav.addEventListener("wheel", debounce(onMonthNavScroll, 10));
            self.monthNav.addEventListener("click", onMonthNavClick);

            self.currentYearElement.addEventListener("focus", function () {
                self.currentYearElement.select();
            });

            self.currentYearElement.addEventListener("input", onYearInput);
            self.currentYearElement.addEventListener("increment", onYearInput);

            self.daysContainer.addEventListener("click", selectDate);

            if (self.config.animate) {
                self.daysContainer.addEventListener("animationend", animateDays);
                self.monthNav.addEventListener("animationend", animateMonths);

                self.daysContainer.addEventListener("webkitAnimationEnd", animateDays);
                self.monthNav.addEventListener("webkitAnimationEnd", animateMonths);
            }
        }

        if (self.config.enableTime) {
            self.timeContainer.addEventListener("wheel", updateTime);

            self.timeContainer.addEventListener("click", timeIncrement);
            self.timeContainer.addEventListener("input", updateTime);
            self.timeContainer.addEventListener("increment", updateTime);
            self.timeContainer.addEventListener("increment", self.debouncedChange);

            self.timeContainer.addEventListener("wheel", self.debouncedChange);
            self.timeContainer.addEventListener("input", self.triggerChange);

            self.hourElement.addEventListener("focus", function () {
                self.hourElement.select();
            });
            self.minuteElement.addEventListener("focus", function () {
                self.minuteElement.select();
            });

            if (self.secondElement) {
                self.secondElement.addEventListener("focus", function () {
                    self.secondElement.select();
                });
            }

            if (self.amPM) {
                self.amPM.addEventListener("click", function (e) {
                    updateTime(e);
                    self.triggerChange(e);
                });
            }
        }
    }

    function animateDays(e) {
        if (self.daysContainer.childNodes.length > 1) {
            switch (e.animationName) {
                case "slideLeft":
                    self.daysContainer.lastChild.classList.remove("slideLeftNew");
                    self.daysContainer.removeChild(self.daysContainer.firstChild);
                    self.days = self.daysContainer.firstChild;

                    break;

                case "slideRight":
                    self.daysContainer.firstChild.classList.remove("slideRightNew");
                    self.daysContainer.removeChild(self.daysContainer.lastChild);
                    self.days = self.daysContainer.firstChild;

                    break;

                default:
                    break;
            }
        }
    }

    function animateMonths(e) {
        switch (e.animationName) {
            case "slideLeftNew":
            case "slideRightNew":
                self.navigationCurrentMonth.classList.remove("slideLeftNew");
                self.navigationCurrentMonth.classList.remove("slideRightNew");
                var nav = self.navigationCurrentMonth;

                while (nav.nextSibling && /curr/.test(nav.nextSibling.className)) {
                    self.monthNav.removeChild(nav.nextSibling);
                }while (nav.previousSibling && /curr/.test(nav.previousSibling.className)) {
                    self.monthNav.removeChild(nav.previousSibling);
                }self.oldCurMonth = null;
                break;
        }
    }

    function jumpToDate(jumpDate) {
        jumpDate = jumpDate ? self.parseDate(jumpDate) : self.latestSelectedDateObj || (self.config.minDate > self.now ? self.config.minDate : self.config.maxDate && self.config.maxDate < self.now ? self.config.maxDate : self.now);

        try {
            self.currentYear = jumpDate.getFullYear();
            self.currentMonth = jumpDate.getMonth();
        } catch (e) {
            /* istanbul ignore next */
            console.error(e.stack);
            /* istanbul ignore next */
            console.warn("Invalid date supplied: " + jumpDate);
        }

        self.redraw();
    }

    function timeIncrement(e) {
        if (~e.target.className.indexOf("arrow")) incrementNumInput(e, e.target.classList.contains("arrowUp") ? 1 : -1);
    }

    function incrementNumInput(e, delta, inputElem) {
        var input = inputElem || e.target.parentNode.childNodes[0];
        var ev = void 0;

        try {
            ev = new Event("increment", { "bubbles": true });
        } catch (err) {
            ev = window.document.createEvent("CustomEvent");
            ev.initCustomEvent("increment", true, true, {});
        }

        ev.delta = delta;
        input.dispatchEvent(ev);
    }

    function createNumberInput(inputClassName) {
        var wrapper = createElement("div", "numInputWrapper"),
            numInput = createElement("input", "numInput " + inputClassName),
            arrowUp = createElement("span", "arrowUp"),
            arrowDown = createElement("span", "arrowDown");

        numInput.type = "text";
        numInput.pattern = "\\d*";

        wrapper.appendChild(numInput);
        wrapper.appendChild(arrowUp);
        wrapper.appendChild(arrowDown);

        return wrapper;
    }

    function build() {
        var fragment = window.document.createDocumentFragment();
        self.calendarContainer = createElement("div", "flatpickr-calendar");
        self.calendarContainer.tabIndex = -1;
        self.numInputType = navigator.userAgent.indexOf("MSIE 9.0") > 0 ? "text" : "number";

        if (!self.config.noCalendar) {
            fragment.appendChild(buildMonthNav());
            self.innerContainer = createElement("div", "flatpickr-innerContainer");

            if (self.config.weekNumbers) self.innerContainer.appendChild(buildWeeks());

            self.rContainer = createElement("div", "flatpickr-rContainer");
            self.rContainer.appendChild(buildWeekdays());

            if (!self.daysContainer) {
                self.daysContainer = createElement("div", "flatpickr-days");
                self.daysContainer.tabIndex = -1;
            }

            buildDays();
            self.rContainer.appendChild(self.daysContainer);

            self.innerContainer.appendChild(self.rContainer);
            fragment.appendChild(self.innerContainer);
        }

        if (self.config.enableTime) fragment.appendChild(buildTime());

        toggleClass(self.calendarContainer, "rangeMode", self.config.mode === "range");
        toggleClass(self.calendarContainer, "animate", self.config.animate);

        self.calendarContainer.appendChild(fragment);

        var customAppend = self.config.appendTo && self.config.appendTo.nodeType;

        if (self.config.inline || self.config.static) {
            self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");

            if (self.config.inline && !customAppend) {
                return self.element.parentNode.insertBefore(self.calendarContainer, (self.altInput || self.input).nextSibling);
            }

            if (self.config.static) {
                var wrapper = createElement("div", "flatpickr-wrapper");
                self.element.parentNode.insertBefore(wrapper, self.element);
                wrapper.appendChild(self.element);

                if (self.altInput) wrapper.appendChild(self.altInput);

                wrapper.appendChild(self.calendarContainer);
                return;
            }
        }

        (customAppend ? self.config.appendTo : window.document.body).appendChild(self.calendarContainer);
    }

    function createDay(className, date, dayNumber, i) {
        var dateIsEnabled = isEnabled(date, true),
            dayElement = createElement("span", "flatpickr-day " + className, date.getDate());

        dayElement.dateObj = date;
        dayElement.$i = i;
        dayElement.setAttribute("aria-label", self.formatDate(date, "F j, Y"));

        if (compareDates(date, self.now) === 0) {
            self.todayDateElem = dayElement;
            dayElement.classList.add("today");
        }

        if (dateIsEnabled) {
            dayElement.tabIndex = -1;
            if (isDateSelected(date)) {
                dayElement.classList.add("selected");
                self.selectedDateElem = dayElement;
                if (self.config.mode === "range") {
                    toggleClass(dayElement, "startRange", compareDates(date, self.selectedDates[0]) === 0);

                    toggleClass(dayElement, "endRange", compareDates(date, self.selectedDates[1]) === 0);
                }
            }
        } else {
            dayElement.classList.add("disabled");
            if (self.selectedDates[0] && date > self.minRangeDate && date < self.selectedDates[0]) self.minRangeDate = date;else if (self.selectedDates[0] && date < self.maxRangeDate && date > self.selectedDates[0]) self.maxRangeDate = date;
        }

        if (self.config.mode === "range") {
            if (isDateInRange(date) && !isDateSelected(date)) dayElement.classList.add("inRange");

            if (self.selectedDates.length === 1 && (date < self.minRangeDate || date > self.maxRangeDate)) dayElement.classList.add("notAllowed");
        }

        if (self.config.weekNumbers && className !== "prevMonthDay" && dayNumber % 7 === 1) {
            self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='disabled flatpickr-day'>" + self.config.getWeek(date) + "</span>");
        }

        triggerEvent("DayCreate", dayElement);

        return dayElement;
    }

    function focusOnDay(currentIndex, offset) {
        var newIndex = currentIndex + offset || 0,
            targetNode = currentIndex !== undefined ? self.days.childNodes[newIndex] : self.selectedDateElem || self.todayDateElem || self.days.childNodes[0],
            focus = function focus() {
            targetNode = targetNode || self.days.childNodes[newIndex];
            targetNode.focus();

            if (self.config.mode === "range") onMouseOver(targetNode);
        };

        if (targetNode === undefined && offset !== 0) {
            if (offset > 0) {
                self.changeMonth(1);
                newIndex = newIndex % 42;
            } else if (offset < 0) {
                self.changeMonth(-1);
                newIndex += 42;
            }

            return afterDayAnim(focus);
        }

        focus();
    }

    function afterDayAnim(fn) {
        if (self.config.animate) return setTimeout(fn, self._.daysAnimDuration + 1);
        fn();
    }

    function buildDays(delta) {
        var firstOfMonth = (new Date(self.currentYear, self.currentMonth, 1).getDay() - self.l10n.firstDayOfWeek + 7) % 7,
            isRangeMode = self.config.mode === "range";

        self.prevMonthDays = self.utils.getDaysinMonth((self.currentMonth - 1 + 12) % 12);
        self.selectedDateElem = undefined;
        self.todayDateElem = undefined;

        var daysInMonth = self.utils.getDaysinMonth(),
            days = window.document.createDocumentFragment();

        var dayNumber = self.prevMonthDays + 1 - firstOfMonth,
            dayIndex = 0;

        if (self.config.weekNumbers && self.weekNumbers.firstChild) self.weekNumbers.textContent = "";

        if (isRangeMode) {
            // const dateLimits = self.config.enable.length || self.config.disable.length || self.config.mixDate || self.config.maxDate;
            self.minRangeDate = new Date(self.currentYear, self.currentMonth - 1, dayNumber);
            self.maxRangeDate = new Date(self.currentYear, self.currentMonth + 1, (42 - firstOfMonth) % daysInMonth);
        }

        // prepend days from the ending of previous month
        for (; dayNumber <= self.prevMonthDays; dayNumber++, dayIndex++) {
            days.appendChild(createDay("prevMonthDay", new Date(self.currentYear, self.currentMonth - 1, dayNumber), dayNumber, dayIndex));
        }

        // Start at 1 since there is no 0th day
        for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
            days.appendChild(createDay("", new Date(self.currentYear, self.currentMonth, dayNumber), dayNumber, dayIndex));
        }

        // append days from the next month
        for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth; dayNum++, dayIndex++) {
            days.appendChild(createDay("nextMonthDay", new Date(self.currentYear, self.currentMonth + 1, dayNum % daysInMonth), dayNum, dayIndex));
        }

        if (isRangeMode && self.selectedDates.length === 1 && days.childNodes[0]) {
            self._hidePrevMonthArrow = self._hidePrevMonthArrow || self.minRangeDate > days.childNodes[0].dateObj;

            self._hideNextMonthArrow = self._hideNextMonthArrow || self.maxRangeDate < new Date(self.currentYear, self.currentMonth + 1, 1);
        } else updateNavigationCurrentMonth();

        var dayContainer = createElement("div", "dayContainer");
        dayContainer.appendChild(days);

        if (!self.config.animate || delta === undefined) clearNode(self.daysContainer);else {
            while (self.daysContainer.childNodes.length > 1) {
                self.daysContainer.removeChild(self.daysContainer.firstChild);
            }
        }

        if (delta >= 0) self.daysContainer.appendChild(dayContainer);else self.daysContainer.insertBefore(dayContainer, self.daysContainer.firstChild);

        self.days = self.daysContainer.firstChild;
        return self.daysContainer;
    }

    function clearNode(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    function buildMonthNav() {
        var monthNavFragment = window.document.createDocumentFragment();
        self.monthNav = createElement("div", "flatpickr-month");

        self.prevMonthNav = createElement("span", "flatpickr-prev-month");
        self.prevMonthNav.innerHTML = self.config.prevArrow;

        self.currentMonthElement = createElement("span", "cur-month");
        self.currentMonthElement.title = self.l10n.scrollTitle;

        var yearInput = createNumberInput("cur-year");
        self.currentYearElement = yearInput.childNodes[0];
        self.currentYearElement.title = self.l10n.scrollTitle;

        if (self.config.minDate) self.currentYearElement.min = self.config.minDate.getFullYear();

        if (self.config.maxDate) {
            self.currentYearElement.max = self.config.maxDate.getFullYear();

            self.currentYearElement.disabled = self.config.minDate && self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
        }

        self.nextMonthNav = createElement("span", "flatpickr-next-month");
        self.nextMonthNav.innerHTML = self.config.nextArrow;

        self.navigationCurrentMonth = createElement("span", "flatpickr-current-month");
        self.navigationCurrentMonth.appendChild(self.currentMonthElement);
        self.navigationCurrentMonth.appendChild(yearInput);

        monthNavFragment.appendChild(self.prevMonthNav);
        monthNavFragment.appendChild(self.navigationCurrentMonth);
        monthNavFragment.appendChild(self.nextMonthNav);
        self.monthNav.appendChild(monthNavFragment);

        Object.defineProperty(self, "_hidePrevMonthArrow", {
            get: function get() {
                return this.__hidePrevMonthArrow;
            },
            set: function set(bool) {
                if (this.__hidePrevMonthArrow !== bool) self.prevMonthNav.style.display = bool ? "none" : "block";
                this.__hidePrevMonthArrow = bool;
            }
        });

        Object.defineProperty(self, "_hideNextMonthArrow", {
            get: function get() {
                return this.__hideNextMonthArrow;
            },
            set: function set(bool) {
                if (this.__hideNextMonthArrow !== bool) self.nextMonthNav.style.display = bool ? "none" : "block";
                this.__hideNextMonthArrow = bool;
            }
        });

        updateNavigationCurrentMonth();

        return self.monthNav;
    }

    function buildTime() {
        self.calendarContainer.classList.add("hasTime");
        if (self.config.noCalendar) self.calendarContainer.classList.add("noCalendar");
        self.timeContainer = createElement("div", "flatpickr-time");
        self.timeContainer.tabIndex = -1;
        var separator = createElement("span", "flatpickr-time-separator", ":");

        var hourInput = createNumberInput("flatpickr-hour");
        self.hourElement = hourInput.childNodes[0];

        var minuteInput = createNumberInput("flatpickr-minute");
        self.minuteElement = minuteInput.childNodes[0];

        self.hourElement.tabIndex = self.minuteElement.tabIndex = -1;

        self.hourElement.value = self.pad(self.latestSelectedDateObj ? self.latestSelectedDateObj.getHours() : self.config.defaultHour);

        self.minuteElement.value = self.pad(self.latestSelectedDateObj ? self.latestSelectedDateObj.getMinutes() : self.config.defaultMinute);

        self.hourElement.step = self.config.hourIncrement;
        self.minuteElement.step = self.config.minuteIncrement;

        self.hourElement.min = self.config.time_24hr ? 0 : 1;
        self.hourElement.max = self.config.time_24hr ? 23 : 12;

        self.minuteElement.min = 0;
        self.minuteElement.max = 59;

        self.hourElement.title = self.minuteElement.title = self.l10n.scrollTitle;

        self.timeContainer.appendChild(hourInput);
        self.timeContainer.appendChild(separator);
        self.timeContainer.appendChild(minuteInput);

        if (self.config.time_24hr) self.timeContainer.classList.add("time24hr");

        if (self.config.enableSeconds) {
            self.timeContainer.classList.add("hasSeconds");

            var secondInput = createNumberInput("flatpickr-second");
            self.secondElement = secondInput.childNodes[0];

            self.secondElement.value = self.latestSelectedDateObj ? self.pad(self.latestSelectedDateObj.getSeconds()) : "00";

            self.secondElement.step = self.minuteElement.step;
            self.secondElement.min = self.minuteElement.min;
            self.secondElement.max = self.minuteElement.max;

            self.timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
            self.timeContainer.appendChild(secondInput);
        }

        if (!self.config.time_24hr) {
            // add self.amPM if appropriate
            self.amPM = createElement("span", "flatpickr-am-pm", ["AM", "PM"][self.hourElement.value > 11 | 0]);
            self.amPM.title = self.l10n.toggleTitle;
            self.amPM.tabIndex = -1;
            self.timeContainer.appendChild(self.amPM);
        }

        return self.timeContainer;
    }

    function buildWeekdays() {
        if (!self.weekdayContainer) self.weekdayContainer = createElement("div", "flatpickr-weekdays");

        var firstDayOfWeek = self.l10n.firstDayOfWeek;
        var weekdays = self.l10n.weekdays.shorthand.slice();

        if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
            weekdays = [].concat(weekdays.splice(firstDayOfWeek, weekdays.length), weekdays.splice(0, firstDayOfWeek));
        }

        self.weekdayContainer.innerHTML = "\n\t\t<span class=flatpickr-weekday>\n\t\t\t" + weekdays.join("</span><span class=flatpickr-weekday>") + "\n\t\t</span>\n\t\t";

        return self.weekdayContainer;
    }

    /* istanbul ignore next */
    function buildWeeks() {
        self.calendarContainer.classList.add("hasWeeks");
        self.weekWrapper = createElement("div", "flatpickr-weekwrapper");
        self.weekWrapper.appendChild(createElement("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
        self.weekNumbers = createElement("div", "flatpickr-weeks");
        self.weekWrapper.appendChild(self.weekNumbers);

        return self.weekWrapper;
    }

    function changeMonth(value, is_offset, animate) {
        is_offset = is_offset === undefined || is_offset;
        var delta = is_offset ? value : value - self.currentMonth;
        var skipAnimations = !self.config.animate || animate === false;

        if (delta < 0 && self._hidePrevMonthArrow || delta > 0 && self._hideNextMonthArrow) return;

        self.currentMonth += delta;

        if (self.currentMonth < 0 || self.currentMonth > 11) {
            self.currentYear += self.currentMonth > 11 ? 1 : -1;
            self.currentMonth = (self.currentMonth + 12) % 12;

            triggerEvent("YearChange");
        }

        buildDays(!skipAnimations ? delta : undefined);

        if (skipAnimations) {
            triggerEvent("MonthChange");
            return updateNavigationCurrentMonth();
        }

        // remove possible remnants from clicking too fast
        var nav = self.navigationCurrentMonth;
        if (delta < 0) while (nav.nextSibling && /curr/.test(nav.nextSibling.className)) {
            self.monthNav.removeChild(nav.nextSibling);
        } else if (delta > 0) while (nav.previousSibling && /curr/.test(nav.previousSibling.className)) {
            self.monthNav.removeChild(nav.previousSibling);
        }self.oldCurMonth = self.navigationCurrentMonth;

        self.navigationCurrentMonth = self.monthNav.insertBefore(self.oldCurMonth.cloneNode(true), delta > 0 ? self.oldCurMonth.nextSibling : self.oldCurMonth);

        if (delta > 0) {
            self.daysContainer.firstChild.classList.add("slideLeft");
            self.daysContainer.lastChild.classList.add("slideLeftNew");

            self.oldCurMonth.classList.add("slideLeft");
            self.navigationCurrentMonth.classList.add("slideLeftNew");
        } else if (delta < 0) {
            self.daysContainer.firstChild.classList.add("slideRightNew");
            self.daysContainer.lastChild.classList.add("slideRight");

            self.oldCurMonth.classList.add("slideRight");
            self.navigationCurrentMonth.classList.add("slideRightNew");
        }

        self.currentMonthElement = self.navigationCurrentMonth.firstChild;
        self.currentYearElement = self.navigationCurrentMonth.lastChild.childNodes[0];

        updateNavigationCurrentMonth();
        self.oldCurMonth.firstChild.textContent = self.utils.monthToStr(self.currentMonth - delta);

        if (self._.daysAnimDuration === undefined) {
            var compStyle = window.getComputedStyle(self.daysContainer.lastChild);

            var duration = compStyle.getPropertyValue("animation-duration") || compStyle.getPropertyValue("-webkit-animation-duration");

            self._.daysAnimDuration = parseInt(/(\d+)s/.exec(duration)[1]);
        }
    }

    function clear(triggerChangeEvent) {
        self.input.value = "";

        if (self.altInput) self.altInput.value = "";

        if (self.mobileInput) self.mobileInput.value = "";

        self.selectedDates = [];
        self.latestSelectedDateObj = null;
        self.showTimeInput = false;

        self.redraw();

        if (triggerChangeEvent !== false)
            // triggerChangeEvent is true (default) or an Event
            triggerEvent("Change");
    }

    function close() {
        self.isOpen = false;

        if (!self.isMobile) {
            self.calendarContainer.classList.remove("open");
            (self.altInput || self.input).classList.remove("active");
        }

        triggerEvent("Close");
    }

    function destroy(instance) {
        instance = instance || self;
        instance.clear(false);

        window.removeEventListener("resize", instance.debouncedResize);

        window.document.removeEventListener("click", documentClick);
        window.document.removeEventListener("touchstart", documentClick);
        window.document.removeEventListener("blur", documentClick);

        if (instance.mobileInput) {
            if (instance.mobileInput.parentNode) instance.mobileInput.parentNode.removeChild(instance.mobileInput);
            delete instance.mobileInput;
        } else if (instance.calendarContainer && instance.calendarContainer.parentNode) instance.calendarContainer.parentNode.removeChild(instance.calendarContainer);

        if (instance.altInput) {
            instance.input.type = "text";
            if (instance.altInput.parentNode) instance.altInput.parentNode.removeChild(instance.altInput);
            delete instance.altInput;
        }

        instance.input.type = instance.input._type;
        instance.input.classList.remove("flatpickr-input");
        instance.input.removeEventListener("focus", open);
        instance.input.removeAttribute("readonly");

        delete instance.input._flatpickr;
    }

    function isCalendarElem(elem) {
        if (self.config.appendTo && self.config.appendTo.contains(elem)) return true;

        return self.calendarContainer.contains(elem);
    }

    function documentClick(e) {
        if (self.isOpen && !self.config.inline) {
            var isCalendarElement = isCalendarElem(e.target);
            var isInput = e.target === self.input || e.target === self.altInput || self.element.contains(e.target) ||
            // web components
            e.path && e.path.indexOf && (~e.path.indexOf(self.input) || ~e.path.indexOf(self.altInput));

            var lostFocus = e.type === "blur" ? isInput && e.relatedTarget && !isCalendarElem(e.relatedTarget) : !isInput && !isCalendarElement;

            if (lostFocus) {
                e.preventDefault();
                self.close();

                if (self.config.mode === "range" && self.selectedDates.length === 1) {
                    self.clear();
                    self.redraw();
                }
            }
        }
    }

    function changeYear(newYear) {
        if (!newYear || self.currentYearElement.min && newYear < self.currentYearElement.min || self.currentYearElement.max && newYear > self.currentYearElement.max) return;

        var newYearNum = parseInt(newYear, 10),
            isNewYear = self.currentYear !== newYearNum;

        self.currentYear = newYearNum || self.currentYear;

        if (self.config.maxDate && self.currentYear === self.config.maxDate.getFullYear()) {
            self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth);
        } else if (self.config.minDate && self.currentYear === self.config.minDate.getFullYear()) {
            self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
        }

        if (isNewYear) {
            self.redraw();
            triggerEvent("YearChange");
        }
    }

    function isEnabled(date, timeless) {
        if (self.config.minDate && compareDates(date, self.config.minDate, timeless !== undefined ? timeless : !self.minDateHasTime) < 0 || self.config.maxDate && compareDates(date, self.config.maxDate, timeless !== undefined ? timeless : !self.maxDateHasTime) > 0) return false;

        if (!self.config.enable.length && !self.config.disable.length) return true;

        var dateToCheck = self.parseDate(date, null, true); // timeless

        var bool = self.config.enable.length > 0,
            array = bool ? self.config.enable : self.config.disable;

        for (var i = 0, d; i < array.length; i++) {
            d = array[i];

            if (d instanceof Function && d(dateToCheck)) // disabled by function
                return bool;else if (d instanceof Date && d.getTime() === dateToCheck.getTime())
                // disabled by date
                return bool;else if (typeof d === "string" && self.parseDate(d, null, true).getTime() === dateToCheck.getTime())
                // disabled by date string
                return bool;else if ( // disabled by range
            (typeof d === "undefined" ? "undefined" : _typeof(d)) === "object" && d.from && d.to && dateToCheck >= d.from && dateToCheck <= d.to) return bool;
        }

        return !bool;
    }

    function onKeyDown(e) {
        var isInput = e.target === (self.altInput || self.input);
        var calendarElem = isCalendarElem(e.target);

        if (e.key === "Enter" && self.config.allowInput && isInput) {
            self.setDate((self.altInput || self.input).value, true, e.target === self.altInput ? self.config.altFormat : self.config.dateFormat);
            return e.target.blur();
        } else if (self.isOpen || self.config.inline && (isInput || calendarElem)) {
            var isTimeObj = self.timeContainer && self.timeContainer.contains(e.target);
            switch (e.key) {
                case "Enter":
                    if (isTimeObj) updateValue();else selectDate(e);

                    break;

                case "Escape":
                    // escape
                    e.preventDefault();
                    self.close();
                    break;

                case "ArrowLeft":
                case "ArrowRight":
                    e.preventDefault();

                    if (self.daysContainer) {
                        var _delta = e.key === "ArrowRight" ? 1 : -1;

                        if (!e.ctrlKey) focusOnDay(e.target.$i, _delta);else {
                            changeMonth(_delta, true);
                            afterDayAnim(function () {
                                focusOnDay(e.target.$i, 0);
                            });
                        }
                    } else if (self.config.enableTime && !isTimeObj) self.hourElement.focus();

                    break;

                case "ArrowUp":
                case "ArrowDown":
                    e.preventDefault();
                    var delta = e.key === "ArrowDown" ? 1 : -1;

                    if (self.daysContainer) {
                        if (e.ctrlKey) {
                            changeYear(self.currentYear - delta);
                            focusOnDay(e.target.$i, 0);
                        } else if (!isTimeObj) focusOnDay(e.target.$i, delta * 7);
                    } else if (self.config.enableTime) {
                        if (!isTimeObj) self.hourElement.focus();
                        updateTime(e);
                    }

                    break;

                case "Tab":
                    if (e.target === self.hourElement) {
                        e.preventDefault();
                        self.minuteElement.select();
                    } else if (e.target === self.minuteElement && self.amPM) {
                        e.preventDefault();
                        self.amPM.focus();
                    }

                    break;

                case "a":
                    if (e.target === self.amPM) {
                        self.amPM.textContent = "AM";
                        setHoursFromInputs();
                        updateValue();
                    }
                    break;

                case "p":
                    if (e.target === self.amPM) {
                        self.amPM.textContent = "PM";
                        setHoursFromInputs();
                        updateValue();
                    }
                    break;

                default:
                    break;

            }

            triggerEvent("KeyDown", e);
        }
    }

    function onMouseOver(elem) {
        if (self.selectedDates.length !== 1 || !elem.classList.contains("flatpickr-day")) return;

        var hoverDate = elem.dateObj,
            initialDate = self.parseDate(self.selectedDates[0], null, true),
            rangeStartDate = Math.min(hoverDate.getTime(), self.selectedDates[0].getTime()),
            rangeEndDate = Math.max(hoverDate.getTime(), self.selectedDates[0].getTime()),
            containsDisabled = false;

        for (var t = rangeStartDate; t < rangeEndDate; t += self.utils.duration.DAY) {
            if (!isEnabled(new Date(t))) {
                containsDisabled = true;
                break;
            }
        }

        var _loop = function _loop(timestamp, i) {
            var outOfRange = timestamp < self.minRangeDate.getTime() || timestamp > self.maxRangeDate.getTime(),
                dayElem = self.days.childNodes[i];

            if (outOfRange) {
                self.days.childNodes[i].classList.add("notAllowed");
                ["inRange", "startRange", "endRange"].forEach(function (c) {
                    dayElem.classList.remove(c);
                });
                return "continue";
            } else if (containsDisabled && !outOfRange) return "continue";

            ["startRange", "inRange", "endRange", "notAllowed"].forEach(function (c) {
                dayElem.classList.remove(c);
            });

            var minRangeDate = Math.max(self.minRangeDate.getTime(), rangeStartDate),
                maxRangeDate = Math.min(self.maxRangeDate.getTime(), rangeEndDate);

            elem.classList.add(hoverDate < self.selectedDates[0] ? "startRange" : "endRange");

            if (initialDate < hoverDate && timestamp === initialDate.getTime()) dayElem.classList.add("startRange");else if (initialDate > hoverDate && timestamp === initialDate.getTime()) dayElem.classList.add("endRange");

            if (timestamp >= minRangeDate && timestamp <= maxRangeDate) dayElem.classList.add("inRange");
        };

        for (var timestamp = self.days.childNodes[0].dateObj.getTime(), i = 0; i < 42; i++, timestamp += self.utils.duration.DAY) {
            var _ret = _loop(timestamp, i);

            if (_ret === "continue") continue;
        }
    }

    function onResize() {
        if (self.isOpen && !self.config.static && !self.config.inline) positionCalendar();
    }

    function open(e) {
        if (self.isMobile) {
            if (e) {
                e.preventDefault();
                e.target.blur();
            }

            setTimeout(function () {
                self.mobileInput.click();
            }, 0);

            triggerEvent("Open");
            return;
        }

        if (self.isOpen || (self.altInput || self.input).disabled || self.config.inline) return;

        self.isOpen = true;
        self.calendarContainer.classList.add("open");
        positionCalendar();
        (self.altInput || self.input).classList.add("active");

        triggerEvent("Open");
    }

    function minMaxDateSetter(type) {
        return function (date) {
            var dateObj = self.config["_" + type + "Date"] = self.parseDate(date);

            var inverseDateObj = self.config["_" + (type === "min" ? "max" : "min") + "Date"];
            var isValidDate = date && dateObj instanceof Date;

            if (isValidDate) {
                self[type + "DateHasTime"] = dateObj.getHours() || dateObj.getMinutes() || dateObj.getSeconds();
            }

            if (self.selectedDates) {
                self.selectedDates = self.selectedDates.filter(function (d) {
                    return isEnabled(d);
                });
                if (!self.selectedDates.length && type === "min") setHoursFromDate(dateObj);
                updateValue();
            }

            if (self.daysContainer) {
                redraw();

                if (isValidDate) self.currentYearElement[type] = dateObj.getFullYear();else self.currentYearElement.removeAttribute(type);

                self.currentYearElement.disabled = inverseDateObj && dateObj && inverseDateObj.getFullYear() === dateObj.getFullYear();
            }
        };
    }

    function parseConfig() {
        var boolOpts = ["utc", "wrap", "weekNumbers", "allowInput", "clickOpens", "time_24hr", "enableTime", "noCalendar", "altInput", "shorthandCurrentMonth", "inline", "static", "enableSeconds", "disableMobile"];

        var hooks = ["onChange", "onClose", "onDayCreate", "onKeyDown", "onMonthChange", "onOpen", "onParseConfig", "onReady", "onValueUpdate", "onYearChange"];

        self.config = Object.create(Flatpickr.defaultConfig);

        var userConfig = _extends({}, self.instanceConfig, JSON.parse(JSON.stringify(self.element.dataset || {})));

        self.config.parseDate = userConfig.parseDate;
        self.config.formatDate = userConfig.formatDate;

        _extends(self.config, userConfig);

        if (!userConfig.dateFormat && userConfig.enableTime) {
            self.config.dateFormat = self.config.noCalendar ? "H:i" + (self.config.enableSeconds ? ":S" : "") : Flatpickr.defaultConfig.dateFormat + " H:i" + (self.config.enableSeconds ? ":S" : "");
        }

        if (userConfig.altInput && userConfig.enableTime && !userConfig.altFormat) {
            self.config.altFormat = self.config.noCalendar ? "h:i" + (self.config.enableSeconds ? ":S K" : " K") : Flatpickr.defaultConfig.altFormat + (" h:i" + (self.config.enableSeconds ? ":S" : "") + " K");
        }

        Object.defineProperty(self.config, "minDate", {
            get: function get() {
                return this._minDate;
            },
            set: minMaxDateSetter("min")
        });

        Object.defineProperty(self.config, "maxDate", {
            get: function get() {
                return this._maxDate;
            },
            set: minMaxDateSetter("max")
        });

        self.config.minDate = userConfig.minDate;
        self.config.maxDate = userConfig.maxDate;

        for (var i = 0; i < boolOpts.length; i++) {
            self.config[boolOpts[i]] = self.config[boolOpts[i]] === true || self.config[boolOpts[i]] === "true";
        }for (var _i = 0; _i < hooks.length; _i++) {
            self.config[hooks[_i]] = arrayify(self.config[hooks[_i]] || []).map(bindToInstance);
        }for (var _i2 = 0; _i2 < self.config.plugins.length; _i2++) {
            var pluginConf = self.config.plugins[_i2](self) || {};
            for (var key in pluginConf) {

                if ((self.config[key] || ~hooks.indexOf(key)) instanceof Array) {
                    self.config[key] = arrayify(pluginConf[key]).map(bindToInstance).concat(self.config[key]);
                } else if (typeof userConfig[key] === "undefined") self.config[key] = pluginConf[key];
            }
        }

        triggerEvent("ParseConfig");
    }

    function setupLocale() {
        if (_typeof(self.config.locale) !== "object" && typeof Flatpickr.l10ns[self.config.locale] === "undefined") console.warn("flatpickr: invalid locale " + self.config.locale);

        self.l10n = _extends(Object.create(Flatpickr.l10ns.default), _typeof(self.config.locale) === "object" ? self.config.locale : self.config.locale !== "default" ? Flatpickr.l10ns[self.config.locale] || {} : {});
    }

    function positionCalendar() {
        if (self.calendarContainer === undefined) return;

        var calendarHeight = self.calendarContainer.offsetHeight,
            calendarWidth = self.calendarContainer.offsetWidth,
            configPos = self.config.position,
            input = self.altInput || self.input,
            inputBounds = input.getBoundingClientRect(),
            distanceFromBottom = window.innerHeight - inputBounds.bottom + input.offsetHeight,
            showOnTop = configPos === "above" || configPos !== "below" && distanceFromBottom < calendarHeight && inputBounds.top > calendarHeight;

        var top = window.pageYOffset + inputBounds.top + (!showOnTop ? input.offsetHeight + 2 : -calendarHeight - 2);

        toggleClass(self.calendarContainer, "arrowTop", !showOnTop);
        toggleClass(self.calendarContainer, "arrowBottom", showOnTop);

        if (self.config.inline) return;

        var left = window.pageXOffset + inputBounds.left;
        var right = window.document.body.offsetWidth - inputBounds.right;
        var rightMost = left + calendarWidth > window.document.body.offsetWidth;

        toggleClass(self.calendarContainer, "rightMost", rightMost);

        if (self.config.static) return;

        self.calendarContainer.style.top = top + "px";

        if (!rightMost) {
            self.calendarContainer.style.left = left + "px";
            self.calendarContainer.style.right = "auto";
        } else {
            self.calendarContainer.style.left = "auto";
            self.calendarContainer.style.right = right + "px";
        }
    }

    function redraw() {
        if (self.config.noCalendar || self.isMobile) return;

        buildWeekdays();
        updateNavigationCurrentMonth();
        buildDays();
    }

    function selectDate(e) {
        e.preventDefault();
        e.stopPropagation();

        if (!e.target.classList.contains("flatpickr-day") || e.target.classList.contains("disabled") || e.target.classList.contains("notAllowed")) return;

        var selectedDate = self.latestSelectedDateObj = new Date(e.target.dateObj.getTime());

        var shouldChangeMonth = selectedDate.getMonth() !== self.currentMonth && self.config.mode !== "range";

        self.selectedDateElem = e.target;

        if (self.config.mode === "single") self.selectedDates = [selectedDate];else if (self.config.mode === "multiple") {
            var selectedIndex = isDateSelected(selectedDate);
            if (selectedIndex) self.selectedDates.splice(selectedIndex, 1);else self.selectedDates.push(selectedDate);
        } else if (self.config.mode === "range") {
            if (self.selectedDates.length === 2) self.clear();

            self.selectedDates.push(selectedDate);

            // unless selecting same date twice, sort ascendingly
            if (compareDates(selectedDate, self.selectedDates[0], true) !== 0) self.selectedDates.sort(function (a, b) {
                return a.getTime() - b.getTime();
            });
        }

        setHoursFromInputs();

        if (shouldChangeMonth) {
            var isNewYear = self.currentYear !== selectedDate.getFullYear();
            self.currentYear = selectedDate.getFullYear();
            self.currentMonth = selectedDate.getMonth();

            if (isNewYear) triggerEvent("YearChange");

            triggerEvent("MonthChange");
        }

        buildDays();

        if (self.minDateHasTime && self.config.enableTime && compareDates(selectedDate, self.config.minDate) === 0) setHoursFromDate(self.config.minDate);

        updateValue();

        if (self.config.enableTime) setTimeout(function () {
            return self.showTimeInput = true;
        }, 50);

        if (self.config.mode === "range") {
            if (self.selectedDates.length === 1) {
                onMouseOver(e.target);

                self._hidePrevMonthArrow = self._hidePrevMonthArrow || self.minRangeDate > self.days.childNodes[0].dateObj;

                self._hideNextMonthArrow = self._hideNextMonthArrow || self.maxRangeDate < new Date(self.currentYear, self.currentMonth + 1, 1);
            } else {
                updateNavigationCurrentMonth();
                self.close();
            }
        }

        triggerEvent("Change");

        // maintain focus
        if (!shouldChangeMonth) focusOnDay(e.target.$i, 0);else afterDayAnim(function () {
            return self.selectedDateElem.focus();
        });

        if (self.config.enableTime) setTimeout(function () {
            return self.hourElement.select();
        }, 451);

        if (self.config.mode === "single" && !self.config.enableTime) self.close();
    }

    function set(option, value) {
        self.config[option] = value;
        self.redraw();
        jumpToDate();
    }

    function setSelectedDate(inputDate, format) {
        if (inputDate instanceof Array) self.selectedDates = inputDate.map(function (d) {
            return self.parseDate(d, format);
        });else if (inputDate instanceof Date || !isNaN(inputDate)) self.selectedDates = [self.parseDate(inputDate, format)];else if (inputDate && inputDate.substring) {
            switch (self.config.mode) {
                case "single":
                    self.selectedDates = [self.parseDate(inputDate, format)];
                    break;

                case "multiple":
                    self.selectedDates = inputDate.split("; ").map(function (date) {
                        return self.parseDate(date, format);
                    });
                    break;

                case "range":
                    self.selectedDates = inputDate.split(self.l10n.rangeSeparator).map(function (date) {
                        return self.parseDate(date, format);
                    });

                    break;

                default:
                    break;
            }
        }

        self.selectedDates = self.selectedDates.filter(function (d) {
            return d instanceof Date && isEnabled(d, false);
        });

        self.selectedDates.sort(function (a, b) {
            return a.getTime() - b.getTime();
        });
    }

    function setDate(date, triggerChange, format) {
        if (!date) return self.clear(triggerChange);

        setSelectedDate(date, format);

        self.showTimeInput = self.selectedDates.length > 0;
        self.latestSelectedDateObj = self.selectedDates[0];

        self.redraw();
        jumpToDate();

        setHoursFromDate();
        updateValue();

        if (triggerChange) triggerEvent("Change");
    }

    function setupDates() {
        function parseDateRules(arr) {
            for (var i = arr.length; i--;) {
                if (typeof arr[i] === "string" || +arr[i]) arr[i] = self.parseDate(arr[i], null, true);else if (arr[i] && arr[i].from && arr[i].to) {
                    arr[i].from = self.parseDate(arr[i].from);
                    arr[i].to = self.parseDate(arr[i].to);
                }
            }

            return arr.filter(function (x) {
                return x;
            }); // remove falsy values
        }

        self.selectedDates = [];
        self.now = new Date();

        if (self.config.disable.length) self.config.disable = parseDateRules(self.config.disable);

        if (self.config.enable.length) self.config.enable = parseDateRules(self.config.enable);

        var preloadedDate = self.config.defaultDate || self.input.value;
        if (preloadedDate) setSelectedDate(preloadedDate, self.config.dateFormat);

        var initialDate = self.selectedDates.length ? self.selectedDates[0] : self.config.minDate && self.config.minDate.getTime() > self.now ? self.config.minDate : self.config.maxDate && self.config.maxDate.getTime() < self.now ? self.config.maxDate : self.now;

        self.currentYear = initialDate.getFullYear();
        self.currentMonth = initialDate.getMonth();

        if (self.selectedDates.length) self.latestSelectedDateObj = self.selectedDates[0];

        self.minDateHasTime = self.config.minDate && (self.config.minDate.getHours() || self.config.minDate.getMinutes() || self.config.minDate.getSeconds());

        self.maxDateHasTime = self.config.maxDate && (self.config.maxDate.getHours() || self.config.maxDate.getMinutes() || self.config.maxDate.getSeconds());

        Object.defineProperty(self, "latestSelectedDateObj", {
            get: function get() {
                return self._selectedDateObj || self.selectedDates[self.selectedDates.length - 1] || null;
            },
            set: function set(date) {
                self._selectedDateObj = date;
            }
        });

        if (!self.isMobile) {
            Object.defineProperty(self, "showTimeInput", {
                get: function get() {
                    return self._showTimeInput;
                },
                set: function set(bool) {
                    self._showTimeInput = bool;
                    if (self.calendarContainer) toggleClass(self.calendarContainer, "showTimeInput", bool);
                    positionCalendar();
                }
            });
        }
    }

    function setupHelperFunctions() {
        self.utils = {
            duration: {
                DAY: 86400000
            },
            getDaysinMonth: function getDaysinMonth(month, yr) {
                month = typeof month === "undefined" ? self.currentMonth : month;

                yr = typeof yr === "undefined" ? self.currentYear : yr;

                if (month === 1 && (yr % 4 === 0 && yr % 100 !== 0 || yr % 400 === 0)) return 29;

                return self.l10n.daysInMonth[month];
            },
            monthToStr: function monthToStr(monthNumber, shorthand) {
                shorthand = typeof shorthand === "undefined" ? self.config.shorthandCurrentMonth : shorthand;

                return self.l10n.months[(shorthand ? "short" : "long") + "hand"][monthNumber];
            }
        };
    }

    /* istanbul ignore next */
    function setupFormats() {
        ["D", "F", "J", "M", "W", "l"].forEach(function (f) {
            self.formats[f] = Flatpickr.prototype.formats[f].bind(self);
        });

        self.revFormat.F = Flatpickr.prototype.revFormat.F.bind(self);
        self.revFormat.M = Flatpickr.prototype.revFormat.M.bind(self);
    }

    function setupInputs() {
        self.input = self.config.wrap ? self.element.querySelector("[data-input]") : self.element;

        /* istanbul ignore next */
        if (!self.input) return console.warn("Error: invalid input element specified", self.input);

        self.input._type = self.input.type;
        self.input.type = "text";
        self.input.classList.add("flatpickr-input");

        if (self.config.altInput) {
            // replicate self.element
            self.altInput = createElement(self.input.nodeName, self.input.className + " " + self.config.altInputClass);
            self.altInput.placeholder = self.input.placeholder;
            self.altInput.type = "text";
            self.input.type = "hidden";

            if (!self.config.static && self.input.parentNode) self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
        }

        if (!self.config.allowInput) (self.altInput || self.input).setAttribute("readonly", "readonly");
    }

    function setupMobile() {
        var inputType = self.config.enableTime ? self.config.noCalendar ? "time" : "datetime-local" : "date";

        self.mobileInput = createElement("input", self.input.className + " flatpickr-mobile");
        self.mobileInput.step = "any";
        self.mobileInput.tabIndex = 1;
        self.mobileInput.type = inputType;
        self.mobileInput.disabled = self.input.disabled;
        self.mobileInput.placeholder = self.input.placeholder;

        self.mobileFormatStr = inputType === "datetime-local" ? "Y-m-d\\TH:i:S" : inputType === "date" ? "Y-m-d" : "H:i:S";

        if (self.selectedDates.length) {
            self.mobileInput.defaultValue = self.mobileInput.value = self.formatDate(self.selectedDates[0], self.mobileFormatStr);
        }

        if (self.config.minDate) self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");

        if (self.config.maxDate) self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");

        self.input.type = "hidden";
        if (self.config.altInput) self.altInput.type = "hidden";

        try {
            self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
        } catch (e) {
            //
        }

        self.mobileInput.addEventListener("change", function (e) {
            self.setDate(e.target.value, false, self.mobileFormatStr);
            triggerEvent("Change");
            triggerEvent("Close");
        });
    }

    function toggle() {
        if (self.isOpen) return self.close();
        self.open();
    }

    function triggerEvent(event, data) {
        var hooks = self.config["on" + event];

        if (hooks) {
            for (var i = 0; hooks[i] && i < hooks.length; i++) {
                hooks[i](self.selectedDates, self.input && self.input.value, self, data);
            }
        }

        if (event === "Change") {
            if (typeof Event === "function" && Event.constructor) {
                self.input.dispatchEvent(new Event("change", { "bubbles": true }));

                // many front-end frameworks bind to the input event
                self.input.dispatchEvent(new Event("input", { "bubbles": true }));
            }

            /* istanbul ignore next */
            else {
                    if (window.document.createEvent !== undefined) return self.input.dispatchEvent(self.changeEvent);

                    self.input.fireEvent("onchange");
                }
        }
    }

    function isDateSelected(date) {
        for (var i = 0; i < self.selectedDates.length; i++) {
            if (compareDates(self.selectedDates[i], date) === 0) return "" + i;
        }

        return false;
    }

    function isDateInRange(date) {
        if (self.config.mode !== "range" || self.selectedDates.length < 2) return false;
        return compareDates(date, self.selectedDates[0]) >= 0 && compareDates(date, self.selectedDates[1]) <= 0;
    }

    function updateNavigationCurrentMonth() {
        if (self.config.noCalendar || self.isMobile || !self.monthNav) return;

        self.currentMonthElement.textContent = self.utils.monthToStr(self.currentMonth) + " ";
        self.currentYearElement.value = self.currentYear;

        self._hidePrevMonthArrow = self.config.minDate && (self.currentYear === self.config.minDate.getFullYear() ? self.currentMonth <= self.config.minDate.getMonth() : self.currentYear < self.config.minDate.getFullYear());

        self._hideNextMonthArrow = self.config.maxDate && (self.currentYear === self.config.maxDate.getFullYear() ? self.currentMonth + 1 > self.config.maxDate.getMonth() : self.currentYear > self.config.maxDate.getFullYear());
    }

    function updateValue() {
        if (!self.selectedDates.length) return self.clear();

        if (self.isMobile) {
            self.mobileInput.value = self.selectedDates.length ? self.formatDate(self.latestSelectedDateObj, self.mobileFormatStr) : "";
        }

        var joinChar = self.config.mode !== "range" ? "; " : self.l10n.rangeSeparator;

        self.input.value = self.selectedDates.map(function (dObj) {
            return self.formatDate(dObj, self.config.dateFormat);
        }).join(joinChar);

        if (self.config.altInput) {
            self.altInput.value = self.selectedDates.map(function (dObj) {
                return self.formatDate(dObj, self.config.altFormat);
            }).join(joinChar);
        }

        triggerEvent("ValueUpdate");
    }

    function mouseDelta(e) {
        return Math.max(-1, Math.min(1, e.wheelDelta || -e.deltaY));
    }

    function onMonthNavScroll(e) {
        e.preventDefault();
        var isYear = self.currentYearElement.parentNode.contains(e.target);

        if (e.target === self.currentMonthElement || isYear) {

            var delta = mouseDelta(e);

            if (isYear) {
                changeYear(self.currentYear + delta);
                e.target.value = self.currentYear;
            } else self.changeMonth(delta, true, false);
        }
    }

    function onMonthNavClick(e) {
        if (e.target.className === "arrowUp") self.changeYear(self.currentYear + 1);else if (e.target.className === "arrowDown") self.changeYear(self.currentYear - 1);
    }

    function createElement(tag, className, content) {
        var e = window.document.createElement(tag);
        className = className || "";
        content = content || "";

        e.className = className;

        if (content) e.textContent = content;

        return e;
    }

    function arrayify(obj) {
        if (obj instanceof Array) return obj;
        return [obj];
    }

    function toggleClass(elem, className, bool) {
        if (bool) return elem.classList.add(className);
        elem.classList.remove(className);
    }

    /* istanbul ignore next */
    function debounce(func, wait, immediate) {
        var timeout = void 0;
        return function () {
            var context = this,
                args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            }, wait);
            if (immediate && !timeout) func.apply(context, args);
        };
    }

    function compareDates(date1, date2, timeless) {
        if (!(date1 instanceof Date) || !(date2 instanceof Date)) return false;

        if (timeless !== false) {
            return new Date(date1.getTime()).setHours(0, 0, 0, 0) - new Date(date2.getTime()).setHours(0, 0, 0, 0);
        }

        return date1.getTime() - date2.getTime();
    }

    function timeWrapper(e) {
        e.preventDefault();

        var isKeyDown = e.type === "keydown",
            isWheel = e.type === "wheel",
            isIncrement = e.type === "increment",
            input = e.target;

        if (self.amPM && e.target === self.amPM) return e.target.textContent = ["AM", "PM"][e.target.textContent === "AM" | 0];

        var min = Number(input.min),
            max = Number(input.max),
            step = Number(input.step),
            curValue = parseInt(input.value, 10),
            delta = e.delta || (!isKeyDown ? Math.max(-1, Math.min(1, e.wheelDelta || -e.deltaY)) || 0 : e.which === 38 ? 1 : -1);

        var newValue = curValue + step * delta;

        if (typeof input.value !== "undefined" && input.value.length === 2) {
            var isHourElem = input === self.hourElement,
                isMinuteElem = input === self.minuteElement;

            if (newValue < min) {
                newValue = max + newValue + !isHourElem + (isHourElem && !self.amPM);

                if (isMinuteElem) incrementNumInput(null, -1, self.hourElement);
            } else if (newValue > max) {
                newValue = input === self.hourElement ? newValue - max - !self.amPM : min;

                if (isMinuteElem) incrementNumInput(null, 1, self.hourElement);
            }

            if (self.amPM && isHourElem && (step === 1 ? newValue + curValue === 23 : Math.abs(newValue - curValue) > step)) self.amPM.textContent = self.amPM.textContent === "PM" ? "AM" : "PM";

            input.value = self.pad(newValue);
        }
    }

    init();
    return self;
}

/* istanbul ignore next */
Flatpickr.defaultConfig = {
    mode: "single",

    position: "auto",

    animate: window.navigator.userAgent.indexOf("MSIE") === -1,

    /* if true, dates will be parsed, formatted, and displayed in UTC.
 preloading date strings w/ timezones is recommended but not necessary */
    utc: false,

    // wrap: see https://chmln.github.io/flatpickr/#strap
    wrap: false,

    // enables week numbers
    weekNumbers: false,

    // allow manual datetime input
    allowInput: false,

    /*
    clicking on input opens the date(time)picker.
    disable if you wish to open the calendar manually with .open()
 */
    clickOpens: true,

    // display time picker in 24 hour mode
    time_24hr: false,

    // enables the time picker functionality
    enableTime: false,

    // noCalendar: true will hide the calendar. use for a time picker along w/ enableTime
    noCalendar: false,

    // more date format chars at https://chmln.github.io/flatpickr/#dateformat
    dateFormat: "Y-m-d",

    // altInput - see https://chmln.github.io/flatpickr/#altinput
    altInput: false,

    // the created altInput element will have this class.
    altInputClass: "flatpickr-input form-control input",

    // same as dateFormat, but for altInput
    altFormat: "F j, Y", // defaults to e.g. June 10, 2016

    // defaultDate - either a datestring or a date object. used for datetimepicker"s initial value
    defaultDate: null,

    // the minimum date that user can pick (inclusive)
    minDate: null,

    // the maximum date that user can pick (inclusive)
    maxDate: null,

    // dateparser that transforms a given string to a date object
    parseDate: null,

    // dateformatter that transforms a given date object to a string, according to passed format
    formatDate: null,

    getWeek: function getWeek(givenDate) {
        var date = new Date(givenDate.getTime());
        date.setHours(0, 0, 0, 0);

        // Thursday in current week decides the year.
        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
        // January 4 is always in week 1.
        var week1 = new Date(date.getFullYear(), 0, 4);
        // Adjust to Thursday in week 1 and count number of weeks from date to week1.
        return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    },

    // see https://chmln.github.io/flatpickr/#disable
    enable: [],

    // see https://chmln.github.io/flatpickr/#disable
    disable: [],

    // display the short version of month names - e.g. Sep instead of September
    shorthandCurrentMonth: false,

    // displays calendar inline. see https://chmln.github.io/flatpickr/#inline-calendar
    inline: false,

    // position calendar inside wrapper and next to the input element
    // leave at false unless you know what you"re doing
    static: false,

    // DOM node to append the calendar to in *static* mode
    appendTo: null,

    // code for previous/next icons. this is where you put your custom icon code e.g. fontawesome
    prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
    nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",

    // enables seconds in the time picker
    enableSeconds: false,

    // step size used when scrolling/incrementing the hour element
    hourIncrement: 1,

    // step size used when scrolling/incrementing the minute element
    minuteIncrement: 5,

    // initial value in the hour element
    defaultHour: 12,

    // initial value in the minute element
    defaultMinute: 0,

    // disable native mobile datetime input support
    disableMobile: false,

    // default locale
    locale: "default",

    plugins: [],

    // called every time calendar is closed
    onClose: [], // function (dateObj, dateStr) {}

    // onChange callback when user selects a date or time
    onChange: [], // function (dateObj, dateStr) {}

    // called for every day element
    onDayCreate: [],

    // called every time the month is changed
    onMonthChange: [],

    // called every time calendar is opened
    onOpen: [], // function (dateObj, dateStr) {}

    // called after the configuration has been parsed
    onParseConfig: [],

    // called after calendar is ready
    onReady: [], // function (dateObj, dateStr) {}

    // called after input value updated
    onValueUpdate: [],

    // called every time the year is changed
    onYearChange: [],

    onKeyDown: []
};

/* istanbul ignore next */
Flatpickr.l10ns = {
    en: {
        weekdays: {
            shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            longhand: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        },
        months: {
            shorthand: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            longhand: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        },
        daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        firstDayOfWeek: 0,
        ordinal: function ordinal(nth) {
            var s = nth % 100;
            if (s > 3 && s < 21) return "th";
            switch (s % 10) {
                case 1:
                    return "st";
                case 2:
                    return "nd";
                case 3:
                    return "rd";
                default:
                    return "th";
            }
        },
        rangeSeparator: " to ",
        weekAbbreviation: "Wk",
        scrollTitle: "Scroll to increment",
        toggleTitle: "Click to toggle"
    }
};

Flatpickr.l10ns.default = Object.create(Flatpickr.l10ns.en);
Flatpickr.localize = function (l10n) {
    return _extends(Flatpickr.l10ns.default, l10n || {});
};
Flatpickr.setDefaults = function (config) {
    return _extends(Flatpickr.defaultConfig, config || {});
};

Flatpickr.prototype = {
    formats: {
        // get the date in UTC
        Z: function Z(date) {
            return date.toISOString();
        },

        // weekday name, short, e.g. Thu
        D: function D(date) {
            return this.l10n.weekdays.shorthand[this.formats.w(date)];
        },

        // full month name e.g. January
        F: function F(date) {
            return this.utils.monthToStr(this.formats.n(date) - 1, false);
        },

        // hours with leading zero e.g. 03
        H: function H(date) {
            return Flatpickr.prototype.pad(date.getHours());
        },

        // day (1-30) with ordinal suffix e.g. 1st, 2nd
        J: function J(date) {
            return date.getDate() + this.l10n.ordinal(date.getDate());
        },

        // AM/PM
        K: function K(date) {
            return date.getHours() > 11 ? "PM" : "AM";
        },

        // shorthand month e.g. Jan, Sep, Oct, etc
        M: function M(date) {
            return this.utils.monthToStr(date.getMonth(), true);
        },

        // seconds 00-59
        S: function S(date) {
            return Flatpickr.prototype.pad(date.getSeconds());
        },

        // unix timestamp
        U: function U(date) {
            return date.getTime() / 1000;
        },

        W: function W(date) {
            return this.config.getWeek(date);
        },

        // full year e.g. 2016
        Y: function Y(date) {
            return date.getFullYear();
        },

        // day in month, padded (01-30)
        d: function d(date) {
            return Flatpickr.prototype.pad(date.getDate());
        },

        // hour from 1-12 (am/pm)
        h: function h(date) {
            return date.getHours() % 12 ? date.getHours() % 12 : 12;
        },

        // minutes, padded with leading zero e.g. 09
        i: function i(date) {
            return Flatpickr.prototype.pad(date.getMinutes());
        },

        // day in month (1-30)
        j: function j(date) {
            return date.getDate();
        },

        // weekday name, full, e.g. Thursday
        l: function l(date) {
            return this.l10n.weekdays.longhand[date.getDay()];
        },

        // padded month number (01-12)
        m: function m(date) {
            return Flatpickr.prototype.pad(date.getMonth() + 1);
        },

        // the month number (1-12)
        n: function n(date) {
            return date.getMonth() + 1;
        },

        // seconds 0-59
        s: function s(date) {
            return date.getSeconds();
        },

        // number of the day of the week
        w: function w(date) {
            return date.getDay();
        },

        // last two digits of year e.g. 16 for 2016
        y: function y(date) {
            return String(date.getFullYear()).substring(2);
        }
    },

    formatDate: function formatDate(dateObj, frmt) {
        var _this = this;

        if (this.config.formatDate) return this.config.formatDate(dateObj, frmt);

        return frmt.split("").map(function (c, i, arr) {
            return _this.formats[c] && arr[i - 1] !== "\\" ? _this.formats[c](dateObj) : c !== "\\" ? c : "";
        }).join("");
    },


    revFormat: {
        D: function D() {},
        F: function F(dateObj, monthName) {
            dateObj.setMonth(this.l10n.months.longhand.indexOf(monthName));
        },
        H: function H(dateObj, hour) {
            dateObj.setHours(parseFloat(hour));
        },
        J: function J(dateObj, day) {
            dateObj.setDate(parseFloat(day));
        },
        K: function K(dateObj, amPM) {
            var hours = dateObj.getHours();

            if (hours !== 12) dateObj.setHours(hours % 12 + 12 * /pm/i.test(amPM));
        },
        M: function M(dateObj, shortMonth) {
            dateObj.setMonth(this.l10n.months.shorthand.indexOf(shortMonth));
        },
        S: function S(dateObj, seconds) {
            dateObj.setSeconds(seconds);
        },
        U: function U(dateObj, unixSeconds) {
            return new Date(parseFloat(unixSeconds) * 1000);
        },

        W: function W() {},
        Y: function Y(dateObj, year) {
            dateObj.setFullYear(year);
        },
        Z: function Z(dateObj, ISODate) {
            return new Date(ISODate);
        },

        d: function d(dateObj, day) {
            dateObj.setDate(parseFloat(day));
        },
        h: function h(dateObj, hour) {
            dateObj.setHours(parseFloat(hour));
        },
        i: function i(dateObj, minutes) {
            dateObj.setMinutes(parseFloat(minutes));
        },
        j: function j(dateObj, day) {
            dateObj.setDate(parseFloat(day));
        },
        l: function l() {},
        m: function m(dateObj, month) {
            dateObj.setMonth(parseFloat(month) - 1);
        },
        n: function n(dateObj, month) {
            dateObj.setMonth(parseFloat(month) - 1);
        },
        s: function s(dateObj, seconds) {
            dateObj.setSeconds(parseFloat(seconds));
        },
        w: function w() {},
        y: function y(dateObj, year) {
            dateObj.setFullYear(2000 + parseFloat(year));
        }
    },

    tokenRegex: {
        D: "(\\w+)",
        F: "(\\w+)",
        H: "(\\d\\d|\\d)",
        J: "(\\d\\d|\\d)\\w+",
        K: "(\\w+)",
        M: "(\\w+)",
        S: "(\\d\\d|\\d)",
        U: "(.+)",
        Y: "(\\d{4})",
        Z: "(.+)",
        d: "(\\d\\d|\\d)",
        h: "(\\d\\d|\\d)",
        i: "(\\d\\d|\\d)",
        j: "(\\d\\d|\\d)",
        l: "(\\w+)",
        m: "(\\d\\d|\\d)",
        n: "(\\d\\d|\\d)",
        s: "(\\d\\d|\\d)",
        w: "(\\d\\d|\\d)",
        y: "(\\d{2})"
    },

    pad: function pad(number) {
        return ("0" + number).slice(-2);
    },

    parseDate: function parseDate(date, givenFormat, timeless) {
        if (!date) return null;

        var date_orig = date;

        if (date instanceof Date) date = new Date(date.getTime()); // create a copy

        else if (date.toFixed !== undefined) // timestamp
                date = new Date(date);else {
                // date string
                var format = givenFormat || this.config.dateFormat;
                date = String(date).trim();

                if (date === "today") {
                    date = new Date();
                    timeless = true;
                } else if (/Z$/.test(date) || /GMT$/.test(date)) // datestrings w/ timezone
                    date = new Date(date);else if (this.config.parseDate) date = this.config.parseDate(date, format);else {
                    var parsedDate = this.config.noCalendar ? new Date(new Date().setHours(0, 0, 0, 0)) : new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0);

                    var matched = void 0;

                    for (var i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
                        var token = format[i];
                        var isBackSlash = token === "\\";
                        var escaped = format[i - 1] === "\\" || isBackSlash;

                        if (this.tokenRegex[token] && !escaped) {
                            regexStr += this.tokenRegex[token];
                            var match = new RegExp(regexStr).exec(date);
                            if (match && (matched = true)) {
                                parsedDate = this.revFormat[token](parsedDate, match[++matchIndex]) || parsedDate;
                            }
                        } else if (!isBackSlash) regexStr += "."; // don't really care
                    }

                    date = matched ? parsedDate : null;
                }
            }

        /* istanbul ignore next */
        if (!(date instanceof Date)) {
            console.warn("flatpickr: invalid date " + date_orig);
            console.info(this.element);
            return null;
        }

        if (this.config && this.config.utc && !date.fp_isUTC) date = date.fp_toUTC();

        if (timeless === true) date.setHours(0, 0, 0, 0);

        return date;
    }
};

/* istanbul ignore next */
function _flatpickr(nodeList, config) {
    var nodes = Array.prototype.slice.call(nodeList); // static list
    var instances = [];
    for (var i = 0; i < nodes.length; i++) {
        try {
            nodes[i]._flatpickr = new Flatpickr(nodes[i], config || {});
            instances.push(nodes[i]._flatpickr);
        } catch (e) {
            console.warn(e, e.stack);
        }
    }

    return instances.length === 1 ? instances[0] : instances;
}

/* istanbul ignore next */
if (typeof HTMLElement !== "undefined") {
    // browser env
    HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function (config) {
        return _flatpickr(this, config);
    };

    HTMLElement.prototype.flatpickr = function (config) {
        return _flatpickr([this], config);
    };
}

/* istanbul ignore next */
function flatpickr(selector, config) {
    return _flatpickr(window.document.querySelectorAll(selector), config);
}

/* istanbul ignore next */
if (typeof jQuery !== "undefined") {
    jQuery.fn.flatpickr = function (config) {
        return _flatpickr(this, config);
    };
}

Date.prototype.fp_incr = function (days) {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate() + parseInt(days, 10));
};

Date.prototype.fp_isUTC = false;
Date.prototype.fp_toUTC = function () {
    var newDate = new Date(this.getUTCFullYear(), this.getUTCMonth(), this.getUTCDate(), this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds());

    newDate.fp_isUTC = true;
    return newDate;
};

if (typeof module !== "undefined") module.exports = Flatpickr;



;(function ( $, window, undefined ) {

    // Create the defaults once
    var pluginName = 'instastream',
        document = window.document,
        defaults = {
            instaUser: '1011689',
            instaResults: 3,
            instaMenu: 'yes'
        };
    
    var $nbrResults;
    var $instaUrl;
    var $slideStatus =0;
    // Constructor
    function Plugin( element, options ) {
        this.element = element;
        
        this.options = $.extend( {}, defaults, options) ;      
        this._defaults = defaults;
        this._name = pluginName;        
        this.init();
    }
    
    // Date converter 
        String.prototype.timeconverter=function(){
            var a = new Date(this*1000);
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var year = a.getFullYear();
              var month = months[a.getMonth()];
              var date = a.getDate();
              var time = date+' '+month+' '+year ;
                return time;
        };
        
        // Stream function
    $.fn.createStream = function(slide, target){
      var j = slide;
        $(target).addClass('slider-wrapper').append("<div class='loading'></div>");
        $('div').remove('.slider-content');
      $('div').remove('.slider-menu');
        
        // stream constructor
          $.ajax({
            type: "GET",
          dataType: "jsonp",
          cache: false,
          url: $instaUrl,
          success: function(data) {
            if ($instaMenu == 'yes'){
                $(target).append("<div class='slider-menu'><a href='#' class='prev'><i class='icon-prev'></i></a><a href='#' class='next'><i class='icon-next'></i></a></div>");
            }
             $(target).append("<div class='slider-content'></div>");
                for (var i = 0; i < $nbrResults; i++) {
                  if (j<30){
                    
                    if(data.data[j].caption == null){var myCaption = '';} else{var myCaption = data.data[j].caption.text;}
                    if (data.data[j].comments.count < 2){var commentLabel = 'commentaire'} else {var commentLabel = 'commentaires'}
                    if (data.data[j].likes.count < 2){var likeLabel = 'like'} else {var likeLabel = 'likes'}
                  
                    $('.slider-content').append("<div id='slider-item"+i+"' class='slider-item slider-col"+$nbrResults+"'><div class='frame'><a href='" + data.data[j].link + "'><img src='" + data.data[j].images.standard_resolution.url + "' alt='" + myCaption + "'><span class='frame-title' style='display: block; bottom: -50px;'><em>" + data.data[j].likes.count + "<i class='icon-like white'>" + likeLabel + "</i> " + data.data[j].comments.count + "<i class='icon-comment white'>" + commentLabel + "</i> " + data.data[j].created_time.timeconverter() + "</em></span><span class='frame-more' style='display: block; top: -38px;'>+</span><span class='frame-reflect'></span></a></div><header><h4>" + myCaption + "</h4></header>"); 
                    j++;
                    $slideStatus = j;
                }
              };
              //prevLoad
                    $('.prev').on('click',function(e){
                    e.preventDefault();
                      var nextSlide = $slideStatus - ($nbrResults * 2);   
                        $().createStream(nextSlide,target); 
                    });
                    
                    //nextLoad
                    $('.next').on('click',function(e){
                    e.preventDefault();
                      var nextSlide = $slideStatus;
                        $().createStream(nextSlide,target);
                    });
          }
            }).done(function() {
              $('.slider-item').hide();
            $('.frame').find('span.frame-more').hide();
              $('.frame').find('span.frame-title').hide();
              $('.frame').hover(function(){
                  //$(this).find('span.blocWhite').hide().stop().fadeTo(200,1);
                  $(this).find('span.frame-more').show().animate({'top': -5},{queue:false,duration:200});
                  $(this).find('span.frame-title').show().animate({'bottom': 0},{queue:false,duration:200});
              }, function(){
                  //$(this).find('span.blocWhite').stop().fadeOut();
                  $(this).find('span.frame-more').show().animate({'top': -38},{queue:false,duration:200});
                  $(this).find('span.frame-title').show().animate({'bottom': -50},{queue:false,duration:200});
              });
              var beginStatus = $slideStatus - $nbrResults;
              if ($instaMenu == 'yes'){
                  if (beginStatus == 0){
                        $('.prev').hide();
                    } else {
                        $('.prev').show();
                    }
                    if ($slideStatus > 29){
                        $('.next').hide();
                    } else {
                        $('.next').show();
                    }
              }  
              // stream appearance
              $('div').remove('.loading');
              for (var l = 0; l < $nbrResults; l++) {
                k = l +1;
                  $('#slider-item'+ l).delay(200*k).fadeIn(800);
              }
          });        
             
    }
    
    Plugin.prototype.init = function () {
        
        // Initial variables
        $slideStatus =0;
        $nbrResults =this.options.instaResults;
        $instaMenu = this.options.instaMenu;
        $instaUrl = 'https://api.instagram.com/v1/users/' + this.options.instaUser + '/media/recent/?access_token=' + this.options.instaToken + '&count=30';
        
        var $myContainer = this.element;
        
      $().createStream($slideStatus,$myContainer);
      
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            }
        });
    };
}(jQuery, window));
 
jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});



( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );


var cbpAnimatedHeader = (function() {

    var docElem = document.documentElement,
        header = document.querySelector( '.navbar-fixed-top' ),
        didScroll = false,
        changeHeaderOn = 200;

    function init() {
        window.addEventListener( 'scroll', function( event ) {
            if( !didScroll ) {
                didScroll = true;
                setTimeout( scrollPage, 250 );
            }
        }, false );
    }

    function scrollPage() {
        var sy = scrollY();
        if ( sy >= changeHeaderOn ) {
            classie.remove( header, 'navbar-expanded' );
        }
        else {
            classie.add( header, 'navbar-expanded' );
        }
        didScroll = false;
    }

    function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
    }

    init();

})();

(function(e){var t,n,i,o,r,a,s,l="Close",c="BeforeClose",d="AfterClose",u="BeforeAppend",p="MarkupParse",f="Open",m="Change",g="mfp",h="."+g,v="mfp-ready",C="mfp-removing",y="mfp-prevent-close",w=function(){},b=!!window.jQuery,I=e(window),x=function(e,n){t.ev.on(g+e+h,n)},k=function(t,n,i,o){var r=document.createElement("div");return r.className="mfp-"+t,i&&(r.innerHTML=i),o?n&&n.appendChild(r):(r=e(r),n&&r.appendTo(n)),r},T=function(n,i){t.ev.triggerHandler(g+n,i),t.st.callbacks&&(n=n.charAt(0).toLowerCase()+n.slice(1),t.st.callbacks[n]&&t.st.callbacks[n].apply(t,e.isArray(i)?i:[i]))},E=function(n){return n===s&&t.currTemplate.closeBtn||(t.currTemplate.closeBtn=e(t.st.closeMarkup.replace("%title%",t.st.tClose)),s=n),t.currTemplate.closeBtn},_=function(){e.magnificPopup.instance||(t=new w,t.init(),e.magnificPopup.instance=t)},S=function(){var e=document.createElement("p").style,t=["ms","O","Moz","Webkit"];if(void 0!==e.transition)return!0;for(;t.length;)if(t.pop()+"Transition"in e)return!0;return!1};w.prototype={constructor:w,init:function(){var n=navigator.appVersion;t.isIE7=-1!==n.indexOf("MSIE 7."),t.isIE8=-1!==n.indexOf("MSIE 8."),t.isLowIE=t.isIE7||t.isIE8,t.isAndroid=/android/gi.test(n),t.isIOS=/iphone|ipad|ipod/gi.test(n),t.supportsTransition=S(),t.probablyMobile=t.isAndroid||t.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),o=e(document),t.popupsCache={}},open:function(n){i||(i=e(document.body));var r;if(n.isObj===!1){t.items=n.items.toArray(),t.index=0;var s,l=n.items;for(r=0;l.length>r;r++)if(s=l[r],s.parsed&&(s=s.el[0]),s===n.el[0]){t.index=r;break}}else t.items=e.isArray(n.items)?n.items:[n.items],t.index=n.index||0;if(t.isOpen)return t.updateItemHTML(),void 0;t.types=[],a="",t.ev=n.mainEl&&n.mainEl.length?n.mainEl.eq(0):o,n.key?(t.popupsCache[n.key]||(t.popupsCache[n.key]={}),t.currTemplate=t.popupsCache[n.key]):t.currTemplate={},t.st=e.extend(!0,{},e.magnificPopup.defaults,n),t.fixedContentPos="auto"===t.st.fixedContentPos?!t.probablyMobile:t.st.fixedContentPos,t.st.modal&&(t.st.closeOnContentClick=!1,t.st.closeOnBgClick=!1,t.st.showCloseBtn=!1,t.st.enableEscapeKey=!1),t.bgOverlay||(t.bgOverlay=k("bg").on("click"+h,function(){t.close()}),t.wrap=k("wrap").attr("tabindex",-1).on("click"+h,function(e){t._checkIfClose(e.target)&&t.close()}),t.container=k("container",t.wrap)),t.contentContainer=k("content"),t.st.preloader&&(t.preloader=k("preloader",t.container,t.st.tLoading));var c=e.magnificPopup.modules;for(r=0;c.length>r;r++){var d=c[r];d=d.charAt(0).toUpperCase()+d.slice(1),t["init"+d].call(t)}T("BeforeOpen"),t.st.showCloseBtn&&(t.st.closeBtnInside?(x(p,function(e,t,n,i){n.close_replaceWith=E(i.type)}),a+=" mfp-close-btn-in"):t.wrap.append(E())),t.st.alignTop&&(a+=" mfp-align-top"),t.fixedContentPos?t.wrap.css({overflow:t.st.overflowY,overflowX:"hidden",overflowY:t.st.overflowY}):t.wrap.css({top:I.scrollTop(),position:"absolute"}),(t.st.fixedBgPos===!1||"auto"===t.st.fixedBgPos&&!t.fixedContentPos)&&t.bgOverlay.css({height:o.height(),position:"absolute"}),t.st.enableEscapeKey&&o.on("keyup"+h,function(e){27===e.keyCode&&t.close()}),I.on("resize"+h,function(){t.updateSize()}),t.st.closeOnContentClick||(a+=" mfp-auto-cursor"),a&&t.wrap.addClass(a);var u=t.wH=I.height(),m={};if(t.fixedContentPos&&t._hasScrollBar(u)){var g=t._getScrollbarSize();g&&(m.marginRight=g)}t.fixedContentPos&&(t.isIE7?e("body, html").css("overflow","hidden"):m.overflow="hidden");var C=t.st.mainClass;return t.isIE7&&(C+=" mfp-ie7"),C&&t._addClassToMFP(C),t.updateItemHTML(),T("BuildControls"),e("html").css(m),t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo||i),t._lastFocusedEl=document.activeElement,setTimeout(function(){t.content?(t._addClassToMFP(v),t._setFocus()):t.bgOverlay.addClass(v),o.on("focusin"+h,t._onFocusIn)},16),t.isOpen=!0,t.updateSize(u),T(f),n},close:function(){t.isOpen&&(T(c),t.isOpen=!1,t.st.removalDelay&&!t.isLowIE&&t.supportsTransition?(t._addClassToMFP(C),setTimeout(function(){t._close()},t.st.removalDelay)):t._close())},_close:function(){T(l);var n=C+" "+v+" ";if(t.bgOverlay.detach(),t.wrap.detach(),t.container.empty(),t.st.mainClass&&(n+=t.st.mainClass+" "),t._removeClassFromMFP(n),t.fixedContentPos){var i={marginRight:""};t.isIE7?e("body, html").css("overflow",""):i.overflow="",e("html").css(i)}o.off("keyup"+h+" focusin"+h),t.ev.off(h),t.wrap.attr("class","mfp-wrap").removeAttr("style"),t.bgOverlay.attr("class","mfp-bg"),t.container.attr("class","mfp-container"),!t.st.showCloseBtn||t.st.closeBtnInside&&t.currTemplate[t.currItem.type]!==!0||t.currTemplate.closeBtn&&t.currTemplate.closeBtn.detach(),t._lastFocusedEl&&e(t._lastFocusedEl).focus(),t.currItem=null,t.content=null,t.currTemplate=null,t.prevHeight=0,T(d)},updateSize:function(e){if(t.isIOS){var n=document.documentElement.clientWidth/window.innerWidth,i=window.innerHeight*n;t.wrap.css("height",i),t.wH=i}else t.wH=e||I.height();t.fixedContentPos||t.wrap.css("height",t.wH),T("Resize")},updateItemHTML:function(){var n=t.items[t.index];t.contentContainer.detach(),t.content&&t.content.detach(),n.parsed||(n=t.parseEl(t.index));var i=n.type;if(T("BeforeChange",[t.currItem?t.currItem.type:"",i]),t.currItem=n,!t.currTemplate[i]){var o=t.st[i]?t.st[i].markup:!1;T("FirstMarkupParse",o),t.currTemplate[i]=o?e(o):!0}r&&r!==n.type&&t.container.removeClass("mfp-"+r+"-holder");var a=t["get"+i.charAt(0).toUpperCase()+i.slice(1)](n,t.currTemplate[i]);t.appendContent(a,i),n.preloaded=!0,T(m,n),r=n.type,t.container.prepend(t.contentContainer),T("AfterChange")},appendContent:function(e,n){t.content=e,e?t.st.showCloseBtn&&t.st.closeBtnInside&&t.currTemplate[n]===!0?t.content.find(".mfp-close").length||t.content.append(E()):t.content=e:t.content="",T(u),t.container.addClass("mfp-"+n+"-holder"),t.contentContainer.append(t.content)},parseEl:function(n){var i,o=t.items[n];if(o.tagName?o={el:e(o)}:(i=o.type,o={data:o,src:o.src}),o.el){for(var r=t.types,a=0;r.length>a;a++)if(o.el.hasClass("mfp-"+r[a])){i=r[a];break}o.src=o.el.attr("data-mfp-src"),o.src||(o.src=o.el.attr("href"))}return o.type=i||t.st.type||"inline",o.index=n,o.parsed=!0,t.items[n]=o,T("ElementParse",o),t.items[n]},addGroup:function(e,n){var i=function(i){i.mfpEl=this,t._openClick(i,e,n)};n||(n={});var o="click.magnificPopup";n.mainEl=e,n.items?(n.isObj=!0,e.off(o).on(o,i)):(n.isObj=!1,n.delegate?e.off(o).on(o,n.delegate,i):(n.items=e,e.off(o).on(o,i)))},_openClick:function(n,i,o){var r=void 0!==o.midClick?o.midClick:e.magnificPopup.defaults.midClick;if(r||2!==n.which&&!n.ctrlKey&&!n.metaKey){var a=void 0!==o.disableOn?o.disableOn:e.magnificPopup.defaults.disableOn;if(a)if(e.isFunction(a)){if(!a.call(t))return!0}else if(a>I.width())return!0;n.type&&(n.preventDefault(),t.isOpen&&n.stopPropagation()),o.el=e(n.mfpEl),o.delegate&&(o.items=i.find(o.delegate)),t.open(o)}},updateStatus:function(e,i){if(t.preloader){n!==e&&t.container.removeClass("mfp-s-"+n),i||"loading"!==e||(i=t.st.tLoading);var o={status:e,text:i};T("UpdateStatus",o),e=o.status,i=o.text,t.preloader.html(i),t.preloader.find("a").on("click",function(e){e.stopImmediatePropagation()}),t.container.addClass("mfp-s-"+e),n=e}},_checkIfClose:function(n){if(!e(n).hasClass(y)){var i=t.st.closeOnContentClick,o=t.st.closeOnBgClick;if(i&&o)return!0;if(!t.content||e(n).hasClass("mfp-close")||t.preloader&&n===t.preloader[0])return!0;if(n===t.content[0]||e.contains(t.content[0],n)){if(i)return!0}else if(o&&e.contains(document,n))return!0;return!1}},_addClassToMFP:function(e){t.bgOverlay.addClass(e),t.wrap.addClass(e)},_removeClassFromMFP:function(e){this.bgOverlay.removeClass(e),t.wrap.removeClass(e)},_hasScrollBar:function(e){return(t.isIE7?o.height():document.body.scrollHeight)>(e||I.height())},_setFocus:function(){(t.st.focus?t.content.find(t.st.focus).eq(0):t.wrap).focus()},_onFocusIn:function(n){return n.target===t.wrap[0]||e.contains(t.wrap[0],n.target)?void 0:(t._setFocus(),!1)},_parseMarkup:function(t,n,i){var o;i.data&&(n=e.extend(i.data,n)),T(p,[t,n,i]),e.each(n,function(e,n){if(void 0===n||n===!1)return!0;if(o=e.split("_"),o.length>1){var i=t.find(h+"-"+o[0]);if(i.length>0){var r=o[1];"replaceWith"===r?i[0]!==n[0]&&i.replaceWith(n):"img"===r?i.is("img")?i.attr("src",n):i.replaceWith('<img src="'+n+'" class="'+i.attr("class")+'" />'):i.attr(o[1],n)}}else t.find(h+"-"+e).html(n)})},_getScrollbarSize:function(){if(void 0===t.scrollbarSize){var e=document.createElement("div");e.id="mfp-sbm",e.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(e),t.scrollbarSize=e.offsetWidth-e.clientWidth,document.body.removeChild(e)}return t.scrollbarSize}},e.magnificPopup={instance:null,proto:w.prototype,modules:[],open:function(t,n){return _(),t=t?e.extend(!0,{},t):{},t.isObj=!0,t.index=n||0,this.instance.open(t)},close:function(){return e.magnificPopup.instance&&e.magnificPopup.instance.close()},registerModule:function(t,n){n.options&&(e.magnificPopup.defaults[t]=n.options),e.extend(this.proto,n.proto),this.modules.push(t)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&times;</button>',tClose:"Close (Esc)",tLoading:"Loading..."}},e.fn.magnificPopup=function(n){_();var i=e(this);if("string"==typeof n)if("open"===n){var o,r=b?i.data("magnificPopup"):i[0].magnificPopup,a=parseInt(arguments[1],10)||0;r.items?o=r.items[a]:(o=i,r.delegate&&(o=o.find(r.delegate)),o=o.eq(a)),t._openClick({mfpEl:o},i,r)}else t.isOpen&&t[n].apply(t,Array.prototype.slice.call(arguments,1));else n=e.extend(!0,{},n),b?i.data("magnificPopup",n):i[0].magnificPopup=n,t.addGroup(i,n);return i};var P,O,z,M="inline",B=function(){z&&(O.after(z.addClass(P)).detach(),z=null)};e.magnificPopup.registerModule(M,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){t.types.push(M),x(l+"."+M,function(){B()})},getInline:function(n,i){if(B(),n.src){var o=t.st.inline,r=e(n.src);if(r.length){var a=r[0].parentNode;a&&a.tagName&&(O||(P=o.hiddenClass,O=k(P),P="mfp-"+P),z=r.after(O).detach().removeClass(P)),t.updateStatus("ready")}else t.updateStatus("error",o.tNotFound),r=e("<div>");return n.inlineElement=r,r}return t.updateStatus("ready"),t._parseMarkup(i,{},n),i}}});var F,H="ajax",L=function(){F&&i.removeClass(F)},A=function(){L(),t.req&&t.req.abort()};e.magnificPopup.registerModule(H,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){t.types.push(H),F=t.st.ajax.cursor,x(l+"."+H,A),x("BeforeChange."+H,A)},getAjax:function(n){F&&i.addClass(F),t.updateStatus("loading");var o=e.extend({url:n.src,success:function(i,o,r){var a={data:i,xhr:r};T("ParseAjax",a),t.appendContent(e(a.data),H),n.finished=!0,L(),t._setFocus(),setTimeout(function(){t.wrap.addClass(v)},16),t.updateStatus("ready"),T("AjaxContentAdded")},error:function(){L(),n.finished=n.loadError=!0,t.updateStatus("error",t.st.ajax.tError.replace("%url%",n.src))}},t.st.ajax.settings);return t.req=e.ajax(o),""}}});var j,N=function(n){if(n.data&&void 0!==n.data.title)return n.data.title;var i=t.st.image.titleSrc;if(i){if(e.isFunction(i))return i.call(t,n);if(n.el)return n.el.attr(i)||""}return""};e.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var e=t.st.image,n=".image";t.types.push("image"),x(f+n,function(){"image"===t.currItem.type&&e.cursor&&i.addClass(e.cursor)}),x(l+n,function(){e.cursor&&i.removeClass(e.cursor),I.off("resize"+h)}),x("Resize"+n,t.resizeImage),t.isLowIE&&x("AfterChange",t.resizeImage)},resizeImage:function(){var e=t.currItem;if(e&&e.img&&t.st.image.verticalFit){var n=0;t.isLowIE&&(n=parseInt(e.img.css("padding-top"),10)+parseInt(e.img.css("padding-bottom"),10)),e.img.css("max-height",t.wH-n)}},_onImageHasSize:function(e){e.img&&(e.hasSize=!0,j&&clearInterval(j),e.isCheckingImgSize=!1,T("ImageHasSize",e),e.imgHidden&&(t.content&&t.content.removeClass("mfp-loading"),e.imgHidden=!1))},findImageSize:function(e){var n=0,i=e.img[0],o=function(r){j&&clearInterval(j),j=setInterval(function(){return i.naturalWidth>0?(t._onImageHasSize(e),void 0):(n>200&&clearInterval(j),n++,3===n?o(10):40===n?o(50):100===n&&o(500),void 0)},r)};o(1)},getImage:function(n,i){var o=0,r=function(){n&&(n.img[0].complete?(n.img.off(".mfploader"),n===t.currItem&&(t._onImageHasSize(n),t.updateStatus("ready")),n.hasSize=!0,n.loaded=!0,T("ImageLoadComplete")):(o++,200>o?setTimeout(r,100):a()))},a=function(){n&&(n.img.off(".mfploader"),n===t.currItem&&(t._onImageHasSize(n),t.updateStatus("error",s.tError.replace("%url%",n.src))),n.hasSize=!0,n.loaded=!0,n.loadError=!0)},s=t.st.image,l=i.find(".mfp-img");if(l.length){var c=document.createElement("img");c.className="mfp-img",n.img=e(c).on("load.mfploader",r).on("error.mfploader",a),c.src=n.src,l.is("img")&&(n.img=n.img.clone()),c=n.img[0],c.naturalWidth>0?n.hasSize=!0:c.width||(n.hasSize=!1)}return t._parseMarkup(i,{title:N(n),img_replaceWith:n.img},n),t.resizeImage(),n.hasSize?(j&&clearInterval(j),n.loadError?(i.addClass("mfp-loading"),t.updateStatus("error",s.tError.replace("%url%",n.src))):(i.removeClass("mfp-loading"),t.updateStatus("ready")),i):(t.updateStatus("loading"),n.loading=!0,n.hasSize||(n.imgHidden=!0,i.addClass("mfp-loading"),t.findImageSize(n)),i)}}});var W,R=function(){return void 0===W&&(W=void 0!==document.createElement("p").style.MozTransform),W};e.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(e){return e.is("img")?e:e.find("img")}},proto:{initZoom:function(){var e,n=t.st.zoom,i=".zoom";if(n.enabled&&t.supportsTransition){var o,r,a=n.duration,s=function(e){var t=e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),i="all "+n.duration/1e3+"s "+n.easing,o={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},r="transition";return o["-webkit-"+r]=o["-moz-"+r]=o["-o-"+r]=o[r]=i,t.css(o),t},d=function(){t.content.css("visibility","visible")};x("BuildControls"+i,function(){if(t._allowZoom()){if(clearTimeout(o),t.content.css("visibility","hidden"),e=t._getItemToZoom(),!e)return d(),void 0;r=s(e),r.css(t._getOffset()),t.wrap.append(r),o=setTimeout(function(){r.css(t._getOffset(!0)),o=setTimeout(function(){d(),setTimeout(function(){r.remove(),e=r=null,T("ZoomAnimationEnded")},16)},a)},16)}}),x(c+i,function(){if(t._allowZoom()){if(clearTimeout(o),t.st.removalDelay=a,!e){if(e=t._getItemToZoom(),!e)return;r=s(e)}r.css(t._getOffset(!0)),t.wrap.append(r),t.content.css("visibility","hidden"),setTimeout(function(){r.css(t._getOffset())},16)}}),x(l+i,function(){t._allowZoom()&&(d(),r&&r.remove(),e=null)})}},_allowZoom:function(){return"image"===t.currItem.type},_getItemToZoom:function(){return t.currItem.hasSize?t.currItem.img:!1},_getOffset:function(n){var i;i=n?t.currItem.img:t.st.zoom.opener(t.currItem.el||t.currItem);var o=i.offset(),r=parseInt(i.css("padding-top"),10),a=parseInt(i.css("padding-bottom"),10);o.top-=e(window).scrollTop()-r;var s={width:i.width(),height:(b?i.innerHeight():i[0].offsetHeight)-a-r};return R()?s["-moz-transform"]=s.transform="translate("+o.left+"px,"+o.top+"px)":(s.left=o.left,s.top=o.top),s}}});var Z="iframe",q="//about:blank",D=function(e){if(t.currTemplate[Z]){var n=t.currTemplate[Z].find("iframe");n.length&&(e||(n[0].src=q),t.isIE8&&n.css("display",e?"block":"none"))}};e.magnificPopup.registerModule(Z,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){t.types.push(Z),x("BeforeChange",function(e,t,n){t!==n&&(t===Z?D():n===Z&&D(!0))}),x(l+"."+Z,function(){D()})},getIframe:function(n,i){var o=n.src,r=t.st.iframe;e.each(r.patterns,function(){return o.indexOf(this.index)>-1?(this.id&&(o="string"==typeof this.id?o.substr(o.lastIndexOf(this.id)+this.id.length,o.length):this.id.call(this,o)),o=this.src.replace("%id%",o),!1):void 0});var a={};return r.srcAction&&(a[r.srcAction]=o),t._parseMarkup(i,a,n),t.updateStatus("ready"),i}}});var K=function(e){var n=t.items.length;return e>n-1?e-n:0>e?n+e:e},Y=function(e,t,n){return e.replace(/%curr%/gi,t+1).replace(/%total%/gi,n)};e.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var n=t.st.gallery,i=".mfp-gallery",r=Boolean(e.fn.mfpFastClick);return t.direction=!0,n&&n.enabled?(a+=" mfp-gallery",x(f+i,function(){n.navigateByImgClick&&t.wrap.on("click"+i,".mfp-img",function(){return t.items.length>1?(t.next(),!1):void 0}),o.on("keydown"+i,function(e){37===e.keyCode?t.prev():39===e.keyCode&&t.next()})}),x("UpdateStatus"+i,function(e,n){n.text&&(n.text=Y(n.text,t.currItem.index,t.items.length))}),x(p+i,function(e,i,o,r){var a=t.items.length;o.counter=a>1?Y(n.tCounter,r.index,a):""}),x("BuildControls"+i,function(){if(t.items.length>1&&n.arrows&&!t.arrowLeft){var i=n.arrowMarkup,o=t.arrowLeft=e(i.replace(/%title%/gi,n.tPrev).replace(/%dir%/gi,"left")).addClass(y),a=t.arrowRight=e(i.replace(/%title%/gi,n.tNext).replace(/%dir%/gi,"right")).addClass(y),s=r?"mfpFastClick":"click";o[s](function(){t.prev()}),a[s](function(){t.next()}),t.isIE7&&(k("b",o[0],!1,!0),k("a",o[0],!1,!0),k("b",a[0],!1,!0),k("a",a[0],!1,!0)),t.container.append(o.add(a))}}),x(m+i,function(){t._preloadTimeout&&clearTimeout(t._preloadTimeout),t._preloadTimeout=setTimeout(function(){t.preloadNearbyImages(),t._preloadTimeout=null},16)}),x(l+i,function(){o.off(i),t.wrap.off("click"+i),t.arrowLeft&&r&&t.arrowLeft.add(t.arrowRight).destroyMfpFastClick(),t.arrowRight=t.arrowLeft=null}),void 0):!1},next:function(){t.direction=!0,t.index=K(t.index+1),t.updateItemHTML()},prev:function(){t.direction=!1,t.index=K(t.index-1),t.updateItemHTML()},goTo:function(e){t.direction=e>=t.index,t.index=e,t.updateItemHTML()},preloadNearbyImages:function(){var e,n=t.st.gallery.preload,i=Math.min(n[0],t.items.length),o=Math.min(n[1],t.items.length);for(e=1;(t.direction?o:i)>=e;e++)t._preloadItem(t.index+e);for(e=1;(t.direction?i:o)>=e;e++)t._preloadItem(t.index-e)},_preloadItem:function(n){if(n=K(n),!t.items[n].preloaded){var i=t.items[n];i.parsed||(i=t.parseEl(n)),T("LazyLoad",i),"image"===i.type&&(i.img=e('<img class="mfp-img" />').on("load.mfploader",function(){i.hasSize=!0}).on("error.mfploader",function(){i.hasSize=!0,i.loadError=!0,T("LazyLoadError",i)}).attr("src",i.src)),i.preloaded=!0}}}});var U="retina";e.magnificPopup.registerModule(U,{options:{replaceSrc:function(e){return e.src.replace(/\.\w+$/,function(e){return"@2x"+e})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var e=t.st.retina,n=e.ratio;n=isNaN(n)?n():n,n>1&&(x("ImageHasSize."+U,function(e,t){t.img.css({"max-width":t.img[0].naturalWidth/n,width:"100%"})}),x("ElementParse."+U,function(t,i){i.src=e.replaceSrc(i,n)}))}}}}),function(){var t=1e3,n="ontouchstart"in window,i=function(){I.off("touchmove"+r+" touchend"+r)},o="mfpFastClick",r="."+o;e.fn.mfpFastClick=function(o){return e(this).each(function(){var a,s=e(this);if(n){var l,c,d,u,p,f;s.on("touchstart"+r,function(e){u=!1,f=1,p=e.originalEvent?e.originalEvent.touches[0]:e.touches[0],c=p.clientX,d=p.clientY,I.on("touchmove"+r,function(e){p=e.originalEvent?e.originalEvent.touches:e.touches,f=p.length,p=p[0],(Math.abs(p.clientX-c)>10||Math.abs(p.clientY-d)>10)&&(u=!0,i())}).on("touchend"+r,function(e){i(),u||f>1||(a=!0,e.preventDefault(),clearTimeout(l),l=setTimeout(function(){a=!1},t),o())})})}s.on("click"+r,function(){a||o()})})},e.fn.destroyMfpFastClick=function(){e(this).off("touchstart"+r+" click"+r),n&&I.off("touchmove"+r+" touchend"+r)}}(),_()})(window.jQuery||window.Zepto);








