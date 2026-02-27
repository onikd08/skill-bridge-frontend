import { getAllUsers } from "@/actions/user/user.action";
import UserManagement from "@/components/modules/user/UserManagement";

const UsersPage = async () => {
  const { data } = (await getAllUsers()) || [];
  return (
    <div>
      <UserManagement users={data} />
    </div>
  );
};

export default UsersPage;
