'use client'

import { CartProductType } from "@prisma/client";

interface SetQtyProps {
    cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQtyIncrease: () => void;
  handleQtyDecrease: () => void;
  setCartProduct: () => void
}

const btnStyles = "border-[1.2px] border-slate-300 px-2 rounded";

const SetQuantity: React.FC<SetQtyProps> = ({
    cartCounter,
  cartProduct,
  handleQtyIncrease,
  handleQtyDecrease,
  setCartProduct
}) => {
  return (
    <div className="flex gap-8 items-center">
      {cartCounter ? null : <div className="font-semibold">QUANTITY:</div>}
      <div className="flex gap-4 items-center text-base">
        <button onClick={handleQtyDecrease} className={btnStyles}>
          -
        </button>
        <div>
            {/* cartProduct.quantity */}
            
            <input type="text"
            value={cartProduct.quantity}
            onChange={(e) => setCartProduct({ ...cartProduct, quantity: Number(e.target.value)}) }
            className="w-7 focus:outline-none text-center
            shadow-sm border-solid border border-gray-400
            rounded-sm
            " />
            
        </div>
        <button onClick={handleQtyIncrease} className={btnStyles}>
          +
        </button>
      </div>
    </div>
  )
}

export default SetQuantity
