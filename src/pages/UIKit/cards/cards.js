import "../../../normalize.scss";
import "./cards.scss";
import "../../../components/search-block/search-block"
import "../../../components/registration-block/registration-block"
import "../../../components/booking-block/booking-block"
import "../../../components/log-in-block/log-in-block"
import "../../../components/room-card/room-card";
import $ from "../../../jquery-3.6.0.min";




$(function(){
  const rateButtons = $(".rate-button").get();
  $("[value='5 stars']", rateButtons[0]).attr("checked", true);
  $("[value='4 stars']", rateButtons[1]).attr("checked", true);

  const roomCards = $(".room-card").get();
})

