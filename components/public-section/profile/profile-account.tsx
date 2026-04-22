"use client";

export default function ProfileAccount() {
  //mcok data
  const user = {
    name: "Papaya Salad",
    account: "https://i.pinimg.com/control1/1200x/5d/5a/93/5d5a93d474d9ed4ce1866527be582334.jpg",
    institution: "Computer Science Hogwarts University",
  };

  const handleEdit = () => {
    console.log("กดแก้ไขโปรไฟล์");
  };

  const handleShare = () => {
    console.log("กดแชร์โปรไฟล์");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-6">

      <div className="w-full max-w-lg p-6">
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

          {/*button*/}
          <div className="mt-6 flex gap-3 w-full justify-center">
            <button 
                className="flex-1 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
                onClick={handleEdit}
            >
                แก้ไขโปรไฟล์
            </button>

            <button 
                className="flex-1 py-2 rounded-xl bg-gray-200 text-gray-900 font-semibold hover:bg-gray-200 transition"
                onClick={handleShare}
            >
                แชร์โปรไฟล์
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}