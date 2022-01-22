import $ from "../jquery-3.6.0.min";

export default class Validator {

  static triggerMessage(header) {
    if (!header.hasClass("site-dropdown__header_invalid")) {
      header.addClass("site-dropdown__header_invalid");
      setTimeout(() => header.removeClass("site-dropdown__header_invalid"), 4000)
    }
  }

  static validateDropdown(dropdown) {
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

    if (!valid) Validator.triggerMessage(header)

    return valid;
  }
}

