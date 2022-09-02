const loadData = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.data.news_category))
}

const displayData = categories => {
    console.log(categories);
    categories.forEach(c => {
        console.log(c.category_name);
    })
}

loadData();