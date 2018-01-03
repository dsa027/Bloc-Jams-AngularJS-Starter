(function() {
  function seekBar($document) {
    const calculatePercent = function(seekBar, event) {
      let offsetX = event.pageX - seekBar.offset().left
      let seekBarWidth = seekBar.width()
      let offsetXPercent = offsetX / seekBarWidth
      offsetXPercent = Math.max(0, offsetXPercent)
      offsetXPercent = Math.min(1, offsetXPercent)
      return offsetXPercent
    }
    return {
      templateUrl: '/templates/directives/seek_bar.html',
      replace: true,
      restrict: 'E',
      scope: { },
      link: function(scope, element, attributes) {
        scope.value = 0;
        scope.max = 100;

        var seekBar = $(element)

        var percentString = function () {
            return (scope.value / scope.max * 100) + "%"
        };

        scope.fillStyle = function() {
          return {width: percentString()}
        }

        scope.thumbStyle = function() {
          return {left: percentString()}
        }

        scope.onClickSeekBar = function(event) {
          let percent = calculatePercent(seekBar, event)
          scope.value = percent * scope.max
        }

        scope.trackThumb = function() {
          $document.bind('mousemove.thumb', function(event) {
            const percent = calculatePercent(seekBar, event)
            scope.$apply(function() {
              scope.value = percent * scope.max
            })
          })

          $document.bind('mouseup.thumb', function() {
            $document.unbind('mousemove.thumb')
            $document.unbind('mouseup.thumb')
          })
        }
      }
    }
  }

  angular
    .module('blocJams')
    .directive('seekBar', ['$document', seekBar]);

 })();