// $(document).keydown(function(event){
//   if(event.keyCode==123){
//     return false;
//   }
//   else if (event.ctrlKey && event.shiftKey && event.keyCode==73){
//     return false;
//   }
// });
// $(document).on("contextmenu",function(e){
//   e.preventDefault();
// });

$(document).ready(function () {

  // header
  $('.menu-icon').click(function () {
    $('.navigation').toggleClass('navigation_opened');
  });
  // feedbacks slider
  $('.feedbacks__slider').slick({
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    pauseOnHover: true,
    pauseOnFocus: false,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
  // modal
  $('.modal__close').click(function (e) {
    e.preventDefault();
    $('.modal').hide();
  });
  // Cart modal
  $('.cart').click(function (e) {
    e.preventDefault();
    $('.modal').show();
  });
  $('.modal-basket-item__btn').click(function (e) {
    e.preventDefault();
    $(this).closest('.modal-basket-item').remove();
    if($('.modal-basket-item').length < 1){
      $('.modal-basket__empty').show();
      $('.modal-basket__total').hide();
    }else {
      $('.modal-basket__empty').hide();
      $('.modal-basket__total').show();
    }
  });

  // validation emails and collect emails
  $.fn.serializeFormJSON = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
      if (o[this.name]) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });
    return o;
  };
  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }
  $('.js-collect').click(function (e) {
    e.preventDefault();
    var btnThanks = '<button class="join-form__btn btn-success" type="button">Thanks.</button>';
    var userForm = $(this).closest('form');
    var msg = userForm.find('.msg');
    var inp = $(this).siblings('.join-form__inp');
    var emailVal = inp.val();
    msg.show();
    if(emailVal === '') {
      userForm.addClass('error');
      msg.text('Please enter your email address');
    }else if(!isEmail(emailVal)) {
      userForm.addClass('error');
      msg.text('Please enter a valid email');
    }else {
      // gAJAX
      var serializedData = userForm.serializeFormJSON();
      var url = '';
      $.ajax({
        url: url,
        method: "POST",
        dataType: "json",
        data: serializedData,
        beforeSend: function(){
          $('.js-collect').attr('disabled', true);
          userForm.removeClass('error');
          msg.text('');
        },
        success:function(data) {
          $('.join-form__holder').replaceWith(btnThanks);
          $('.msg').text('We’ll notify you when ready for your help.').show();
        }
      });
    }
  });

});