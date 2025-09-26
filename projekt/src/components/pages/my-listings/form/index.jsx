"use client";

import useFetch from "@/hooks/use-fetch";
import { useActionState } from "react";
import createListingAction from "./create-listing-action";
import editListingAction from "./edit-listing-action";


export default function ListingForm({ mode = "create", listing }) {
  const actionMode = mode === "edit" ? editListingAction : createListingAction
  const [formState, formAction, pending] = useActionState(actionMode);
  const { data: categories } = useFetch("categories");

  return (
    <form action={formAction} className="form">
      <div>
        <label>
          <span>Image</span>
          <input
            type="file"
            accept="image/*"
            name="image" 
          />
        </label>
          <span className="error-message">{formState?.properties?.image?.errors}</span>
      </div>

      <div>
        <label>
          <span>Title</span>
          <input
            type="text"
            name="title"
            placeholder="Title here..."
            defaultValue={listing ? listing.title : ""}
          />
        </label>
        <span className="error-message">{formState?.properties?.title?.errors}</span>
      </div>

      {mode === "create" && (
        <div>
          <label>
            <span>Category</span>
            <select
              name="categoryId"
            >
              <option value="">--Categories--</option>
              {categories?.map(category => (
                <option value={category.id} key={category.id}>{category.name}</option>
              ))}
            </select>
          </label>
          <span className="error-message">{formState?.properties?.categoryId?.errors}</span>
        </div>
      )}

      <div>
        <label>
          <span>Description</span>
          <textarea
            name="description"
            placeholder="Description here..."
            defaultValue={listing ? listing.description : ""}
          />
        </label>
        <span className="error-message">{formState?.properties?.description?.errors}</span>
      </div>

      <button
        type="submit"
        className="button-primary w-full py-2"
      >
        {mode === "edit" ? "Update listing" : "Create"}
      </button>

      {listing && (
        <input type="hidden" name="listingId" readOnly value={listing.id} />
      )}
    </form>

  );
}