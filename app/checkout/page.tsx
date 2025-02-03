import Container from "../../components/Container";
import FormWrap from "../../components/FormWrap";
import CheckoutClient from "./CheckoutClient";

const Checkout = () => {
  return (
    <div className="p-8 max-md:px-0 md:px-2 lg:px-8">
      <Container>
        <FormWrap>
          <CheckoutClient />
        </FormWrap>
      </Container>
    </div>
  );
};

export default Checkout;
