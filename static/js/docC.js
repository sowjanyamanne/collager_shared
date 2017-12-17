/* globals Shared */
(function() {

  Shared.DocC = Trillo.inherits(Shared.AppC, function(viewSpec) {
    Shared.AppC.call(this, viewSpec);
    this.ARCHIVE_TITLE = "Archive?";
    this.ARCHIVE_MSG = "Do you want to archive the doc?";

    this.PUBLISH_TITLE = "Publish?";
    this.PUBLISH_MSG = "Do you want to publish the doc?";

    this.UNPUBLISH_TITLE = "Un-publish?";
    this.UNPUBLISH_MSG = "Do you want to un-publish the doc?";

    this.docListViewName = "DocList";

  });

  var DocC = Shared.DocC.prototype;
  var AppC = Shared.AppC.prototype;

  DocC.handleAction = function(actionName, selectedObj, $e, targetController) {
    if (actionName === 'editDoc') {
      this.showRTE(selectedObj);
      return true;
    } else if (actionName === 'archive') {
      this.archive(selectedObj, true);
      return true;
    } else if (actionName === 'viewDoc') {
      this.viewDoc(selectedObj);
      return true;
    } else if (actionName === 'publish') {
      this.publish(selectedObj, true);
      return true;
    } else if (actionName === 'unPublish') {
      this.publish(selectedObj, false);
      return true;
    } else if (actionName === 'titleClicked') {
      var role = this.appCtx().user.currentAppRole;
      if (role == "admin" || role == "dev") {
        return true;
      }
      this.viewDoc(selectedObj);
      return true;
    }
    return AppC.handleAction.call(this, actionName, selectedObj);
  };

  DocC.showRTE = function(selectedObj) {
    var url = "/" + this.appCtx().orgName + "/" + this.appCtx().appName + "/RTE;id=" + selectedObj.id;
    window.location.href = url;
  };

  DocC.afterPost = function(result, view) {
    this.showResult(result);
    if (result.status === "success") {
      this.refreshAllViews();
    }
  };

  DocC.archive = function(selectedObj, archiveFlag) {
    var options = {
      ok : $.proxy(this._archive, this, selectedObj, archiveFlag)
    };
    Trillo.showModal(this.ARCHIVE_TITLE, this.ARCHIVE_MSG, options);
  };

  DocC._archive = function(selectedObj, archiveFlag) {
    var data = {
      id : selectedObj.id,
      archive : archiveFlag
    };
    $.ajax({
      url : '/_service/doc/archive',
      type : 'post',
      data : JSON.stringify(data),
      contentType : "application/json"
    }).done($.proxy(this.archiveSucceeded, this));
  };

  DocC.archiveSucceeded = function(result) {
    Trillo.alert.show("Success", result.message || result.status);
  };

  DocC.publish = function(selectedObj, publishFlag) {
    var options = {
      ok : $.proxy(this._publish, this, selectedObj, publishFlag)
    };
    Trillo.showModal(publishFlag ? this.PUBLISH_TITLE : this.UNPUBLISH_TITLE, publishFlag ? this.PUBLISH_MSG
        : this.UNPUBLISH_MSG, options);
  };

  DocC._publish = function(selectedObj, publishFlag) {
    var data = {
      id : selectedObj.id,
      publish : publishFlag
    };
    $.ajax({
      url : '/_service/doc/publish',
      type : 'post',
      data : JSON.stringify(data),
      contentType : "application/json"
    }).done($.proxy(this.publishSucceeded, this, selectedObj, publishFlag));
  };

  DocC.publishSucceeded = function(selectedObj, publishFlag, result) {
    this.controllerByName(this.docListViewName).model().setObjAttr(selectedObj, "published", publishFlag);
    this.controllerByName(this.docListViewName).selectedObjChanged(selectedObj);
    Trillo.alert.show("Success", result.message || result.status);
  };

  DocC.viewDoc = function(selectedObj) {
    var url = "/" + this.appCtx().orgName + "/" + this.appCtx().appName + "/browse;id=" + selectedObj.id;
    window.location.href = url;
  };
})();