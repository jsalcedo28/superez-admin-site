var config = {
  authority: 'https://auth.getsuperez.com',
  client_id: 'js',
  redirect_uri: 'https://admin.getsuperez.com/callback.html',
  post_logout_redirect_uri: 'https://admin.getsuperez.com',
  response_type: 'id_token token',
  scope: 'openid profile',
};

var manager = new window.Oidc.UserManager(config);

window.Oidc.Log.logger = console;

manager.events.addUserSignedOut(function () {
  manager.signoutRedirect();
});

class OidcManager {
  login() {
    manager.signinRedirect();
  }

  logout() {
    manager.signoutRedirect();
  }

  getUser(callback) {
    manager.getUser().then(user => {
      if (!user) {
        this.login();
      } else {
        callback(() => {
          if (user.profile) {
            document.getElementById('username').innerText = 'Hi, ' + user.profile.name;
          }
        });
      }
    });
  }

  getCurrentUser(callback) {
    manager.getUser().then(user => {
      if (!user) {
        this.login();
      } else {
        callback(user);
      }
    });
  }
}

export default new OidcManager();
