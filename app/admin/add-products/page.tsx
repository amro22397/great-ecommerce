import Container from "@/components/Container";
import FormWrap from "@/components/FormWrap";
import AddProductForm from "./AddProductForm";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/components/NullData";

const AddProducts = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser?.user?.role !== "ADMIN") {
    return (
        <>
        <pre className="hidden">{JSON.stringify(currentUser, null, 2)}</pre>
        <NullData title="You are not allowed to access this page" />
        </>
    );
  }

  return (
    <div className="p-8 max-md:px-0 md:px-2 lg:px-8">
      <Container>
        <FormWrap>
          <AddProductForm />
        </FormWrap>
      </Container>
    </div>
  );
};

export default AddProducts;
