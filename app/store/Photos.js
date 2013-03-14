Ext.define('Gallery.store.Photos', {
				extend : 'Ext.data.Store',
				requires : ['Ext.data.proxy.JsonP'],
				config : {
								model : 'Gallery.model.Photo',
								autoLoad : true,
								proxy : {
												type : 'jsonp',
												url : 'http://api.flickr.com/services/rest/',
												method : 'GET',
												callbackKey : 'jsoncallback',
												extraParams : {
																method : 'flickr.interestingness.getList',
																format : 'json',
																api_key : 'f31fb5026b883de1cef583b4e7a9a183'
												},
												reader : {
																type : 'json',
																rootProperty : 'photos.photo'
												}
								}
				}
});


