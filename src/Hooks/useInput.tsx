import { ChangeEvent, useState } from "react"

const useInput = (validator:(inputVale: string) => boolean) => {
    const [inputValue, setInputValue] = useState('')
    const [inputTouched, setInputTouched] = useState(false)
    const isInputValid = validator(inputValue)
    const hasError = !isInputValid && inputTouched

    const valueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const inputBlurHandler = () => {
        setInputTouched(true)
    }

    const reset = () => {
        setInputValue('')
        setInputTouched(false)
    }

    return {
        inputValue,
        isInputValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset
    }
}

export default useInput