import "../../../normalize.scss";
import "./cards.scss";
import "../../../components/search-block/search-block"
import "../../../components/registration-block/registration-block"
import "../../../components/booking-block/booking-block"
import "../../../components/log-in-block/log-in-block"
import "../../../components/room-card/room-card";
import $ from "../../../jquery-3.6.0.min";


$(function () {

    const calendarList = $(".site-calendar");

    calendarList[1].objectModel.initState({
        today: new Date("2019, 8, 8")
    })

    calendarList[2].objectModel.initState({
        today: new Date("2019, 8, 8")
    })
    calendarList[1].objectModel.chooseStartDate(19).chooseEndDate(23)
    calendarList[2].objectModel.chooseStartDate(19).chooseEndDate(23)


    const dropdownList = $(".site-dropdown_counting-dropdown").get();

    dropdownList[1].objectModel.initState({
        adults: 1,
        children: 1,
        babies: 1
    })

})
