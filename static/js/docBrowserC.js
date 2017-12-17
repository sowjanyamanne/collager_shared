/* globals Shared */
(function() {

  Shared.DocBrowserC = Trillo.inherits(Shared.AppC, function(viewSpec) {
    Shared.AppC.call(this, viewSpec);
  });

  var DocBrowserC = Shared.DocBrowserC.prototype;
  var AppC = Shared.AppC.prototype;

  DocBrowserC.postViewShown = function(view) {
    $.ajax({
      url : '/_service/doc/content?id=' + this.viewSpec.params.id,
      type : 'get',
      contentType : "application/json"
    }).done($.proxy(this.contentLoaded, this));
  };

  DocBrowserC.contentLoaded = function(data) {
    $('.js-doc-content-container').html(data.content);
  };
})();