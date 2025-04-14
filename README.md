### sse-notification 

SSE (Server-Sent Events) 를 사용하여 알림 구현하기 !!

---

#### 📚 기술 스택

| 분류       | 사용 기술 |
|------------|-----------|
| **Front**  | React, TypeScript, Zustand, Tailwind, React Router, Axios |
| **Back**   | Spring Boot, Spring Security, JPA, JWT, MySQL, SpringDoc (OpenAPI) |
| **Realtime** | Server-Sent Events (SSE), EventSource Polyfill |
| **Infra**  | Docker, Docker Compose |
---

#### 🧩 주요 기능

- 회원가입 및 로그인 (JWT 토큰 발급)
- JWT 기반 인증/인가
- 권한 기반 사용자 분리 (USER / ADMIN)
- 관리자 실시간 알림 (SSE 기반)
- 알림 읽음 처리 및 분류 탭

---

#### 🛠️ 설치 방법 (로컬 개발)

```bash
git clone https://github.com/gawona/sse-notification.git
cd sse-notification
docker compose up --build
```

---

#### 📂 프로젝트 구조

```bash
📦backend
 ┣ domain
 ┃ ┣ notification
 ┃ ┗ user
 ┣ global
 ┣ ┣ common
 ┣ ┗ config
 ┗ BackendApplication.java
📦frontend
 ┣ src
 ┃ ┣ api
 ┃ ┣ components
 ┃ ┣ routes
 ┃ ┣ store
 ┃ ┣ util
 ┃ ┣ App.tsx
 ┃ ┗ AppRouter.tsx
```


