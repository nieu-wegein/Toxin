import $ from "../../jquery-3.6.0.min";
import "../site-calendar/site-calendar"


const monthsList = ["янв", "фев", "мар", "апр",
  "мая", "июня", "июля", "авг",
  "сен", "окт", "ноя", "дек"];

class SiteDropdown {

}

class CalendarDropdown extends SiteDropdown {

  constructor(dropdown) {
    super(dropdown)
    dropdown.objectModel = this;
    this.state = {};
    this.dropdown = $(dropdown);
    this.header = $(".site-dropdown__header", dropdown);
    this.textArea = $(".site-dropdown__text-area", this.header);
    this.window = $(".site-dropdown__window", dropdown);
    this.calendar = $(".site-calendar", this.window)[0].objectModel;
    this.footer = $(".site-dropdown__footer", this.window)[0];
    if(this.footer) {
      this.buttonClear = $(".site-dropdown__button-clear", this.footer);
      this.buttonApply = $(".site-dropdown__button-apply", this.footer);
    }

    this.header.click(this.toggleWindow);
    this.calendar.onDateClick(this.updateState);
    if(this.footer) {
      this.buttonClear.click(this.clearState);
      this.buttonApply.click(this.apply);
    }
    else
     this.dropdown.focusout(this.onFocusLoose);

  }

   onFocusLoose = (e) => {
     if (this.dropdown.has(e.relatedTarget).length === 0)
       $(this.window).hide();
   }

  updateState = () => {

    this.state = undefined;

    if (this.calendar.state.activePage) {
      this.state = {
        day: this.calendar.state.activeDate,
        month: String(this.calendar.state.activePage.getMonth() + 1),
        year: String(this.calendar.state.activePage.getFullYear())
      }
    }

    this.setHeaderText()
  }

  setHeaderText = () => {

    let text = this.header.data("text");
    let footer = "hidden";

    if (this.state) {
      const day = this.state.day.length < 2 ? "0" + this.state.day : this.state.day;
      const month = this.state.month.length < 2 ? "0" + this.state.month : this.state.month;
      text = day + "." + month + "." + this.state.year;
      footer = "visible";
    }

    if (this.footer) this.buttonClear.css("visibility", footer);
     this.textArea.text(text)
  }

  clearState = () => {
    this.buttonApply.focus();

    $(this.calendar.state.activeButton).removeClass("site-calendar__date_active-date");
    this.calendar.state.activeButton = null;
    this.calendar.state.activePage = null;
    this.calendar.state.activeDate= null;
    this.updateState();
  }

  toggleWindow = () => {
    $(this.window).toggle();
  }

  apply = () => {
    this.window.hide();
  }
}

class RangeCalendarDropdown extends CalendarDropdown {

  constructor(dropdown) {
    super(dropdown);
    dropdown.objectModel = this;

    this.rangeState;
    this.calendar.removeClass("site-calendar_range");

    this.calendar.onDateClick(this.updateRangeState);
    this.calendar.onDateClick(this.changeState);
    this.buttonClear.click(this.clearRangeState);
  }

  updateRangeState = () => {

    this.rangeState = undefined;

    if (this.calendar.rangeState.rangePage) {
      this.rangeState = {
        day: this.calendar.rangeState.rangeDate,
        month: String(this.calendar.rangeState.rangePage.getMonth() + 1),
        year: String(this.calendar.rangeState.rangePage.getFullYear())
      }
    }

    this.setHeaderText()
  }

  setHeaderText = () => {

    let text1 = this.header.data("text").split("-")[0];
    let text2 = this.header.data("text").split("-")[1]
    let footer = "hidden";

    if (this.state) {
      const day = this.state.day.length < 2 ? "0" + this.state.day : this.state.day;
      const month = monthsList[this.state.month - 1];
      const year = this.state.year == this.calendar.state.todayY ? "" : this.state.year;
      text1 = day + " " + month + " " + year;
      footer = "visible"
    }

    if (this.rangeState) {
      const day = this.rangeState.day.length < 2 ? "0" + this.rangeState.day : this.rangeState.day;
      const month = monthsList[this.rangeState.month - 1];
      const year = this.rangeState.year == this.calendar.state.todayY ? "" : this.rangeState.year;
      text2 = day + " " + month + " " + year;
      footer = "visible"
    }

    this.textArea.text(text1 + " - " + text2)

    if (this.footer)
      this.buttonClear.css("visibility", footer);
  }

  changeState = () => {
    this.calendar.addClass("site-calendar_range")
  }

  clearRangeState = () => {
    $(this.calendar.rangeState.rangeButton).removeClass("site-calendar__date_end-date")
    this.calendar.removeClass("site-calendar_range")
    this.calendar.rangeState.rangeButton = null;
    this.calendar.rangeState.rangePage = null;
    this.calendar.rangeState.rangeDate = null;
    this.calendar.clearRange();
    this.updateRangeState();
  }
}


