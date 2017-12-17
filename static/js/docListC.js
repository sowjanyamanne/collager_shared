/* globals Shared */
(function() {

  Shared.DocListC = Trillo.inherits(Shared.AppC, function(viewSpec) {
    Shared.AppC.call(this, viewSpec);
  });

  var DocListC = Shared.DocListC.prototype;
  var AppC = Shared.AppC.prototype;

  DocListC.selectedObjChanged = function(selectedObj) {
    this.setToolVisible("publish", selectedObj ? !selectedObj.published : false);
    this.setToolVisible("unPublish", selectedObj ? selectedObj.published : false);
  };

  DocListC.postViewShown = function(view) {
    if (!this.getData().length) {
      $(".js-empty-doc-instructions").removeClass("trillo-hidden");
    } else {
      $(".js-empty-doc-instructions").addClass("trillo-hidden");
    }
  };
})();