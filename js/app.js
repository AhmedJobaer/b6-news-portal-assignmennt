const loadData = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.data.news_category))
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
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`
    console.log(url);

    fetch(url)
        .then(res => res.json())
        .then(data => showCategoryDetail(data.data))

}

const showCategoryDetail = (datas) => {
    const categoryListDivData = document.getElementById('category-list');
    categoryListDivData.innerHTML = ``;
    datas.forEach(data => {
        console.log(data);
        const cateDiv = document.createElement('div');
        cateDiv.classList.add('mb-4')
        cateDiv.innerHTML = `
            <div class="card card-side bg-base-100  shadow-xl">
                <figure ><img class="w-72 h-80" src="${data.thumbnail_url}"></figure>
                <div class="card-body">
                    <h2 class="card-title">${data.title}</h2>
                    <p>${data.details.slice(0, 250)}</p>
                    <p>${data.details.slice(250, 450)}</p>
                    <div class="flex items-center">
                        <div class="avatar-group -space-x-6 mr-2">
                            <div class="avatar">
                                <div class="w-12">
                                    <img src="${data.author.img}"/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 class="font-bold">${data.author.name}</h3>
                            <p> ${data.author.published_date}</p>
                        </div>
                    
                        <i class="fa-regular fa-eye ml-40 text-1xl"></i>
                        <h3 class="font-bold ml-3">${data.total_view}</h3>
                        
                        
                    </div>
                </div>
            </div>
        `;
        categoryListDivData.appendChild(cateDiv);
    })
}

loadData();