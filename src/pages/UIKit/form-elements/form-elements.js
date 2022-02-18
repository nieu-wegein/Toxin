import "../../../normalize.scss";
import "./form-elements.scss";
import "../../../components/site-dropdown/site-dropdown";
import "../../../components/site-dropdown/site-calendarDropdown";
import "../../../components/site-input/site-input";
import "../../../components/like-button/like-button";
import "../../../components/site-range-slider/site-range-slider";
import "../../../components/site-checkbox/site-checkbox";
import $ from "../../../jquery-3.6.0.min";


$(function () {

    const inputList = $(".site-input");
    inputList[1].value = "This is pretty awesome"


    const dropdownList = $(".site-dropdown_counting-dropdown").get();

    dropdownList[1].objectModel.initState({
        bedrooms: 2,
        beds: 2,
        bathrooms: 1
    })

    dropdownList[2].objectModel.initState({
        bedrooms: 2,
        beds: 2,
        bathrooms: 0
    })

    dropdownList[4].objectModel.initState({
        adults: 2,
        children: 1
    })


    for (let i = 2; i < 5; i++) {
        $(".site-dropdown__header", dropdownList[i]).click()
    }


    const calendarList = $(".site-calendar");

    calendarList[0].objectModel.initState({
        month: 7,
        year: 2019
    })

    calendarList[1].objectModel.initState({
        today: new Date("2019, 8, 8")
    })

    calendarList[0].objectModel.chooseEndDate(19)
    calendarList[1].objectModel.chooseStartDate(19).chooseEndDate(23)

})