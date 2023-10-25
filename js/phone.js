const loadPhone = async (searchText=13, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    //  console.log(phones);

    // 1 step one
const phoneContainer = document.getElementById('phone-container')
//  clear phone container cards before adding new cards
phoneContainer.textContent = '';

// display show all buton if there are more than than 12 phones
const showAllContainer = document.getElementById('show-all-container')
if(phones.length > 12 && !isShowAll){
    showAllContainer.classList.remove('hidden')
}
else{
    showAllContainer.classList.add('hidden');
}
console.log('is show all', isShowAll)
// display only first 12 phnones if not show all
if(!isShowAll){
phones = phones.slice(0,12);
}


    phones.forEach(phone => {
        console.log(phone);
        // 2. craete a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;
        // 3. set inner html
        phoneCard.innerHTML = `
    <figure><img src="${phone.image}" /></figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-center">
                        <button onclick="handleShowDetails('${phone.slug}'); show_details_modal.showModal()" class="btn btn-primary">Show details</button>
                      </div>
                    </div>
    `
    // 4. append child
    phoneContainer.appendChild(phoneCard);
    });

    // hide loading spinner
    toggleLoadingSpinner(false);
}
// 
const handleShowDetails = async (id) =>{
    console.log('clicked show details', id)
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(data)
    
}

const showPhoneDetails = (phone) =>{
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <img src="${phone.data.image}" alt=""/>
    <p><span>stronge</span>${phone.data.mainFeatures.storage}</p>

    `

    // show all modal
    show_details_modal.showModal();
}

// handle search button
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden')
    }
}

// handle show all
const handleShowAll = () =>{
    handleSearch(true);
}

loadPhone();