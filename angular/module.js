var myApp = angular.module("MyApp", []);

myApp.controller("TestCtrl", ["$scope", ($scope) => {
  $scope.templateName = "page1"
  $scope.svgIcons = "assets/svg/svg.html"
  $scope.changePage = (templateName) => {
    $scope.templateName = templateName;
  }
}])

var name = "xiTooltip"
myApp.directive(name, function () {
  return {
    scope: false,
    restrict: "A",
    link: function (scope, element, attributes) {
      var unbindWatcher =
        scope.$watch(attributes[name], function (newValue) {

          element.tooltip({
            content: newValue,
            trigger: "hover",
          });
          isInstantiated = true;
        });

        // Tear down
        element.on("$destroy", function () {
          var tooltipData = element.data("tooltip");
          if (isInstantiated && tooltipData) {
            tooltipData.destroy();
          }
          unbindWatcher();
        });
    }
  }
});