const Controller = require('./controller/Controller')

class App {
    play() {
        const controller = new Controller();
        controller.getMoney();
    }
}

const app = new App()
app.play()
module.exports = App
