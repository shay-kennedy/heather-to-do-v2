function onReady() {
  const toDos = [];
  let toDoDeleteList = [];
  const addToDoForm = document.getElementById('addToDoForm');
  let id = 0;

  function createNewToDo() {
    const newToDoText = document.getElementById('newToDoText');
    if (!newToDoText.value) { return; }
    id += 1

    toDos.push({
      title: newToDoText.value,
      complete: false,
      id: id,
    });

    newToDoText.value = '';

    renderTheUI();
  }

  function deleteToDos(toDoDeleteList) {
    toDoDeleteList.forEach(toDoDelete => {
      const index = toDos.findIndex(toDo => {
        return toDo.id === toDoDelete.id;
      });
      toDos.splice(index, 1);
    });
    toDoDeleteList.splice(0, toDoDeleteList.length)
    const deleteButton = document.getElementById('deleteButton')
    deleteButton.hidden = true
    renderTheUI();
  }

  function handleCheck(toDo, checked) {
    if (checked) {
      toDoDeleteList.push(toDo);
    } else {
      const index = toDoDeleteList.findIndex(toDoDelete => {
        return toDoDelete.id === toDo.id;
      });
      toDoDeleteList.splice(index, 1);
    };
    if (toDoDeleteList.length > 0) {
      const deleteButton = document.getElementById('deleteButton')
      deleteButton.hidden = false
      deleteButton.innerHTML = 'Delete ToDo'
      if (toDoDeleteList.length > 1) {
        deleteButton.innerHTML = 'Delete ToDos'
      }
    }
  }

  function renderTheUI() {
    const toDoList = document.getElementById('toDoList');
    toDoList.textContent = '';

    toDos.forEach(function(toDo) {
      const newLi = document.createElement('li');
      const deleteCheckbox = document.createElement('input');
      deleteCheckbox.type = 'checkbox';
      deleteCheckbox.addEventListener('change', event => {
        handleCheck(toDo, deleteCheckbox.checked);
      });
      newLi.textContent = toDo.title;
      newLi.appendChild(deleteCheckbox);

      toDoList.appendChild(newLi);
    });
  }

  const deleteButton = document.createElement('button');
  deleteButton.setAttribute('id', 'deleteButton')
  deleteButton.hidden = true
  deleteButton.addEventListener('click', event => {
    deleteToDos(toDoDeleteList);
  });
  document.body.appendChild(deleteButton)

  addToDoForm.addEventListener('submit', event => {
    event.preventDefault();
    createNewToDo();
  });

  renderTheUI();
}

window.onload = function() {
    onReady();
 };
