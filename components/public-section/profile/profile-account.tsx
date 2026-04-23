"use client";

export default function ProfileAccount() {
    //mcok data
    const user = {
        name: "Papaya Salad",
        account: "https://i.pinimg.com/control1/1200x/5d/5a/93/5d5a93d474d9ed4ce1866527be582334.jpg",
        institution: "Computer Science Hogwarts University",
    };

    const stats = {
        joinedCount: 8,
        bookmarkCount: 5,
        groupCount: 4,
    };

    const handleEdit = () => {
        console.log("กดแก้ไขโปรไฟล์")
    };
    const handleShare = () => {
        console.log("กดแชร์โปรไฟล์");
    };

    return (
        <div className="w-full">

            {/* Account */}
            <div className="flex flex-col items-center text-center">

                <img
                    src={user.account}
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
                        className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition"
                        onClick={handleEdit}
                    >
                        แก้ไขโปรไฟล์
                    </button>

                    <button
                        className="px-5 py-2 bg-gray-200 text-gray-900 font-semibold rounded-xl hover:bg-gray-300 transition"
                        onClick={handleShare}
                    >
                        แชร์โปรไฟล์
                    </button>
                </div>
                
                {/* stats */}
                <div className="mt-6 flex gap-3 w-full">

                    <div className="flex-1 bg-white rounded-xl p-5 text-center shadow-sm">
                        <p className="text-indigo-600 font-bold text-xl">
                            {stats.joinedCount}
                        </p>
                        <p className="text-sm font-medium">เข้าร่วมแล้ว</p>
                    </div>

                    <div className="flex-1 bg-white rounded-xl p-5 text-center shadow-sm">
                        <p className="text-indigo-600 font-bold text-xl">
                            {stats.bookmarkCount}
                        </p>
                        <p className="text-sm font-medium">บันทึกไว้</p>
                    </div>

                    <div className="flex-1 bg-white rounded-xl p-5 text-center shadow-sm">
                        <p className="text-indigo-600 font-bold text-xl">
                            {stats.groupCount}
                        </p>
                        <p className="text-sm font-medium">กลุ่ม</p>
                    </div>

                </div>

            </div>
        </div>
    );
}