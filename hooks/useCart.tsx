import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";


type CartContextType = {
    cartTotalQty: number;
    cartTotalAmount: number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void;
    handleRemoveProductFromCart: (product: CartProductType) => void;
    handleCartQtyIncrease: (product: CartProductType) => void;
    handleCartQtyDecrease: (product: CartProductType) => void;
    handleClearCart: () => void;
    paymentIntent: string | null;
    handleSetPaymentIntent: (val: string | null) => void;
  };

  export const CartContext = createContext<CartContextType | null>(null)

  interface Props {
    [propName: string]: any;
  }

  export const CartContextProvider = (props: Props) => {

    const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);

  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  useEffect(() => {
    const cartItems: any = localStorage.getItem("eShopCartItems");
    const cProducts: CartProductType[] | null = JSON.parse(cartItems);
    const eShopPaymentIntent: any = localStorage.getItem("eShopPaymentIntent");
    const paymentIntent: string | null = JSON.parse(eShopPaymentIntent);


    setCartProducts(cProducts);
    setPaymentIntent(paymentIntent);
  }, []);

  // functions

  useEffect(() => {
    if (cartProducts) {
        const { total, qty } = cartProducts?.reduce((acc, item) => {
            const ItemTotal = item.price * item.quantity;

            acc.total += ItemTotal
            acc.qty += item.quantity;

            return acc;
        }, {
            total: 0,
            qty: 0
        });

        setCartTotalQty(qty);
        setCartTotalAmount(total);
    }
  }, [cartProducts])

  console.log(cartTotalQty, cartTotalAmount)

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts(prev => {
        let updatedCart;

        if (prev) {
            updatedCart = [...prev, product];
        } else {
            updatedCart = [product]
        }
        
        localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))
        return updatedCart;
    }
    )
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filteredProducts = cartProducts.filter((item) => {
          return item.id !== product.id;
        });

        setCartProducts(filteredProducts);
        toast.success("Product removed");
        localStorage.setItem(
          "eShopCartItems",
          JSON.stringify(filteredProducts)
        );
      }
    },
    [cartProducts]
  );


  const handleCartQtyIncrease = useCallback((product: CartProductType) => {
    let updatedCart;

    if (product.quantity === 99) {
        return toast.error("Max quantity reached")
    }

    if (cartProducts){
        updatedCart = [...cartProducts];

        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id);

          if (existingIndex > -1) {
            updatedCart[existingIndex].quantity = updatedCart[existingIndex].quantity + 1;
          }

          setCartProducts(updatedCart);
          localStorage.setItem(
            "eShopCartItems",
            JSON.stringify(updatedCart)
          );
    }
  })


  const handleCartQtyDecrease = useCallback((product: CartProductType) => {
    let updatedCart;

    if (product.quantity === 1) {
        return toast.error("Min quantity reached")
    }

    if (cartProducts){
        updatedCart = [...cartProducts];

        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id);

          if (existingIndex > -1) {
            updatedCart[existingIndex].quantity = updatedCart[existingIndex].quantity - 1;
          }

          setCartProducts(updatedCart);
          localStorage.setItem(
            "eShopCartItems",
            JSON.stringify(updatedCart)
          );
    }
  })

  const handleClearCart = () => {
    
    let updatedCart = [];

    if (cartProducts) {
        setCartProducts(updatedCart)
    }

    localStorage.setItem(
        "eShopCartItems",
        JSON.stringify(updatedCart)
      );
  }


  const handleSetPaymentIntent = useCallback(
    (val: string | null) => {
      setPaymentIntent(val);
      localStorage.setItem("eShopPaymentIntent", JSON.stringify(val));
    },
    [paymentIntent]
  );


  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
    handleSetPaymentIntent
  };

  return <CartContext.Provider value={value} {...props} />;

  
  }

  export const useCart = () => {
    const context = useContext(CartContext);
  
    if (context === null) {
      throw new Error("useCart must be used within a CartContextProvider");
    }
  
    return context;
  };
  
