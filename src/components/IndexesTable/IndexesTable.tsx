import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {AgreementIndexesTableProps, CriteriaTableProps} from "../../utils/propsTypes";

const IndexesTable: React.FC<AgreementIndexesTableProps> = ({
                                                                         agreementIndexesTable,

                                                                         setAgreementIndexesTable,
                                                                         header
                                                                     }) => {

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>, x: number, y: number) => {
        setAgreementIndexesTable(prevState => {
            const updatedTable = [...prevState]; // Создаем копию массива
            updatedTable[y] = [...updatedTable[y]]; // Копируем вложенный массив, чтобы не мутировать оригинальный
            updatedTable[y][x] = Number(e.currentTarget.value); // Обновляем значение
            return updatedTable
        })

    }

    const table = agreementIndexesTable.map((elem, indexTr) =>
        <tr>{[-1, ...elem].map((number, indexTd) => indexTd === 0 ? <td>{`Альтернатива ${indexTr + 1}`}</td> :
            <td><input value={number}
                       onChange={(e) => onChangeInput(e, indexTd - 1, indexTr)}
                       type={"number"} min={0}
                       step={1}/></td>)}
        </tr>)
    const tableHead = agreementIndexesTable.map((_, index) => <td>{`Альтернатива ${index + 1}`}</td>)

    return <div>
        {header}
        <table border={1}>
            <tr>
                <td></td>
                {tableHead}
            </tr>
            {table}
        </table>
    </div>
}

export default IndexesTable