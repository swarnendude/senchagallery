Ext.define('Gallery.controller.App',{
				extend : 'Ext.app.Controller',
				numberOfImagesToShow : 10,
				config : {
								refs : {
												main : 'main',
												thumbView : 'thumbview',
												fullView : 'fullview'
								},
				
								control : {
												thumbView : {
																itemtap : function(dataview, index, target, record){
																				var 	me = this,
																				store = Ext.getStore('Photos'),
																				firstIndex = ((index - (me.offsetIndex - 1)) < 0) ? 0 : (index - (index - (me.offsetIndex - 1))),
																				lastIndex = 	(firstIndex < me.offsetIndex) ? (me.numberOfImagesToShow + firstIndex - 1) : ((store.getCount() < index + me.offsetIndex) ? store.getCount() : (index + me.offsetIndex)),
																				range = store.getRange(firstIndex, lastIndex),
																				photos = [];
																				
																				console.log('firstIndex = ', firstIndex, lastIndex)
																				
																				me.firstIndex = firstIndex;
																				me.lastIndex = lastIndex;
																				
																				for(var i=0; i<range.length; i++){
																								photos.push(me.getImageContainer(i + firstIndex, range[i]));
																				}
																				
																				this.getMain().push({
																								title : record.get('title'),
																								xtype : 'fullview'
																				});
																				this.getFullView().removeAll();
																				
																				this.getFullView().add(photos);																				
																				this.getFullView().setActiveItem(index - firstIndex);
																}
												},
												
												'container[name="image_container"]': {
																initialize : function(panel){
																				var me = this;
																				
																				panel.element.on('dragend', function(e, el){
																								setTimeout(function(){
																												var activePanel = me.getFullView().getActiveItem();
																												if(panel.id !== activePanel.id){
																																//																																																console.log('panel = ', panel.config.index, activePanel.config.index)
																																me.loadExtraImages(panel.config.index < activePanel.config.index, activePanel, panel);
																												}
																								}, 500);
																				});
																}
												}
								}
				},
				
				launch : function(){
								this.offsetIndex = parseInt(this.numberOfImagesToShow / 2);
				},
				
				getImageContainer : function(index, record){
								if(record){
												return {
																xtype : 'container',
																index : index,
																name : 'image_container',
																tpl : '<div class="largeimage"><img src="http://farm{farm}.staticflickr.com/{server}/{id}_{secret}.jpg"/></div>',
																data : record.getData()
												}
								}
								
								return [];
				},
								
				loadExtraImages : function(addToRight, activePanel, previousPanel){
								var me = this,
								activeIndex = activePanel.config.index,
								advanceIndex = addToRight ? (activeIndex + me.offsetIndex) : (activeIndex - me.offsetIndex),
								panels = me.getFullView().query('container[index="' + advanceIndex + '"]'),
								store = Ext.getStore('Photos');
								
								if(advanceIndex >= 0 && panels.length === 0){
												if(advanceIndex > activeIndex){
																me.getFullView().remove(me.getFullView().query('container[index="' + me.firstIndex + '"]')[0]);
																me.firstIndex += 1;
																me.lastIndex += 1;
																me.getFullView().add(me.getImageContainer(advanceIndex, store.getAt(advanceIndex)));
												}else{
																if(me.firstIndex >= 0){
																				me.getFullView().remove(me.getFullView().query('container[index="' + me.lastIndex + '"]')[0]);
																				me.firstIndex -= 1;
																				me.lastIndex -= 1;
																				
																				console.log('advanceIndex = ', advanceIndex)
																				
																				me.getFullView().insert(0, me.getImageContainer(advanceIndex, store.getAt(advanceIndex)));
																}
												}
								}
				}
});