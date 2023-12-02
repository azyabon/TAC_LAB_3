import React, {ChangeEvent, FC} from "react";
import {CriteriaWeightsProps} from "../../utils/propsTypes";


const CriteriaWeights: FC<CriteriaWeightsProps> = ({criteria, setCriteriaWeights, criteriaWeights}) => {

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>, index: number) => {

        setCriteriaWeights(prevState => {
            const newArray = [...prevState]
            newArray[index] = Number(e.target.value)
            return newArray
        })
    }

    const table = criteriaWeights.map((elem, indexTd) => <td><input value={elem} onChange={(e) => onChangeInput(e, indexTd)}
                                                             type={"number"} min={0}
                                                             step={1}/></td>)
    const tableHead = criteria.map((elem) => <td>{elem}</td>)

    return <div>
        Веса критериев:
        <table border={1}>
        <tr>
            {tableHead}
        </tr>
        <tr>
            {table}
        </tr>
    </table>
    </div>
}

export default CriteriaWeights