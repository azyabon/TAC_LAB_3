import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import Criteria from "../components/Criteria/Criteria";
import CriteriaTable from "../components/CriteriaTable/CriteriaTable";
import CriteriaWeights from "../components/CriteriaWeights/CriteriaWeights";
import calcAgreementIndex from "../utils/calcAgreementIndex";
import calcDisagreementIndex from "../utils/calcDisagreementIndex";
import IndexesTable from "../components/IndexesTable/IndexesTable";

function App() {

    const onChangeAlternatives = (e: ChangeEvent<HTMLInputElement>) => {
        setAlternativesCount(Number(e.currentTarget.value))
    }

    const [criteria, setCriteria] = useState<string[]>([])
    const [criteriaEvaluationTable, setCriteriaEvaluationTable] = useState<number[][]>([])
    const [criteriaWeights, setCriteriaWeights] = useState<number[]>([])
    const [agreementIndexes, setAgreementIndexes] = useState<number[][]>([])
    const [disagreementIndexes, setDisagreementIndexes] = useState<number[][]>([])
    const [alternativesCount, setAlternativesCount] = useState<number>(0)

    useEffect(() => {
        const array: number[][] = [];
        for (let i = 0; i < criteria.length; i++) {
            array.push(Array(alternativesCount).fill(0))
        }
        setCriteriaEvaluationTable(array)

        setCriteriaWeights(Array(criteria.length).fill(0))

        setAgreementIndexes(Array(alternativesCount).fill(Array(alternativesCount).fill(0)))

        setDisagreementIndexes(Array(alternativesCount).fill(Array(alternativesCount).fill(0)))

    }, [criteria.length, alternativesCount])


    useEffect(() => {
        if (!criteriaWeights.includes(0)) {
            if (criteriaWeights.length>0) {
                const updatedAgreementArray = [...agreementIndexes]

                for (let i = 0; i < alternativesCount; i++) {
                    updatedAgreementArray[i] = [...agreementIndexes[i]];
                    for (let j = 0; j < alternativesCount; j++) {
                        if (i===j) {
                            updatedAgreementArray[i][j] = 0;
                        } else {
                            updatedAgreementArray[i][j] = calcAgreementIndex(criteriaEvaluationTable, i, j, criteriaWeights)
                        }
                    }
                }
                setAgreementIndexes(updatedAgreementArray)

                const updatedDisagreementArray = [...disagreementIndexes]

                for (let i = 0; i < alternativesCount; i++) {
                    updatedDisagreementArray[i] = [...agreementIndexes[i]];
                    for (let j = 0; j < alternativesCount; j++) {
                        if (i===j) {
                            updatedDisagreementArray[i][j] = 0;
                        } else {
                            updatedDisagreementArray[i][j] = calcDisagreementIndex(criteriaEvaluationTable, i, j)
                        }
                    }
                }

                setDisagreementIndexes(updatedDisagreementArray)
            }
        }
    }, [criteriaWeights])


    return (
        <div className="App">
            <Criteria criteria={criteria} setCriteria={setCriteria}/>
            <div>
                <span>Количество вариантов: </span>
                <input onChange={onChangeAlternatives} type={"number"} min={0} step={1}/>
            </div>
            <CriteriaTable criteria={criteria}
                           setCriteriaEvaluationTable={setCriteriaEvaluationTable}
                           criteriaEvaluationTable={criteriaEvaluationTable}
                           alternativesCount={alternativesCount}/>
            <CriteriaWeights criteria={criteria} setCriteriaWeights={setCriteriaWeights}
                             criteriaWeights={criteriaWeights}/>
            <IndexesTable agreementIndexesTable={agreementIndexes}
                                   setAgreementIndexesTable={setAgreementIndexes} header={"Таблица индексов согласия:"}/>
            <IndexesTable agreementIndexesTable={disagreementIndexes}
                                   setAgreementIndexesTable={setDisagreementIndexes}
                                   header={"Таблица индексов несогласия:"}/>
        </div>
    )
}

export default App;
