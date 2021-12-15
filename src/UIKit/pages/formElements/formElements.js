import "../../../normalize.scss";
import "./formElements.scss";
import "../../../components/site-dropdown/site-dropdown"
import $ from "../../../jquery-3.6.0.min";


window.addEventListener('load', function() {

  const inputList = $(".site-field");
  inputList[1].value = "This is pretty awesome"
  inputList[1].focus();

})