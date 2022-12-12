const { validateLotto } = require('../functionValidation')

class Lotto {
    #numbers

    constructor(numbers) {
        validateLotto(numbers)
        this.#numbers = numbers
    }

    getLottoSortedNumbers(){
        const sorted = this.lottoNumberSort(this.#numbers)
        return sorted
    }

    lottoNumberSort(numbers) {
        function compareNumbers(a, b) {
            return a - b
        }

        return numbers.sort(compareNumbers)
    }
    // TODO: 추가 기능 구현
}

module.exports = Lotto
