import $ from "jquery";

const imgsPath = "./img/galleryImgs/";

export default class Lightbox {
    constructor() {
        this.init();
    }

    getHTMLTemplate() {
        return `
            <div class="lightbox closed">

                <a href="#" class="close"></a>

                <div class="photo"></div>

                <div class="photo-info">
                    <div class="likes">
                        <div class="likes-count">
                            <p>0</p>
                        </div>
                        <div class="like"></div>
                    </div>

                    <div class="comments"></div>

                    <div class="comment-create">
                        <textarea class="comment" type="text" placeholder="Напишите комментарий..." />
                        <button class="send-comment">Отправить</button>
                    </div>
                </div>
            </div>
        `;
    }

    init() {
        this.likesCount = 0;
        this.liked = false;
        $("body").append(this.getHTMLTemplate());
        $(".close").click(this.onClickClose);
        $(".photos").click(this.onClickImg.bind(this));
        $(".likes").click(this.onClickLike.bind(this));
        $(".send-comment").click(this.onClickSentComment.bind(this));
    }

    onClickImg(e) {
        const path = e.originalEvent.path;
        const imgClicked = path.filter((el) => el.localName == "img")[0];
    
        if ( !imgClicked ) {
            return;
        }
    
        $(".lightbox")[0].classList.remove("closed");
        const img = `<img src="${imgsPath}${imgClicked.alt}" />`;
        $(".comments").html("");
        this.liked = false;
        this.likesCount = 0;
        this.setLike();
        $(".photo").html("");
        $(".photo").append(img);
    }

    onClickLike() {
        this.liked = !this.liked;
        if ( this.liked ) {
            this.likesCount++;;
        } else {
            this.likesCount--;
        }
        this.setLike();
    }

    onClickClose() {
        $(".lightbox")[0].classList.add("closed");
    }

    setLike() {
        if ( this.liked ) {
            $(".like")[0].classList.add("active-like");
        } else {
            $(".like")[0].classList.remove("active-like");
        }
        $(".likes-count p")[0].innerText = this.getLikesCount();
    }

    getLikesCount() {
        return this.likesCount;
    }

    onClickSentComment() {
        this.sentComment();
        $(".comment").val("");
    }

    sentComment() {
        const commentValue = $(".comment").val();

        if ( commentValue ) {
            $(".comments").append(`<div>${commentValue}</div>`);
        }
    }

}
