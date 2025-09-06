import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UserHome = () => {
  const { user } = useAuth(); // Only to get email
  const axiosSecure = useAxiosSecure();

  const [userInfo, setUserInfo] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch user info from API
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`).then((res) => {
        setUserInfo(res.data);
      });
    }
  }, [user?.email, axiosSecure]);

  const handleEdit = () => {
    setEditData(userInfo);
    setEditing(true);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await axiosSecure.patch(`/user/info/${userInfo.email}`, {
        name: editData.name,
        address: editData.address,
      });
      setUserInfo({ ...userInfo, name: editData.name, address: editData.address });
      setEditing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!userInfo) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-base-200 p-6 rounded-lg shadow">
      <h3 className="text-3xl mb-6">
        Hi, Welcome {userInfo.name}
      </h3>
      <div className="space-y-3">
        <div>
          <span className="font-semibold">Email:</span> {userInfo.email}
        </div>
        <div>
          <span className="font-semibold">Role:</span> {userInfo.role || "user"}
        </div>
        <div>
          <span className="font-semibold">Address:</span>{" "}
          {userInfo.address ? userInfo.address : <span className="text-gray-400">///</span>}
        </div>
      </div>
      <button
        className="btn btn-primary btn-sm mt-6"
        onClick={handleEdit}
      >
        Edit
      </button>

      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-base-100 p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h4 className="text-xl font-bold mb-4">Edit Information</h4>
            <div className="space-y-3">
              <input
                className="input input-bordered w-full"
                name="name"
                value={editData.name}
                onChange={handleChange}
                placeholder="Name"
              />
              <input
                className="input input-bordered w-full"
                name="email"
                value={editData.email}
                onChange={handleChange}
                placeholder="Email"
                disabled
              />
              <input
                className="input input-bordered w-full"
                name="address"
                value={editData.address}
                onChange={handleChange}
                placeholder="Address"
              />
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => setEditing(false)}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="btn btn-sm btn-primary"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHome;