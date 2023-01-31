# Object-Relational Mapping
- ORM, 객체 관계 매핑

## JPA
- @Entity
- JpaRepository

## Entity
```java
@Column(columnDefinition = "INT UNSIGNED") // 
@OneToMany(mappedBy = "boardFk") //
```
- 1)
  - // @JoinColumn(name="boardFk")
// 양방향일 경우 어떤 테이블 기준으로 데이터를 삭제하면 그것에 관련된 데이터들을 다 삭제할 것인가?
// FK 관리 주인을 설정해 줌
// MANY 쪽이 주인
// ManyToOne은 항상 주인

## JpaRepository
- CRUD
- Read : find로 시작
- Delete : delete로 시작
- Create : save
- Update : 조회 수정후 save

## 스프링부트 공식 Docs


## Cf) Cors
- @CrossOrign : Controller에 달아주면 됨
