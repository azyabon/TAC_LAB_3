export default function calcDisagreementIndex(criteriaEvaluationTable: number[][],
                                           indexX: number, indexY: number,) {
    const indexes: number[] = []

    criteriaEvaluationTable.forEach((elem, index) => {
        if (elem[indexY] > elem[indexX]) {
            indexes.push(Math.abs(elem[indexX] - elem[indexY]) / (Math.max(...elem) - Math.min(...elem)))
        }
    })

    return Math.max(...indexes)
}