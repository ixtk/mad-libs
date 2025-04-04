import { useFormik } from "formik"
import "./App.css"
import { useState } from "react"
import { string, object } from "yup"
import { ResultText } from "./ResultText"
import { GenerateForm } from "./GenerateForm"

import topics from "./topics.json"

const formInitialValues = {
  noun: "",
  verb: "",
  adjective: "",
  topic: "",
  place: "",
  emotion: "",
  name: ""
}

const formValidationSchema = object({
  noun: string().min(3).max(20).required(),
  verb: string().min(3).max(20).required(),
  adjective: string().min(3).max(20).required(),
  topic: string().oneOf(topics).required(),
  place: string().min(3).max(20).required(),
  emotion: string().min(3).max(15).required(),
  name: string().min(3).max(20).required()
})

function App() {
  const [gameState, setGameState] = useState("idle")

  const formHandleSubmit = async (data, submitProps) => {
    submitProps.setStatus({})
    // await fetch("https://httpbin.dev/delay/15")
    try {
      const response = await fetch("https://api.abcd.ge/mad-libs", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      })

      const json = await response.json()
      console.log(json)

      if (!response.ok) {
        throw new Error(json.error)
      }

      submitProps.setStatus({ result: json.text })
      setGameState("generated")
    } catch (error) {
      submitProps.setStatus({ error: error.message })
    }
  }

  const form = useFormik({
    initialValues: formInitialValues,
    validationSchema: formValidationSchema,
    onSubmit: formHandleSubmit
  })

  if (gameState === "idle") {
    return <GenerateForm form={form} />
  }

  return <ResultText setGameState={setGameState} form={form} />
}

export default App
