import $ from "../../jquery-3.6.0.min";

const monthsList = ["Январь", "Февраль", "Март", "Апрель",
                    "Май", "Июнь", "Июль", "Август",
                    "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

class SiteCalendar {

  constructor(calendar, state) {
    calendar.objectModel = this;

    this.calendar = $(calendar);
    this.headerText = $(".site-calendar__header-text", calendar);
    this.dateSection = $(".site-calendar__date-section", calendar);
    this.dates = $(".site-calendar__date", this.dateSection).get();
    this.optionalRow =  $(".site-calendar__optional-row", this.dateSection);
    this.buttonPrev = $(".site-calendar__prev-button", calendar);
    this.buttonNext = $(".site-calendar__next-button", calendar);
    this.today = new Date();

    this.initState(state);

    $(this.dates).click(this.setActiveButton);
    this.buttonPrev.click(this.setPrevMonth);
    this.buttonNext.click(this.setNextMonth);
  }

  initState(state) {
      this.today = state?.today || this.today;
      this.state = {
        ...this.state,
        todayY: this.today.getFullYear(),
        todayM: this.today.getMonth(),
        todayD: this.today.getDate(),
        year: state?.year || this.today.getFullYear(),
        month: state?.month || this.today.getMonth(),
      };
    this.render();
  }


  render() {
    this.state.page = new Date(this.state.year, this.state.month);

    let firstDayIndex = new Date(this.state.year, this.state.month, 1).getDay();
    firstDayIndex = firstDayIndex === 0 ?  6 : firstDayIndex - 1;
    const lastDate = new Date(this.state.year, this.state.month + 1, 0).getDate();

    const prevLastDate = new Date(this.state.year, this.state.month,0).getDate();
    const prevShowingDays = firstDayIndex - 1;
    const prevStartFrom = prevLastDate - prevShowingDays;

    const nextFirstDayIndex = prevShowingDays + lastDate + 1;
    const nextShowingDays = this.dates.length - 1;


    if(firstDayIndex + lastDate > 35) this.optionalRow.show();
    else this.optionalRow.hide();

    this.headerText.text(monthsList[this.state.month] + " " + this.state.year);


    for (let i = 0, g = prevStartFrom; i <= prevShowingDays; i++, g++ ) {
      $(this.dates[i]).attr("disabled", true);
      this.dates[i].dateIndex = i;
      this.dates[i].innerText = g;
    }

    for (let i = firstDayIndex, g = 1; g <= lastDate; i++, g++) {
      $(this.dates[i]).attr("disabled", false);
      this.dates[i].dateIndex = i;
      this.dates[i].innerText = g;
    }

    for (let i = nextFirstDayIndex, g = 1; i <= nextShowingDays; i++, g++) {
      $(this.dates[i]).attr("disabled", true);
      this.dates[i].dateIndex = i;
      this.dates[i].innerText = g;
    }


    if(+this.state.page === +this.state.activePage) {
        $(this.state.activeButton).addClass("site-calendar__date_active");
    }

    if(this.state.todayButton) {
      $(this.state.todayButton).removeClass("site-calendar__date_today");
      this.state.todayButton = null;
    }
    if(this.state.month === this.state.todayM && this.state.year === this.state.todayY) {
        this.state.todayButton = this.findButton(this.state.todayD)
        $(this.state.todayButton).addClass("site-calendar__date_today");
    }
  }

  setPrevMonth = () => {
    if (this.state.month === 0) {
      this.state.month = 11;
      this.state.year--;
    }
    else this.state.month--;

    $(this.state.activeButton).removeClass("site-calendar__date_active");
    this.render();
  }

  setNextMonth = () => {
    if (this.state.month === 11) {
      this.state.month = 0;
      this.state.year++;
    }
    else this.state.month++;

    $(this.state.activeButton).removeClass("site-calendar__date_active");
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

  onDateClick = (handler) => {
    $(this.dates).click(handler);
  }

  chooseDate = (date) => {
   this.findButton(date).click();

    return this
  }

  findButton(number) {
    return this.dates.find((date) => date.innerText == number && !$(date).attr("disabled"));
  }

  setActiveButton = (e) => {
    if (!this.calendar.hasClass("site-calendar_range")) {
      $(this.state.activeButton).removeClass("site-calendar__date_active");
      $(e.currentTarget).addClass("site-calendar__date_active");
      this.state.activeButton = e.currentTarget;
      this.state.activeDate = e.currentTarget.innerText;
      this.state.activePage = this.state.page
    }
  }
}


class RangeCalendar extends SiteCalendar {
  constructor(calendar) {
    super(calendar)

    this.rangeState = {}
    this.renderRangeCalendar()

    this.buttonPrev.click(this.setPrevMonth);
    this.buttonNext.click(this.setNextMonth);
    $(this.dates).click(this.setStartButton);
    $(this.dates).click(this.setRangeButton);
    $(this.dates).hover(this.renderHoverRange);
    this.dateSection.mouseout(this.clearHoverRange);

  }

  renderRangeCalendar() {

    if(+this.state.page === +this.rangeState.rangePage)
      $(this.rangeState.rangeButton).addClass("site-calendar__date_end");

    this.renderRange()

  }

  renderActivePage = () => {
    this.clearRange()
    $(this.rangeState.rangeButton).removeClass("site-calendar__date_end");

    this.initState({
      year: this.state.activePage.getFullYear(),
      month: this.state.activePage.getMonth()
    })

    this.renderRangeCalendar()
  }

  renderRangePage = () => {
    this.clearRange()
    $(this.state.activeButton).removeClass("site-calendar__date_active");
    $(this.rangeState.rangeButton).removeClass("site-calendar__date_end");

    this.initState({
      year: this.rangeState.rangePage.getFullYear(),
      month: this.rangeState.rangePage.getMonth()
    })

    this.renderRangeCalendar()
  }


  setPrevMonth = () => {
    this.clearRange()
    $(this.rangeState.rangeButton).removeClass("site-calendar__date_end");
    this.renderRangeCalendar()
  }

  setNextMonth = () => {
    this.clearRange()
    $(this.rangeState.rangeButton).removeClass("site-calendar__date_end");
    this.renderRangeCalendar()
  }

  clearHoverRange = (e) => {
    if(this.rangeState.hoverRange) {
      this.rangeState.hoverRange.forEach((date, i) => {
        $(date).removeClass("site-calendar__date_hov-range");
      })
    }

    if(this.state.hoverRange) {
      this.state.hoverRange.forEach((date, i) => {
        $(date).removeClass("site-calendar__date_hov-range");
      })
    }
  }

  renderHoverRange = (e) => {
    if(this.state.activeButton && this.calendar.hasClass("site-calendar_range")) {
      this.clearHoverRange();
      let startIndex;
      const endIndex = e.currentTarget.dateIndex;

      if(+this.state.page === +this.rangeState.rangePage)
        startIndex = this.rangeState.rangeButton.dateIndex
       else if(+this.state.page === +this.state.activePage)
        startIndex = this.state.activeButton.dateIndex;
      else if (this.state.page > this.state.activePage  || this.rangeState.rangePage && this.state.page > this.rangeState.rangePage) {
        startIndex = 0;
      }
      else return;

      const range = this.dates.slice(startIndex, endIndex+1);
      this.rangeState.hoverRange = range;

      range.forEach((date) => {
        $(date).addClass("site-calendar__date_hov-range");
      })
    }

    if(this.rangeState.rangeButton && !(this.calendar.hasClass("site-calendar_range"))) {
      this.clearHoverRange();
      const startIndex = e.currentTarget.dateIndex;
      let endIndex;

      if(+this.state.page === +this.state.activePage)
         endIndex = this.state.activeButton.dateIndex;
      else if(+this.state.page === +this.rangeState.rangePage)
        endIndex = this.rangeState.rangeButton.dateIndex
      else if (this.state.page < this.rangeState.rangePage  || this.state.page < this.rangeState.rangePage)
         endIndex = this.dates.length - 1;


      const range = this.dates.slice(startIndex, endIndex+1);
      this.state.hoverRange = range;

      range.forEach((date, i) => {
        $(date).addClass("site-calendar__date_hov-range");
      })
    }
  }

  clearRange = () => {
    if(this.rangeState.range) {
      this.rangeState.range.forEach((date, i, arr) => {
        $(date).removeClass("site-calendar__date_range");
      })
      this.rangeState.range = null;
    }
  }

  renderRange = () => {
    if(this.state.activeButton && this.rangeState.rangeButton
      && +this.state.activePage <= +this.state.page && +this.state.page <= +this.rangeState.rangePage)
    {
      const startIndex = this.state.activePage < this.state.page ?  0 : this.state.activeButton.dateIndex;
      const endIndex = this.state.page < this.rangeState.rangePage ? this.dates.length - 1 : this.rangeState.rangeButton.dateIndex;
      this.rangeState.range = this.dates.slice(startIndex, endIndex + 1);

      this.rangeState.range.forEach((date) => {
        $(date).addClass("site-calendar__date_range");
      })
    }
  }

  chooseStartDate = (date) => {
    this.calendar.removeClass("site-calendar_range");
    this.chooseDate(date);
    this.calendar.addClass("site-calendar_range");

    return this
  }

  chooseEndDate = (date) => {
    this.findButton(date).click();

    return this
  }

  setStartButton = () => {
    if(!this.calendar.hasClass("site-calendar_range") ) {
      this.clearRange();

      if(this.rangeState.rangeButton && (this.state.page > this.rangeState.rangePage ||
        +this.state.page === +this.rangeState.rangePage && this.state.activeButton.dateIndex >= this.rangeState.rangeButton.dateIndex))
      {
        $(this.rangeState.rangeButton).removeClass("site-calendar__date_end");
        this.rangeState.rangeButton = null;
        this.rangeState.rangePage = null;
        this.rangeState.rangeDate = null;
      }
      else {
        this.renderRange();
      }
    }
  }

  setRangeButton = (e) => {
    if (this.calendar.hasClass("site-calendar_range")) {
      this.clearRange();

      if(this.state.activeButton && (this.state.page < this.state.activePage ||
        +this.state.page === +this.state.activePage && e.currentTarget.dateIndex <= this.state.activeButton.dateIndex))
      {
        $(this.rangeState.rangeButton).removeClass("site-calendar__date_end")
        this.rangeState.rangeButton = null;
        this.rangeState.rangeDate = null;
        this.rangeState.rangePage = null
        this.calendar.removeClass("site-calendar_range");
        this.setActiveButton(e);
        this.calendar.addClass("site-calendar_range");
      }
      else {
        $(this.rangeState.rangeButton).removeClass("site-calendar__date_end");
        $(e.currentTarget).addClass("site-calendar__date_end");
        this.rangeState.rangeButton = e.currentTarget;
        this.rangeState.rangeDate = e.currentTarget.innerText
        this.rangeState.rangePage = this.state.page
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