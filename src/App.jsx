import { useFormik } from "formik"
import "./App.css"
import { WordInput } from "./WordInput"
import { useState } from "react"

const topics = [
  "the great gemstone journey",
  "adventure in the amazon jungle",
  "the wild adventure",
  "the cook off",
  "the birthday plan",
  "a wedding to remember",
  "nora's going away bash",
  "the miner",
  "a rainy day",
  "the princess"
]

const buttonColors = ["#fe7338", "#2da343", "#203f92", "#ad46b5", "#ec2a2a"]

function App() {
  const [gameState, setGameState] = useState("idle")
  const form = useFormik({
    initialValues: {
      noun: "",
      verb: "",
      adjective: "",
      topic: ""
    },
    onSubmit: async (data, submitProps) => {
      const response = await fetch("http://localhost:3000/mad-libs", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
      const json = await response.json()

      console.log(json)
      submitProps.setStatus(json.text)
      submitProps.setSubmitting(false)
      setGameState("generated")
    }
  })

  if (gameState === "idle") {
    return (
      <form
        onSubmit={form.handleSubmit}
        className="max-w-[90rem] mx-auto font-boogallo"
      >
        <h1 className="text-[4rem] text-center my-4">
          <span className="font-bold">Mad</span> Libs!
        </h1>
        <section>
          <h2 className="uppercase text-center text-2xl">Choose a story</h2>
          <div className="grid gap-1 grid-cols-4 my-8">
            {topics.map((topic, titleIndex) => {
              return (
                <button
                  type="button"
                  style={{
                    backgroundColor:
                      buttonColors[titleIndex % buttonColors.length]
                  }}
                  onClick={() => form.setFieldValue("topic", topic)}
                  className="rounded-sm text-xl cursor-pointer uppercase min-h-32 p-4 text-white"
                  key={topic}
                >
                  {topic}
                </button>
              )
            })}
          </div>
        </section>
        <section
          style={{ backgroundColor: buttonColors[1] }}
          className="p-4 rounded-sm"
        >
          <h2 className="text-2xl uppercase text-center text-white">
            Go Mad! Fill in the blank fields below
          </h2>
          <div className="grid grid-cols-4 gap-4 mt-4">
            <WordInput
              placeholder="Enter a verb"
              name="verb"
              handleChange={form.handleChange}
            />
            <WordInput
              placeholder="Enter a noun"
              name="noun"
              handleChange={form.handleChange}
            />
            <WordInput
              placeholder="Enter a adjective"
              name="adjective"
              handleChange={form.handleChange}
            />
          </div>
        </section>
        <button
          type="submit"
          className="uppercase block mx-auto my-4 min-w-40 rounded-sm cursor-pointer bg-red-500 text-white px-4 py-2"
        >
          go mad!
        </button>
      </form>
    )
  }

  return (
    <div className="font-boogallo">
      <h1 className="text-[4rem] text-center my-4">
        <span className="font-bold">Mad</span> Libs!
      </h1>
      <section>
        <h2 className="text-3xl uppercase text-center my-4">{form.values.topic}</h2>
        <p className="text-white rounded-sm tracking-wide bg-purple-500 p-4 text-2xl max-w-[80ch] mx-auto">
          {form.status?.split(/(\{.*?\})/).map((word, index) => {
            if (word.startsWith("{"))
              return (
                <span
                  key={index}
                  className="text-purple-500 rounded-sm  px-2 my-1 bg-white inline-block"
                >
                  {word.replace("{", "").replace("}", "")}
                </span>
              )

            return <span key={index}>{word}</span>
          })}
        </p>
      </section>
      <button
        type="button"
        onClick={() => setGameState("idle")}
        className="uppercase block mx-auto my-4 min-w-40 rounded-sm cursor-pointer bg-green-500 text-white px-4 py-2"
      >
        Try again!
      </button>
    </div>
  )
}

export default App
