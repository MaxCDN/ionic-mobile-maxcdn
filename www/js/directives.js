'use strict';

angular.module('monitor.directives', []).directive('ellipsis', function() {
    return {
        restrict: 'A',
        scope: {
            text: '@ellipsisText'
        },
        link: function(scope, element) {
            $(element).text(scope.text).ellipsis({visible: 2, more: '…', separator: '/', atFront: true});
        }
    };
});
