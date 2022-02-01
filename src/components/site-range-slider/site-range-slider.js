import $ from "../../jquery-3.6.0.min";
import separatePrice from "../../helpers/separate-price";

class RangeSlider {
  constructor(slider) {

    this.slider = $(slider);
    this.rangeInputs = $(".site-range-slider__input", this.slider).get();
    this.startRangeDisplay = $(".start-range", this.slider[0].parentElement);
    this.endRangeDisplay = $(".end-range", this.slider[0].parentElement);
    this.fill = $(".site-range-slider__fill", this.slider);

    $(this.rangeInputs[0]).on("input", this.setStartValue);
    $(this.rangeInputs[1]).on("input", this.setEndValue);

    this.setStartValue();
    this.setEndValue();

  }

  setStartValue = () => {
    //ширина слайдера минус место под кнопку - так же как и в стандартном инпуте
    const sliderWidth = this.slider.width()/2 - 16; // если не нужен адаптив для элементов формы, можно вынести за пределы функции
    const left = (this.rangeInputs[0].value - this.rangeInputs[0].min) / (this.rangeInputs[0].max - this.rangeInputs[0].min) * sliderWidth;

    this.startRangeDisplay[0].innerText = separatePrice(this.rangeInputs[0].value);
    this.fill.css("left", left);
  }

  setEndValue = () => {
    const sliderWidth = this.slider.width()/2 - 16; // если не нужен адаптив для элементов формы, можно вынести за пределы функции
    const right = sliderWidth - (this.rangeInputs[1].value - this.rangeInputs[1].min) / (this.rangeInputs[1].max - this.rangeInputs[1].min) *  sliderWidth;

    this.endRangeDisplay[0].innerText = separatePrice(this.rangeInputs[1].value);
    this.fill.css("right", right );
  }
}


$(function(){

  const rangeSliderList = $(".site-range-slider");
  rangeSliderList.each((i, slider) => {new RangeSlider(slider)});

})
