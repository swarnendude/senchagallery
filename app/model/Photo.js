Ext.define('Gallery.model.Photo', {
				extend : 'Ext.data.Model',
				config : {
								fields : [
								"id","owner","secret","server","farm","title","ispublic","isfriend","isfamily"
								]
				}
});

