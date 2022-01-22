import "../site-dropdown/site-dropdown"
import "../site-dropdown/site-calendarDropdown"
import "../site-input/site-input";
import Validator from "../../helpers/Validator";
import $ from "../../jquery-3.6.0.min";


async function submitForm(url, data) {
  const response = await fetch(url, {
    method: POST,
    body: data
  });

  if(!response.ok) throw new Error("Не удалось отправить форму");
  return await response.json();
}

$(function() {

  $("#booking-block__form").submit((e) => {
    e.preventDefault();

    const data = {};
    let error = false;


    const dropdownList = $(".site-dropdown", e.currentTarget).get();
    dropdownList.forEach((dropdown) => {

      let valid = Validator.validateDropdown(dropdown);

      if(!valid)
        error = true;
      else {
        let name = $(dropdown).data("name");
        let value = $(".site-dropdown__text-area", dropdown).text();
        data[name] = value;
      }
    })

    if(!error) {
      let form = new FormData(e.currentTarget);
      submitForm('https://jsonplaceholder.typicode.com/todos/1', data);
    }
  })
})