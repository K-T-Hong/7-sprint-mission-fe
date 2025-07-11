export default function SearchInput({
  value,
  onChange,
  placeholder,
  className,
}) {
  return (
    <input
      type="text"
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
