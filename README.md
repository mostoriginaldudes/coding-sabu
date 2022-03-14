# 코딩사부

>온라인 개발 튜터링 서비스 

[![코딩사부_이미지](https://user-images.githubusercontent.com/46208349/158141714-fc804997-199f-4263-a35a-e200c8e51628.png)](https://coding-sabu-frontend.vercel.app)

__위의 이미지를 클릭하시면 `코딩사부`로 이동합니다.__

### 소개

```
코딩사부는 온라인 개발 튜터링을 제공하는 서비스 입니다. 

웹에는 많은 기술 블로그가 있습니다. 이러한 기술 블로그 중 몇은 정말 값을 지불하고 보고 싶을 정도로 유용한 컨텐츠가 많은데요. 
'작가는 소정의 수익을, 독자에겐 공신력있는 정보를 얻게 해주는 서비스를 만들면 어떨까' 하는 생각으로 서비스를 개발해보았습니다.
```

### 실행

```sh
git clone https://github.com/mostoriginaldudes/coding-sabu.git

cd coding-sabu-frontend

yarn install

yarn dev
```

### 서비스 흐름도

![코딩사부_흐름도 001](https://user-images.githubusercontent.com/46208349/158207198-3cfdeeff-b1e9-46fb-a41e-acf58fbf6752.png)

### 개발 과정

```
1. CRA를 이용하여 프로젝트 환경 구축

2. React + TS를 이용하여 프론트엔드 개발

3. Redux를 이용한 상태관리
   3-i) props drilling을 막고, 컴포넌트 전역에서 사용되는 상태를 리액트 컴포넌트와 분리하여 관리하기 위함.
   
4. Redux, Redux Thunk를 사용하면서 반복되는 패턴으로 가독성이 저하되어 코드 파악하는 시간이 길어짐. 
   4-i) 특히 액션 생성 함수가 응집도가 떨어지고, 비동기 액션과 구분이 어려움.
   
5. Redux 사용시에 반복되는 패턴을 줄이고 액션 생성 함수의 응집도를 높여주기 위해서 Redux Toolkit 도입
   5-i) 동기 액션과 비동기 액션을 reducer, extraReducer로 구분하여 적용할 수 있었음.

6. JWT 토큰을 이용한 인증 방식 적용.
   6-i) 토큰은 데이터 접근 권한 인증을 위한 Access Token과 Access Token을 재발급 받을 수 있도록 하는 Refresh Token으로 구성됨.
   6-ii) Refresh Token은 쿠키에 저장하고, Access Token은 Store에서 관리.
   6-iii) 매 API 콜마다 Axios Interceptor를 통해서 Access Token을 Http Header에 실어 보냄.
   6-iv) Access Token이 만료되면 Refresh Token을 확인하고 유효하면 재발급을, 유효하지 않거나 만료일이 지난다면 로그아웃.

7. 로그인을 통해서 받아온 Access Token과 유저 정보는 Store에 저장. 
   7-i) 이를 로컬 스토리지에 저장하여 로그인을 유지하고, Store와 동기화하기 위해서 Redux Persist 적용.
   
8. SSR을 적용하기 위해서 Nextjs로 마이그레이션.
```

### 사용 기술

* FE

![](https://img.shields.io/badge/React.js-61DAFB?style=&logo=React&logoColor=white) &nbsp;
![](https://img.shields.io/badge/Redux-764ABC?style=&logo=Redux&logoColor=white) &nbsp; 
![](https://img.shields.io/badge/Typescript-0074CE?style=&logo=Typescript&logoColor=white) &nbsp; 
![](https://img.shields.io/badge/Next-000000?style=&logo=Next.js&logoColor=white) &nbsp; 
![](https://img.shields.io/badge/Vercel-000000?style=&logo=Vercel&logoColor=white)

* BE

![](https://img.shields.io/badge/Java-007396?style=&logo=java&logoColor=white) &nbsp; 
![](https://img.shields.io/badge/SpringBoot-6DB33F?style=&logo=SpringBoot&logoColor=white) &nbsp; 
![](https://img.shields.io/badge/Mariadb-1F305F?style=&logo=MariaDB&logoColor=white) &nbsp; 
![](https://img.shields.io/badge/AWS-232F3E?style=&logo=AmazonAWS&logoColor=white)
