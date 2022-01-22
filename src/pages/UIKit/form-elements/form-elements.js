import "../../../normalize.scss";
import "./form-elements.scss";
import "../../../components/site-dropdown/site-dropdown";
import "../../../components/site-dropdown/site-calendarDropdown";
import "../../../components/site-input/site-input";
import "../../../components/like-button/like-button";
import "../../../components/site-range-slider/site-range-slider";
import "../../../components/site-checkbox/site-checkbox";
import $ from "../../../jquery-3.6.0.min";


$(function() {

  const inputList = $(".site-input");
  inputList[1].value = "This is pretty awesome"

  const likeButtons = $(".like-button");

  $(likeButtons[1]).addClass("like-button_active");
  $(likeButtons[2]).addClass("like-button_active");
  $(".like-button__counter", likeButtons[0]).text("2");
  $(".like-button__counter", likeButtons[1]).text("12");
  $(".like-button__counter", likeButtons[2]).text("12");

  const rateButtons = $(".rate-button").get();
  $("[value='5 stars']", rateButtons[0]).attr("checked", true);
  $("[value='4 stars']", rateButtons[1]).attr("checked", true);

  $(".site-dropdown__window", $("#dd-expanded")).show();
  $(".site-dropdown__window", $("#dd-buttons-expanded")).show();
  $(".site-dropdown__window", $("#dd-buttons-filled")).show();


  $(".site-dropdown__window", $("#dd-buttons-filled")).show();

  $(".site-fieldset__legend_expand").get()[1].click();
})