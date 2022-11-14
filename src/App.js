const MissionUtils = require('@woowacourse/mission-utils')
const Lotto = require('./Lotto')
const View = require('./views/view.js')
const {
    INPUT_MONEY,
    INPUT_WINNING_NUMBER,
    INPUT_BONUS_NUMBER,
  } = require("./constants");
class App {
    money
    lottoCount
    userLottoNumbers
    winningNumbers
    bonusNumber
    rank
    prizeMoney
    rateOfReturn

    constructor() {
        this.money = 0
        this.lottoCount = 0
        this.userLottoNumbers = []
        this.winningNumbers = []
        this.rank = [0, 0, 0, 0, 0]
        this.prizeMoney = [2000000000, 1500000, 50000, 5000, 30000000]
        this.rateOfReturn = 0
        this.view = new View()
    }

    play() {
        this.insertMoney()
    }

    insertMoney() {
        MissionUtils.Console.readLine(INPUT_MONEY, (answer) => {
            this.money = answer
            this.lottoCount = this.lottoPurchaseCount(this.money)
            this.view.lottoCountPrint(this.lottoCount)
            this.makeLottoNumber()
        })
    }

    lottoPurchaseCount(money) {
        return money / 1000
    }

    makeLottoNumber() {
        for (let i = 0; i < this.lottoCount; i++) {
            const numbers = new Lotto(
                MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6)
            )
            this.view.lottoNumberPrint(numbers.getNumbers())
            this.userLottoNumbers.push(numbers.getNumbers())
        }
        this.winningNumberInput()
    }

    winningNumberInput() {
        MissionUtils.Console.readLine(INPUT_WINNING_NUMBER, (answer) => {
            this.winningNumbers = answer.split(',')
            this.BonusNumberInput()
        })
    }

    BonusNumberInput() {
        MissionUtils.Console.readLine(INPUT_BONUS_NUMBER, (answer) => {
            this.bonusNumber = Number(answer)
            this.putWinNumToArray()
        })
    }

    winningCount(order) {
        return this.userLottoNumbers[order].filter((lotto) =>
            this.winningNumbers.includes(String(lotto))
        ).length
    }

    putWinNumToArray() {
        for (let i = 0; i < this.userLottoNumbers.length; i++) {
            if (
                this.winningCount(i) === 5 &&
                this.userLottoNumbers.includes(this.bonusNumber)
            )
                this.rank[4] += 1
            if (this.winningCount(i) > 2)
                this.rank[6 - this.winningCount(i)] += 1
        }
        this.calculationOfEarnings()
    }

    calculationOfEarnings() {
        for (let i = 0; i < this.rank.length; i++) {
            this.rateOfReturn += this.rank[i] * this.prizeMoney[i]
        }
        this.rateOfReturn = (this.rateOfReturn / this.money) * 100
        this.view.winningStatistics(this.rank, this.rateOfReturn)
    }
}

const app = new App()
app.play()
module.exports = App
