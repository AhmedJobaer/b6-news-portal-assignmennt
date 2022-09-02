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
            <div class="card card-side bg-base-100 shadow-xl">
            <figure><img src="${data.thumbnail_url}"></figure>
            <div class="card-body">
                <h2 class="card-title">New movie is released!</h2>
                <p>Click the button to watch on Jetflix app.</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Watch</button>
                </div>
            </div>
        </div>
        `;
        categoryListDivData.appendChild(cateDiv);
    })
}

loadData();