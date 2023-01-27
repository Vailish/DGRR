# 모던자바와 파이썬
- 함수형과 스트림
- 고수준 병렬/동시성 지원
- 파이썬

# 모던 자바
- 함수형 프로그래밍 도입으로 큰 변화가 있었던 Java 8 이후

## 모던 자바의 특징
- 함수형 패러다임 도입
- 쉬운 동시성(병렬처리) 도입
- 모듈형 강화
- 개발자 편의 API 추가

## 함수형
- 함수를 일급시민에 포함
- 익명 클래스의 번거로움을 `람다`로 간편하게, 메서드 참조로 재사용
- 코드 블록을 주입(동작 파라미터화)하고 조합할 수 있게 됨
- 스트림의 기반, 병렬처리와 조화
- 주요 패키지, 클래스
  - @FunctionalInterface
  - java.util.function
  - Consumer, Supplier, Function, Predicate
  - Operator
  - 기본형 Int, Long, Double

## 함수형 - 람다
- 람다 = 익명함수, 익명 클래스를 대체
- 함수형 인터페이스(이름 있는 람다) : 하나의 추상 메서드를 가진 인터페이스
- 메서드 참조 : 메서드나 생성자를 참조하기(::)

## 스트림
- 컬렉션 + 함수형, 데이터 처리 연산을 지원하도록 소스에서 추출된 연속된 요소
  - 외부 순환(for, while, ..) VS 내부 순환(VM아 이거 해줘~)
  - SQL 처럼 선언형 스타일로 데이터를 처리
  - 쉽게 병렬처리 적용 : parallelStream 메서드
- 주요 패키지, 클래스, 메서드
  - java.util.stream
  - BaseStream, Stream
  - map(), filter(), reduce(), min(), ...
  - C.stream(), C.parallelStream()

## 스트림 - 주요 개념
- 중간 연산과 최종 연산
  - 중간 연산은 스트림을 반환, 여러 연산을 조합할 수 있음
  - 최종 연산을 스트림을 모두 소비하고 닫음
  - 스트림은 1회용(최종 연산 이후 사용불가)
```
Collection - Stream - filter - map collect - Collection

Stream : collect 끝날 때 close
filter : Predicate
map : Function
collect : collector/Consumer
```

# 파이썬
- 원래부터 함수형으로 시작(v1.0, 1994)
- 내장 컬렉션 = 리스트, 딕셔너리, 튜플, 세트, ..
- lambda, itertools, functools, generator

## 병렬/동시성
- 병렬은 좋으나 사용이 어려움
- 저수준 병렬 처리의 어려움 : Thread, Lock, synchronized, ...
- 안전하고 쉬운 병렬처리 방법 제공
  - 많이 사용되는 패턴들을 언어 차원에서 API로 지원
  - 고수준, 추상화, Thread Safety, 비동기 지원
- 주요 패키지, 클래스
  - java.util.concurrent
  - Executor(s), ExecutorService
  - xxThreadPool, ForkJoinPool
  - Future, CompletableFuture
  - Runnable, Callable

## Executor / Service / Etc
- Thread를 직접 생성, 관리하지 않고 ExecutorService에서 스레드 관리
- 작업(Runnable, Callable)을 Executor 서비스에 요청하고 결과 받기
- 작업 스케줄링(cron, at)기능 : ScheduledExecutorService\
- Concurrent Collection : Thread Safe List / Map 제공
- Atomic Variable : 변수 자체가 원자성을 보장
- Lock 객체 : 동기화 패턴에 따라 사용할 수 있는 유틸리티

## 비동기 지원
- 동기 vs 비동기 & 블록(block) vs non-block
- 작업이 끝날 때까지 기다리기 vs 하고서 나중에 물어보기
- Future : 비동기 연산 지원, 완료 확인/대기/결과 조회/취소
- CompletableFuture : Future 작업 연결, 순서 정의 등

# 파이썬
- 파이썬은 느리다 : 일부만 맞는 얘기
- GIL 문제 : 스레드 활용을 제한하는 요소
- multiprocessing
- asyncio, coroutine
- future, executors, ThreadPoolExecutor

# ETC
## Java
- Reactive(Flow API)
- 모듈화
- Optional
- 타입 추론(var)
- 컬렉션 API 개선
- 날짜와 시간 API 개선
- Fork-Join 프레임워크
- Spliterator
- 인터페이스에 구현을 포함
- try-with resources(AutoCloseable)
- http client
- 향상된 switch 문
- 새로운 GC 알고리즘
- etc...

## Python
- 성능 개선
- match-case(Structural Pattern Matching)
- Context Manager
- 예외 처리 강화
- 타입 안정성 강화(타입 힌트)
- 제너레이터
- 각종 데코레이터
- 상세한 에러 메시지
- 안 쓰는 기능들 정리(deprecated)
- etc...

# 안쓰는 기능
- Java Support Tools
  - jps / jstack / jhat / jmap
  - jshell
  - flight recoder, jmx, Spring Actuator
- Python Tools
  - profile(cProfile), memory_profiler, vProf
  - snakeviz