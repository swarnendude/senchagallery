Ext.define('Gallery.view.FullView', {
				extend: 'Ext.Carousel',
				xtype: 'fullview',
				requires : ['Ext.TitleBar'],
				config: {
								cls : 'texturebg',
								items : [{
												xtype : 'titlebar',
												docked : 'bottom'
								}]								
				}
});
