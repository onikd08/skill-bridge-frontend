import { getAllUsers } from "@/actions/user/user.action";
import UserManagement from "@/components/modules/user/UserManagement";

const UsersPage = async () => {
  const { data } = (await getAllUsers()) || [];
  return (
    <div>
      <h1 className="mb-5">Manage Users</h1>
      <UserManagement users={data} />
    </div>
  );
};

export default UsersPage;
