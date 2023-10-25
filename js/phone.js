const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones);
}

const displayPhones = phones => {
    //  console.log(phones);

    // 1 step one
const phoneContainer = document.getElementById('phone-container')
//  clear phone container cards before adding new cards
phoneContainer.textContent = '';

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
                      <div class="card-actions justify-end">
                        <button class="btn btn-primary">Buy Now</button>
                      </div>
                    </div>
    `
    // 4. append child
    phoneContainer.appendChild(phoneCard);
    });
}

// handle search button
const handleSearch = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText)
}

// loadPhone();