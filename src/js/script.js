// === search ===

$(function () {
    $('input[type="search"]').focus(function () {
        $('.header-nav__search svg').animate({
            opacity: "0"
        })
    });
    $('input[type="search"]').focusout(function () {
        $('.header-nav__search svg').animate({
            opacity: "1"
        })
        $(this).val("")
    });
})

// === / search ===

// === login ===

$(function () {

    $('#login-btn, .header-box-form-pa-container').hover(function () {
            $('.header-box-form-pa-container').show()
        },
        function () {
            $('.header-box-form-pa-container').hide();
        });
});

// === / login ===

// === btn reg ===

$(function () {
    $('#checkbox-reg, input[type="radio"]').click(function () {
        if ($('#checkbox-reg').is(':checked') && ($('input[type="radio"]').is(':checked')) && ($('#registration-login').val() != '') && ($('#registration-password').val().length > 0) && ($('#registration-mail').val() != '')) {
            $('#btn-reg').removeClass('btn-disabled');
        } else {
            $('#btn-reg').addClass('btn-disabled');
        }
    })
});

$(function () {
    $('#registration-login, #registration-password, #registration-mail').keyup(function () {
        if ($('#checkbox-reg').is(':checked') && ($('input[type="radio"]').is(':checked')) && ($('#registration-login').val() != '') && ($('#registration-password').val().length > 0) && ($('#registration-mail').val() != '')) {
            $('#btn-reg').removeClass('btn-disabled');
        } else {
            $('#btn-reg').addClass('btn-disabled');
        }
    })
});

// === / btn reg ===

// === reg === 

$(function () {
    $('.btn-reg').click( function() {
        if (!$(this).hasClass('btn-disabled')) {
            var date_reg = {
                login: $('#registration-login').val(),
                pass: $('#registration-password').val(),
                mail: $('#registration-mail').val(),
                gender: $("input:radio:checked").val()
            }

            $('#name-mes').text(date_reg.login+', ')
            $('.registration__form').hide()
            $('.registration__completed').show()

            console.log('Логин: '+date_reg.login)
            console.log('Пароль: '+date_reg.pass)
            console.log('Mail: '+date_reg.mail)
            console.log('Пол: '+date_reg.gender)
         }
    })
});

// === / reg === 

// === btn reset ===

$(function () {
    $('#btn-reset').click(function (btn_reset) {
        btn_reset.preventDefault()
        $(this).closest('.registration__form').get(0).reset()
        $('#btn-reg').addClass('btn-disabled');
    });
})

// === / btn reset ===

// === btn-nav-mobile ===

$(function () {
    var e = $(".header-nav-mobile");
    e.click(function () {
        return e.toggleClass("active"), $(".header-nav__list").toggleClass("active"), !1
    })
});

// === / btn-nav-mobile ===

// === accordion site-bar ===

$(function () {
    $('.site-bar-info-1__title').click(function () {
        $(this).toggleClass('active-accordion')
        $('+ .site-bar-info-1__list', this).slideToggle(500)

    })
});

// === / accordion site-bar ===

// === slider ===

$(function(){
    $('.slider-1').slick({
    });
});

// === / slider ===

// === map ===

ymaps.ready(init);
function init(){
    var myMap = new ymaps.Map("map", {
        center: [55.7775,37.7312],
        zoom: 13,
        Width: 100,
        maxHeight: 370,
        Height: 370,
        controls: ['zoomControl']
    });
    myMap.behaviors.disable(['scrollZoom']);
    myMap.behaviors.disable('multiTouch');
    myMap.behaviors.disable('drag');

     var myGeoObject = new ymaps.GeoObject({
        geometry: {
            type: "Point",
            coordinates: [55.7775,37.7312]
        },
        properties: {
            iconContent: '«Elwau.ru»',
            hintContent: 'Мы рады вам всегда!!!'
        }
    }, {
        preset: 'islands#orangeStretchyIcon'
    })
    
    myMap.geoObjects
        .add(myGeoObject);


    $('#btn-map').click(function() {
        $(this).hide()
        myMap.controls.add('routePanelControl');
        myMap.geoObjects.remove(myGeoObject);

        var control = myMap.controls.get('routePanelControl');

        control.options.set({
            float: 'right',
            maxWidth: 150,
            Width: 150,
            Height: 500,
        });

        control.routePanel.state.set({
            type: 'masstransit',
            fromEnabled: true,
            toEnabled: false,
            to: 'г.Москва, ул. Кирпичная, д. 22',
        });

        control.routePanel.options.set({
            allowSwitch: false,
            reverseGeocoding: true,
            types: { masstransit: true, pedestrian: true, taxi: true },
        });
        
    })

}
// === / map ===
