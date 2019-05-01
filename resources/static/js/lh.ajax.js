/**
 * LafargeHolcim javascript library for ajax utilities.
 * 
 * Version: 1.0
 * 
 * @author John Zhang
 */
(function(root, factory) {
	'use strict';

	if ( typeof define === 'function' && define.amd && define.amd.jQuery ) {
		// AMDJS module definition
		define(['jquery'], function($) {
			return factory($, root);
		});
	} 
	else if ( typeof exports === 'object') {
		// CommonJS module definition
		module.exports = factory;
	} 
	else {
		// Global jQuery in web browsers
		return factory(root.jQuery || root.$, root);
	}
}(this, function($, window) {
	'use strict';

    var ajaxUtils = {
    		config: {}

    		, init: function(cfg){
    	        self.config = cfg || {}
    	        self.config.messageSource = self.config.messageSource || {}
    		}
    
		    , getMessage: function(key, defaultValue){
		    	var value = self.config.messageSource[key];
		    	return value ? value : defaultValue;
			}
		    
    		, collectDatatablesCriterion: function(table, selector, columnIndex){
    			var filter = '';

    			$(selector).each(function() {
    				filter += $.trim($(this).val()) + "+";
    			});

    			if ( filter.length > 0 ){
    				filter = filter.substring(0, filter.length - 1);
    			}

    			table.columns(columnIndex).search(filter);

    			return /\S/.test(filter) ? 1 : 0;
    		} // collectDatatablesCriterion
    		
    		, extractSuccessMsg: function (responseObject) {
    			// console.log('Success response: ' + $.ajaxUtils.stringify(responseObject))
    			var s = ''

    			if ( responseObject.info ){
    				s += responseObject.info + "<br/>"
    			}
    			
    			if ( responseObject.warn ){
    				s += "Warning: " + responseObject.warn
    			}

    			if ( s == '' ){
    				// console.log("response: " + $.ajaxUtils.stringify(responseObject))
    				s = 'Your request has been completed'
    			}

    			return s
    		} // extractSuccessMsg
    		
    		, createErrorMsg: function (errorCode, defaultErrorMsg) {
    			return "<span style='color:red'>" + this.getMessage('common.error.prompt', 'An error occurred') + ":<br/>"
    			 	+ this.getMessage(errorCode, defaultErrorMsg) + "</span>"
					// s += "Error code   : " + responseObject.errorCode + "<br/>"
					// s += ( responseObject.error ? responseObject.error : "" ) + "</span>"
					// s += "Stacktrace: " + responseObject.stacktrace
					// s = s.replace(/\r/g, "")    			 	
    		}
    		
    		, extractErrorText: function (xhr) {
    			if ( xhr.responseJSON && ( xhr.responseJSON.status == 405 || xhr.responseJSON.status == 403 ) ){
    				// 405: Method Not Allowed.  403: Forbidden
    				location.reload(true)
    			}
    			else if ( this.isLoginPage(xhr.responseText) ){
    				location.reload(true) 
    			}    			
    			else{
    				var msg = xhr.responseJSON ? xhr.responseJSON.error : null

    				if ( ! msg ){
    					msg = this.getMessage('common.error.system.error', 'An error occurred in processing your request. Please try again later.')
    				}
    				
    				if ( xhr.responseJSON.errorId ){
    					msg += "  Error id: " + xhr.responseJSON.errorId
    				}
    				
    				return msg
    			}
    		}
    		
    		, extractErrorMsg: function (xhr) {
    			// console.log('arguments: ' + lh.commonUtils.stringify(arguments))
    			var s
    			
    			if ( xhr.responseJSON ){
    				// console.log('Error response: ' + $.ajaxUtils.stringify(xhr.responseJSON))
    				var responseObject = xhr.responseJSON
    				if ( responseObject.errorCode ){
    					s = this.createErrorMsg(responseObject.errorCode, responseObject.error)
    				}
    				else if ( responseObject.status ){
    					if ( responseObject.status == 403 || responseObject.status == 405 ){
    						s = this.createErrorMsg('common.error.status.code.' + responseObject.status, "You don't have permission to the specific function")
    					}
    				}
    			}
    			else if ( xhr.status ){
    				// after defining custom error page, it comes here
    				if ( xhr.status == 403 || xhr.status == 405 ){
						s = this.createErrorMsg('common.error.status.code.' + xhr.status, "You don't have permission to the specific function")
					}
    			}
    			
    			if ( ! s ){
    				this.handleAjaxError(xhr)
    			}
    			
    			return s
    		} // extractErrorMsg

    		, handleAjaxError: function(xhr, textStatus, errorThrown){
    			if ( xhr.responseJSON && ( xhr.responseJSON.status == 405 || xhr.responseJSON.status == 403 ) ){
    				// 405: Method Not Allowed.  403: Forbidden
    				location.reload(true)
    			}
    			else if ( this.isLoginPage(xhr.responseText) ){
    				location.reload(true) 
    			}
    			else{
    				alert(xhr.responseText)
    			}
    		} // handleAjaxError 	
    		
    		, isLoginPage: function(responseText){
    			return responseText && ( 
    					/.*<meta.*name="_pageName".*content="login".*/.test(responseText) 
    					|| /.*<form.*id="formLogin".*action=".*login".*/.test(responseText) )
    		}
    	}

    
    window.lh = window.lh || {}
    
    window.lh.ajaxUtils = window.lh.ajaxUtils || ajaxUtils
    
	return window.lh.ajaxUtils;
}));
