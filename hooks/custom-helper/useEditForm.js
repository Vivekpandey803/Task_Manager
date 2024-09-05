import { useState } from "react";

const useFormHandler = (initialData = {}) => {
  const [formData, setFormData] = useState(initialData);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return { formData, handleEditChange, setFormData };
};

export default useFormHandler;
