'use strict';

angular.module('monitor.directives', []).directive('ellipsis', function() {
    return {
        restrict: 'A',
        scope: {
            text: '@ellipsisText'
        },
        link: function(scope, element) {
            var text = scope.text;
            var parts = scope.text.split('/');

            if(parts.length > 2) {
                text = '…' + parts.slice(-2).join('/');
            }

            element.text(text);
        }
    };
});
