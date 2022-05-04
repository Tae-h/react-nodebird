
node is javascript runtime!! 

- 런타임(runtime)이란 프로그래밍 언어가 구동되는 환경을 말합니다.
- 따라서 --> 노드란 자바스트립느 언어가 구둥되는 환경이다.

Express 란!
- Express.js는 Node.js의 핵심 모듈인 http와 Connect 컴포넌트를 기반으로 하는 웹 프레임워크다. 
그러한 컴포넌트를 미들웨어(middleware)라고 하며, 설정보다는 관례(convention over configuration)와 같은 프레임워크의 철학을 지탱하는 주춧돌에 해당한다. 즉, 개발자들은 특정 프로젝트에 필요한 라이브러리를 어떤 것이든 자유롭게 선택할 수 있으며, 이는 개발자들에게 유연함과 수준 높은 맞춤식 구성을 보장한다.


### 넥스트.js 에서 getStaticProps 와 getServerSideProps 의 차이점
둘다 서버사이드 렌더링으로 페이지가 렌더링 하기 전에 데이터를 먼저 fetch 한다.
- getStaticProps : 빌드시 고정되는 값으로, 빌드이후에는 변경이 불가합니다.
- getServerSideProps : 빌드와 상관없이, 매 요청마다 데이터를 서버로부터 가져옵니다.

### pm2 끄는법 --> npx pm2 kill
### npx pm2 monit <-- log monit

### 명령어 모음
- pm2 종료 --> npx pm2 kill
- pm2 모니터링 --> npx pm2 monit
- log --> npx pm2 logs
- 에러로그 --> npx pm2 logs --error
- pm2 리스트 --> npm pm2 list
- pm2 로 실행한 서버들 재시작 --> npx pm2 reload all