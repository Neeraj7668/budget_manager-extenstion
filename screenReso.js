$(function () {
  $("#getResolution").click(function () {
    $("#resolution").text(
      "Your screen resolution is: " + screen.width + "x" + screen.height
    );
  });
});
