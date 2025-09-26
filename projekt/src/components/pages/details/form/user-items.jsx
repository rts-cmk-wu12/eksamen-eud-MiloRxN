import Card from "@/components/ui/card";

export default function UserItems({ items, onSelect }) {
  return (
    <>
      <h3 className="text-lg mb-2">Your Items</h3>
      <div className="flex overflow-x-auto space-x-4 pb-2">
        {items.map((item) => (
          <div key={item.id} className="min-w-[200px] h-[300px] max-w-[200px] flex-shrink-0">
            <Card
              product={item}
              selectable={true}
              onSelect={onSelect}
            />
          </div>
        ))}
        {!items || items.length === 0 && (
          <span>You have no items to offer</span>
        )}
      </div>
    </>
  );
}
