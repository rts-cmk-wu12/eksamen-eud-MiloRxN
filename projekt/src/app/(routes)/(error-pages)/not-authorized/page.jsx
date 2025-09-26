import Link from "next/link";

export default function NotAuthorized() {
  return (
    <div className="flex flex-col items-center justify-center absolute inset-0">
      <h1 className="text-6xl font-bold text-primary mb-2">401</h1>
      <h2 className="text-primary mb-4">Not Authorized</h2>
      <p className="text-silver mb-6 text-center max-w-md">
        You do not have permission to access this page. Please log in with the appropriate account or contact the administrator if you believe this is an error.
      </p>
      <div className="space-x-4">
        <Link
          className="text-center button-primary"
          href="/login"
        >
          Go to login
        </Link>
        <Link
          className=" button-secondary"
          href="/"
        >
          Return to Listings
        </Link>
      </div>
    </div>
  );
}
