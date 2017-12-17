/* globals Shared */
/* globals moment */

(function() {
  Shared.ProcessLogListC = Trillo.inherits(Trillo.Controller, function(viewSpec) {
    Trillo.Controller.call(this, viewSpec);
  });

  var ProcessLogListC = Shared.ProcessLogListC.prototype;
  var Controller = Trillo.Controller.prototype;

  ProcessLogListC.postViewShown = function(view) {
    var processName = "";
    var selectedObj = this.getClosestSelectedObj();
    if (selectedObj) {
      processName = selectedObj.name + ", Started at: " + moment(selectedObj.createdAt).format("M/D/YY hh:mm:ss A");
    }
    if (this.$container()) {
      $(this.$container()).find(".js-process-name").html(processName);
    }
    Controller.postViewShown.call(this, view);
  };
})();
