import $ from "../../jquery-3.6.0.min";


//TODO: разбить на дочерние классы
//TODO: РЕФАКТОРИНГ!!!


class SiteDropdown {

}

export class CountingDropdown extends SiteDropdown {

  constructor(dropdown) {
    super(dropdown)
    this.dropdown = $(dropdown);
    this.state = {}
    this.header = $(".site-dropdown__header", this.dropdown);
    this.window = $(".site-dropdown__window", this.dropdown);
    this.items = $(".site-dropdown__item", this.window);
    this.footer = $(".site-dropdown__footer", this.window);
    this.counters = $(".site-dropdown__counter", this.window).get();
    this.textArea = $(".text-area", this.header)


    this.header.click(this.toogleWindow);
    this.dropdown.focusout(this.onFocusLoose);
    if (this.footer) {
      this.footer.click(this.onFooterClick);
      this.items.click(this.onItemClick());
    } else
      this.items.click(this.onItemClick())
  }

  toogleWindow = () => {
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

    for (let key in this.state) {

      if (this.state[key] !== 0) {
        let lastDigit = this.state[key] % 10;
        let penultDigit = Math.floor(this.state[key] % 100 / 10);
        let cases = key.split(",");

        text += text === "" ? this.state[key] + " " : ", " + this.state[key] + " "

        if (lastDigit === 1 && penultDigit !== 1)
          text += cases[0]
        else if (lastDigit > 1 && lastDigit < 5 && penultDigit !== 1)
          text += cases[1]
        else
          text += cases[2]
      }

      else text += "";
    }

    text === "" ? this.textArea.text(defaultText) : this.textArea.text(text);
  }

  updateHeaderState = () => {

    const newState = {}

    this.items.get().reduce((sum, current) => {
      const declination = $(current).data("declination");

      if (!sum[declination]) sum[declination] = 0;
      sum[declination] += parseInt($(".site-dropdown__count", current)[0].innerText)

      return sum;

    }, newState)

    this.state = newState;

    this.setHeaderText();
  }

  onItemClick = () => {

    let callback = this.footer ? this.toogleClearButton : this.updateHeaderState;

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

  toogleClearButton = () => {
    if (this.footer) {
      let clear = true; //TODO
      const buttonClear = $(".site-dropdown__button-clear", this.footer)
      const counters = $(".site-dropdown__count", this.window).get()

      let count = counters.reduce((sum, current) => {
        return sum += parseInt(current.innerText)
      }, 0)

      if (count) buttonClear.css("visibility", "visible")
      else buttonClear.css("visibility", "hidden")
    }
  }

  onFooterClick = (e) => {
    const buttonClear = $(".site-dropdown__button-clear", this.footer);
    const buttonApply = $(".site-dropdown__button-apply", this.footer);

    if (e.target === buttonClear[0]) {
      this.counters.forEach((counter) => {
        $(".site-dropdown__count", counter)[0].innerText = 0;
        $(".site-dropdown__button-remove", counter).attr("disabled", true);
        buttonApply.focus();

        this.updateHeaderState();
        this.toogleClearButton();
      })
    }
    else if (e.target === buttonApply[0]) {
      this.window.hide();
      this.updateHeaderState();
    }

  }
}


$(function (){

  const dropdownsList = $(".site-dropdown_counting-dropdown");
  dropdownsList.each((i, dropdown) => {new CountingDropdown(dropdown)});

})