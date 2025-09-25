export default function FormFeedback({ errors, success }) {
  if (errors && errors.length > 0) {
    return (
      <div className="error-message">
        {errors.map((error, index) => (
          <span key={index}>{error}</span>
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
