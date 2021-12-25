import "../../../normalize.scss";
import "./form-elements.scss";
import "../../../components/site-dropdown/site-dropdown"
import "../../../components/site-calendar/site-calendar"
import "../../../components/site-dropdown/site-calendarDropdown"
import "../../../components/site-input/site-input"
import "../../../components/like-button/like-button"
import $ from "../../../jquery-3.6.0.min";


window.addEventListener('load', function() {

  const inputList = $(".site-input");
  inputList[1].value = "This is pretty awesome"

  const likeButtons = $(".like-button");
  $(likeButtons[1]).addClass("like-button_active");
  $(".like-button__counter", likeButtons[0]).text("2");
  $(".like-button__counter", likeButtons[1]).text("12");

})