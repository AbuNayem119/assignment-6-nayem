

// extract Categories button data from api
const getCategories = async () => {
    const url = "https://openapi.programming-hero.com/api/peddy/categories";
    const response = await fetch(url);
    const data = await response.json();
    displayCategories(data.categories)
}

// Display Categories Button 
const displayCategories = async (data) => {

    const categoriesContainer = document.getElementById('categories-container');

    // console.log(data);

    data.forEach(category => {

        // console.log(category);

        const categoryDiv = document.createElement('div');
        categoryDiv.classList = "w-1/5"

        categoryDiv.innerHTML = `
            <div id="pet_${category.id}" onclick="displayCategoryData(${category.id})" class="flex gap-2 items-center cursor-pointer justify-center p-2 md:p-4 hover:bg-[#0E7A81] hover:rounded-[50px] group hover:duration-500 rounded-xl border border-[#0e7a8126]">
                <img class="w-6 h-6 md:w-auto md:h-auto" src=${category.category_icon} alt="">
                <h4 id="pet_text_${category.id}" class="font-bold inter text-lg md:text-2xl group-hover:text-white text-[#131313]">${category.category}</h4>
            </div>
        `
        categoriesContainer.appendChild(categoryDiv);

    })
}

getCategories();



// Get All Data for Any Pet from api
const getAllData = async (category) => {
    const url = `https://openapi.programming-hero.com/api/peddy/pets`;
    const response = await fetch(url);
    const data = await response.json();

    // petId(data.pets);
    displayCardData(data.pets);
}

getAllData();

// Display All Data
const displayCardData = async (data) => {

    // console.log(data);

    const cardContainer = document.getElementById('cards-container');

    // console.log(data);

    cardContainer.innerHTML = '';

    priceSorting(data);

    if (data.length === 0) {

        cardContainer.classList.remove('grid')
        cardContainer.innerHTML = `
        <div class="flex flex-col gap-2 justify-center items-center bg-slate-100 w-full border border-[#0e7a8126] py-20 rounded-xl">
            <img class="w-52" src="./assets/img/error.webp" alt="">
            <h4 class="font-bold inter text-2xl text-[#131313]">No Information Available</h4>
        </div>

        `
        return;
    } else {
        cardContainer.classList.add('grid')
    }

    // Sorting By Price start

    // data.sort((a, b) => b.price - a.price);

    // Sorting By Price end


    data.forEach(pet => {

        // console.log(pet);

        const cardDiv = document.createElement('div');
        cardDiv.classList = "flex flex-col gap-2 border border-[#0e7a8126] md:p-4 p-2 rounded-xl"
        cardDiv.id = "petCardId"
        cardDiv.innerHTML = `

            <!-- Collect ID for Sorting Button -->
            <p class="hidden" id="petIdSort" >${pet.petId}</p>


            <div class="border border-[#0e7a8126] md:p-4 p-2 rounded-xl">
                <img class="w-full object-cover rounded-xl" src=${pet.image === '' ? 'https://img.icons8.com/?size=100&id=115242&format=png&color=000000' : pet.image} alt="">
            </div>
            <div>
                <h4 class="font-bold inter text-xl text-[#131313]">${pet.pet_name === '' || pet.pet_name === undefined ? 'Not Available' : pet.pet_name}</h4>
                <div class="flex gap-2 items-center">
                    <img class="w-4 h-4"
                        src="https://img.icons8.com/?size=100&id=115242&format=png&color=000000" alt="">
                    <p>Breed: ${pet.breed === '' || pet.breed === undefined ? 'Not Available' : pet.breed}</p>
                </div>
                <div class="flex gap-2 items-center">
                    <img class="w-4 h-4"
                        src="https://img.icons8.com/?size=100&id=OvwpRvZSWbGM&format=png&color=000000"
                        alt="">
                    <p>Birth: ${pet.date_of_birth === '' || pet.date_of_birth === undefined ? 'Not Available' : pet.date_of_birth}</p>
                </div>
                <div class="flex gap-2 items-center">
                    <img class="w-4 h-4"
                        src="https://img.icons8.com/?size=100&id=16275&format=png&color=000000" alt="">
                    <p>Gender: ${pet.gender === '' || pet.gender === undefined ? 'Not Available' : pet.gender}</p>
                </div>
                <div class="flex gap-2 items-center">
                    <img class="w-4 h-4"
                        src="https://img.icons8.com/?size=100&id=58437&format=png&color=000000" alt="">
                    <p>Price : ${pet.price === '' || pet.price === undefined || pet.price === null ? 'Not Available' : pet.price + '$'}</p>
                </div>

            </div>
            <div class="flex justify-between pt-6 border-t border-[#0e7a8126]">
                <div onclick="petId(${pet.petId})" class="flex items-center border border-[#0e7a8126] py-1 px-4 rounded-lg cursor-pointer">
                    <img class="w-5 h-5"
                        src="https://img.icons8.com/?size=100&id=SVZUo0RhRuHJ&format=png&color=000000"
                        alt="">
                </div>

                <button id="adoptBtn_${pet.petId}" onclick="adoptPet(${pet.petId})" class="lato border border-[#0e7a8126] text-[18px] text-[#0E7A81] px-4 py-1 rounded-lg hover:text-white hover:bg-[#0E7A81] font-bold" href="">Adopt</button>

                <button onclick="singleId(${pet.petId})" class="lato border border-[#0e7a8126] text-[18px] text-[#0E7A81] px-4 py-1 rounded-lg hover:text-white hover:bg-[#0E7A81] font-bold" href="">Details</button>
                
            </div>
        `

        cardContainer.appendChild(cardDiv);

    })

}


