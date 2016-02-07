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

function setVideo(video_url) {
  $('iframe').attr('src', video_url);
};

$('#montage').click(function(){
  $('.playback-view').removeClass('hidden');
  setVideo('https://player.vimeo.com/video/101964162?portrait=0&title=0&badge=0&byline=0&color=ff6200');
});

$('#selected-work').click(function(){
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
  $('.contact-view').removeClass('hidden');
});

$('.contact-close-button').click(function(){
  $('.contact-view').addClass('hidden');
});

$('.video-close-button').click(function(){
  clearVideo();
  $('.playback-view').addClass('hidden');
});

$('.selected-work a').click(function(){
  $('.playback-view').removeClass('hidden');
  setVideo('https://player.vimeo.com/video/101964162?portrait=0&title=0&badge=0&byline=0&color=ff6200');
});
