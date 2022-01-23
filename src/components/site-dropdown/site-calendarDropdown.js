// import {Dropdown} from "./site-dropdown"
import $ from "../../jquery-3.6.0.min";
import "../site-calendar/site-calendar"

class SiteDropdown {

}

class CalendarDropdown extends SiteDropdown {

  constructor(dropdown) {
    super(dropdown)
    dropdown.objectModel = this;
    this.dropdown = $(dropdown);
    this.header = $(".site-dropdown__header", dropdown);
    this.textArea = $(".site-dropdown__text-area", this.header);
    this.window = $(".site-dropdown__window", dropdown);
    this.calendar = $(".site-calendar", this.window)[0].objectModel;
    this.footer = $(".site-dropdown__footer", dropdown);
    this.buttonClear = $(".site-dropdown__button-clear", this.footer);
    this.buttonApply = $(".site-dropdown__button-apply", this.footer);

    this.header.click(this.toggleWindow);
    this.calendar.onDatesClick(this.setHeaderText);
    if(this.buttonClear) this.buttonClear.click(this.clearState);
    if(this.buttonApply) this.buttonApply.click(this.apply);
    // this.dropdown.focusout(this.onFocusLoose);

  }

  // onFocusLoose = (e) => {
  //   if (this.dropdown.has(e.relatedTarget).length === 0)
  //     $(this.window).hide();
  // }

  toggleWindow = () => {
    $(this.window).toggle();
  }

  setHeaderText = () => {
    let defaultText = this.header.data("text")

    if (this.calendar.state.activeDate) {
      this.textArea.text(this.calendar.state.activeDate)
      if (this.footer) this.buttonClear.css("visibility", "visible");
    }
    else
      this.textArea.text(defaultText)
  }

  clearState = () => {
    $(this.calendar.state.activeButton).removeClass("button_primary")
    this.calendar.state.activeButton = null;
    this.calendar.state.activeDate = null;
    this.setHeaderText();

    this.buttonApply.focus();
    this.buttonClear.css("visibility", "hidden");
  }

  apply = () => {
    this.window.hide();
  }
}

class RangeCalendarDropdown extends CalendarDropdown {

  constructor(dropdown) {
    super(dropdown);
    dropdown.objectModel = this;
    this.calendar.removeClass("site-calendar_range");

    this.calendar.onDatesClick(this.setHeaderRangeText);
    this.calendar.onDatesClick(this.changeState);
    this.buttonClear.click(this.clearRangeState);
  }

  setHeaderRangeText = () => {
    let text;
    if (this.calendar.state.activeDate)
      text = this.calendar.state.activeDate;
    if(this.calendar.rangeState && this.calendar.rangeState.endDate)
      text +=  " - " + this.calendar.rangeState.endDate;

    this.textArea.text(text)
  }

  changeState = () => {
    if(!this.calendar.hasClass(".site-calendar_range")) {
      this.calendar.addClass("site-calendar_range")
    }
  }

  clearRangeState = () => {
    $(this.calendar.rangeState.rangeButton).removeClass("button_primary")
    this.calendar.removeClass("site-calendar_range")
    this.calendar.rangeState.rangeButton = null;
    this.calendar.rangeState.endDate = null;
    this.calendar.clearRange();
  }
}


class SharedCalendarDropdown {
  constructor(dropdown) {
     dropdown.objectModel = this;
     this.dropdown = $(dropdown);
     this.state = {};
     this.header = $(".site-dropdown__header", dropdown);
     this.window = document.getElementById(this.header.data("windowid"));
     this.calendar = this.window.querySelector(".site-calendar").objectModel;
     this.textArea = $(".site-dropdown__text-area", this.header);
     this.footer = $(".site-dropdown__footer", this.window);
     this.buttonClear = $(".site-dropdown__button-clear", this.footer);
     this.buttonApply = $(".site-dropdown__button-apply", this.footer);

     (this.window.owners = this.window.owners || []).push(this);

      this.header.click(this.toggleWindow)
      this.calendar.onDatesClick(this.updateState);
      this.dropdown.focusout(this.onFocusLoose)
      if(this.buttonClear) this.buttonClear.click(this.clearState);
      if(this.buttonApply) this.buttonApply.click(this.apply);
  }

  onFocusLoose = (e) => {
    const current = this.window.owners.filter((owner) => {
      return owner.dropdown.has(e.relatedTarget).length !== 0
    })

    if(current.length === 0) $(this.window).hide();
  }

  toggleWindow = (e) => {
    if(e.currentTarget === this.window.owners[0].header[0])  {
      this.calendar.removeClass("site-calendar_range")
    }
    else if (e.currentTarget === this.window.owners[1].header[0]) {
      this.calendar.addClass("site-calendar_range")
    }
    $(this.window).toggle();
  }

  updateState = () => {
    this.window.owners[0].state = {
      firstDate: this.calendar.state.activeDate,
    }
    this.window.owners[1].state = {
      lastDate: this.calendar.rangeState.endDate
    }

    this.setHeaderText();
  }

  setHeaderText = () => {
    let firstOwner = this.window.owners[0];
    let secondOwner = this.window.owners[1];
    let defaultText0 =  firstOwner.header.data("text");
    let defaultText1 =  secondOwner.header.data("text");

    if (this.footer) this.buttonClear.css("visibility", "visible");

    firstOwner.state.firstDate ? firstOwner.textArea.text(firstOwner.state.firstDate) :
                                 firstOwner.textArea.text(defaultText0);

    secondOwner.state.lastDate ? secondOwner.textArea.text(secondOwner.state.lastDate) :
                                 secondOwner.textArea.text(defaultText1);
  }

  clearState = () => {
    $(this.calendar.state.activeButton).removeClass("button_primary");
    $(this.calendar.rangeState.rangeButton).removeClass("button_primary");
    this.calendar.state.activeButton = null;
    this.calendar.rangeState.rangeButton = null;
    this.calendar.state.activeDate = null;
    this.calendar.rangeState.endDate = null;
    this.calendar.clearRange();

    this.updateState();

    this.buttonApply.focus();
    this.buttonClear.css("visibility", "hidden");
  }

  apply = () => {
    $(this.window).hide();
  }
}





$(function (){
  const calendarDropdowns = $(".site-dropdown_date-calendar");
  calendarDropdowns.each((i, dropdown) => {new CalendarDropdown(dropdown)});

  const rangeCalendarDropdowns = $(".site-dropdown_range-calendar");
  rangeCalendarDropdowns.each((i, dropdown) => {new RangeCalendarDropdown(dropdown)});

  const sharedCalendarDropdowns = $(".site-dropdown_shared-calendar");
  sharedCalendarDropdowns.each((i, dropdown) => {new SharedCalendarDropdown(dropdown)});

})