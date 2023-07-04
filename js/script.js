"use strict"
//Проверка на то, что документ уже загружен
document.addEventListener('DOMContentLoaded', function(){

 	const form = document.getElementById('form'); //Получаем нашу форму, обратившись по id
	form.addEventListener('submit', formSend);  //по событию submit назначаем обработчик formSend,
	//который запрещает стандартные действия и проверяет ввод.

	async function formSend(e) {
		e.preventDefault();  
		let error = formValidate(form);

		let formData = new FormData(form);// с помощью FormData "вытягиваем" все данные с полей
		// formData.append('image', formImage.files[0]);  // добавляем в переменную еще и изображение

		if(error === 0){
			form.classList.add('_sending');  //пока идет отправка добавляем класс _sending
			let response = await fetch('sendmail.php',{
				method: 'POST',
				body: formData
			});
			if(response.ok){
        let result = await response.json();
				// alert(result.message);
				alert("Регистрация прошла успешно");
				formPreview.innerHTML = '';
				form.reset();
				form.classList.remove('_sending');  //после отправки формы отбираем класс _sending
			}else{
				alert('Ошибка');
			}
		} else {
			setTimeout(buttonErrorAnimate, 0);
			alert("Заполните обязательные поля");
			setTimeout(buttonErrorAnimateDelete, 2000);
		 }
	}
function buttonErrorAnimate(){
	const button = document.querySelector(".form__button")
	button.classList.add('error-animate');
	}
function buttonErrorAnimateDelete(){
	const button = document.querySelector(".form__button")
	button.classList.remove('error-animate');
	}
	function formValidate(form) {
   let error = 0;
   let formReq = document.querySelectorAll('._req');  // класс ._req(required-требовать, проверять) добавляем полям, которые необходимо проверять.
   //Проходим циклом по всем елементам коллекции из объектов с кл ._req и выводим каждый в константу input и далее с ней работать
   for (let index = 0; index < formReq.length; index++) {
	const input = formReq[index];
	formRemoveError(input);  //перед к-либо проверкой убираем класс _error.

	if(input.classList.contains('_email')){
		if(!emailTestInput(input)){  //если тест не пройден, добавляем класс _error
			formAddError(input);
			error++;
		}
	}else if(input.getAttribute("type")==="checkbox" && input.checked===false){
		//проверяем input  на checkbox и на то, что он не включен.
		formAddError(input);
			error++;
	}else{
		     if(input.value===''){
			   formAddError(input);
			   error++;}
	  }
	}
	return error;
	}

	function formAddError(input){
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input){
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}
	function emailTestInput(input){
		return  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input.value);
	}
	//Получаем input type file в константу
	const formImage = document.getElementById('formImage');
	//Получаем div для preview в константу
	const formPreview = document.getElementById('formPreview');
	//Слушаем изменения в input type file, при событии будем отправляться в функцию uploadFile и передовать туда файл который выбран
	// formImage.addEventListener('change', ()=> {
	// 	uploadFile(formImage.files[0]);
	// });
	// function uploadFile(file){
	// 	// проверяем тип файла
	// 	if(!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)){
	// 		alert('Разрешены только изображения');
	// 		formImage.value = '';
	// 		return;
	// 	}
	// 	//Проверим размер файла (<2МБ)
	// 	if(file.size > 2 * 1024 * 1024) {
	// 		alert('Файл должен быть менее 2 МБ');
	// 		return;
	// 	}
	// 	var reader = new FileReader();
	// 	reader.onload = function(e){
	// 		formPreview.innerHTML = `<img src="${e.target.result}" Alt="фото">`;
	// 	};
	// 	reader.onerror = function(e){
	// 		alert('ошибка');
	// 	};
	// 	reader.readAsDataURL(file);
	// }
});
