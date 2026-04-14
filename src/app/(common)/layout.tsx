import { getUser } from "@/actions/auth/auth.action";
import Footer from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import ChatBubble from "@/components/layout/ChatBubble";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const data = await getUser();

  return (
    <div>
      <Navbar user={data} />
      {children}
      <ChatBubble />
      <Footer />
    </div>
  );
};

export default CommonLayout;
