const buttonColors = ["#fe7338", "#2da343", "#203f92", "#ad46b5", "#ec2a2a"]

export const WordInput = ({ placeholder, name, handleChange }) => {
  return (
    <div className="bg-white flex flex-col rounded-sm">
      <input
        placeholder={placeholder}
        onChange={handleChange}
        name={name}
        className="p-3 text-xl"
        type="text"
        id={name}
      />
      <label
        style={{ color: buttonColors[1] }}
        className="p-1 border-t-1 tracking-wide border-dashed font-bold text-center uppercase"
        htmlFor={name}
      >
        {name}
      </label>
    </div>
  )
}
