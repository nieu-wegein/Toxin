import $ from "../../jquery-3.6.0.min";

const monthsList = ["Январь", "Февраль", "Март", "Апрель",
                    "Май", "Июнь", "Июль", "Август",
                    "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]

class SiteCalendar {

  constructor(calendar) {

    calendar.objectModel = this;
    this.calendar = $(calendar);
    this.headerText = $(".site-calendar__header-text", calendar);
    this.dateSection = $(".site-calendar__date-section", calendar);
    this.dates = $(".site-calendar__date", this.dateSection).get()
    this.optionalRow =  $(".site-calendar__optional-row", this.dateSection);
    this.buttonPrev = $(".site-calendar__prev-button", calendar)
    this.buttonNext = $(".site-calendar__next-button", calendar)
    this.today = new Date();

    this.state = {
      year: this.today.getFullYear(),
      month: this.today.getMonth(),
      date: this.today.getDate()
    };


    this.render()

    $(this.dates).click(this.setActiveButton)
    this.buttonPrev.click(this.setPrevMonth)
    this.buttonNext.click(this.setNextMonth)
  }

  render = () => {

    const firstDayIndex = new Date(this.state.year, this.state.month, 1).getDay() - 1;
    const lastDate = new Date(this.state.year, this.state.month + 1, 0).getDate();

    this.prevLastDate = new Date(this.state.year, this.state.month,0).getDate();
    this.prevShowingDays = firstDayIndex - 1;
    this.prevStartFrom = this.prevLastDate - this.prevShowingDays;

    this.nextFirstDayIndex = this.prevShowingDays + lastDate + 1;
    this.nextShowingDays = this.dates.length - 1;


    if(firstDayIndex + lastDate > 35) this.optionalRow.show();
    else this.optionalRow.hide();

    this.headerText.text(monthsList[this.state.month] + " " + this.state.year);




    for (let i = 0, g = this.prevStartFrom; i <= this.prevShowingDays; i++, g++ ) {
      $(this.dates[i]).attr("disabled", true);
      this.dates[i].dateIndex = i;
      this.dates[i].innerText = g;
    }

    for (let i = firstDayIndex, g = 1; g <= lastDate; i++, g++) {
      $(this.dates[i]).data("fulldate", (g.toString().length > 1 ? g : "0" + g) + "." + (this.state.month + 1) + "." + this.state.year)
      $(this.dates[i]).attr("disabled", false);
      this.dates[i].dateIndex = i; //
      this.dates[i].innerText = g;
    }

    for (let i = this.nextFirstDayIndex, g = 1; i <= this.nextShowingDays; i++, g++) {
      $(this.dates[i]).attr("disabled", true);
      this.dates[i].dateIndex = i;
      this.dates[i].innerText = g;
    }


    if(this.state.month === this.today.getMonth()) {
      if(this.state.todayButton)
        $(this.state.todayButton).addClass("button_secondary")
      else {
        this.state.todayButton = this.dates.find((date) => date.innerText == this.today.getDate());
        $(this.state.todayButton).addClass("button_secondary");
      }
    }
    else $(this.state.todayButton).removeClass("button_secondary")

  }

  // updateState = (obj) => {
  //   this.state = {...this.state, ...obj};
  //   this.render();
  // }

  setPrevMonth = () => {
    if (this.state.month === 0) {
      this.state.month = 11;
      this.state.year--;
    }
    else this.state.month--;

    $(this.state.activeButton).removeClass("button_primary");
    this.state.activeButton = null;
    this.render();
  }

  setNextMonth = () => {
    if (this.state.month === 11) {
      this.state.month = 0;
      this.state.year++;
    }
    else this.state.month++;

    $(this.state.activeButton).removeClass("button_primary");
    this.state.activeButton = null;
    this.render();
  }

  hasClass = (className) => {
    return this.calendar.hasClass(className)
  }

  addClass = (className) => {
    this.calendar.addClass(className)
  }

  removeClass = (className) => {
    this.calendar.removeClass(className)
  }

  onDatesClick = (handler) => {
    $(this.dates).click(handler);
  }

  setActiveButton = (e) => {

    if (!this.calendar.hasClass("site-calendar_range")) {
      $(this.state.activeButton).removeClass("button_primary");
      $(e.currentTarget).addClass("button_primary");
      this.state.activeButton = e.currentTarget;
      this.state.activeDate = $(e.currentTarget).data("fulldate");
    }
  }
}



class RangeCalendar extends SiteCalendar {

  constructor(calendar) {
    super(calendar)

    this.rangeState = {}
    this.buttonPrev.click(this.setPrevMonth);
    this.buttonNext.click(this.setNextMonth);
    $(this.dates).click(this.setStartButton); //?
    $(this.dates).click(this.setRangeButton); //?
    $(this.dates).hover(this.renderHoverRange);
    this.dateSection.mouseleave(this.clearHoverRange);
  }

  setPrevMonth = () => {
    $(this.rangeState.rangeButton).removeClass("button_primary");
    this.rangeState.rangeButton = null;
    this.clearRange();
  }

  setNextMonth = () => {
    $(this.rangeState.rangeButton).removeClass("button_primary");
    this.rangeState.rangeButton = null;
    this.clearRange();
  }

  clearHoverRange = () => {

    if(this.rangeState.hoverRange) {
      this.rangeState.hoverRange.forEach((date, i) => {
         $(date.parentElement).removeClass("focus-range");
         if (i === 0 && date === this.rangeState.rangeButton) $(date.parentElement).addClass("end-range");
      })
    }
  }

  renderHoverRange = (e) => {

    if(this.state.activeButton && this.calendar.hasClass("site-calendar_range")) {
      this.clearHoverRange();
      const startIndex = this.rangeState.rangeButton ? this.rangeState.rangeButton.dateIndex : this.state.activeButton.dateIndex;
      const endIndex = e.currentTarget.dateIndex;
      const range = this.dates.slice(startIndex, endIndex+1);

      this.rangeState.hoverRange = range;

      range.forEach((date, i) => {
        if (i === 0) $(date.parentElement).removeClass("end-range");
        $(date.parentElement).addClass("focus-range");
      })
    }
  }

  clearRange = () => {

    if(this.rangeState.range) {
      this.rangeState.range.forEach((date, i, arr) => {
        if(i === 0)            $(date.parentElement).removeClass("start-range");
        if(i === arr.length-1) $(date.parentElement).removeClass("end-range");
        $(date.parentElement).removeClass("range");
      })
      this.rangeState.range = null;
    }
  }

  renderRange = (/*end*/) => {

    if(this.state.activeButton && this.rangeState.rangeButton) {
      const startIndex = this.state.activeButton.dateIndex;
      const endIndex = this.rangeState.rangeButton.dateIndex;
      this.rangeState.range = this.dates.slice(startIndex, endIndex + 1);

      this.rangeState.range.forEach((date, i, arr) => {
        if (i === 0) $(date.parentElement).addClass("start-range");
        if (i === arr.length - 1) $(date.parentElement).addClass("end-range");
        $(date.parentElement).addClass("range");
      })
    }
  }

  setStartButton = (e) => {

    if(!this.calendar.hasClass("site-calendar_range") ) {

      this.clearRange();

      if(this.rangeState.rangeButton && this.state.activeButton.dateIndex >= this.rangeState.rangeButton.dateIndex) {
        $(this.rangeState.rangeButton).removeClass("button_primary");
        this.rangeState.rangeButton = null;
        this.rangeState.endDate = null;
        this.setActiveButton(e);
      }
      else {
        this.renderRange();
      }

    }
  }

  setRangeButton = (e) => {

   if (this.calendar.hasClass("site-calendar_range")) {

     this.clearRange();

     if(this.state.activeButton && this.state.activeButton.dateIndex >= e.currentTarget.dateIndex) {
       $(this.rangeState.rangeButton).removeClass("button_primary")
       this.rangeState.rangeButton = null;
       this.rangeState.endDate = null;
       this.calendar.removeClass("site-calendar_range");
       this.setActiveButton(e);
       this.calendar.addClass("site-calendar_range");
     }
     else {
       $(this.rangeState.rangeButton).removeClass("button_primary");
       $(e.currentTarget).addClass("button_primary");
       this.rangeState.rangeButton = e.currentTarget;
       this.rangeState.endDate = $(e.currentTarget).data("fulldate");
       this.renderRange();
     }
   }
  }
}



$(function() {

  const siteCalendarList = $(".site-calendar_date");
  siteCalendarList.each((i, calendar) => {
    new SiteCalendar(calendar);
  })

  const rangeCalendarList = $(".site-calendar_range");
  rangeCalendarList.each((i, calendar) => {
    new RangeCalendar(calendar);
  })

})