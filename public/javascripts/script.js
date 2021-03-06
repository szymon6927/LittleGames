$(document).ready(function () {
  $(".button-collapse").sideNav();
});

$(window).bind("load", function () {

  let footerHeight = 0,
    footerTop = 0,
    $footer = $(".footer-below");

  positionFooter();

  function positionFooter() {
    footerHeight = $footer.height();
    
    // 30 is as padding height
    footerTop = ($(window).scrollTop() + $(window).height() - footerHeight - 30) + "px";

    if (($(document.body).height() + footerHeight) < $(window).height()) {
      $footer.css({
        position: "absolute",
        width: "100%"
      }).animate({
        top: footerTop
      })
    } else {
      $footer.css({
        position: "static"
      })
    }

  }

  $(window)
    .scroll(positionFooter)
    .resize(positionFooter)
});