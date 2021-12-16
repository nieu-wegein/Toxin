import "../../../normalize.scss";
import "./form-elements.scss";
import "../../../components/site-dropdown/site-dropdown"
import "../../../components/site-input/site-input"
import $ from "../../../jquery-3.6.0.min";


window.addEventListener('load', function() {

  const inputList = $(".site-input");
  inputList[1].value = "This is pretty awesome"

})