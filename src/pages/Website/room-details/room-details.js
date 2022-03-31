import "../../../normalize.scss";
import './room-details.scss';
import "../../../components/site-header/site-header";
import "../../../components/site-slider/site-slider";
import '../../../components/site-testimonial/site-testimonial';
import '../../../components/booking-block/booking-block';
import $ from "../../../jquery-3.6.0.min";


$(function () {

    const dropdown = $(".site-dropdown_counting").get();

    dropdown[0].objectModel.initState({
        adults: 1,
        children: 1,
        babies: 1
    })

    const calendar = $(".site-calendar");

    calendar[0].objectModel.initState({
        month: 7,
        year: 2019
    })
    calendar[0].objectModel.chooseStartDate(19).chooseEndDate(23)

})
