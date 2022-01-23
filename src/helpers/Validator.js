import $ from "../jquery-3.6.0.min";

export default class Validator {

  static triggerMessage(imput) {
    if (!imput.hasClass("site-dropdown__header_invalid")) {
      imput.addClass("site-dropdown__header_invalid");
      setTimeout(() => imput.removeClass("site-dropdown__header_invalid"), 4000)
    }
  }

  static validateDropdown(dropdown, onSuccess, onError) {
    const header = $(".site-dropdown__header", dropdown);
    const currentValue = $(".site-dropdown__text-area", header).text();
    let valid = true;

    if ($(dropdown).hasClass("site-dropdown_counting-dropdown")) {
      const defaultValue = header.data("text");
      valid = defaultValue !== currentValue;
    }
    else if ($(dropdown).hasClass("site-dropdown_shared-calendar")) {
      const regex = /\d\d.\d\d.\d\d\d\d/g;
      valid = regex.test(currentValue);
    }

    if(valid)
      onSuccess()
    else {
      Validator.triggerMessage(header);
      onError();
    }

    return valid;
  }
}

