import Image from "next/image";

export default function TradePreview({
  offeredItem,
  targetItem,
  offeredLabel = "The item you offer",
  targetLabel = "The item you want",
  showPlaceholder = false,
  placeholderText = "Select an item below"
}) {
  return (
    <div className="grid grid-cols-2 gap-8 mb-6">
      {/* Offered Item */}
      <figure className="flex flex-col border rounded-md p-4 h-[300px] bg-figure-background">
        <figcaption className="mb-2 font-medium text-center">{offeredLabel}</figcaption>
        <div className="flex-1 flex items-center justify-center relative">
          {offeredItem ? (
            <Image
              src={offeredItem.asset?.url}
              alt={offeredItem.title || 'Selected item'}
              fill
              className="object-cover rounded"
            />
          ) : (
            showPlaceholder && <p className="text-sm text-gray-500">{placeholderText}</p>
          )}
        </div>
      </figure>

      {/* Target Item */}
      <figure className="flex flex-col border rounded-md p-4 h-[300px] bg-figure-background">
        <figcaption className="mb-2 font-medium text-center">{targetLabel}</figcaption>
        <div className="flex-1 flex relative">
          <Image
            src={targetItem.asset?.url}
            alt={targetItem.title}
            fill
            className="object-cover rounded"
          />
        </div>
      </figure>
    </div>
  );
}