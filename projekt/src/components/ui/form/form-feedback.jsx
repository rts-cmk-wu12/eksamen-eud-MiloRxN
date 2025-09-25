export default function FormFeedback({ errors, success }) {
  if (errors && errors.length > 0) {
    return (
      <div className="space-y-4">
        {errors.map((error, index) => (
          <span className="error-message" key={index}>{error}</span>
        ))}
      </div>
    );
  }
  if (success) {
    return (
      <span className="success-message">
        {success}
      </span>
    );
  }
  return null;
}
