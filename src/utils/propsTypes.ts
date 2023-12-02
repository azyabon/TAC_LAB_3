import {Dispatch, SetStateAction} from "react";


export type CriteriaProps = {
    criteria: string[],
    setCriteria: Dispatch<SetStateAction<string[]>>
}

export type CriteriaTableProps = {
    criteria: string[],
    criteriaEvaluationTable: number[][],
    setCriteriaEvaluationTable: Dispatch<SetStateAction<number[][]>>,
    alternativesCount: number
}

export type AlternativesProps = {
    alternativesVectors: number[][],
    setAlternativesVectors: Dispatch<SetStateAction<number[][]>>,
    criteria: string,
    criteriaLength: number,
    criteriaIndex: number,
    alternativesCount: number
}

export type IntegralProps = {
    criteria: string[],
    alternativesVectors: number[][]
}

export type CriteriaWeightsProps = {
    criteria: string[],
    setCriteriaWeights: Dispatch<SetStateAction<number[]>>,
    criteriaWeights: number[]
}

export type AgreementIndexesTableProps = {
    agreementIndexesTable: number[][],
    setAgreementIndexesTable: Dispatch<SetStateAction<number[][]>>,
    header: string
}