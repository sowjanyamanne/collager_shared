/* globals Shared */
/* globals moment */

(function() {

  Shared.TaskLogListC = Trillo.inherits(Trillo.Controller, function(viewSpec) {
    Trillo.Controller.call(this, viewSpec);
  });

  var TaskLogListC = Shared.TaskLogListC.prototype;
  var Controller = Trillo.Controller.prototype;

  TaskLogListC.postViewShown = function(view) {
    var taskName = "";
    var selectedObj = this.getClosestSelectedObj();
    if (selectedObj) {
      taskName = selectedObj.name + ", Started at: " + moment(selectedObj.createdAt).format("M/D/YY hh:mm:ss A");
    }
    if (this.$container()) {
      $(this.$container()).find(".js-process-name").html(taskName);
    }
    Controller.postViewShown.call(this, view);
  };
})();
