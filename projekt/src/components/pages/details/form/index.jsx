import { useActionState, useState, useEffect } from "react";
import useFetch from "@/hooks/use-fetch";
import TradePreview from "./trade-preview";
import ModalActions from "../../../ui/modal/modal-actions";
import proposeAction from "./propose-action";
import FormFeedback from "../../../ui/form/form-feedback";
import UserItems from "./user-items";

export default function ProposeForm({ userId, product, onCancel }) {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [formState, formAction, pending] = useActionState(proposeAction);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (formState?.success) {
      setShowSuccess(true);
      const timeout = setTimeout(() => {
        setShowSuccess(false);
        onCancel();
      }, 1200); // 1.2 seconds
      return () => clearTimeout(timeout);
    }
  }, [formState?.success, onCancel]);

  const { data: allProducts, loading, error } = useFetch(`listings`);
  const filteredUserProducts = allProducts
    ? allProducts.filter(item => item.id !== product.id && item.user?.id === userId)
    : [];
    
  return (
    <form action={formAction}>
      <TradePreview
        offeredItem={selectedItemId ? filteredUserProducts.find((item) => item.id === selectedItemId) : null}
        targetItem={product}
        showPlaceholder={!selectedItemId}
      />

      <ModalActions
        onCancel={() => {
          setSelectedItemId(null);
          onCancel();
        }}
        confirmDisabled={!selectedItemId}
      />

      <FormFeedback errors={formState?.errors} success={showSuccess ? "Swap proposal sent!" : null} />

      <UserItems items={filteredUserProducts} onSelect={setSelectedItemId} />

      {/* Hidden inputs */}
      {selectedItemId && (
        <input type="hidden" name="userItemId" value={selectedItemId} />
      )}
      <input type="hidden" name="targetItemId" value={product.id} />
      <input type="hidden" name="userId" value={userId} />
    </form>
  );
}
