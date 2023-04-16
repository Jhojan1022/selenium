const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const fs = require('fs');

const dta = []
const ids = [
   '132',
   '062',
   '061',
   '197'
]

async function example() {
    let options = new chrome.Options();
    options.headless();
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    try {
        for (let index = 0; index < ids.length; index++) {
            await driver.get('https://siafp.heinsohn.com.co/wikisiafp/index.php/Novedad_132:_Pago_de_no_vinculados');
            await driver.findElement(By.id('searchInput')).sendKeys(ids[index], Key.RETURN);
            await driver.findElements(By.css('.searchresult')).then(function (elements) {
                try {
                    return elements[0].getText();
                } catch (e) {
                    console.log('Elemento no encontrado')
                    return 'Elemento no encontrado';
                }
            }).then(function (text) {
                dta.push(text)
            });
            await driver.manage().deleteCookie('cookie_name');
            console.log(ids[index])
        }
    } finally {
        await driver.quit();
    }
    console.log(dta)
    fs.writeFile('datos.txt', '', (err) => {
        if (err) throw err;
        console.log('El archivo ha sido creado exitosamente!');
    });

    for (let index = 0; index < dta.length; index++) {
        fs.appendFile('datos.txt', dta[index] + ";", (err) => {
            if (err) throw err;
            console.log('El archivo ha sido actualizado!');
        });
    }
    console.log('Cantidad de registros: ' + dta.length)
}

example()
