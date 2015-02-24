angular.module('mover', ['rx']);

angular.module('mover').directive('movingText', function() {
    return {
        restrict: 'E',
        replace: 'true',
        templateUrl: '/js/movingText.html',
        scope: {
            text: '@'
        },
        controller: function($scope, rx, $element, $window, $document) {

            var textContainer = $element.find('.text-container')[0];

            function getOffset(element) {
              var doc = element.ownerDocument,
                  docElem = doc.documentElement,
                  body = doc.body,
                  clientTop  = docElem.clientTop  || body.clientTop  || 0,
                  clientLeft = docElem.clientLeft || body.clientLeft || 0,
                  scrollTop  = $window.pageYOffset,
                  scrollLeft = $window.pageXOffset;

              return {
                top: scrollTop   - clientTop,
                left: scrollLeft - clientLeft };
            }

            var mouseMoved = rx.Observable.fromEvent($document, 'mousemove')
                .map(function (e) {
                    var offset = getOffset(textContainer);
                    return {
                      offsetX : e.clientX - offset.left,
                      offsetY : e.clientY - offset.top
                    };
                  });



            $scope.letters = [];
            angular.forEach($scope.text, function(letter, index) {
                var letterConfig = {
                    text: letter,
                    top: 0,
                    left: 0
                };
                $scope.letters.push(letterConfig);
                console.log('Subscribing', letter, index);
                mouseMoved
                    .delay(100 * index)
                    .subscribe(function(pos) {
                        $scope.$apply(function() {
                            letterConfig.top = pos.offsetY;
                            letterConfig.left = pos.offsetX + index * 20 + 15;
                        });
                    });


            });

        }

    };
});
angular.module('mover').controller('MainCtrl',
    function(rx, $scope) {





});

