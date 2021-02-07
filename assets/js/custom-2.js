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

var products = [
  {
    id: 1,
    images: [
      'assets/img/product-1.jpg'
    ],
    title: 'Air cube',
    colors: [
      'white',
      'black',
      'white-rock',
    ],
    price: 15000
  },
  {
    id: 2,
    images: [
      'assets/img/product-2.jpg'
    ],
    title: 'Сфера',
    colors: [
      'white',
      'black',
      'white-rock',
    ],
    price: 15000
  },
  {
    id: 3,
    images: [
      'assets/img/product-3.jpg'
    ],
    title: 'Мини',
    colors: [
      'white',
      'black',
      'white-rock',
    ],
    price: 15000
  },
  {
    id: 4,
    images: [
      'assets/img/product-4.jpg'
    ],
    title: 'Озонатор мини',
    colors: [
      'white',
      'black',
      'white-rock',
    ],
    price: 15000
  },
  {
    id: 5,
    images: [
      'assets/img/product-1.jpg'
    ],
    title: 'Air cube',
    colors: [
      'white',
      'black',
      'white-rock',
    ],
    price: 15000
  },
  {
    id: 6,
    images: [
      'assets/img/product-2.jpg'
    ],
    title: 'Сфера',
    colors: [
      'white',
      'black',
      'white-rock',
    ],
    price: 15000
  }
];

$(document).ready(function () {

  function renderProducts(){
    var productsHtml = products.map(function (item) {
      var imgs = item.images.map(function (img) {
        return '<img src="'+img+'" alt="'+item.title+'">';
      }).join('');
      var colors = item.colors.map(function (color) {
        if(color === 'white'){
          return '<div class="product-variant product-variant--'+color+' product-variant_checked"></div>';
        }else {
          return '<div class="product-variant product-variant--'+color+'"></div>';
        }
      }).join('');
      return '<div class="catalog__item" data-id="'+item.id+'">\n' +
        '            <div class="catalog-product js-product">\n' +
        '              <div class="catalog-product__img">'+imgs+'</div>\n' +
        '              <div class="catalog-product__content">\n' +
        '                <h3 class="catalog-product__title">'+item.title+'</h3>\n' +
        '                <div class="product-variants catalog-product__variants">\n' +
        '                  <div class="product-variants__label">выбора цвета:</div>\n' +
        '                  <div class="product-variants-items">'+colors+'</div>\n' +
        '                </div>\n' +
        '                <div class="product-price">'+item.price+'₽</div>\n' +
        '                <div class="catalog-product__btns">\n' +
        '                  <a href="#" class="catalog-product__more">подробнее</a>\n' +
        '                  <a href="#" class="btn btn--red js-add">в корзину</a>\n' +
        '                </div>\n' +
        '              </div>\n' +
        '            </div>\n' +
        '          </div>';
    }).join('');
    $('.catalog__items').html(productsHtml);
  }
  renderProducts();
  
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