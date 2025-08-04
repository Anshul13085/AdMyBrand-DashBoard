import { FC, ReactNode } from "react";

interface CardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  delta?: string;
  deltaColor?: "green" | "red";
}

const Card: FC<CardProps> = ({ title, value, icon, delta, deltaColor = "green" }) => {
  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 shadow-md flex justify-between items-center transition hover:scale-[1.02]">
      <div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{title}</p>
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">{value}</h2>
        {delta && (
          <p className={`text-sm mt-1 ${deltaColor === "green" ? "text-green-600" : "text-red-500"}`}>
            {delta}
          </p>
        )}
      </div>
      <div className="text-zinc-500 dark:text-zinc-300 text-xl">{icon}</div>
    </div>
  );
};

export default Card;
