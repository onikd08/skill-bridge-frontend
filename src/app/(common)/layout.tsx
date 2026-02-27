import { getUser } from "@/actions/auth/auth.action";
import Footer from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const data = await getUser();

  return (
    <div>
      <Navbar user={data} />
      {children}
      <Footer />
    </div>
  );
};

export default CommonLayout;