class SharedCalendarDropdown {
  constructor(dropdown) {
     this.dropdown = $(dropdown);
    dropdown.objectModel = this;

     this.state = {};
     this.header = $(".site-dropdown__header", dropdown);
     this.window = document.getElementById(this.header.data("windowid"));
     this.calendar = this.window.querySelector(".site-calendar").objectModel;
     this.textArea = $(".site-dropdown__text-area", this.header);
     this.footer = $(".site-dropdown__footer", this.window)[0];
     this.buttonClear = $(".site-dropdown__button-clear", this.footer);
     this.buttonApply = $(".site-dropdown__button-apply", this.footer);

     (this.window.owners = this.window.owners || []).push(this);

      this.header.click(this.toggleWindow);
      this.calendar.onDateClick(this.updateState);
      if(this.footer) {
        this.buttonClear.click(this.clearState);
        this.buttonApply.click(this.apply);
      }
      else
        this.dropdown.focusout(this.onFocusLoose);
  }

  onFocusLoose = (e) => {
    const current = this.window.owners.filter((owner) => {
      return owner.dropdown.has(e.relatedTarget).length !== 0
    })

    if(current.length === 0)
      $(this.window).hide();
  }

  toggleWindow = (e) => {

    const owner1 = this.window.owners[0];
    const owner2 = this.window.owners[1];

    if(e.currentTarget === owner1.header[0] || $(e.currentTarget).attr("for") === owner1.dropdown.attr("id"))  {
      this.calendar.removeClass("site-calendar_range")

      if(this.calendar.state.activePage && +this.calendar.state.page !== +this.calendar.state.activePage)
        this.calendar.renderActivePage()
    }
    else if (e.currentTarget === owner2.header[0] || $(e.currentTarget).attr("for") === owner2.dropdown.attr("id")) {
      this.calendar.addClass("site-calendar_range")

      if(this.calendar.rangeState.rangePage && +this.calendar.state.page !== +this.calendar.rangeState.rangePage)
        this.calendar.renderRangePage()
    }
    $(this.window).toggle();
  }

  updateState = () => {

    this.window.owners[0].state = undefined;
    this.window.owners[1].state = undefined;

    if (this.calendar.state.activePage) {
      this.window.owners[0].state = {
        day: this.calendar.state.activeDate,
        month: String(this.calendar.state.activePage.getMonth() + 1),
        year: String(this.calendar.state.activePage.getFullYear())
      }
    }
    if (this.calendar.rangeState.rangePage) {
        this.window.owners[1].state = {
          day: this.calendar.rangeState.rangeDate,
          month: String(this.calendar.rangeState.rangePage.getMonth() + 1),
          year: String(this.calendar.rangeState.rangePage.getFullYear())
        }
    }

    this.setHeaderText(this.window.owners[0]);
    this.setHeaderText(this.window.owners[1]);
  }

  setHeaderText = (owner) => {
    if (owner.state) {
      const day = owner.state.day.length < 2 ? "0" + owner.state.day : owner.state.day;
      const month = owner.state.month.length < 2 ? "0" + owner.state.month : owner.state.month;
      owner.textArea.text(day + "." + month + "." + owner.state.year)
    }
    else
      owner.textArea.text(owner.header.data("text"))


    if (this.footer) this.buttonClear.css("visibility", "visible");
  }

  clearState = (e) => {
    $(this.calendar.state.activeButton).removeClass("site-calendar__date_active-date");
    $(this.calendar.rangeState.rangeButton).removeClass("site-calendar__date_end-date");
    this.calendar.state.activeButton = null;
    this.calendar.state.activePage = null;
    this.calendar.state.activeDate = null
    this.calendar.rangeState.rangeButton = null;
    this.calendar.rangeState.rangePage = null
    this.calendar.rangeState.rangeDate = null
    this.calendar.clearRange();

    this.updateState(e);

    this.buttonApply.focus();
    this.buttonClear.css("visibility", "hidden");
  }

  apply = () => {
    $(this.window).hide();
  }
}





$(function (){
  const calendarDropdowns = $(".site-dropdown_simple-calendar");
  calendarDropdowns.each((i, dropdown) => {

    new CalendarDropdown(dropdown);

    const label = $(`label[for = "${$(dropdown).attr("id")}" ]`);
    label.click(dropdown.objectModel.toggleWindow);

  });

  const rangeCalendarDropdowns = $(".site-dropdown_range");
  rangeCalendarDropdowns.each((i, dropdown) => {

    new RangeCalendarDropdown(dropdown)

    const label = $(`label[for = "${$(dropdown).attr("id")}" ]`);
    label.click(dropdown.objectModel.toggleWindow);

  });

  const sharedCalendarDropdowns = $(".site-dropdown_shared");
  sharedCalendarDropdowns.each((i, dropdown) => {

    new SharedCalendarDropdown(dropdown)

    const label = $(`label[for = "${$(dropdown).attr("id")}" ]`);
    label.click(function (e) {
      dropdown.objectModel.toggleWindow(e);
    });
  });

})