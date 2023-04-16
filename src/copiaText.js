const {webdriver, Key, until } = require('selenium-webdriver');
const By = webdriver.By;

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get('https://siafp.heinsohn.com.co/wikisiafp/index.php/Novedad_132:_Pago_de_no_vinculados');


(async function example() {
    try {
        await driver.findElement(By.id('searchInput')).sendKeys('132', Key.RETURN);
    } finally {
        await driver.quit();
    }
})();


/*// Esperar a que el div aparezca en la página
driver.wait(webdriver.until.elementLocated(By.id('div-id')));

// Obtener el contenido del div
driver.findElement(By.id('div-id')).getText().then(function(text) {
    console.log(text);
});

driver.quit();*/
