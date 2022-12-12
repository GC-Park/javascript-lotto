const Lotto = require('./Lotto')
const {
  validateBonus,
  validateMoney,
  validateWinningNumber,
} = require('../functionValidation')
const MissionUtils = require('@woowacourse/mission-utils')

class Game {
  #money
  #lottoCount
  #userLottoNumbers
  #winningNumbers
  #bonusNumber
  #rank
  #prizeMoney
  #rateOfReturn

  constructor() {
    this.#money = 0
    this.#lottoCount = 0
    this.#userLottoNumbers = []
    this.#winningNumbers = []
    this.#rank = [0, 0, 0, 0, 0]
    this.#prizeMoney = [2000000000, 1500000, 50000, 5000, 30000000]
    this.#rateOfReturn = 0
  }

  setMoney(moneyStr){
    validateMoney(moneyStr)
    const money = moneyStr
    this.#money=money
  }

  setWinningNumber(winningNumberStr){
    validateWinningNumber(winningNumberStr)
    const winningNumber = winningNumberStr.split(',')
    this.#winningNumbers = winningNumber
  }

  setBonusNumber(bonusNumberStr){
    validateBonus(this.#winningNumbers, bonusNumberStr)
    const bonusNumber = bonusNumberStr
    this.#bonusNumber = bonusNumber
  }

  lottoPurchaseCount() {
    return this.#money / 1000
  }

  makeLottoNumber() {
    for (
        let luckyNumber = 0;
        luckyNumber < this.lottoPurchaseCount();
        luckyNumber++
    ) {
        const numbers = new Lotto(
            MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6)
        )
        
        this.#userLottoNumbers.push(numbers)
    }
    return this.#userLottoNumbers.map(lotto => lotto.getLottoSortedNumbers())
  }

  winningCount(order) {
    return this.#userLottoNumbers[order].getLottoSortedNumbers().filter((lotto) =>
        this.#winningNumbers.includes(String(lotto))
    ).length
  }

  putWinNumToArray() {
    for (let win = 0; win < this.#userLottoNumbers.length; win++) {
        if (
            this.winningCount(win) === 5 &&
            this.#userLottoNumbers.includes(this.#bonusNumber)
        )
            this.#rank[4] += 1
        if (this.winningCount(win) > 2)
            this.#rank[6 - this.winningCount(win)] += 1
    }
    return this.#rank
  }

  calculationOfEarnings() {
    for (
        let calculNumber = 0;
        calculNumber < this.#rank.length;
        calculNumber++
    ) {
        this.#rateOfReturn +=
            this.#rank[calculNumber] * this.#prizeMoney[calculNumber]
    }
    this.#rateOfReturn = (this.#rateOfReturn / this.#money) * 100
    return this.#rateOfReturn
  }

}

module.exports = Game