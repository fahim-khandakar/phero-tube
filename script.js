// data loaded by this function
const loadCategoryData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  const categoryData = data.data;
  categories(categoryData);
};
loadCategoryData();

// category data loaded by this function
const categories = (categoryData) => {
  categoryData.forEach((category) => {
    const categoryContainer = document.getElementById("category-container");
    const button = document.createElement("button");
    button.classList.add(
      "px-3",
      "md:px-5",
      "py-1",
      "md:py-2",
      "rounded-lg",
      "bg-slate-300",
      "hover:bg-slate-200",
      "md:mx-10",
      "mx-2",
      "text-xm",
      "md:text-base",
      "text-xs",
      "md:text-base"
    );
    button.innerText = `${category?.category}`;
    button.setAttribute("onclick", `videoDataLoad(${category?.category_id})`);
    categoryContainer.appendChild(button);
  });
};

// video data loaded by this function
const videoDataLoad = async (categoryId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await res.json();
  const videoData = data.data;
  //   sort btn called here
  const sortBtn = document.getElementById("sort-btn");
  sortBtn.addEventListener("click", () => {
    sortVideo(videoData);
  });

  const videoContainer = document.getElementById("video-container");
  const throwError = document.getElementById("throw-error");
  throwError.innerText = "";
  videoContainer.textContent = "";

  //   error throw
  if (!data.status === true) {
    const div = document.createElement("div");
    div.classList.add("w-full", "mx-auto", "mt-20");
    div.innerHTML = `
    <img class = "mx-auto" src = "icon.png" />
    <p class = "text-center text-xl font-semibold md:text-3xl md:font-bold mt-5">Oops!! Sorry, There is no <br/> content here</p>
    `;
    throwError.appendChild(div);
  }

  videoData.forEach((video) => {
    const div = document.createElement("div");
    const time = +video.others.posted_date;
    const fullMinutes = time / 60;
    const hours = parseInt(fullMinutes / 60);
    const minutes = parseInt(fullMinutes % 60);

    div.classList.add("card", "bg-base-100", "shadow-xl");
    div.innerHTML = `
        <figure>
        <img class = "h-52 rounded-lg relative"
          src=${video?.thumbnail}
          alt="Shoes"
        />
        ${
          time
            ? `<p class = "text-xs absolute right-3 top-40 bg-black text-white px-2 py-1 rounded-lg">${hours}hrs ${minutes}min ago <p/>`
            : ""
        }
      </figure>
      <div class="card-body px-3">
      <div class="flex gap-3">
      <!-- first  -->
      <div>
        <img
        class = "w-10 h-10 rounded-full object-cover" 
        src=${video?.authors[0]?.profile_picture}
        alt="" />
      </div>
      <!-- second  -->
      <div>
        <h3 class = "text-xl font-bold">${video?.title}</h3>
        <div class = "flex items-center mt-3">
        <p class = "font-semibold">${video?.authors[0]?.profile_name}</p>
        <p class = "font-semibold">${
          video?.authors[0]?.verified
            ? `<image class = "w-16 h-10" src= "badge2.png" />`
            : ""
        }</p>
        </div>
        <p class = "pt-2 font-semibold">${video?.others?.views}</p>
    </div>
      </div>

        `;
    videoContainer.appendChild(div);
  });
};
videoDataLoad("1000");

// sort video function started here

const sortVideo = (videoData) => {
  const sorted = videoData.sort((videoA, videoB) => {
    const viewA = parseFloat(videoA.others.views);
    const viewB = parseFloat(videoB.others.views);

    return viewB - viewA;
  });
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";

  sorted.forEach((video) => {
    const time = +video.others.posted_date;
    const fullMinutes = time / 60;
    const hours = parseInt(fullMinutes / 60);
    const minutes = parseInt(fullMinutes % 60);
    const div = document.createElement("div");
    div.classList.add("card", "bg-base-100", "shadow-xl");
    div.innerHTML = `
        <figure>
        <img class = "h-52 rounded-lg relative"
          src=${video?.thumbnail}
          alt="Shoes"          
        />
        ${
          time
            ? `<p class = "absolute right-3 top-40 bg-black text-white px-2 py-1 rounded-lg">${hours}hrs ${minutes}min ago <p/>`
            : ""
        }
      </figure>
      <div class="card-body px-3">
      <div class="flex gap-3">
      <!-- first  -->
      <div>
        <img
        class = "w-10 h-10 rounded-full object-cover" 
        src=${video?.authors[0]?.profile_picture}
        alt="" />
      </div>
      <!-- second  -->
      <div>
        <h3 class = "text-xl font-bold">${video?.title}</h3>
        <div class = "flex items-center mt-3">
        <p class = "font-semibold">${video?.authors[0]?.profile_name}</p>
        <p class = "font-semibold">${
          video?.authors[0]?.verified
            ? `<image class = "w-16 h-10" src= "badge2.png" />`
            : ""
        }</p>
        </div>
        <p class = "pt-2 font-semibold">${video?.others?.views}</p>
    </div>
      </div>
  
        `;
    videoContainer.appendChild(div);
  });
};
