// data loaded by this function
const loadCategoryData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  const categoryData = data.data;
  //   console.log(categoryData);
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
    button.innerText = `${category.category}`;
    button.setAttribute("onclick", `videoDataLoad(${category.category_id})`);
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
  console.log(videoData);
};
