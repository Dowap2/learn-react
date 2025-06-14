import { useState } from "react";

function Form() {
  type FormData = {
    name: string;
    email: string;
    age: number;
    gender: "남성" | "여성" | "";
    bio?: string;
  };
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    age: 0,
    gender: "",
    bio: "",
  });

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = "이름은 필수입니다.";
    if (!form.email.trim()) newErrors.email = "이메일은 필수입니다.";
    if (form.age === 0) newErrors.age = "나이는 필수입니다.";
    if (!form.gender.trim()) newErrors.gender = "성별은 필수입니다.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // 에러 없으면 true
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      return "success";
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">name</label>
        <input
          type="text"
          value={form.name}
          name="name"
          onChange={handleChange}
        />
        {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
      </div>

      <div>
        <label htmlFor="name">email</label>
        <input
          type="email"
          value={form.email}
          name="email"
          onChange={handleChange}
        />
        {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
      </div>

      <div>
        <label htmlFor="name">age</label>
        <input
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
        />
        {errors.age && <div style={{ color: "red" }}>{errors.age}</div>}
      </div>

      <div>
        <label htmlFor="name">gender</label>
        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="" disabled>
            성별 선택
          </option>
          <option value="남성">남성</option>
          <option value="여성">여성</option>
        </select>
        {errors.gender && <div style={{ color: "red" }}>{errors.gender}</div>}
      </div>

      <div>
        <label htmlFor="name">bio</label>
        <input
          type="text"
          name="bio"
          value={form.bio}
          onChange={handleChange}
        />
      </div>

      <button type="submit">제출</button>
    </form>
  );
}

export default Form;
