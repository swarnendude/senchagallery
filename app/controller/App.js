Ext.define('Gallery.controller.App',{
				extend : 'Ext.app.Controller',
				config : {
								refs : {
												main : 'main',
												thumbView : 'thumbview',
												fullView : 'fullview'
								},
				
								control : {
												thumbView : {
																itemtap : function(dataview, index, target, record){
																				var store = Ext.getStore('Photos'),
																				firstIndex = (index-4 < 0) ? 0 : (index - 4),
																				lastIndex = (store.getCount() < index + 5) ? store.getCount() : (index + 5),
																				range = store.getRange(firstIndex, lastIndex),
																				photos = [],
																				me = this;
																				
																				for(var i=0; i<range.length; i++){
																								photos.push({
																												xtype : 'container',
																												index : i + firstIndex,
																												tpl : '<div class="largeimage"><img src="http://farm{farm}.staticflickr.com/{server}/{id}_{secret}.jpg"/></div>',
																												data : range[i].getData(),
																												listeners : {
																																scope : this,
																																initialize : function(panel){
																																				panel.element.on('dragend', function(e, el){
																																								setTimeout(function(){
																																												var activePanel = me.getFullView().getActiveItem();
																																												if(panel.id !== activePanel.id){
																																																console.log('panel = ', panel.config.index, activePanel.config.index)
																																																me.loadExtraImages(e.direcction);
																																												}
																																								}, 500);
																																				});
																																}
																												}
																								});
																				}
																				
																				this.getMain().add({
																								title : record.get('title'),
																								xtype : 'fullview'
																				});
																				
																				this.getFullView().add(photos);																				
																				this.getFullView().setActiveItem(index - firstIndex);
																}
												}
								},
								
								loadExtraImages : function(){
												
								}
				}
});