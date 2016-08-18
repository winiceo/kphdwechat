(function(window, undefined) {
	'use strict';
	
	if (typeof window.__app === 'undefined' || window.__app === null) {
		var flag = function() {
                var pathname = window.location.pathname;
                var idx = pathname.lastIndexOf('/');
                pathname = pathname.substring(0, idx);
                idx = pathname.lastIndexOf('/');
                return pathname.substring(idx + 1);
        }();
                
		window.location = '/w/' + flag + '/index.html?' + new Date().getTime();
	}
})(window);
