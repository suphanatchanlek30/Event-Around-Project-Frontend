// app/(public)/events/page.tsx

import ProfileAccount from "@/components/public-section/profile/profile-account";
import ProfileBookmarkActivities from "@/components/public-section/profile/profile-bookmark-activities";
import ProfileSetting from "@/components/public-section/profile/profile-setting";

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-gray-50 flex justify-center">

            <div className="w-full max-w-7xl p-6 space-y-8">

                <ProfileAccount />
                <ProfileBookmarkActivities />
                <ProfileSetting />

            </div>

        </div>
    );
}