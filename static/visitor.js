const tbody = document.querySelector('tbody');
const buttonGroup = document.querySelector('#button-group');

// 폼의 [등록] 버튼 클릭시
// - 테이블에 데이터 추가
function createVisitor() {
  const form = document.forms['visitor-form'];
  console.log(form);

  axios({
    method: 'POST',
    url: '/visitor/write',
    data: {
      name: form.name.value,
      comment: form.comment.value,
    },
  })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .then((data) => {
      console.log(data);

      const html = `
            <tr id="tr_${data.id}">
              <td>${data.id}</td>
              <td>${data.name}</td>
              <td>${data.comment}</td>
              <td><button type="button" onclick="editVisitor(${data.id});">수정</button></td>
              <td><button type="button" onclick="deleteVisitor(this, ${data.id});">삭제</button></td>
            </tr>`;

      // insertAdjacentHTML: 특정 요소에 html 추가
      // vs. innerHTML: 기존 노드 지우고 덮어씌움
      // https://developer.mozilla.org/ko/docs/Web/API/Element/insertAdjacentHTML
      // https://chlolisher.tistory.com/158
      tbody.insertAdjacentHTML('beforeend', html); // ver. js
      // $('tbody').append(html); // ver. jquery
    });
}

// 테이블의 [수정] 버튼 클릭시
// - input에 값 넣기
// - [변경], [취소] 버튼 보이기
async function editVisitor(id) {
  console.log('edit visitor!!');
  console.log(id);

  // async-await
  // axios의 결과를 result 라는 변수에 담아야 함.
  // -> axios 처리를 기다렸다가 result에 담아주어야 함. (잠시동안 동기처리 필요)
  // -> 즉, await를 만나 프로미스(async가 붙으면 반드시 프로미스 반환하므로!)가 처리될 때까지 기다림.
  // otherwise, undefined 찍힘
  let result = await axios({
    method: 'GET',
    url: `/visitor/get?id=${id}`,
  }).then((res) => {
    console.log(res.data);
    return res.data;
  });
  console.log(result);

  const form = document.forms['visitor-form'];
  form.id.value = result.id;
  form.name.value = result.name;
  form.comment.value = result.comment;

  const html = `
          <button type='button' onclick='editDo(${id});'>변경</button>
          <button type='button' onclick='editCancel();'>취소</button>`;
  buttonGroup.innerHTML = html;
}

// [변경] 버튼 클릭시
// - 데이터 변경
function editDo(id) {
  const form = document.forms['visitor-form'];

  axios({
    method: 'PATCH',
    url: '/visitor/edit',
    data: {
      id: id,
      name: form.name.value,
      comment: form.comment.value,
    },
  })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .then((data) => {
      alert(data); // 주석 처리; alert 없이 바로 변경

      const children = document.querySelector(`#tr_${id}`).children;
      // in jquery
      // $(children[1]).text(form.name.value);
      // $(children[2]).text(form.comment.value);
      // in js
      children[1].textContent = form.name.value;
      children[2].textContent = form.comment.value;

      // check
      console.log(children);

      // 입력창 초기화
      editCancel();
    });
}

// [취소] 버튼 클릭시
// - input 초기화
// - [등록] 버튼 보이기
function editCancel() {
  const form = document.forms['visitor-form'];
  form.name.value = '';
  form.comment.value = '';

  const html = `<button type='button' onclick='createVisitor();'>등록</button>`;
  buttonGroup.innerHTML = html;
}

// [삭제] 버튼 클릭시
// - 테이블에서 해당 행 삭제
function deleteVisitor(obj, id) {
  console.log('obj', obj);
  console.log('id', id);

  axios({
    method: 'DELETE',
    url: '/visitor/delete',
    data: {
      id: id,
    },
  })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .then((data) => {
      alert(data);

      console.log(obj);
      obj.parentElement.parentElement.remove();
      // obj.closest(`#tr_${id}`).remove(); // 더 간편 ver
    });
}
