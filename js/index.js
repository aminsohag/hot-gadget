const laodAllPhones = async (status, BrandName) => {
    // console.log("will show 3 sec later");
    // console.log(BrandName);
    document.getElementById("spinner").style.display = "none"

    // fetch(`https://openapi.programming-hero.com/api/phones?search=iphone`)
    // .then(res => res.json())
    // .then(data => console.log(data.data))

    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${BrandName ? BrandName : "iphone"}`)
    const data = await res.json();
    if(status){
        displayAllPHones(data.data);
    }
    else{
        displayAllPHones(data.data.slice(0, 6))
    }
}

const displayAllPHones = (phones) => {
    const phonesContainer = document.getElementById("phones-container");
    phones.forEach( (phone) => {
        const { brand, image, slug, phone_name } = phone;
        // console.log(phone);
        const div = document.createElement("div");
        div.innerHTML = `
               
                    <div class="card bg-base-100 shadow-sm my-4">
                        <figure class="px-6 pt-8">
                          <img src="${image}" alt="Shoes"
                            class="rounded-xl" />
                        </figure>
                        <div class="card-body items-center text-center">
                          <h2 class="card-title">${phone_name}</h2>
                          <p>There are many variations of passages of available, but the majority have suffered</p>
                          <p class="text-2xl font-bold">$999</p>
                          <div class="card-actions">
                            <button onclick="phoneDetails('${slug}')" class="btn btn-primary text-white">Show Details</button>
                          </div>
                        </div>
                      </div>
              
        `;
        phonesContainer.appendChild(div)
    });
};

const showAll = () => {
    laodAllPhones(true);
}

const handleSearch = () => {
    document.getElementById("spinner").style.display = "block";

    const searchBox = document.getElementById("search-box").value;

    setTimeout(function () {
        laodAllPhones(false, searchBox)
    }, 3000)

}

const phoneDetails = async (slugs) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${slugs}`);
    const data = await res.json();
    // console.log(data.data);

    const {image, slug, brand, name, chipSet, releaseDate, storage, displaySize } = data.data; 

    const modalContainer = document.getElementById("modal-container");
    const div = document.createElement("div");
    div.innerHTML = `
            <dialog id="my_modal_1" class="modal">
                <div class="modal-box text-center">
                    <div class="flex justify-center">
                        <img src=${image} alt="">
                    </div>
                    <h3 class="text-lg font-bold">name: ${name}</h3>
                    <p class="py-4">Brand : ${brand} </p>
                    <p>displaySize : ${displaySize}</p>
                    <p>chipSet: ${chipSet}</p>
                    <p>releaseDate : ${releaseDate}</p>
                    <p>slug : ${slug}</p>
                    <p>storage : ${storage}</p>
                    <div class="modal-action">
                        <form method="dialog">
                            <!-- if there is a button in form, it will close the modal -->
                            <button class="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
    `;
    modalContainer.appendChild(div)
    my_modal_1.showModal()
}


laodAllPhones(false, "iphone");

