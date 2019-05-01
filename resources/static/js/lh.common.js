/**
 * LafargeHolcim javascript library for common utilities.
 * 
 * Version: 1.0
 * 
 * @author John Zhang
 */
(function(root, factory) {
	'use strict';

	if ( typeof define === 'function' && define.amd && define.amd.jQuery ) {
		// AMDJS module definition
		define(['jquery', 'url'], function($, url) {
			return factory($, url, root);
		});
	} 
	else if ( typeof exports === 'object') {
		// CommonJS module definition
		module.exports = factory;
	} 
	else {
		// Global objects in web browser
		return factory(root.jQuery || root.$, url, root);
	}
}(this, function($, url, window) {
	'use strict';

    var commonUtils = {
    		config: {}
    
    		, countryCurrencyMap: {
    			'US' : 'USD'
        		, 'CA' : 'CAD'
    		}

    		, init: function(cfg){
    	        self.config = cfg || {}
    	        self.config.messageSource = self.config.messageSource || {}
    		}
    
		    , getMessage: function(key, defaultValue){
		    	var value = self.config.messageSource[key];
		    	return value ? value : defaultValue;
			}

		    , changeLanguageAlert: function(){
		    	if ( self.config.switchLanguageNotSupported ){
		    		self.config.switchLanguageNotSupported()
		    	}
		    	else{
		    		alert(this.getMessage('common.language.switch.not.supported', 'The current page does not support language switch.  Please switch language later.'))
		    	}
			}
		    
    		, changeLanguage: function(language){
    			var currentLang = url('?language')
    			var uri
    			if ( currentLang ){
    				if ( currentLang != language ){
    	    			var method = $("meta[name='_requestMethod']").attr("content")
    	    			if ( method != 'GET' ){
    	    				this.changeLanguageAlert();
    	    				return
    	    			}
    					uri = url().replace('language=' + currentLang, 'language=' + language)
    					self.location = uri
    				}
    			}
    			else{
        			var method = $("meta[name='_requestMethod']").attr("content")
        			if ( method != 'GET' ){
	    				this.changeLanguageAlert();
        				return
        			}

        			uri = url()
    				if ( uri.includes('?') ){
    					uri = uri.replace('?', '?language=' + language + '&')
    				}
    				else if ( uri.includes('#') ){
    					uri = uri.replace('#', '?language=' + language + '#')
    				}
    				else{
    					uri += '?language=' + language
    				}
    				self.location = uri
    			}
    		} // changeLanguage
    		
    		, stringify: function (o) {
    			var cache = []
    			var s = JSON.stringify(o, function(key, value) {
    			    if (typeof value === 'object' && value !== null) {
    			        if (cache.indexOf(value) !== -1) {
    			            // Circular reference found, discard key
    			            return
    			        }
    			        // Store value in our collection
    			        cache.push(value)
    			    }
    			    return value
    			}, 4)
    			cache = null
    			return s
    		}
    		
    		, lpad : function (number, width, padWith) {
    			width -= number.toString().length;
    			return ( width > 0 ? new Array(width+1).join(padWith) : '' ) + number
    		}
    		
    		, disableEnter : function() {
            	$(window).keydown(function(event){
            	    if(event.keyCode == 13) {
            	      event.preventDefault();
            	      return false;
            	    }
            	  })
    		}
    		
    		, getCurrency : function (country) {
    			return this.countryCurrencyMap[country]
    		}
    		
    		, formatCurrency : function (amount, locale, currency) {
    			return parseFloat(amount).toLocaleString(locale, { 'style': 'currency', 'currency': currency })
    		}

    		, formatNumber : function (amount, locale, fraction) {
    			return parseFloat(amount).toLocaleString(locale, { style: 'decimal', maximumFractionDigits: fraction, minimumFractionDigits: fraction })
    		}

    		, resetForm: function (form) {
    		    form.find('input:text, input:password, input:file, select, textarea').val('')
    		    form.find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected')
    		}
    		
    		, enableButtons: function (container) {
    		    container.find('input[type="submit"], input[type="button"], button').each(function(){
        			$(this).removeAttr("disabled")
        		})
    		}
    		
    		, disableButtons: function (container) {
    		    container.find('input[type="submit"], input[type="button"], button').each(function(){
        			$(this).attr("disabled", "disabled")
        		})
    		}
    		
    		, escapeHtml: function(data) {
    			return $("<div>").text(data).html()
    		}
    	}
    
    window.lh = window.lh || {}
    
    window.lh.commonUtils = window.lh.commonUtils || commonUtils
    
	return window.lh.commonUtils;
}));
