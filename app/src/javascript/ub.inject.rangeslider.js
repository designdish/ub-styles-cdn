  var injectSlider = function() {

      var min, max;
      var NYOPInput = document.getElementById('nyop-7eaaeb92-f486-4996-adff-448c9b276b0c');
      var slider = $(NYOPInput).data("ionRangeSlider");

      min = 100;
      max = 400;

      $(NYOPInput).ionRangeSlider({
          type: "double",
          grid: true,
          min: min,
          max: max,
          prefix: "$",
          force_edges: true
      });
  };

  window.onload = function() {
      injectSlider();
  };