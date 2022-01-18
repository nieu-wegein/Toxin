import $ from "../../jquery-3.6.0.min";

//-TODO: не ставится точка после очистки инпута бекспейсом, если курсор стоит на позиции точки.
//-TODO: Проверить delete и другие способы очистки инпута

class SiteInput {

}

class MaskedInput extends SiteInput {

}

class DateInput extends MaskedInput {

  constructor(input) {
    super(input)
    this.input = $(input);

    this.input.on("input", this.setMask)
  }

  setMask = (e) => {

    const inputText = this.input[0].value;
    this.input.attr("maxlength","10");
    const current = this.input[0].selectionStart;


    const regex = /^(((0|$)([1-9]|$))|([1-2]|$)([0-9]|$)|(3|$)([0-1]|$))(\.|$)((0|$)([1-9]|$)|(1|$)([0-2]|$))(\.|$)((1|$)(9|$)([5-9]|$)(\d|$)|(2|$)(0|$)(\d|$)(\d|$))/g;
    //0[1-9] или [1-2][0-9] или 3[0-1] . 0[1-9] или 1[0-2] . 19[5-9][0-9] или 20[0-9][0-9]


    if (!regex.test(inputText)) {
      this.input[0].value = inputText.slice(0, -1)
    } else if((current === 2 || current === 5)&&(e.originalEvent.inputType !== "deleteContentBackward")) {

      this.input[0].value = inputText + ".";
    }

  }
}


$(function () {

  const maskedInputList = $(".site-input_date");
  maskedInputList.each((i, input) => {new DateInput(input)})

})