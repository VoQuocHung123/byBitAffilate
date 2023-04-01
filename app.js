$(document).ready(function (){
  $('.table-container').slick({
  prevArrow: false,
  nextArrow: false,
  autoplay: true,
  autoplayspeed: 1000,
  })
})

$(document).ready(function () {
  $(".slide-message-container").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    // autoplay: true,
    autoplayspeed: 1000,
    prevArrow:
      "<button type='button' class='slick-prev pull-left'><ion-icon name='arrow-back-outline'></ion-icon></button>",
    nextArrow:
      "<button type='button' class='slick-next pull-right'><ion-icon name='arrow-forward-outline'></ion-icon></button>",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  });
});
const listCoin = document.querySelector(".list-coin");
const divPost = document.querySelector("#post-news");
const btnReadMore = document.querySelector('.btn-read-more')
let targetPost = divPost.offsetTop

btnReadMore.addEventListener('click',(e)=>{
  e.preventDefault()
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if(isMobile){
      window.scrollTo(0,targetPost - 125)
    }
    else{
      window.scrollTo(0,targetPost - 100)
    }
})

function getCoinData() {
  const coins = ["bitcoin", "ethereum", "cardano", "binancecoin", "ripple"];
  const apiUrl = "https://api.coingecko.com/api/v3/coins/";

  const promises = coins.map((coin) =>
    fetch(apiUrl + coin)?.then((response) => response.json())
  );
  return Promise.all(promises)
    .then((data) => {
      let html = "";
      data?.map((coin, index) => {
        return (html += `<div class="coin-item">
            <div class="left-coin">
              <img src=${coin?.image?.large} alt="" />
              <div class="info-coin">
                <p
                  style="
                    font-weight: bold;
                    font-size: small;
                    opacity: 0.5;
                    text-transform: uppercase;
                  "
                >
                  ${coin?.symbol}
                </p>
                <p style="font-size: medium; font-weight: bold">
                  ${coin?.market_data?.current_price.usd?.toLocaleString("en", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
            </div>
            <div class="right-coin">
              <h3
                style="
                  font-weight: bold;
                  font-size: medium;
                  color: rgb(37, 214, 37);
                "
              >
              ${
                coin?.market_data?.price_change_percentage_24h?.toString()[0] ===
                "-"
                  ? coin?.market_data?.price_change_percentage_24h
                      ?.toString()
                      ?.substring(1, 4)
                  : "+" +
                    coin?.market_data?.price_change_percentage_24h
                      ?.toString()
                      ?.substring(0, 4)
              }%
           
              </h3>
              <h4 style="font-weight: normal; font-size: 11pt">
             
                 ${coin?.market_data?.market_cap?.usd
                   ?.toLocaleString("en", {
                     style: "currency",
                     currency: "USD",
                   })
                   ?.substring(0, 8)}M
              </h4>
            </div>
          </div>`);
      });
      listCoin.innerHTML = html;
    })
    .catch((error) => console.error(error));
}
getCoinData();


