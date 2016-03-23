// $('.menu-container').click(function() {
//   $('body').removeClass('homepage');
// });

function slugify(Text) {
  return Text
      .toLowerCase()
      .replace(/ /g,'-')
      .replace(/[^\w-]+/g,'')
      ;
};

function clearVideo() {
  console.log('clearVideo called (sent from within the clearVideo function)');
  $('iframe').attr('src', "");
};

function turnOnLightbox(content) {
  $('.lightbox-view').addClass('on');
  if (content == "video") {
    $('.playback-video').addClass('on');
  }
  else if (content == "contact") {
    $('.contact-container').addClass('on');
  }
};

function turnOffLightbox() {
  console.log('turnOffLightbox has fired (sent from within turnOffLightbox function)');
  $('.lightbox-view').removeClass('on');
  $('.playback-video').removeClass('on');
  $('.contact-container').removeClass('on');
};

function setVideo(video_url, current_video_name, current_video_details) {
  $('iframe').attr('src', video_url);
  $('.video-title').text(current_video_name);
  $('.video-details').text(current_video_details);
};


$('#montage').click(function(e){
  e.preventDefault();
  turnOnLightbox('video');
  setVideo('https://player.vimeo.com/video/78514631?portrait=0&title=0&badge=0&byline=0&color=ff6200', 'Timothy Burton Reel', "");
});

$('#selected-work').click(function(e){
  e.preventDefault();
  updateRoute('/selected-work');
  clearVideo();
  turnOffLightbox();
  $('.selected-work').removeClass('hidden');
  $('.press-content').addClass('hidden');
  $('#selected-work').addClass('current-page');
  $('#press').removeClass('current-page');
  $('body').removeClass('homepage');
});

$('#press').click(function(e){
  e.preventDefault();
  updateRoute('/press');
  clearVideo();
  turnOffLightbox();
  $('.selected-work').addClass('hidden');
  $('.press-content').removeClass('hidden');
  $('#press').addClass('current-page');
  $('#selected-work').removeClass('current-page');
  $('body').removeClass('homepage');
});

$('#contact').click(function(e){
  e.preventDefault();
  turnOnLightbox('contact');
  $('.contact-view').addClass('contact-view-active');
});

$('.contact-close-button').click(function(e){
  e.preventDefault();
  turnOffLightbox();
});

$('.video-close-button').click(function(){
  clearVideo();
  turnOffLightbox();
});

$('.selected-work a').click(function(e){
  if ( $(this).hasClass('review-link') ) {
  }
  else {
    e.preventDefault();
    if ( $(this).hasClass('coming-soon') ) {
    }
    else {
      e.preventDefault();
      turnOnLightbox('video')
      var $this = $(this);
      current_video_name = $this.find('p.title-text').text();
      current_video_details = $this.find('p.details-text').text();
      current_video_id = $(this).attr('href').split("/")[3];
      setVideo('https://player.vimeo.com/video/' + current_video_id + '?portrait=0&title=0&badge=0&byline=0&color=ff6200', current_video_name, current_video_details);
    }
  }
});

$('.site-title').click(function(){
  if (!$('body').hasClass('homepage')) {
    $('body').addClass('homepage');
    $('#press').removeClass('current-page');
    $('#selected-work').removeClass('current-page');
    $('.selected-work').addClass('hidden');
    $('.press-content').addClass('hidden');
    updateRoute('/');
  }
  else {
  }
});

$('.screencap-link').click(function(e){
  e.preventDefault();
  turnOnLightbox();
  $('.press-screencap').addClass('on');
});

$('.screencap-close-button').click(function(){
  turnOffLightbox();
  $('.press-screencap').removeClass('on');
});


$( document ).ready(function() {
  initRouter();
  pic = new Image();
  pic.src="../img/press/press-hero.jpg";
  $('body').addClass('loaded');
});


var updateRoute = function(slug) {

  // Checks if HTML5 History is supported
  if (window.history && window.history.pushState) {
    console.log('updateRoute was called!')
    window.history.pushState(null, null, slug);
  }
  // If not, sorry!
};


// Checks if HTML5 History is supported
var initRouter = function() {

  console.log('initRouter fired!');
  if (window.history && window.history.pushState) {
    var path = window.location.pathname.split("/");
    if (path[1] == 'press') {
      updateRoute('/press');
      $('.selected-work').addClass('hidden');
      $('.press-content').removeClass('hidden');
      $('#press').addClass('current-page');
      $('#selected-work').removeClass('current-page');
      $('body').removeClass('homepage');
    }

    else if (path[1] == 'selected-work') {
      updateRoute('/selected-work');
      $('.selected-work').removeClass('hidden');
      $('.press-content').addClass('hidden');
      $('#selected-work').addClass('current-page');
      $('#press').removeClass('current-page');
      $('body').removeClass('homepage');
    }
    else {
      updateRoute('/')
      if (!$('body').hasClass('homepage')) {
        $('body').addClass('homepage');
        turnOffLightbox();
        $('#press').removeClass('current-page');
        $('#selected-work').removeClass('current-page');
        $('.selected-work').addClass('hidden');
        $('.press-content').addClass('hidden');
      }
    }

    window.addEventListener("popstate", function(e) {
      console.log('popstate listener fired');
      console.log('clear Video is about to be called from the popstate listener!');
      clearVideo();
      console.log('turnOffLightbox is about to fire from the popstate listener!');
      turnOffLightbox();
      var path = window.location.pathname.split("/");
      if (path[1] == 'press') {
        console.log('popstate press detected');
        $('.selected-work').addClass('hidden');
        $('.press-content').removeClass('hidden');
        $('#press').addClass('current-page');
        $('#selected-work').removeClass('current-page');
        $('body').removeClass('homepage');
      }
      else if (path[1] == 'selected-work') {
        console.log('popstate selected-work detected');
        $('.selected-work').removeClass('hidden');
        $('.press-content').addClass('hidden');
        $('#selected-work').addClass('current-page');
        $('#press').removeClass('current-page');
        $('body').removeClass('homepage');
      }

      else if (path[1] == "") {
        if (!$('body').hasClass('homepage')) {
          $('body').addClass('homepage');
          turnOffLightbox();
          $('#press').removeClass('current-page');
          $('#selected-work').removeClass('current-page');
          $('.selected-work').addClass('hidden');
          $('.press-content').addClass('hidden');
        }
      }
    });
  }
  // If not, redirect to home landing.
  else {
    window.location = '/';
  }
};

$(window).on("navigate", function (event, data) {
  console.log('navigate function called!!!!!!@141241');
  var direction = data.state.direction;
  if (direction == 'back') {
    console.log('back button was clicked!');
  }
  if (direction == 'forward') {
    // do something else
  }
});

