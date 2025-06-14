import { useState } from "react";

type Gender = "" | "남성" | "여성";

type FormData = {
  name: string;
  email: string;
  age: number;
  gender: Gender;
  bio?: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  age?: string;
  gender?: string;
  bio?: string;
};

const initialForm: FormData = {
  name: "",
  email: "",
  age: 0,
  gender: "",
  bio: "",
};

function Form() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (
    name: keyof FormData,
    value: any
  ): string | undefined => {
    switch (name) {
      case "name":
        return value.trim() ? undefined : "이름은 필수입니다.";
      case "email":
        console.log(value);
        if (!value.trim()) {
          return "이메일은 필수입니다.";
        } else if (!emailRegex.test(value)) {
          return "올바른 형식의 이메일을 입력해주세요";
        } else {
          return undefined;
        }
      case "age":
        return Number(value) > 0 ? undefined : "1 이상의 숫자를 입력해주세요";
      case "gender":
        return value ? undefined : "성별은 필수입니다.";
      default:
        return undefined;
    }
  };

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};
    (Object.keys(form) as (keyof FormData)[]).forEach((key) => {
      const error = validateField(key, form[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const parsedValue = name === "age" ? Number(value) : value;

    setForm((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const error = validateField(name as keyof FormData, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateAll()) {
      alert("폼 제출 완료!");
      setForm(initialForm);
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">이름</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
      </div>

      <div>
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          name="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
      </div>

      <div>
        <label htmlFor="age">나이</label>
        <input
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
          onBlur={handleBlur}
          min={0}
        />
        {errors.age && <div style={{ color: "red" }}>{errors.age}</div>}
      </div>

      <div>
        <label htmlFor="gender">성별</label>
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="" disabled>
            성별 선택
          </option>
          <option value="남성">남성</option>
          <option value="여성">여성</option>
        </select>
        {errors.gender && <div style={{ color: "red" }}>{errors.gender}</div>}
      </div>

      <div>
        <label htmlFor="bio">자기소개 (선택)</label>
        <input
          type="text"
          name="bio"
          value={form.bio}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      <button type="submit">제출</button>
    </form>
  );
}

export default Form;
