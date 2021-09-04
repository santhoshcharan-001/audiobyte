$("#song-name").on("input", function (e) {
  e.preventDefault();
  $(".suggestions").addClass("active");
  if ($(".recommendations").hasClass("active")) {
    $(".recommendations").removeClass("active");
  }
  if ($(".suggestions").hasClass("hide")) {
    $(".suggestions").removeClass("hide");
  }
  $(".recommendations").addClass("hide");
  $.ajax({
    type: "GET",
    url: "/suggestions/?data=" + $("#song-name").val(),
    success: function (response) {
      $(".suggestion:not('.hide')").remove();
      //   console.log(response.results);
      x = JSON.parse(response.results)[1];
      x.forEach((element) => {
        // console.log(element[0]);
        t = $(".suggestion.hide").clone();
        t.removeClass("hide");
        t.find("h1").text(element[0]);
        $(".suggestions").append(t);
      });
    },
  });
});
$(window).on("load", function () {
  $(".loading").addClass("hide");
});
$("body").click(function () {
  // console.log("clicked");
  if ($(".recommendations").hasClass("active")) {
    $(".recommendations").removeClass("active");
  }
  if ($(".recommendations").hasClass("hide")) {
    true;
  } else {
    $(".recommendations").addClass("hide");
  }
  if ($(".suggestions").hasClass("active")) {
    $(".suggestions").removeClass("active");
  }
  if ($(".suggestions").hasClass("hide")) {
    true;
  } else {
    $(".suggestions").addClass("hide");
  }
});

$("form").submit(function (e) {
  // console.log("Form Submitted");
  $(".recommendations").addClass("active");
  if ($(".recommendations").hasClass("hide")) {
    $(".recommendations").removeClass("hide");
  }
  $(".suggestions").addClass("hide");
  if ($(".suggestions").hasClass("active")) {
    $(".suggestions").removeClass("active");
  }
  e.preventDefault();
  $.ajax({
    type: "GET",
    url: "/recommendations/?song=" + $("#song-name").val(),
    success: function (response) {
      $(".song:not('.hide')").remove();
      // console.log(response);
      response.songs.forEach((element) => {
        x = $(".song.hide").clone();
        x.removeClass("hide");
        x.attr("data-id", element.id);
        x.find(".thumbnail").find("img").attr("src", element.thumbnails[0]);
        x.find(".title").find("p").text(element.title);
        $(".recommendations").append(x);
      });
    },
  });
});
function get_recommendations(e) {
  $("#song-name").val(e.prop("innerText"));
  setTimeout(function () {
    $("form").submit();
  }, 100);
}
function set_song(e) {
  console.log(e.attr("data-id"));
  ps = e.attr("data-id");
  $.ajax({
    type: "GET",
    url: "get_song/?song_id=" + ps,
    success: function (response) {
      console.log(response);
      $("audio").attr("src", response.play_results.play_url);
      r = response.play_results.id;
      $(".thumbnail-holder")
        .find("img")
        .attr("src", "https://img.youtube.com/vi/" + r + "/maxresdefault.jpg");
      $("#high")[0].play();
    },
  });
}
$("#high").on("timeupdate", function () {
  console.log("hello");
  r = $("#high").currentTime;
  $(".controls").find("h1").text(r);
});
