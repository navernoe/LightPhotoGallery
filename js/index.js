
import $ from "jquery";
import imgsListJson from "../data/imgsList.json";
import Lightbox from "./Lightbox";

const imgsList = imgsListJson.imgsList;
const totalImgsCount = imgsList.length;
const imgsPath = "./img/galleryImgs/";
const countLimit = 12; // кол-во изображений на одной странице

const generateImgs = (pageNumber) => {
    $(".photos").html("");

    const startImgNumber = pageNumber * countLimit;
    let endImgNumber = startImgNumber + countLimit;
    endImgNumber = endImgNumber > totalImgsCount ? totalImgsCount : endImgNumber;

    let imgs = "";
    for(let i = startImgNumber; i < endImgNumber; i++) {
        const imgName = imgsList[i];
        const img = `<img src="${imgsPath}${imgName}" alt="${imgName}" data-lightbox="gallery" />`;
        imgs += img;
    }
    $(".photos").append(imgs);
};

const generatePagesNumbers = () => {
    const pageCount = Math.ceil(imgsList.length / countLimit); // кол-во страниц

    $(".gallery").append(`<div class="pages"><ul></ul></div>`);

    for(let i = 1; i <= pageCount; i++) {
        $(".pages > ul").append(`<li>${i}</li>`);
    }
};

const onClickPageNumber = (e) => {
    const target = e.target;
    const pageNumber = +target.innerText - 1;

    const currentActivePage = $(".pages > ul > li.active");

    if ( currentActivePage.length ) {
        currentActivePage[0].classList.remove("active");
    }
    
    target.classList.add("active");
    generateImgs(pageNumber);
};

$(document).ready( function(){
   
    const pageNumber = 0; // при открытии показываем самую первую страницу
    generateImgs(pageNumber);
    generatePagesNumbers();

    const lightbox = new Lightbox;

    $(".pages > ul > li").click(onClickPageNumber);
})
