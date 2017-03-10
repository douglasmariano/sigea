exports.config = {
  specs: ['../test/e2e/**/*.js'],
  onPrepare: function() {
    browser.driver.get('http://localhost:3000');
    browser.driver.findElement(by.id('entrar')).click();
    browser.driver.findElement(by.id('login_field'))
    .sendKeys('douglasmariano.com@gmail.commit');
    browser.driver.findElement(by.id('password'))
    .sendKeys('d3512487960');
    browser.driver.findElement(by.name('commit')).click();
  }

};
