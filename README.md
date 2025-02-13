## 🚀 실행 방법

### 1. **프로젝트 클론 (Clone Repository)**

```bash
git clone https://github.com/leejh4197/bigs-frontend-task.git
cd bigs-task
```

### 2. **패키지 설치 (Install Dependencies)**

```bash
yarn
```

- 프로젝트 실행에 필요한 모든 의존성을 설치합니다.

### 3. **환경 변수 설정 (Set Up Environment Variables)**

- 프로젝트 루트에 `.env` 파일을 생성하고 아래 내용을 추가하세요:

```env
VITE_BASE_URL=https://front-mission.bigs.or.kr/
```

### 4. **프로젝트 실행 (Start Project)**

```bash
yarn dev
```

- 기본 포트는 `http://localhost:5173/`입니다.

### 사용 기술 및 스택

- Typescript(Javascript), React-Query, Tailwind

### 구현 내용

- 사용자 회원가입
- 로그인
- 리프레시 토큰 로그인
- 토큰을 디코딩하여 사용자 아이디 및 이름 표시
- 글 등록,수정,삭제
- 게시물 조회 (페이지네이션)
