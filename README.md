# React 학습용 프로젝트 요구사항 상세 정리

## 🔧 프로젝트 개요: 유저 등록 및 관리 앱

React 학습을 위한 폼, 상태, validation, context, react-query 등 핵심 개념을 다룬 실습용 요구사항입니다.

---

## ✅ 요구사항 1: 유저 등록 폼 만들기 (Form + Controlled)

### 📌 필드

| 필드명 | 타입   | 설명        |
| ------ | ------ | ----------- | -------- | ------- |
| name   | string | 사용자 이름 |
| email  | string | 이메일 주소 |
| age    | number | 나이        |
| gender | string | 'male'      | 'female' | 'other' |
| bio    | string | 자기소개    |

### 💡 Test API

- 없음 (로컬 상태로 처리)

### 🧪 Validation Rule

- name: 필수
- email: 필수, 이메일 형식 (`@` 포함)
- age: 필수, 1 이상 숫자
- gender: 필수
- bio: 선택

### 👤 사용자 시나리오

1. 유저가 폼을 입력하고 제출한다.
2. 각 필드는 실시간으로 입력값을 상태로 반영한다.
3. 제출 시 validation 실패하면 해당 필드에 메시지가 표시된다.
4. 성공 시 입력값은 초기화되고 유저 리스트에 추가된다.

---

## ✅ 요구사항 2: 입력 유효성 검사 (Validation)

### 🔧 유효성 방식

- 실시간: `onBlur`, `onChange`로 체크
- 제출 시: `onSubmit` 시 모든 필드 재검사

### 🚫 에러 예시

- 이름: "이름을 입력해주세요."
- 이메일: "올바른 이메일 형식이 아닙니다."
- 나이: "1 이상의 숫자를 입력해주세요."

---

## ✅ 요구사항 3: 유저 리스트 상태 관리

### 📌 동작

- 등록된 유저는 배열 형태로 저장됨

```ts
type User = {
  id: number;
  name: string;
  email: string;
  age: number;
  gender: string;
  bio: string;
};
```

### 👤 사용자 시나리오

1. 폼 제출 후 리스트에 등록됨
2. 여러 명을 연속 등록 가능
3. 리스트는 실시간으로 반영됨

---

## ✅ 요구사항 4: Uncontrolled Component 사용

### 📌 대상 필드: `bio` (자기소개)

- `textarea`를 `useRef`로 제어
- 등록 시 `ref.current.value`로 읽기

---

## ✅ 요구사항 5: 등록 후 포커싱 (useEffect + ref)

### 👤 사용자 시나리오

1. 유저 등록 시 bio를 제외한 필드 초기화
2. 이름 input으로 자동 포커싱

---

## ✅ 요구사항 6: 로컬 스토리지 연동 (useEffect)

### 📌 키: `"userList"`

### 👤 사용자 시나리오

1. 앱이 처음 로드되면 `localStorage.getItem`으로 리스트 복구
2. 유저를 추가/삭제하면 `localStorage.setItem`으로 업데이트

---

## ✅ 요구사항 7: Context로 전역 상태 공유

### 📦 UserContext 구조

```ts
const UserContext = createContext<{
  users: User[];
  addUser: (user: User) => void;
  deleteUser: (id: number) => void;
} | null>(null);
```

---

## ✅ 요구사항 8: 서버에서 유저 불러오기 (react-query)

### 🌐 Test API

```http
GET https://jsonplaceholder.typicode.com/users
```

### 📌 필요한 필드 가공

```ts
{
  id,
  name,
  email,
  gender: 'other',
  age: Math.floor(Math.random() * 40 + 20),
  bio: 'Fetched user'
}
```

---

## ✅ 요구사항 9: 유저 삭제 기능 (useMutation)

### 🌐 Mock API (JSONPlaceholder 기준)

```http
DELETE https://jsonplaceholder.typicode.com/users/:id
```

---

## ✅ 요구사항 10: 검색/필터링 기능 (state + useMemo)

### 👤 사용자 시나리오

1. 상단 검색창에 키워드 입력
2. 이름 기준으로 실시간 필터링
3. useMemo로 성능 최적화

---

## 💡 추가 아이디어

| 아이디어      | 기술 포인트                 |
| ------------- | --------------------------- |
| 다크모드 토글 | Context + CSS 변수          |
| react-router  | 등록/목록/상세 페이지 분리  |
| toast 알림    | 등록/삭제 성공 시 알림 표시 |
