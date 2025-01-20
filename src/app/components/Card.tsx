import { FC, JSX } from "react";

interface CardProps {
  title: string;
  value: string;
  icon: JSX.Element;
}

const Card: FC<CardProps> = ({ title, value, icon }) => {
  return (
    <div className="flex items-center justify-between bg-white shadow-sm rounded-lg p-4">
      <div>
        <h2 className="text-gray-500 text-lg">{title}</h2>
        <p className="text-2xl font-bold text-secondary">{value}</p>
      </div>
      <div className="bg-gray-100 p-2 rounded-full">{icon}</div>
    </div>
  );
};

export default Card;
