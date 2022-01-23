import $ from "../../jquery-3.6.0.min";
import decline from "../../helpers/decline";

class SiteDropdown {
 // Тут будет код
}

export class CountingDropdown extends SiteDropdown {

  constructor(dropdown) {
    super(dropdown)
    dropdown.objectModel = this;
    this.dropdown = $(dropdown);
    this.header = $(".site-dropdown__header", this.dropdown);
    this.textArea = $(".site-dropdown__text-area", this.header)
    this.testArea = $(".site-dropdown__text-area_hidden", this.header)
    this.window = $(".site-dropdown__window", this.dropdown);
    this.items = $(".site-dropdown__item", this.window);
    this.counters = $(".site-dropdown__counter", this.window).get();
    this.footer = $(".site-dropdown__footer", this.window);
    this.buttonClear = $(".site-dropdown__button-clear", this.footer);
    this.buttonApply = $(".site-dropdown__button-apply", this.footer);

    this.updateState();

    this.header.click(this.toggleWindow);
    $(this.counters).click(this.onCounterClick())
    if (this.footer.length === 0)
      this.dropdown.focusout(this.onFocusLoose);
    else {
      this.buttonClear.click(this.onClearClick);
      this.buttonApply.click(this.onApplyClick);
    }
  }

  toggleWindow = () => {
    this.header.toggleClass("site-dropdown__header_square");
    this.window.toggle();
  }

  onFocusLoose = (e) => {
    if (this.dropdown.has(e.relatedTarget).length === 0) {
      this.header.removeClass("site-dropdown__header_square");
      this.window.hide();
    }
  }

  setHeaderText() {

    let text = "";
    const defaultText = this.header.data("text")
    const initialWidth = this.textArea.width();
    let headerState = {}

    for (let key in this.state) {
      if (this.state[key] !== 0) {
        const item = $(`[data-name="${key}"]`, this.window);
        const cases =  item.data("declination");
        headerState[cases] = headerState[cases] ? headerState[cases] + this.state[key] : this.state[key];
      }
    }
    for (let key in headerState) {
      const cases = key.split(",");
      const buffer = text;
      text += text === "" ? decline(headerState[key], cases) : ", " + decline(headerState[key], cases);

      if (this.testArea.text(text).width() > initialWidth) {
        text = buffer + "...";
        break;
      }
    }
    text === "" ? this.textArea.text(defaultText) : this.textArea.text(text);
  }

  updateState = () => {

    const newState = {}

    this.items.get().reduce((obj, current) => {
      const name = $(current).data("name");
      obj[name] = parseInt($(".site-dropdown__count", current)[0].innerText)
      return obj;

    }, newState)

    this.state = newState;
    this.setHeaderText();
  }

  onCounterClick = () => {

    let callback = this.footer.length === 0 ? this.updateState : this.toggleClearButton;

    return function (e) {
      const buttonAdd = $(".site-dropdown__button-add", this);
      const buttonRemove = $(".site-dropdown__button-remove", this);
      const count = $(".site-dropdown__count", this);
      const currentCount = parseInt(count[0].innerText);

      if (e.target === buttonAdd[0]) {
        count.text(currentCount + 1);
        buttonRemove.removeAttr("disabled");
        callback();

      } else if (e.target === buttonRemove[0]) {
        count.text(currentCount - 1);
        if (count[0].innerText === "0") {
          buttonAdd.focus();
          buttonRemove.attr("disabled", true);
        }
        callback();
      }
    }
  }

  toggleClearButton = () => {
    let count = this.counters.reduce((sum, current) => {
      const a = $(".site-dropdown__count", current)[0].innerText;
      return sum += parseInt(a)
    }, 0)

    if(count) this.buttonClear.css("visibility", "visible")
    else this.buttonClear.css("visibility", "hidden")
  }

  onClearClick = () => {
    this.counters.forEach((counter) => {
      $(".site-dropdown__count", counter)[0].innerText = 0;
      $(".site-dropdown__button-remove", counter).attr("disabled", true);
      this.buttonApply.focus();

      this.updateState();
      this.toggleClearButton();
    })
  }

  onApplyClick = () => {
    this.window.hide();
    this.updateState();
  }
}


$(function (){
  const dropdownsList = $(".site-dropdown_counting-dropdown");
  dropdownsList.each((i, dropdown) => {new CountingDropdown(dropdown)});
})