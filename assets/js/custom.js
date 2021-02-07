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
    $('body').css('overflow','auto');
  });
  // Cart modal
  $('.cart').click(function (e) {
    e.preventDefault();
    $('.modal').show();
    $('body').css('overflow','hidden');
  });

  // Product
  $('.product-variant').click(function () {
    $(this).siblings('.product-variant').removeClass('product-variant_checked');
    $(this).addClass('product-variant_checked');
    var color = $(this).attr('class').toString().split(' ')[1].split('--')[1]
    $(this).closest('.js-product').data('color', color);
  });
  // ADD product
  var basket = localStorage.getItem("basket");
  basket = basket ? JSON.parse(basket) : [];
  var total = 0;
  if(basket.length > 0){
    for(var i=0; i < basket.length; i++){
      total += basket[i].price;
    }
  }
  $('.cart__qty').text(basket.length);
  $('.product-total').text(total);

  $('.js-add').click(function (e) {
    e.preventDefault();
    var el = $(this).closest('.js-product');
    var exists = false;
    for (var i = 0; i < basket.length; i++){
      if(basket[i].id === parseInt(el.data('id'))){
        exists = true;
      }
    }
    if(!exists){
      basket.push({
        title: el.data('title'),
        price: parseInt(el.data('price')),
        color: el.data('color'),
        img: el.data('img'),
        id: parseInt(el.data('id'))
      });
      localStorage.setItem("basket", JSON.stringify(basket));
      $('.cart__qty').text(basket.length);
      total += parseInt(el.data('price'));
      $('.product-total').text(total);
      fillBasket();
    }
  });

  // Delete product
  $(document).on('click','.js-delete',function (e) {
    e.preventDefault();
    var id = parseInt($(this).closest('.modal-basket-item').data('id'));
    for (var i = 0; i < basket.length; i++){
      if(basket[i].id === id){
        basket.splice(i, 1);
      }
    }
    localStorage.setItem("basket", JSON.stringify(basket));
    total -= parseInt(parseInt($(this).closest('.modal-basket-item').data('price')));
    $('.product-total').text(total);
    $(this).closest('.modal-basket-item').remove();
    $('.cart__qty').text(basket.length);
    if(basket.length < 1){
      $('.modal-basket__empty').show();
      $('.modal-basket__total').css('display','none');
    }
  });

  function fillBasket() {
    if(basket.length > 0){
      $('.modal-basket__empty').hide();
      $('.modal-basket__total').css('display','flex');
    }else {
      $('.modal-basket__empty').show();
      $('.modal-basket__total').css('display','none');
    }
    var bItems = basket.map(function (item) {
      return '<div class="modal-basket-item" data-title="'+item.title+'" data-price="'+item.price+'" data-img="'+item.img+'" data-color="'+item.color+'" data-id="'+item.id+'">\n' +
        '        <div class="modal-basket-item__img"><img src="'+item.img+'" alt="text"></div>\n' +
        '        <div class="modal-basket-item__name">'+item.title+'</div>\n' +
        '        <div class="modal-basket-item__price product-price">'+item.price+'&nbsp₽</div>\n' +
        '        <a href="#" class="btn modal-basket-item__btn js-delete">Удалить</a>\n' +
        '      </div>'
    }).join('');
    $('.modal-basket__items').html(bItems);
  }
  fillBasket();




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