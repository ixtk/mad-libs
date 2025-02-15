const buttonColors = ["#fe7338", "#2da343", "#203f92", "#ad46b5", "#ec2a2a"]

export const WordInput = ({
  placeholder,
  name,
  handleChange,
  errors,
  touched,
  handleBlur
}) => {
  return (
    <div className="bg-white flex flex-col rounded-sm">
      <input
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        name={name}
        className="p-3 text-xl font-medium tracking-wide"
        type="text"
        id={name}
      />
      <span className="text-red-500 px-3 h-7 pb-1 bg-white font-sans font-medium text-sm">
        {touched[name] && errors[name]}
      </span>
      <label
        style={{ color: buttonColors[1] }}
        className="p-1 border-t-1 tracking-wider border-dashed font-bold text-center uppercase"
        htmlFor={name}
      >
        {name}
      </label>
    </div>
  )
}
