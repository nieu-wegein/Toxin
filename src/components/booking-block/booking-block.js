import "../site-dropdown/site-dropdown";
import "../site-dropdown/site-calendarDropdown";
import "../site-input/site-input";
import Validator from "../../helpers/Validator";
import submitForm from "../../helpers/submitForm";
import $ from "../../jquery-3.6.0.min";

$(function() {
  $("#booking-block__form").submit((e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget)
    let error = false;
    const dropdownList = $(".site-dropdown", e.currentTarget).get();

    dropdownList.forEach((dropdown) => {
      Validator.validateDropdown(dropdown, () => {
        for (let key in dropdown.objectModel.state)
          formData.append(key, dropdown.objectModel.state[key])
      }, () => {error = true;});
    });

    if(!error) submitForm('https://jsonplaceholder.typicode.com/posts', formData);
  })
})

