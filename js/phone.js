const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json()
    const phones = data.data;
    // console.log(phone);
    displayPhone(phones);
}

const displayPhone = phones => {
    const phoneContainer = document.getElementById('phone-container');
    //clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    //display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12) {
        showAllContainer.classList.remove('hidden');
    } else {
        showAllContainer.classList.add('hidden');
    }
    // display only first 12 phones
    phones = phones.slice(0, 12)
    // console.log(phones);
    phones.forEach(phone => {
        // console.log(phone);
        //     create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`
        phoneCard.innerHTML = `
            <figure>
              <img alt="Shoes" src="${phone.image}"/>
            </figure>
          <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions justify-center">
                  <button onclick="handleShowClick('${phone.slug}')" class="btn btn-primary">Show Details</button>
              </div>
          </div>
       `
        phoneContainer.appendChild(phoneCard)
    })
    toggleLoadingSpinner(false);
}

const handleShowClick = async (id) =>{
    console.log("show click",id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
        console.log(data);
}

const handleSearch = () => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText);
}

// const handleSearch2 = () =>{
//     toggleLoadingSpinner(true);
//     const searchField = document.getElementById('search-field2');
//     const searchText = searchField.value;
//     loadPhone(searchText);
// }
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}

// loadPhone();