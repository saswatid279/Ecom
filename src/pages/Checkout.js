import { useEffect, useRef } from "react";

export default function Checkout() {
  const inputref = useRef(null);
  useEffect(() => {
    inputref.current.focus();
  }, []);
  return (
    <div>
      <label>Credit Card Number</label>
      <input ref={inputref} />
      <button>Submit</button>
    </div>
  );
}
