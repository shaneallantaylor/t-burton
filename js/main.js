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
  $('iframe').attr('src', "");
};

function setVideo(video_url, current_video_name, current_video_details) {
  $('iframe').attr('src', video_url);
  $('.video-title').text(current_video_name);
  $('.video-details').text(current_video_details);
};

$('#montage').click(function(){
  $('.playback-view').addClass('playback-view-active');
  setVideo('https://player.vimeo.com/video/78514631?portrait=0&title=0&badge=0&byline=0&color=ff6200', 'Timothy Burton Reel', "");
});

$('#selected-work').click(function(){
  updateRoute('/selected-work');
  $('.selected-work').removeClass('hidden');
  $('.press-content').addClass('hidden');
  $('#selected-work').addClass('current-page');
  $('#press').removeClass('current-page');
  $('body').removeClass('homepage');
});

$('#press').click(function(){
  $('.selected-work').addClass('hidden');
  $('.press-content').removeClass('hidden');
  $('#press').addClass('current-page');
  $('#selected-work').removeClass('current-page');
  $('body').removeClass('homepage');
});

$('#contact').click(function(){
  $('.contact-view').addClass('contact-view-active');
});

$('.contact-close-button').click(function(){
  $('.contact-view').removeClass('contact-view-active');
});

$('.video-close-button').click(function(){
  clearVideo();
  $('.playback-view').removeClass('playback-view-active');
});

$('.selected-work a').click(function(e){
  e.preventDefault();
  if ( $(this).hasClass('coming-soon') ) {
  }
  else {
    $('.playback-view').addClass('playback-view-active');
    var $this = $(this);
    console.log($this.find('p.title-text').text());
    current_video_name = $this.find('p.title-text').text();
    current_video_details = $this.find('p.details-text').text();
    current_video_id = $(this).attr('href').split("/")[3];
    setVideo('https://player.vimeo.com/video/' + current_video_id + '?portrait=0&title=0&badge=0&byline=0&color=ff6200', current_video_name, current_video_details);
  }
});

$( document ).ready(function() {
    initRouter();
    $('body').addClass('loaded');
});


var updateRoute = function(slug) {

  // Checks if HTML5 History is supported
  if (window.history && window.history.pushState) {
    window.history.pushState(null, null, slug);
  }
  // If not, sorry!
};


