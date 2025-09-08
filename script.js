document.addEventListener('DOMContentLoaded' , () => {
    const form = document.getElementById('item-form');
    const itemList = document.getElementById('itemcard-container');
    const nameInput = document.getElementById('ItemName');
    const descInput = document.getElementById('ItemDesc');
    const ContInput = document.getElementById('ItemContact');
    const statusInput = document.getElementById('item-type');
    form.addEventListener('submit' , (e) => {
        e.preventDefault();
        const name = nameInput.value.trim();
        const desc = descInput.value.trim();
        const contact = ContInput.value.trim();
        const status = statusInput.value;
        const imgInput = document.getElementById('ItemImage');
        const file = imgInput.files[0];

        if(!name){
            alert('Please enter an item name');
            nameInput.focus();
            return;
        }

        let imgHTML = '';
        if (file){
          const imgURL = URL.createObjectURL(file);
          imgHTML = `<img src="${imgURL}" alt="${name}" class ="item-image">`;
        }
         const card = document.createElement('div');
         card.className = `item-card ${status}`;
         card.innerHTML = `
         <div class="item-top-part">
           ${imgHTML}
           <div class="item-name-desc">
           <p class="NameofItem">${name}</p>
           <p class="descofItem">${desc}</p>
          </div>
          <div class="item-actions">
            <span class="dots">...</span>
            <div class="dropdown hidden">
              <button class="edit-button">Edit</button>
              <button class="delete-button">Delete</button>
            </div>
          </div>
         </div>
        <div class="itemFooter">
          <p>Contact info: ${contact}</p>
          <span class="${status}-status">${status}</span>
        </div>`;
        
     
         itemList.prepend(card);
         form.reset();
    });

   const searchInput = document.getElementById('searchbar');
   const searchStatus = document.getElementById('FilterType');
   const filterItems = () => {
    const query = searchInput.value.toLowerCase();
    const filterValue = searchStatus.value.toLowerCase();
    const cards = document.querySelectorAll('#itemcard-container .item-card');
    cards.forEach(card => {
      const itemName = card.querySelector('.NameofItem').textContent.toLowerCase();
      const itemStatus = card.querySelector('.item-card span').textContent;
      if(itemName.includes(query) && (itemStatus === filterValue || filterValue === 'all')){
        card.style.display="";
      }else{
        card.style.display="none";
      }
    });
   }
   
   searchInput.addEventListener('input', filterItems);
   searchStatus.addEventListener('change' , filterItems);



   const dots = document.querySelectorAll('.dots');
  dots.forEach(dot => {
    itemList.addEventListener('click' , (evt) => {
      const dot = evt.target.closest('.dots');
      if(dot){
        evt.stopPropagation();
      const item_options = dot.parentElement.querySelector('.dropdown');
      document.querySelectorAll('dropdown').forEach(menu => {
        if(menu !== dropdown){
         menu.classList.add("hidden");
         menu.classList.remove("show");
       }
      });
     item_options.classList.toggle("show");
      item_options.classList.toggle("hidden");
      }
      
    });
  });

document.addEventListener('click' , () => {
  document.querySelectorAll('.dropdown').forEach(menu => {
    menu.classList.add("hidden");
    menu.classList.remove("show");
  });
});


// const dltButs = document.querySelectorAll('.delete-button');
// dltButs.forEach(button => {
//     button.addEventListener('click' , (evt) => {
//           const dltCard = button.closest('.item-card');
//           dltCard.remove();
//     });

// });

// the above one does not delete newly added cards.



itemList.addEventListener('click' , (evt) => {
    const deleteBtn = evt.target.closest('.delete-button');
  if(deleteBtn){
    const dltCard = deleteBtn.closest('.item-card');
    const item_Name = dltCard.querySelector('.NameofItem').textContent;
    const confirmDelete = confirm(`Are you sure you want to delete "${item_Name}" ?`);
    if(confirmDelete){
        dltCard.remove();
    }
  }

  const editBtn = evt.target.closest('.edit-button');
  if(editBtn){
    const card = editBtn.closest('.item-card');
    const name = card.querySelector('.NameofItem').textContent;
    const desc = card.querySelector('.descofItem').textContent;
    const contact = card.querySelector('.itemFooter p').textContent.replace("Info:" , "").trim();
    const status = card.querySelector('.itemFooter span').textContent;

    nameInput.value = name;
    descInput.value = desc; 
    ContInput.value = contact;
    statusInput.value = status;
    
    card.remove();
    

  }
  

})



});

