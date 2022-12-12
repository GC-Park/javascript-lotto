const InputView = require("../views/InputView")
const OutputView = require("../views/OutputView")
const Game = require("../model/Game")
const MissionUtils = require('@woowacourse/mission-utils')

class Controller {

  constructor(){
    this.model = new Game();
  }

  getMoney(){
    InputView.insertMoney((answer)=>{
      this.model.setMoney(answer)
      this.lottoCount()
    })
  }

  lottoCount(){
    OutputView.lottoCountPrint(this.model.lottoPurchaseCount())
    this.purchaseLottoNumbers()
  }

  purchaseLottoNumbers(){
    const lottos = this.model.makeLottoNumber();
    lottos.map(lotto => OutputView.lottoNumberPrint(lotto))
    this.winningNumber()
  }

  winningNumber(){
    InputView.winningNumberInput((answer)=>{
        this.model.setWinningNumber(answer)
        this.bonusNumber()
    })
  }

  bonusNumber(){
    InputView.BonusNumberInput((answer)=>{
      this.model.setBonusNumber(Number(answer))
      this.announceResult();
    })
  }

  announceResult(){
    const results = this.model.putWinNumToArray()
    OutputView.winningStatistics(results)
    this.announceRateOfReturn()
  }

  announceRateOfReturn(){
    const profit = this.model.calculationOfEarnings()
    OutputView.rateOfReturnPrint(profit);
    this.end();
  }

  end(){
    MissionUtils.Console.close();
  }
}

module.exports =Controller