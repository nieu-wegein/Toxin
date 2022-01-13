import "../../../normalize.scss";
import "./cards.scss";
import "../../../components/search-block/search-block"
import "../../../components/registration-block/registration-block"
import "../../../components/booking-block/booking-block"
import "../../../components/log-in-block/log-in-block"
import $ from "../../../jquery-3.6.0.min";




$(function(){
  const rateButtons = $(".rate-button").get();
  $("[value='5 stars']", rateButtons[0]).attr("checked", true);
  $("[value='4 stars']", rateButtons[1]).attr("checked", true);

  const roomCards = $(".room-card").get();

  // $(".room-card__image", roomCards[1]).attr("src", "../../../components/room-card/aaas.png");
  // $(".room-card__room-number", roomCards[1]).text("№840").removeClass(".room-card__room-number_luxe");
  // $(".room-card__image", roomCards[1]).attr("src", "../../../components/room-card/aaas.png");
})

