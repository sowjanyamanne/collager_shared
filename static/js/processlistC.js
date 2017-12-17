/* globals Shared */

(function() {

  Shared.ProcessListC = Trillo.inherits(Trillo.Controller, function(viewSpec) {
    Trillo.Controller.call(this, viewSpec);
  });

  var ProcessListC = Shared.ProcessListC.prototype;
  var Controller = Trillo.Controller.prototype;

  ProcessListC.handleAction = function(actionName, selectedObj) {
    if (actionName === "showLogs" || actionName === "detail") {
      this.showView({
        name : "ProcessLogList",
        type : Trillo.ViewType.Collection,
        container : 'trillo-scroll-dialog-container',
        virtual : false,
        apiSpec : {
          impl : "Trillo.PaginationAdapter",
          cls : "ProcessLog",
          filter : "parent=" + selectedObj.id,
          orderBy : "id"
        },
        observeChanges : true,
        newItemsAtEnd : true
      });
      return true;
    }
    return Controller.handleAction.call(this, actionName, selectedObj);
  };
})();