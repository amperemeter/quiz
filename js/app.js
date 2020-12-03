document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const questionItems = document.querySelectorAll('.step'),
        btnsNext = document.querySelectorAll('.btn-next'),
        progress = document.getElementById('percent'),
        lines = document.querySelectorAll('.progress ul li'),
        notice = document.querySelector('.notice'),
        stepFirstString = document.querySelector('.step-first-string span'),
        stepLastString = document.querySelector('.step-last-string span'),
        answersObj = {
          step0: {
            question: '',
            answers: [],
          },
          step1: {
            question: '',
            answers: [],
          },
          step2: {
            question: '',
            name: '',
            year: '',
            city: '',
            telegram: ''
         }
        }
  
  // start buttons click
  btnsNext.forEach((btn, btnIndex) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      questionItems[btnIndex].style.display = 'none';
      questionItems[btnIndex + 1].style.display = 'block';
      setTimeout(() => questionItems[btnIndex + 1].classList.add('opacity-in'), 500); 
      
      stepFirstString.textContent = btnIndex + 2;
      stepLastString.textContent = questionItems.length - (btnIndex + 3);  
      
      if (questionItems[1].style.display == 'block') {
       setTimeout(() => progress.textContent = '60', 500); 
       lines[btnIndex + 1].classList.add('active-li');  
       setTimeout(() => notice.textContent = 'Отметьте только те технологии и типы задач, с которыми Вы хорошо знакомы. Отсутствие опыта отнюдь не означает, что у Вас меньше шансов попасть в команду.', 500);    
      } else if (questionItems[2].style.display == 'block') {
       progress.textContent = '99';
       lines[btnIndex + 1].classList.add('active-li');
       setTimeout(() => notice.textContent = 'Осталось еще немного. Заполните информацию о себе.', 500); 
      } else if (questionItems[3].style.display == 'block') {  
       document.querySelector('.progress').style.display = 'none';
       document.querySelector('aside').style.display = 'none';
      }   
         
    })   
       
    
    btn.disabled = true;
  })
  btnsNext[btnsNext.length - 1].disabled = false;
  
  
  
  // start steps
  questionItems.forEach((questionItem, questionItemIndex) => {
    
    if (questionItemIndex === 0) {
      questionItem.style.display = 'block';
      progress.textContent = '30'; 
      stepFirstString.textContent = 1;
      stepLastString.textContent = questionItems.length - 2;    
      notice.textContent = 'Привет, Коллега. Для попадания в команду необходимо выполнить тестовое задание, а именно сверстать и запрограммировать этот маленький квиз.';
      
    } else {
      questionItem.style.display = 'none';
    }        
    
    if (questionItemIndex !== questionItems.length - 1 && questionItemIndex !== questionItems.length - 2) {
      const inputs = questionItem.querySelectorAll('input');
      const questionTitle = questionItem.querySelector('.title');
      answersObj[`step${questionItemIndex}`].question = questionTitle.textContent;
      inputs.forEach(input => { 
        const parent = input.parentNode;
        input.checked = false;
        parent.classList.remove('active-radio');
        parent.classList.remove('active-checkbox');     
      })
    }
    
    questionItem.addEventListener('change', event => {
      const target = event.target;
      const inputChecked = questionItem.querySelectorAll('input:checked');
      
      if (questionItemIndex !== questionItems.length - 1 && questionItemIndex !== questionItems.length - 2) {
        answersObj[`step${questionItemIndex}`].answers.length = 0;
        inputChecked.forEach(inputChecked => {
          answersObj[`step${questionItemIndex}`].answers.push(inputChecked.value);
       })
      }
      
      
      if (questionItemIndex === questionItems.length - 2 || inputChecked.length > 0) {
        btnsNext[questionItemIndex].disabled = false;  
      } else {
        btnsNext[questionItemIndex].disabled = true;
      }
      
      if (target.classList.contains('radio')) {
        const radios = questionItem.querySelectorAll('.radio');
        radios.forEach(input => {
          if (input === target) {
            input.parentNode.classList.add('active-radio');
          } else {
            input.parentNode.classList.remove('active-radio');
          }
        })
      } else if (target.classList.contains('checkbox')) {
        target.parentNode.classList.toggle('active-checkbox');
      } else {
        return;
      }
    })
        
  }) // end steps
  
  const showResult = () => {
    const lastStep = questionItems[questionItems.length - 1];
    btnsNext[btnsNext.length - 1].addEventListener('click', event => {
      event.preventDefault();
      
      answersObj.step2.name = document.getElementById('person-name').value;
      answersObj.step2.year = document.getElementById('person-year').value;
      answersObj.step2.city = document.getElementById('person-city').value;
      answersObj.step2.telegram = document.getElementById('person-telegram').value;
      
      alert(JSON.stringify(answersObj.step0) + '\n***\n' + JSON.stringify(answersObj.step1) + '\n***\n' + JSON.stringify(answersObj.step2));
    })
  }
  

  showResult();
})
