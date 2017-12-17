/* globals Shared */
(function() {

  Shared.FileListC = Trillo.inherits(Trillo.Controller, function(viewSpec) {
    Trillo.Controller.call(this, viewSpec);
  });

  var FileListC = Shared.FileListC.prototype;
  var Controller = Trillo.Controller.prototype;

  FileListC.postViewShown = function(view) {
    this.showView(this.getFileUploadSpec());
  };

  FileListC.updateApiSpec = function(apiSpec) {
    apiSpec.serviceUrl = "/_filelist/" + this.appCtx().orgName + "/" + this.appCtx().appName + "/img";
  };

  FileListC.getFileUploadSpec = function() {
    return {
      name : "FileUpload",
      type : Trillo.ViewType.Default,
      elementSelector : ".js-file-upload",
      controller : "Trillo.FileUploadC",
      data : {
        fileName : "a"
      },
      params : {
        targetViewName : this.viewSpec.name,
        folder : this.appCtx().orgName + "/" + this.appCtx().appName + "/img",
        uploadUrl : "/_file/upload",
        className : "FileM"
      }
    };
  };

  FileListC.fileUploadSuccessful = function(data, requestPending) {
    this.fileSelected(data);
  };

  FileListC.handleAction = function(actionName, selectedObj, $e, targetController) {
    if (actionName === 'selectionOk') {
      this.fileSelected(selectedObj);
      return true;
    }
    return Controller.handleAction.call(this, actionName, selectedObj);
  };

  FileListC.fileSelected = function(data) {
    if (this.view().isDialog()) {
      this.close();
    }
    if (this.viewSpec.options && this.viewSpec.options.callback) {
      this.viewSpec.options.callback(data);
    } else {
      var pc = this.parentController();
      if (pc && pc.fileSelected) {
        pc.fileSelected(data);
      }
    }
  };
})();