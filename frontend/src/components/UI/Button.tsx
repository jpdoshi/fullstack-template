const Button = ({ color = "#2b7fff", onClick, children, className }: any) => {
  return (
    <button
      className={`text-white px-3 py-1.5 rounded-lg hover:brightness-115 shadow-md duration-300 ${className}`}
      onClick={onClick}
      style={{ backgroundColor: color }}
    >
      {children}
    </button>
  );
};

export default Button;