const displayCategoryData = async (category) => {


    let categoryName = ''

    if (category === 1) {
        categoryName = 'Cat'
    }
    if (category === 2) {
        categoryName = 'Dog'
    }
    if (category === 3) {
        categoryName = 'Rabbit'
    }
    if (category === 4) {
        categoryName = 'Bird'
    }


    const url = `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`;
    const response = await fetch(url);
    const data = await response.json();

    document.getElementById(`cards-container`).classList.add('hidden');
    document.getElementById(`petGallery`).classList.add('hidden');

    document.getElementById('loading-spinner').classList.remove('hidden');

    setTimeout(() => {

        document.getElementById('loading-spinner').classList.add('hidden');

        document.getElementById('cards-container').classList.remove('hidden');
        document.getElementById('petGallery').classList.remove('hidden');

        displayCardData(data.data);

        // sortingPrice(data.data);

        activeButton(category);

    }, 2000);

}


// Sorting By Price

const priceSorting = (data) => {


    document.getElementById('sortByPrice').addEventListener('click', (event) => {
        event.preventDefault();

        

        document.getElementById(`cards-container`).classList.add('hidden');
        document.getElementById(`petGallery`).classList.add('hidden');

        document.getElementById('loading-spinner').classList.remove('hidden');

        setTimeout(() => {

            document.getElementById('loading-spinner').classList.add('hidden');

            document.getElementById('cards-container').classList.remove('hidden');
            document.getElementById('petGallery').classList.remove('hidden');

            data.sort((a, b) => b.price - a.price);

            displayCardData(data);

        }, 2000);


    })

};

// Active Button Function
const activeButton = (category) => {

    // console.log(category)

    document.getElementById(`pet_${category}`).classList.add('bg-[#0E7A81]');
    document.getElementById(`pet_${category}`).classList.add('rounded-[50px]');
    document.getElementById(`pet_text_${category}`).classList.add('text-white');

    if (category === 1) {
        document.getElementById(`pet_2`).classList.remove('bg-[#0E7A81]');
        document.getElementById(`pet_3`).classList.remove('bg-[#0E7A81]');
        document.getElementById(`pet_4`).classList.remove('bg-[#0E7A81]');

        document.getElementById(`pet_2`).classList.remove('rounded-[50px]');
        document.getElementById(`pet_3`).classList.remove('rounded-[50px]');
        document.getElementById(`pet_4`).classList.remove('rounded-[50px]');

        document.getElementById(`pet_text_2`).classList.remove('text-white');
        document.getElementById(`pet_text_3`).classList.remove('text-white');
        document.getElementById(`pet_text_4`).classList.remove('text-white');
    }

    if (category === 2) {
        document.getElementById(`pet_1`).classList.remove('bg-[#0E7A81]');
        document.getElementById(`pet_3`).classList.remove('bg-[#0E7A81]');
        document.getElementById(`pet_4`).classList.remove('bg-[#0E7A81]');

        document.getElementById(`pet_1`).classList.remove('rounded-[50px]');
        document.getElementById(`pet_3`).classList.remove('rounded-[50px]');
        document.getElementById(`pet_4`).classList.remove('rounded-[50px]');    

        document.getElementById(`pet_text_1`).classList.remove('text-white');
        document.getElementById(`pet_text_3`).classList.remove('text-white');
        document.getElementById(`pet_text_4`).classList.remove('text-white');
    }

    if (category === 3) {
        document.getElementById(`pet_1`).classList.remove('bg-[#0E7A81]');
        document.getElementById(`pet_2`).classList.remove('bg-[#0E7A81]');
        document.getElementById(`pet_4`).classList.remove('bg-[#0E7A81]');

        document.getElementById(`pet_1`).classList.remove('rounded-[50px]');
        document.getElementById(`pet_2`).classList.remove('rounded-[50px]');
        document.getElementById(`pet_4`).classList.remove('rounded-[50px]');

        document.getElementById(`pet_text_1`).classList.remove('text-white');
        document.getElementById(`pet_text_2`).classList.remove('text-white');
        document.getElementById(`pet_text_4`).classList.remove('text-white');
    }

    if (category === 4) {
        document.getElementById(`pet_1`).classList.remove('bg-[#0E7A81]');
        document.getElementById(`pet_2`).classList.remove('bg-[#0E7A81]');
        document.getElementById(`pet_3`).classList.remove('bg-[#0E7A81]');

        document.getElementById(`pet_1`).classList.remove('rounded-[50px]');
        document.getElementById(`pet_2`).classList.remove('rounded-[50px]');
        document.getElementById(`pet_3`).classList.remove('rounded-[50px]');

        document.getElementById(`pet_text_1`).classList.remove('text-white');
        document.getElementById(`pet_text_2`).classList.remove('text-white');
        document.getElementById(`pet_text_3`).classList.remove('text-white');
    }






    let activeButton = document.getElementById(`pet_${category}`);
    // console.log(activeButton);

}