// Checks if HTML5 History is supported
var initRouter = function() {

  if (window.history && window.history.pushState) {
    var path = window.location.pathname.split("/");
    var params = window.location.search;
    console.log(path[5]);

    if (path[5] == 'index.html') {
      console.log('it was the thing');
    }

    else if (path[1] == 'secret-gallery-1') {
      showSecretPhotoGallery(11);

      setTimeout(function() {
        if (!!media_id) {
          var media_links = $('#mygallery a');
          for (var j = 0, m = media_links.length; j < m; j++) {
            var thumb_id =($(media_links[j]).data('thumb-id'));
            if (thumb_id == media_id) {
              showMedia($(media_links[j]));
            }
          }
        }
      }, 1000);
      // showGallery();
    }

    else if (path[1] == 'secret-gallery-2') {
      showSecretVideoGallery(12);

      setTimeout(function() {
        if (!!media_id) {
          var media_links = $('#mygallery a');
          for (var j = 0, m = media_links.length; j < m; j++) {
            var thumb_id =($(media_links[j]).data('thumb-id'));
            if (thumb_id == media_id) {
              showMedia($(media_links[j]));
            }
          }
        }
      }, 1000);

    }

    else if (path.length == 2) {
      var nav_link_name = path[1];
      var nav_links = $('.nav-link');
      if (nav_link_name == nav_links.text()) {
      }
      for (var i = 0, l = nav_links.length; i < l; i++) {
        var nav_link_label = ($(nav_links[i]).text());


        if (slugify(nav_link_name) == slugify(nav_link_label)) {
          var nav_link_elm = $(nav_links[i]);

          if ($(nav_link_elm).hasClass('expand-link')) {
            showNav($(nav_links[i]));
          }
          else {
            showGallery($(nav_links[i]));
          }

          setTimeout(function() {
            if (!!media_id) {
              var media_links = $('#mygallery a');
              for (var j = 0, m = media_links.length; j < m; j++) {
                var thumb_id =($(media_links[j]).data('thumb-id'));
                if (thumb_id == media_id) {
                  showMedia($(media_links[j]));
                }
              }
            }
          }, 1000);

        }
      }
    }
    else if (path.length == 3) {
      var nav_link_name = path[1];
      var nav_links = $('.nav-link');
      for (var i = 0, l = nav_links.length; i < l; i++) {
        var nav_link_label = ($(nav_links[i]).text());
        if (slugify(nav_link_name) == slugify(nav_link_label)) {
          var gallery_link_name = path[2];
          var gallery_links = $(nav_links[i]).next().find('.port-link')
          for (var i = 0, l = gallery_links.length; i < l; i++) {
            var gallery_link_label = ($(gallery_links[i]).text());
            if (slugify(gallery_link_name) == slugify(gallery_link_label)) {
              showGallery($(gallery_links[i]));
              // $(gallery_links[i]).trigger('click');

            setTimeout(function() {
            if (!!media_id) {
              var media_links = $('#mygallery a');
              for (var j = 0, m = media_links.length; j < m; j++) {
                var thumb_id =($(media_links[j]).data('thumb-id'));
                if (thumb_id == media_id) {
                  showMedia($(media_links[j]));
                }
              }
            }
          }, 1000);

            }
          }
        }
      }
    }

    window.addEventListener("popstate", function(e) {
    var path = window.location.pathname.split("/");
    var params = window.location.search;
    var media_id;
    if (!!params) {
      media_id = params.split("=")[1];
    }
    // console.log(media_id);

    if (path[1] == 'about') {
      showAbout();
    }

    else if (path[1] == 'secret-gallery-1') {
      showSecretPhotoGallery(11);

      setTimeout(function() {
        if (!!media_id) {
          var media_links = $('#mygallery a');
          for (var j = 0, m = media_links.length; j < m; j++) {
            var thumb_id =($(media_links[j]).data('thumb-id'));
            if (thumb_id == media_id) {
              showMedia($(media_links[j]));
            }
          }
        }
      }, 1000);
      // showGallery();
    }

    else if (path[1] == 'secret-gallery-2') {
      showSecretVideoGallery(12);

      setTimeout(function() {
        if (!!media_id) {
          var media_links = $('#mygallery a');
          console.log(media_links);
          for (var j = 0, m = media_links.length; j < m; j++) {
            var thumb_id =($(media_links[j]).data('thumb-id'));
            if (thumb_id == media_id) {
              showMedia($(media_links[j]));
            }
          }
        }
      }, 1000);

    }

    else if (path.length == 2) {
      var nav_link_name = path[1];
      var nav_links = $('.nav-link');
      console.log(slugify(nav_links.text()));
      if (nav_link_name == nav_links.text()) {
      }
      for (var i = 0, l = nav_links.length; i < l; i++) {
        var nav_link_label = ($(nav_links[i]).text());


        if (slugify(nav_link_name) == slugify(nav_link_label)) {
          var nav_link_elm = $(nav_links[i]);

          if ($(nav_link_elm).hasClass('expand-link')) {
            showNav($(nav_links[i]));
          }
          else {
            showGallery($(nav_links[i]));
          }

          setTimeout(function() {
            if (!!media_id) {
              var media_links = $('#mygallery a');
              console.log(media_links);
              for (var j = 0, m = media_links.length; j < m; j++) {
                var thumb_id =($(media_links[j]).data('thumb-id'));
                if (thumb_id == media_id) {
                  showMedia($(media_links[j]));
                }
              }
            }
          }, 1000);

        }
      }
    }
    else if (path.length == 3) {
      var nav_link_name = path[1];
      var nav_links = $('.nav-link');
      for (var i = 0, l = nav_links.length; i < l; i++) {
        var nav_link_label = ($(nav_links[i]).text());
        if (slugify(nav_link_name) == slugify(nav_link_label)) {
          var gallery_link_name = path[2];
          var gallery_links = $(nav_links[i]).next().find('.port-link')
          for (var i = 0, l = gallery_links.length; i < l; i++) {
            var gallery_link_label = ($(gallery_links[i]).text());
            if (slugify(gallery_link_name) == slugify(gallery_link_label)) {
              showGallery($(gallery_links[i]));
              // $(gallery_links[i]).trigger('click');

            setTimeout(function() {
            if (!!media_id) {
              var media_links = $('#mygallery a');
              console.log(media_links);
              for (var j = 0, m = media_links.length; j < m; j++) {
                var thumb_id =($(media_links[j]).data('thumb-id'));
                if (thumb_id == media_id) {
                  showMedia($(media_links[j]));
                }
              }
            }
          }, 1000);

            }
          }
        }
      }
    }
    });

  }
  // If not, redirect to home landing.
  else {
    window.location = '/';
  }
};

