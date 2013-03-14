Ext.define('Gallery.view.ThumbView', {
    extend: 'Ext.DataView',
    xtype: 'thumbview',
    config: {
								cls : 'thumbview texturebg',
								store : 'Photos',
								itemTpl : '<img src="http://farm{farm}.staticflickr.com/{server}/{id}_{secret}_s.jpg" class="thumb"/>'
    }
});
