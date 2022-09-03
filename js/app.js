const loadData = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.data.news_category))
        .catch(error => console.log(error))
}

const displayData = categories => {
    //console.log(categories);
    const categoryDiv = document.getElementById('category-link');
    categories.forEach(category => {
        const categoryDivList = document.createElement('div');
        categoryDivList.classList.add('lg:inline', 'flex', 'flex-col', 'items-center');
        categoryDivList.innerHTML = `
            <ul class="menu menu-horizontal bg-base-100 rounded-box p-2">
            <li class="m-2" ><a onclick="category(${category.category_id})">${category.category_name}</a></li>
        </ul>
        `;
        categoryDiv.appendChild(categoryDivList);
    })

}

const category = (id) => {
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`
    //console.log(url);

    fetch(url)
        .then(res => res.json())
        .then(data => showCategoryDetail(data.data))
        .catch(error => console.log(error))

}



const showCategoryDetail = (datas) => {
    const categoryListDivData = document.getElementById('category-list');
    categoryListDivData.innerHTML = ``;
    const totalInfo = document.getElementById('total-info');
    totalInfo.innerHTML = ``;
    totalInfo.innerHTML = `<p class="bg-white text-1xl text-black rounded-lg m-5 p-4 font-bold">${datas.length ? datas.length : 'No'} items found for this category</p>`;

    datas.sort(function (a, b) {
        return b.total_view - a.total_view
    });
    //console.log(datas);
    datas.forEach(data => {
        console.log(data);
        const cateDiv = document.createElement('div');
        cateDiv.classList.add('mb-4')
        cateDiv.innerHTML = `
            <div class="card card-side bg-base-100 flex flex-col lg:flex-row shadow-xl">
                <figure ><img class="lg:w-72 lg:h-80 w-fit" src="${data.thumbnail_url ? data.thumbnail_url : 'No Thumnail_Image Data Found'}"></figure>
                <div class="card-body">
                    <h2 class="card-title">${data.title ? data.title : 'No title Data Found'}</h2>
                    <p>${data.details.slice(0, 250)}</p>
                    <p>${data.details.slice(250, 450)}...</p>
                    <div class="flex items-center lg:flex-row flex-col">
                        <div class="avatar-group -space-x-6 mr-2">
                            <div class="avatar">
                                <div class="w-12">
                                    <img src="${data.author.img ? data.author.img : 'No Author Image Data Found'}"/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 class="font-bold">${data.author.name ? data.author.name : 'No Data Found'}</h3>
                            <p> ${data.author.published_date ? data.author.published_date : 'No Data Found'}</p>
                        </div>
                        <i class="fa-regular fa-eye mt-2 lg:ml-40 text-1xl"></i>
                        <h3 class="font-bold mt-2 lg:ml-3">${data.total_view ? data.total_view : 'No Data Found'}</h3>
                        <div class="card-actions mt-2 justify-end">
                            <label for="my-modal-3" class="btn btn-primary modal-button lg:ml-60" onclick="newsDetail('${data._id ? data._id : 'No Data Found'}')">Show Details</label>
                        </div>
                    </div>
                    
                </div>
            </div>
        `;
        categoryListDivData.appendChild(cateDiv);
    })

    toggleSpinner(false)
}


const toggleSpinner = isLoading => {
    const loaderSec = document.getElementById('loader');
    if (isLoading) {
        loaderSec.classList.remove('hidden');
    }
    else {
        loaderSec.classList.add('hidden');
    }
}

const newsDetail = newsId => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))
        .catch(error => console.log(error))
}

const displayNews = news => {
    const modalcontainer = document.getElementById('modal-container');
    modalcontainer.innerHTML = ``;
    news.forEach(data => {
        //console.log(data);
        modalcontainer.innerHTML = `
        <h3 class="text-lg font-bold mb-2">Title: ${data.title ? data.title : 'No Data Found'}</h3>
        <h3 class="text-lg font-bold mb-2">Name: ${data.author.name ? data.author.name : 'No Data Found'}</h3>
        <p>Publish Date : ${data.author.published_date ? data.author.published_date : 'No data Found'}</p>
        <p>Rating Number : ${data.rating.number ? data.rating.number : 'No data Found'}</p>
        <p>Rating Badge : ${data.rating.badge ? data.rating.badge : 'No data Found'}</p>
        <p class="mb-2">Total Views : ${data.total_view ? data.total_view : 'No data Found'}</p>
        <img src="${data.author.img ? data.author.img : 'No Data Found'}"/>
        `;

    })
}

category('8');
loadData();