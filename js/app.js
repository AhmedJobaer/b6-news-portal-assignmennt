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
        categoryDivList.classList.add('inline');
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
    //console.log(datas);
    datas.forEach(data => {
        //console.log(data);
        const cateDiv = document.createElement('div');
        cateDiv.classList.add('mb-4')
        cateDiv.innerHTML = `
            <div class="card card-side bg-base-100  shadow-xl">
                <figure ><img class="w-72 h-80" src="${data.thumbnail_url ? data.thumbnail_url : 'No Thumnail_Image Found'}"></figure>
                <div class="card-body">
                    // <h2 class="card-title">${data.title ? data.title : 'No title Found'}</h2>
                    <p>${data.details.slice(0, 250)}</p>
                    <p>${data.details.slice(250, 450)}...</p>
                    <div class="flex items-center">
                        <div class="avatar-group -space-x-6 mr-2">
                            <div class="avatar">
                                <div class="w-12">
                                    <img src="${data.author.img ? data.author.img : 'No Author Image Found'}"/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 class="font-bold">${data.author.name ? data.author.name : 'No Name Found'}</h3>
                            <p> ${data.author.published_date ? data.author.published_date : 'No Date Found'}</p>
                        </div>
                        <i class="fa-regular fa-eye ml-40 text-1xl"></i>
                        <h3 class="font-bold ml-3">${data.total_view ? data.total_view : 'No Views Found'}</h3>
                        <div class="card-actions justify-end">
                        <label for="my-modal-3" class="btn btn-primary modal-button ml-60" onclick="newsDetail('${data._id ? data._id : 'No Id Found'}')">Show Details</label>
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
        console.log(data);
        modalcontainer.innerHTML = `
        <h3 class="text-lg font-bold">Title: ${data.title ? data.title : 'No Tile Found'}</h3>
        <h3 class="text-lg font-bold">Name: ${data.author.name ? data.author.name : 'No Name Found'}</h3>
        <img src="${data.image_url ? data.image_url : 'No Image Found'}"/>
        `;

    })
}

category('8');
loadData();