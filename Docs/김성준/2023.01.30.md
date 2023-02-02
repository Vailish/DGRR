# @DynamicUpdate
- JPA Entity에사용
- 실제 값이 변경된 컬럼으로만 update 쿼리를 만드는 기능
- 변경되는 컬럼에따라 쿼리가 변경
- 성능상 손해가 존재
- 하나의 테이블에 많은 수 의 컬럼이 있는데, 몇개의 컬럼만 자주 업데이트하는 경우에 사용

- 참고 https://velog.io/@freddiey/JPA%EC%9D%98-DynamicUpdate

# MySQL 유저권한 이슈
## 문제 발생
- Spring boot에서 root가 아닌 새로운 아이디와 비밀번호로 연결 시켜줬는데, mysql에서 권한 없음을 띄우면서 진행이 안됨
## 문제 해결 과정
- MySQL을 재설치 후 root의 비밀번호를 변경해봄 -> 결과는 같음
- 구글링 후 user를 새로 만들어야 함을 인지하고 아래와 같이 시도하였음
- mysql user를 새로 만들어서 '%'를 넣어서 권한을 부여함 -> 권한 없음
```sql
mysql> grant all privileges on DB이름.* to 계정ID@'%' identified by '계정비밀번호' with grant option;
mysql> flush privileges ;
```
- 외부접근을 허용하는 % 대신에 localhost를 넣어서 진행해봄 -> MySQL 문법 오류가 뚬

## 문제 해결
- 위의 명령어는 mysql 5.7버전것으로 지금 사용중인 8.0버전에서는 작동하지 않음
- 새로 버전을 넣어서 구글링하여 새로운 명령어를 인지하고 진행함
```
mysql> create user 계정ID@'%' identified by '계정비밀번호' ;  // 유저생성
mysql> grant all privileges on DB이름.* to 계정ID@'%' with grant option; // 권한 부여
mysql> flush privileges; // 변경된 권한 적용
```
- 위와 같이 진행하여 문제를 해결함
- [참고 자료](https://fruitdev.tistory.com/206)


## M:N JPA
https://wale.tistory.com/entry/JPA-%EB%8B%A4%EC%96%91%ED%95%9C-%EC%97%B0%EA%B4%80%EA%B4%80%EA%B3%84-%EB%A7%A4%ED%95%914-%EB%8B%A4%EB%8C%80%EB%8B%A4-N-M

https://sasca37.tistory.com/164?category=1218758#%EB%-B%A-%EB%-C%--%EC%-D%BC%--%EB%-B%A-%EB%B-%A-%ED%--%A-