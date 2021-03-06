var CustomListView = require('../../../../../../custom-list/custom-list-view');

module.exports = CustomListView.extend({
  _renderItem: function (model, index) {
    var ItemViewClass = this.options.itemView;
    var imageEnabled = this.options.imageEnabled && index < this.options.maxValues; // Disable image for the last item ("Others")

    var itemView = new ItemViewClass({
      model: model,
      typeLabel: this.options.typeLabel,
      template: this.options.itemTemplate,
      imageEnabled: imageEnabled
    });
    this.$('.js-list').append(itemView.render().el);
    this.addView(itemView);

    // 'customEvent' comes from custom list component
    itemView.bind('customEvent', function (eventName, item) {
      this.trigger('customEvent', eventName, item, this);
    }, this);
  }
});
