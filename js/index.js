const loadCategory = () => {
  fetch(`https://openapi.programming-hero.com/api/news/categories`)
    .then((res) => res.json())
    .then((data) => displayCategory(data.data.news_category))
    .catch((err) => console.log(err));
};

const displayCategory = (categories) => {
  const categoriesId = document.getElementById("categories");
  categories.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <p class = "fs-4 text-secondary mt-4" onclick = "loadCategoryInfo('${category.category_id}')">${category.category_name}</p>
        `;
    categoriesId.appendChild(div);
  });
};

const loadCategoryInfo = (categoryId) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategoryInfo(data.data));
};

const displayCategoryInfo = (informations) => {
  const card = document.getElementById("card");
  informations.forEach((information) => {
    console.log(information)
    const div = document.createElement("div");
    div.classList.add("row");
    div.classList.add("mb-2");
    div.classList.add("border");
    div.classList.add("p-1");
    div.innerHTML = `
      <div class="col-md-4">
          <img src="${information.thumbnail_url}" class="img-fluid rounded-start" alt="">
      </div>
      <div class="col-md-8">
          <div class="card-body">
              <h5 class="card-title mb-3">${information.title}</h5>
              <p class="card-text text-secondary">${information.details.length > 600 ? information.details.slice(0, 600) + "..." : information.details}</p>
              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              <div class = "d-flex justify-content-between">
                  <div class= "d-flex">
                    <div>
                    <img height = "50px" width = "50px"class = "rounded-circle me-2" src = "${information.author.img}"/>
                    </div>
                    <div>
                    <p>${information.author.name?information.author.name : "name is not found" }</p>
                    <p class = "text-secondary">${information.author.published_date? information.author.published_date : "date is not found"}</p>
                    </div>
                  </div>
                    <p><i class="fa-solid fa-eye"></i>${information.total_view + "k"}</p>
                  <div>
                    <i class="fas fa-arrow-circle-right"></i>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                       Launch demo modal
                      </button> 
                  </div>
              </div>
          </div>
      </div>
      `;
    card.appendChild(div);
  });
};

// const modalOpen = () => {
//     const modal = document.getElementById("modal");
//     const div = document.createElement("div");
//     div.classList.add("modal-dialog")
//     div.innerHTML = `
//     <div class="modal-content">
//     <div class="modal-header">
//       <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
//       <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//     </div>
//     <div class="modal-body">
//       ...
//     </div>
//     <div class="modal-footer">
//       <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//       <button type="button" class="btn btn-primary">Save changes</button>
//     </div>
//   </div>
//     `;
//     modal.appendChild(div)
// }

loadCategory();
