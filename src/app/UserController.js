function UserController(userService, $mdSidenav, $mdBottomSheet, $log) {
  var self = this;

  self.selected = null;
  self.users = [];
  self.selectUser = selectUser;
  self.share = share;
  self.toggleUserList = toggleUserList;

  // Load all registered users

  userService
    .loadAllUsers()
    .then(function(users) {
      self.users = [].concat(users);
      self.selected = users[0];
    });


  function toggleUserList() {
    $mdSidenav('left').toggle();
  }

  /**
   * Select the current avatars
   * @param menuId
   */
  function selectUser(user) {
    self.selected = user;
  }

  function share(selectedUser) {
    $mdBottomSheet.show({
      controller: ['$mdBottomSheet', UserSheetController],
      controllerAs: "userSheetCtrl",
      templateUrl: 'views/bottomsheet.html',
      parent: angular.element(document.querySelector('#content'))
    });

    var appRoot = 'https://rawgit.com/angular/material-start/es5-tutorial/app/';

    function UserSheetController($mdBottomSheet) {
      var rootURL = appRoot + "assets/svg/";

      this.user = selectedUser;
      this.items = [
        {
          name: 'Phone',
          icon: 'phone',
          icon_url: rootURL + 'phone.svg'
        },
        {
          name: 'Twitter',
          icon: 'twitter',
          icon_url: rootURL + 'twitter.svg'
        },
        {
          name: 'Google+',
          icon: 'google_plus',
          icon_url: rootURL + 'google_plus.svg'
        },
        {
          name: 'Hangout',
          icon: 'hangouts',
          icon_url: rootURL + 'hangouts.svg'
        }
        ];

      this.performAction = function(action) {
        $mdBottomSheet.hide(action);
      }
    }
  }

}