// Like Button Functionality
const petId = async (id) => {

    const url = `https://openapi.programming-hero.com/api/peddy/pet/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    const image = data.petData.image;

    // console.log(image);

    const petGalleryContainer = document.getElementById('petGalleryContainer')
    const galleryDiv = document.createElement('div');
    // galleryDiv.classList = "grid grid-cols-2 gap-2"

    galleryDiv.innerHTML = `
        <img class="w-full object-cover border border-[#0e7a8126] p-2 rounded-xl" src=${image} alt="">
    `

    petGalleryContainer.appendChild(galleryDiv);

}


// Pet Details Functionality
const singleId = async (id) => {

    // document.getElementById('petDetails').setAttribute('onclick', `my_modal_4.showModal()`);

    const url = `https://openapi.programming-hero.com/api/peddy/pet/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    const pet = data.petData;

    // console.log(pet.breed);

    const petDetailsContainer = document.getElementById('petDetailsContainer')

    petDetailsContainer.innerHTML = `
        <div class="flex items-center border border-[#0e7a8126] rounded-xl pb-4">
            <img class="w-full  rounded-xl object-cover" src=${pet.image === '' ? 'https://img.icons8.com/?size=100&id=115242&format=png&color=000000' : pet.image} alt="">
        </div>
        <div class="flex flex-col gap-6">
            <h4 class="font-bold lato text-3xl text-[#131313]">${pet.pet_name === '' ? 'Not Available' : pet.pet_name}</h4>
            <div class="flex gap-16">
                <div class="flex flex-col gap-2">
                    <div class="flex gap-2 items-center">
                        <img class="w-4 h-4"
                            src="https://img.icons8.com/?size=100&id=115242&format=png&color=000000" alt="">
                        <p>Breed: ${pet.breed === '' || pet.breed === undefined ? 'Not Available' : pet.breed}</p>
                    </div>
                    <div class="flex gap-2 items-center">
                        <img class="w-4 h-4" src="https://img.icons8.com/?size=100&id=16275&format=png&color=000000"
                            alt="">
                        <p class="lato">Gender: ${pet.gender === '' || pet.gender === undefined ? 'Not Available' : pet.gender}</p>
                    </div>
                    <div class="flex gap-2 items-center">
                        <img class="w-4 h-4" src="https://img.icons8.com/?size=100&id=16275&format=png&color=000000"
                            alt="">
                        <p>Vaccinated status: ${pet.vaccinated_status === '' || pet.vaccinated_status === undefined ? 'Not Available' : pet.vaccinated_status}</p>
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <div class="flex gap-2 items-center">
                        <img class="w-4 h-4"
                            src="https://img.icons8.com/?size=100&id=OvwpRvZSWbGM&format=png&color=000000" alt="">
                        <p>Birth: ${pet.date_of_birth === '' || pet.date_of_birth === undefined ? 'Not Available' : pet.date_of_birth}</p>
                    </div>
                    <div class="flex gap-2 items-center">
                        <img class="w-4 h-4" src="https://img.icons8.com/?size=100&id=58437&format=png&color=000000"
                            alt="">
                        <p>Price : ${pet.price === '' || pet.price === undefined || pet.price === null ? 'Not Available' : pet.price + '$'}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-2">
            <h3 class="font-bold inter text-2xl text-[#131313]">Details Information</h3>
            <p class="text-start inter text-xl">${pet.pet_details === '' || pet.pet_details === undefined ? 'Not Available' : pet.pet_details}</p>
        </div>
    `

    document.getElementById('my_modal_4').showModal();


}


// Adopton Button Functionality is here
const adoptPet = (id) => {

    let count = 3;
    // console.log(count);

    document.getElementById('my_modal_1').showModal();

    let interval = setInterval(() => {
        document.getElementById('modalCountdown').innerText = count;
        count--;

        if (count < 0) {

            if (count <= 0) {
                document.getElementById('modalCountdown').innerText = '';
            }

            document.getElementById('my_modal_1').close();
            clearInterval(interval);

            document.getElementById(`adoptBtn_${id}`).innerText = 'Adopted';
            document.getElementById(`adoptBtn_${id}`).setAttribute('disabled', 'disabled');
            document.getElementById(`adoptBtn_${id}`).classList.add('bg-[#46aab1b3]');
            document.getElementById(`adoptBtn_${id}`).classList.remove('hover:bg-[#0E7A81]');
            document.getElementById(`adoptBtn_${id}`).classList.add('text-white');

        }
    }, 1000)


    count = 3;
    document.getElementById('modalCountdown').innerText = count;


}







