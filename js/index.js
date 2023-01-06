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
    .then((data) => displayCategoryInfo(data.data))
    .catch((err) => console.log(err));
    toggleSpinner(true);
};

const displayCategoryInfo = (informations) => {
  informations.sort(function(a, b){return b.total_view - a.total_view})
  const card = document.getElementById("card");
  card.innerHTML = "";
  informations.filter((information) => {
    const div = document.createElement("div");
    div.classList.add("row");
    div.classList.add("mb-2");
    div.classList.add("border");
    div.classList.add("p-1");
    div.innerHTML = `
      <div class="col-md-4">
          <img src="${
            information.thumbnail_url
          }" class="img-fluid rounded-start" alt="">
      </div>
      <div class="col-md-8">
          <div class="card-body">
              <h5 class="card-title mb-3">${information.title}</h5>
              <p class="card-text text-secondary">${
                information.details.length > 600
                  ? information.details.slice(0, 600) + "..."
                  : information.details
              }</p>
              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              <div class = "d-flex justify-content-between">
                  <div class= "d-flex">
                    <div>
                    <img height = "50px" width = "50px"class = "rounded-circle me-2" src = "${
                      information.author.img
                    }"/>
                    </div>
                    <div>
                    <p>${information.author.name}</p>
                    <p class = "text-secondary">${
                      information.author.published_date
                        ? information.author.published_date
                        : "date is not found"
                    }</p>
                    </div>
                  </div>
                    <p><i class="fa-solid fa-eye"></i>${
                      information.total_view
                        ? information.total_view + "k"
                        : null
                    }</p>
                  <div>
                   
                    <button type="button" onclick = "showModal('${information.author.img}','${information.title}','${information.author.name}' , '${information.total_view}')"
                     class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i class="fas fa-arrow-circle-right"></i>
                      </button> 
                  </div>
              </div>
          </div>
      </div>
      `;
      
      card.appendChild(div);
    const categoriesNumber = document.getElementById("categories-number");
    categoriesNumber.value = informations.length + " items found"
  });
  toggleSpinner(false);  
};



const showModal = (img,name, view, title) => {
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
  <img class = "img-fluid" src = "${img}"/>
 <p>Title: ${title}</p>
 <p>Author Name: ${name}</p>
 <p>Total View: ${view}</p>
 `;
};

const toggleSpinner = (isLoading) => {
  const loader = document.getElementById("loader");
  if (isLoading) {
    loader.classList.remove("d-none");
  } else {
    loader.classList.add("d-none");
  }
};

loadCategory();
