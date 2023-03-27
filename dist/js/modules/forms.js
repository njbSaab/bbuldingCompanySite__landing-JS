const forms = (state) => {
   const form = document.querySelectorAll('form')
   const inputs = document.querySelectorAll('input')
   const phoneInput = document.querySelectorAll('input[name="user_phone"]')

   phoneInput.forEach(item =>{
      item.addEventListener('input', () => {
           //регулярное выражение на провеку все кроме цифр и замена на пустую строчку
         item.value = item.value.replace(/\D/, '');
      })
   })
   const message = {
      loading: 'Загрузка...',
      success: 'Спасибо! Скоро свяжемся',
      failure: 'Что-то пошло не так....'
   };

   const postData = async (url, data) => {
      document.querySelector('.status').textContent = message.loading;
      let res = await fetch(url, {
         method: "POST",
         body: data
      });
      return await res.text()
   }

   const clearInputs = () =>{
      inputs.forEach(elem => elem.value ='')
   }

   form.forEach(item =>{
      item.addEventListener('submit', (e) =>{
         e.preventDefault();

         let statusMessage = document.createElement('div');
         statusMessage.classList.add('status')
         item.appendChild(statusMessage)

         const formData = new FormData(item)
         if(item.getAttribute('data-calc') === "end"){
            for(let key in state) {
               formData.append(key, state[key]);
            }
         }

         postData('../../assets/server.php', formData)
            .then(res => {
               console.log(res);

               statusMessage.textContent = message.success
            })
            .catch(() => statusMessage.textContent = message.failure)
            .finally(() => {
               clearInputs();
               setTimeout(() => {
                  statusMessage.remove();
               }, 5000);
            })
      })
   })
}
export default forms