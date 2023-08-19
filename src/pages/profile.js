import { getSession, useSession } from "next-auth/react";
import { useState } from "react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [profilePic, setProfilePic] = useState("pfp.jpg");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updateStatus, setUpdateStatus] = useState(null); 

  const handlePictureChange = (event) => {
    const newProfilePic = event.target.files[0];
    if (newProfilePic) {
      setProfilePic(URL.createObjectURL(newProfilePic));
    }
  };


  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      setUpdateStatus("error");
      return;
    }

    try {
      const response = await fetch("/api/update-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session.user.email,
          oldPassword,
          newPassword,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setUpdateStatus("success");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setUpdateStatus("error");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setUpdateStatus("error");
    }
  };


  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <h3 className="text-2xl font-bold leading-9 tracking-tight text-gray-900 text-left">
        {session.user.email} Profile Page
      </h3>
      <div className="w-[45%] h-[520px] mt-5 bg-gray-100 shadow-2xl rounded-md p-8">
        <div className="flex items-center">
          <img
            src={profilePic}
            alt="Profile Picture"
            width={200}
            height={200}
            className="rounded-full"
          />
          <label className="ml-5 cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handlePictureChange}
              className="hidden"
            />
            Change Profile Picture
          </label>
        </div>
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-3">Update Password</h4>
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
          <button
            onClick={handlePasswordUpdate}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Update Password
          </button>
          {updateStatus === "success" && (
            <p className="text-green-500 mt-2">Password updated successfully!</p>
          )}
          {updateStatus === "error" && (
            <p className="text-red-500 mt-2">Error updating password. Please try again.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
