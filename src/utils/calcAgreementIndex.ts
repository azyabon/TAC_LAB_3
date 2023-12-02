export default function calcAgreementIndex(criteriaEvaluationTable: number[][],
                                           indexX: number, indexY: number,
                                           criteriaWeights: number[]) {
    let sum = 0
    const criteriaWeightSum = criteriaWeights.reduce((accumulator, currentValue) => accumulator + currentValue);

    criteriaEvaluationTable.forEach((elem, index) => {
        if (elem[indexY] >= elem[indexX]) {
            sum += criteriaWeights[index]
        }
    })

    return sum/criteriaWeightSum
}