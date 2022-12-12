const MissionUtils = require('@woowacourse/mission-utils')
const {
  INPUT_MONEY,
  INPUT_WINNING_NUMBER,
  INPUT_BONUS_NUMBER,
} = require('../utils/constants')

const InputView = {

  insertMoney(getMoney) {
    MissionUtils.Console.readLine(INPUT_MONEY, (answer) => {
        getMoney(answer)
    })
  },

  winningNumberInput(winningNumber) {
    MissionUtils.Console.readLine(INPUT_WINNING_NUMBER, (answer) => {
      winningNumber(answer)
    })
  },

  BonusNumberInput(bonusNumber) {
    MissionUtils.Console.readLine(INPUT_BONUS_NUMBER, (answer) => {
      bonusNumber(answer)
    })
  },

}

module.exports = InputView