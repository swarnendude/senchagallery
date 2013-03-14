Ext.define('Gallery.view.Main', {
				extend: 'Ext.NavigationView',
				xtype: 'main',
				config: {
								items : [{
												xtype : 'thumbview',
												title : 'Home'
								}]
				}
});
