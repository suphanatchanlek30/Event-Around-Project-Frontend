import { profile } from "console";

export default function ProfileAccount() {
  const user = {
    name: "Papaya Salad",
    account: "https://i.pinimg.com/control1/1200x/5d/5a/93/5d5a93d474d9ed4ce1866527be582334.jpg",
    institution: "Computer Science Hogwarts University",
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-6">

      <div className="w-full max-w-md p-6">

        {/*Account*/}
        <div className="flex flex-col items-center text-center">
          <img
            src={user.account}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover border"
          />

          <h1 className="mt-3 text-xl font-bold text-gray-800">
            {user.name}
          </h1>

          <p className="text-gray-500 text-sm">
            {user.institution}
          </p>
        </div>


      </div>

    </div>
  );
}