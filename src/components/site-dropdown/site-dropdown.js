import $ from "../../jquery-3.6.0.min";
import decline from "../../helpers/decline";

class SiteDropdown {
 // Тут будет код
}

class CountingDropdown extends SiteDropdown {

  constructor(dropdown, state) {
    super(dropdown)
    dropdown.objectModel = this;

    this.dropdown = $(dropdown);
    this.header = $(".site-dropdown__header", this.dropdown);
    this.textArea = $(".site-dropdown__text-area", this.header)
    this.testArea = $(".site-dropdown__text-area_hidden", this.header)
    this.window = $(".site-dropdown__window", this.dropdown);
    this.items = $(".site-dropdown__item", this.window);
    this.counters = $(".site-dropdown__counter", this.window).get();
    this.footer = $(".site-dropdown__footer", this.window)[0];
    if(this.footer) {
      this.buttonClear = $(".site-dropdown__button-clear", this.footer);
      this.buttonApply = $(".site-dropdown__button-apply", this.footer);
    }

    this.initState(state);

    this.header.click(this.toggleWindow);
    $(this.counters).click(this.onCounterClick);
    if (this.footer) {
      this.buttonClear.click(this.onClearClick);
      this.buttonApply.click(this.toggleWindow);
    }
    else
      this.dropdown.focusout(this.onFocusLoose);
  }

  initState = (state) => {
    if(state) {
      this.state = state;
      this.updateDropdown();
    }
    else {
      this.state = {};
      this.empty = true;
      this.items.each((i, item) => {
        const name = $(item).data("name");
        this.state[name] = 0;
      })
    }
  }

  updateDropdown = () => {
    this.empty = true;

    for (let key in this.state) {
      if(this.state[key]) {
        this.empty = false;
        break;
      }
    }

    this.updateHeader();
    this.updateCounters();
    this.updateFooter();
  }

  updateHeader() {
    if(this.empty)
      this.textArea.text(this.header.data("text"))
    else {
      let text = "";
      const initialWidth = this.textArea.width();
      let headerState = {};

      for (let key in this.state) {
        if (this.state[key] !== 0) {
          const item = $(`[data-name="${key}"]`, this.window);
          const cases = item.data("declination");
          headerState[cases] = headerState[cases] ? headerState[cases] + this.state[key] : this.state[key];
        }
      }
      for (let key in headerState) {
        const cases = key.split(",");
        const buffer = text;
        text += text ? ", " + decline(headerState[key], cases) : decline(headerState[key], cases)

        if (this.testArea.text(text).width() > initialWidth) {
          text = buffer + "...";
          break;
        }
      }
      this.textArea.text(text);
    }
  }

  updateCounters = () => {
    for (let key in this.state) {
      const item = $(`[data-name="${key}"]`, this.window);
      const buttonRemove = $(".site-dropdown__button-remove", item);

      if(this.state[key] === 0)
        buttonRemove.attr("disabled", true);
      else
        buttonRemove.removeAttr("disabled");

      $(".site-dropdown__count", item).text(this.state[key]);
    }
  }

  updateFooter() {
    if(this.footer)
      this.empty ? this.buttonClear.css("visibility", "hidden") : this.buttonClear.css("visibility", "visible")
  }

  onCounterClick = (e) => {
    const buttonAdd = $(".site-dropdown__button-add", e.currentTarget);
    const buttonRemove = $(".site-dropdown__button-remove", e.currentTarget);
    const name = $(e.currentTarget).parent().data("name");


    if (e.target === buttonAdd[0]) {
      this.state[name]++;
      this.updateDropdown();
    }
    else if (e.target === buttonRemove[0]) {
      this.state[name]--;

      if(this.state[name] === 0)
        buttonAdd.focus();

      this.updateDropdown();
    }
  }

  onClearClick = () => {
    this.buttonApply.focus();
    this.initState();
    this.updateDropdown();
  }

  onFocusLoose = (e) => {
    if (this.dropdown.has(e.relatedTarget).length === 0) {
      this.header.removeClass("site-dropdown__header_square");
      this.window.hide();
    }
  }

  toggleWindow = () => {
    this.header.toggleClass("site-dropdown__header_square");
    this.window.toggle();
  }
}

$(function (){
  const dropdownsList = $(".site-dropdown_counting-dropdown");
  dropdownsList.each((i, dropdown) => {new CountingDropdown(dropdown)});
})