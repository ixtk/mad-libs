export const ResultText = ({ setGameState, form }) => {
  return (
    <div className="font-boogallo">
      <h1 className="text-[4rem] text-center my-4">
        <span className="font-bold">Mad</span> Libs!
      </h1>
      <section>
        <h2 className="text-3xl uppercase text-center my-4">
          {form.values.topic}
        </h2>
        <p className="text-white rounded-sm tracking-wide bg-purple-500 p-4 text-2xl max-w-[80ch] mx-auto">
          {form?.status?.result?.split(/(\{.*?\})/).map((word, index) => {
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
        onClick={() => {
          setGameState("idle")
          form.resetForm()
        }}
        className="uppercase block mx-auto my-4 min-w-40 rounded-sm cursor-pointer bg-green-500 text-white px-4 py-2"
      >
        Try again!
      </button>
    </div>
  )
}
