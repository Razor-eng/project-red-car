interface ButtonProps {
  text: string;
  link: string;
}

export const Button: React.FC<ButtonProps> = ({ text, link }) => {
  return (
    <a
      href={link}
      className="inline-block py-3 px-6 mt-6 text-white bg-blue-700 rounded-lg transition duration-200 hover:bg-blue-600"
    >
      {text}
    </a>
  );
};
