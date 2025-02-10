import { useFormik } from "formik"
import "./App.css"

const titles = [
  "the great gemstone journey general",
  "adventure in the amazon jungle general",
  "the wild adventure general",
  "the cook off kids",
  "the birthday plan general",
  "a wedding to remember holiday",
  "nora's going away bash general",
  "the miner general",
  "a rainy day general",
  "the princess adventure"
]

const buttonColors = ["#fe7338", "#2da343", "#203f92", "#ad46b5", "#ec2a2a"]

function App() {
  const form = useFormik({
    noun: "",
    verb: "",
    adverb: ""
  })

  return (
    <div>
      <h1 className="text-[3rem] text-center my-4">
        <span className="font-bold">Mad</span> Libs!
      </h1>
      <section>
        <h2 className="uppercase text-center text-xl">Choose a story</h2>
        <div className="grid gap-1 grid-cols-4 my-8">
          {titles.map((title, titleIndex) => {
            return (
              <button
                style={{
                  backgroundColor:
                    buttonColors[titleIndex % buttonColors.length]
                }}
                className="font-bold rounded-sm cursor-pointer uppercase min-h-32 p-4 text-white"
                key={title}
              >
                {title}
              </button>
            )
          })}
        </div>
      </section>
      <section style={{ backgroundColor: buttonColors[1] }} className="p-4">
        <h2 className="text-xl text-center text-white">
          Go Mad! Fill in the blank fields below.
        </h2>
        <p className="text-center text-gray-100 my-2">
          If you cant think of a word, click icon to randomly pick a verb, noun,
          adjective or adverb.
        </p>
        <div className="grid grid-cols-4 gap-4 mt-8">
          <div className="bg-white flex flex-col">
            <input
              placeholder="Enter a noun"
              className="p-3 text-xl"
              type="text"
              id="noun"
            />
            <label
              style={{ color: buttonColors[1] }}
              className="p-1 border-t-1 font-bold text-center uppercase"
              htmlFor="noun"
            >
              Noun
            </label>
          </div>
          <div className="bg-white flex flex-col">
            <input
              placeholder="Enter a verb"
              className="p-3 text-xl"
              type="text"
              id="verb"
            />
            <label
              style={{ color: buttonColors[1] }}
              className="p-1 border-t-1 font-bold text-center uppercase"
              htmlFor="verb"
            >
              Verb
            </label>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
