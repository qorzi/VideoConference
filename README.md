# VideoConference

frontend 사전 설정
  버전
  node -v v18.12.1

  사용
  react
  react-router-dom
  recoil
  styled-component


<!-- 아래 설정은 최소 구성 시에 적용하는 방법 -->
<!-- git clone일 경우, npm i 만 진행 하면 된다. -->
# eslint & prettier
해당 프로젝트에선 아래의 기본적인 룰만 적용한다.
; semi는 필수로 적는다.
' 따움표는 단수만 적는다.
탭 너비는 2칸으로 고정한다.

```bash

$ npx eslint --init
  # 아래 설정으로 진행한다.
  # - You can also run this command directly using 'npm init @eslint/config'.
  # Need to install the following packages:
  # @eslint/create-config@0.4.2
  # Ok to proceed? (y) y
  # √ How would you like to use ESLint? · style
  
  # √ What type of modules does your project use? · esm
  # √ Which framework does your project use? · react
  # √ Does your project use TypeScript? · No
  # √ Where does your code run? · node
  # √ How would you like to define a style for your project? · guide
  # √ Which style guide do you want to follow? · standard
  # √ What format do you want your config file to be in? · JSON
  # Checking peerDependencies of eslint-config-standard@latest
  # Local ESLint installation not found.
  # The config that you've selected requires the following dependencies:
  
  # eslint-plugin-react@latest eslint-config-standard@latest eslint@^8.0.1 eslint-plugin-import@^2.25.2 eslint-plugin-n@^15.0.0 eslint-plugin-promise@^6.0.0
  # √ Would you like to install them now? · Yes
  # √ Which package manager do you want to use? · npm
  # Installing eslint-plugin-react@latest, eslint-config-standard@latest, eslint@^8.0.1, eslint-plugin-import@^2.25.2, eslint-plugin-n@^15.0.0, eslint-plugin-promise@^6.0.0

```

설정이 완료되면 .eslintrc.json 파일이 생성된다.

```bash

$ npm -D prettier

# eslint와 prettier 충돌방지 모듈
# eslint와 prettier을 함께 사용하면 충돌일 발생한다. 그럼에도 써야하기 때문에 설치
$ npm install eslint-plugin-prettier eslint-config-prettier --save-dev

```

```json

// 위의 파일들을 설치 후 package.json으로 이동해 아래 설정을 추가한다.
"scripts": {
    //...
    "//lint": "해당 파일에 lint가 적용된다.",
    "lint": "eslint --ext .js,.jsx,.ts,.tsx --fix src/",
    "//fix": "해당 파일을 prettier가 수정한다.",
    "fix": "prettier --write src/**/*.{js,jsx,ts,tsx,css,scss,md}",
}

```

# Husky & lint-staged
```bash

# .git과 package.json이 같은 폴더에 존재 할 경우,
$ npx mrm@2 lint-staged
# 이걸 하면 .husky 폴더도 생기고 package.json에 코드들도 자동으로 추가된다.
# npx mrm@2 lint-staged husky와 lint-staged를 호환하기 위한 설정을 자동으로 가져옴(다른 누군가가 올려둔 설정을 복사해온다.)

# 단, .git과 node-module의 위치가 다른 폴더 구조일 경우, husky의 path를 pre-commit에서 경로 수정 해주어야 한다.
# 해당 프로젝트의 경우 .git이 상위에 존재하고 하위에 package.json이 존재한다.
# 그럴 경우 다음처럼 각각 설치해서 직접 설정한다.
$ npm i -D husky lint-staged

```

husky 설치 후에 `package.json`에서 prepare scripts, lint-staged 내용 추가
```json
// package.json
  "scripts": {
      // ...
      "//prepare": "해당 프로젝트는 .git이 상위 폴더에 존재 하기 때문에, prepare가 .git이 있는 폴더까지 도달했다가 하위로 내려와 인스톨 되어야 한다.",
      "prepare": "cd ../ && husky install ./[Folder Name]/.husky",
  },
  // ...
  // 하단에 추가
  "//lint-staged": "lint-staged가 사용할 lint 규칙을 명시해줘야 한다. prettier와 eslint를 가지고 lint한다.",
  "lint-staged": {
    "//**/*{js,ts}": "모든 경로 모든 js, ts 파일에 대해 린트를 실행한다.",
    "**/*.{js,ts}": [
      "prettier . --write",
      "eslint --ext .js,.jsx,.ts,.tsx --fix src/"
    ],
    "*.{js,css,scss}": "prettier --write"
  }

```

그 후에 `npm i`하면 .husky 폴더가 생성됨
.husky 폴더에서 pre-commit 파일 생성하고 아래와 같이 입력.
```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
cd ./[Folder Name] && npx lint-staged
```

설정이 완료되면, 
```bash
$ npm run prepare
```

이제 git commit 해서 테스트 해보면 된다.