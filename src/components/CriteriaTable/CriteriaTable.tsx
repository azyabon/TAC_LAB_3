import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {CriteriaTableProps} from "../../utils/propsTypes";

const CriteriaTable: React.FC<CriteriaTableProps> = ({
                                                         criteria,
                                                         setCriteriaEvaluationTable,
                                                         criteriaEvaluationTable,
                                                         alternativesCount
                                                     }) => {

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>, x: number, y: number) => {
        const updatedTable = [...criteriaEvaluationTable]; // Создаем копию массива
        updatedTable[y] = [...updatedTable[y]]; // Копируем вложенный массив, чтобы не мутировать оригинальный
        updatedTable[y][x] = Number(e.currentTarget.value); // Обновляем значение
        setCriteriaEvaluationTable(updatedTable); // Устанавливаем обновленный массив в качестве состояния
    }

    const table = criteriaEvaluationTable.map((elem, indexTr) =>
        <tr>{[-1, ...elem].map((number, indexTd) => indexTd === 0 ? <td>{criteria[indexTr]}</td> :
            <td><input value={number}
                       onChange={(e) => onChangeInput(e, indexTd - 1, indexTr)}
                       type={"number"} min={0}
                       step={1}/></td>)}
        </tr>)
    const tableHead = Array(alternativesCount).fill(-1).map((_, index) => <td>{`Альтернатива ${index+1}`}</td>)

    return <table border={1}>
        <tr>
            <td></td>
            {tableHead}
        </tr>
        {table}
    </table>
}

export default CriteriaTable