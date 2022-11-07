const mysql = require('mysql');

// DB 연결
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: '1234',
  database: 'kdt',
});

exports.getVisitors = (cb) => {
  // [Before]
  // return [
  //   { id: 1, name: '홍길동', comment: '내가 왔다.' },
  //   { id: 2, name: '이찬혁', comment: '으라차차' },
  // ];

  // [After]
  conn.query(`SELECT * FROM visitor`, (err, rows) => {
    if (err) {
      throw err;
    }

    console.log('Visitor.js: ', rows);
    cb(rows);
  });
};

exports.getVisitor = (id, cb) => {
  conn.query(`SELECT * FROM visitor WHERE id=${id}`, (err, rows) => {
    if (err) {
      throw err;
    }

    console.log('Visitor.js: ', rows);
    cb(rows[0]);
  });
};

exports.postVisitor = (data, cb) => {
  console.log(data);
  conn.query(`INSERT INTO visitor(name, comment) VALUES('${data.name}', '${data.comment}');`, (err, rows) => {
    if (err) {
      throw err;
    }

    console.log('Visitor.js: ', rows);
    cb(rows.insertId);
  });
};

exports.patchVisitor = (data, cb) => {
  console.log(data);
  conn.query(`UPDATE visitor SET name='${data.name}', comment='${data.comment}' WHERE id=${data.id}`, (err, rows) => {
    if (err) {
      throw err;
    }

    console.log('Visitor.js: ', rows);
    cb(rows); // true, rows(=true)
  });
};

exports.deleteVisitor = (id, cb) => {
  console.log(id);
  conn.query(`DELETE FROM visitor WHERE id=${id}`, (err, rows) => {
    if (err) {
      throw err;
    }

    console.log('Visitor.js: ', rows);
    cb(rows); // true, rows(=true)
  });
};
