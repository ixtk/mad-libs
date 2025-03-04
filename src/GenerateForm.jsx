import { WordInput } from "./WordInput"
import topics from "./topics.json"
import clsx from "clsx"

export const GenerateForm = ({ form }) => {
  const buttonColors = ["#fe7338", "#2da343", "#203f92", "#ad46b5", "#ec2a2a"]

  const topicButtons = topics.map((topic, titleIndex) => {
    return (
      <button
        type="button"
        style={{
          backgroundColor: buttonColors[titleIndex % buttonColors.length]
        }}
        onClick={() => form.setFieldValue("topic", topic)}
        className={clsx(
          "rounded-sm text-xl cursor-pointer uppercase min-h-24 p-4 text-white hover:opacity-85 flex gap-2 items-center flex-col justify-center",
          topic === form.values.topic && "underline"
        )}
        key={topic}
      >
        <span>{topic}</span>
      </button>
    )
  })

  const inputElements = [
    { name: "verb", placeholder: "Enter a verb" },
    { name: "noun", placeholder: "Enter a noun" },
    { name: "adjective", placeholder: "Enter an adjective" },
    { name: "place", placeholder: "Enter a place" },
    { name: "emotion", placeholder: "Enter an emotion" },
    { name: "name", placeholder: "Enter a name" }
  ].map((inputObj) => {
    return (
      <WordInput
        key={inputObj.name}
        placeholder={inputObj.placeholder}
        name={inputObj.name}
        handleChange={form.handleChange}
        handleBlur={form.handleBlur}
        errors={form.errors}
        touched={form.touched}
      />
    )
  })

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
        <div className="grid gap-1 sm:grid-cols-2 md:grid-cols-4 mt-8">
          {topicButtons}
        </div>
        <div className="text-red-500 px-3 bg-white mt-4 font-sans font-medium text-sm">
          {form.touched.topic && form.errors.topic}
        </div>
      </section>
      <div className="w-20 border-dashed border-gray-500 border-t-4 mx-auto my-8"></div>
      <section
        style={{ backgroundColor: buttonColors[1] }}
        className="p-4 rounded-sm"
      >
        <h2 className="text-2xl uppercase text-center text-white">
          Go Mad! Fill in the blank fields below
        </h2>
        {form.status?.error && (
          <p className="text-center bg-white text-red-500 rounded-sm p-1 mt-4 font-sans font-medium text-sm max-w-[50ch] mx-auto">
            {form.status.error}
          </p>
        )}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {inputElements}
        </div>
      </section>
      <div className="flex gap-4 justify-center my-4">
        <button
          disabled={form.isSubmitting}
          type="submit"
          className="uppercase my-4 min-w-40 rounded-sm cursor-pointer bg-red-500 text-white px-4 py-2 disabled:bg-red-400 disabled:cursor-not-allowed"
        >
          {form.isSubmitting ? "loading..." : "create!"}
        </button>
      </div>
    </form>
  )
}
