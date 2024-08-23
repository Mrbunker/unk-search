type Props = React.InputHTMLAttributes<HTMLInputElement>;
const SearchInput = ({ ...props }: Props) => {
  return (
    <div>
      <input type="text" placeholder="Search" {...props} />
    </div>
  );
};
export default SearchInput;
