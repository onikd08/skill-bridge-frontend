import { getUserSession } from "@/actions/user/user.action";
import { Navbar } from "@/components/layout/Navbar";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const { data } = await getUserSession();

  return (
    <div>
      <Navbar user={data?.user} />
      {children}
    </div>
  );
};

export default CommonLayout;
