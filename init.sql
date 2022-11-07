-- 데이터베이스 목록 보기
SHOW databases;

-- 데이터베이스 선택
USE kdt;

-- 데이터베이스 생성
DROP TABLE visitor;
CREATE TABLE visitor (
  id INT NOT NULL PRIMARY KEY auto_increment,
  name VARCHAR(10) NOT NULL,
  comment MEDIUMTEXT
);

-- 테이블 구조 확인
DESC visitor;

-- 데이터베이스 데이터 조회 (Read)
SELECT * FROM visitor;

-- 데이터베이스 데이터 추가 (Cerate)
INSERT INTO visitor (name, comment) VALUES("홍길동", "내가 왔다.");
INSERT INTO visitor (name, comment) VALUES("이찬혁", "으라차차");

-- 데이터베이스 데이터 수정 (Update)
UPDATE visitor SET comment = '으라차차' WHERE id = 2;

-- 데이터베이스 데이터 삭제 (Delete)
DELETE FROM visitor WHERE id >=17;

