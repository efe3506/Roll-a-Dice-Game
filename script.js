'use strict';

//*Manipüle edilecek olan objeleri/elementleri kod içerinde çağırmak için değişkenlere atıyoruz.
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const bntNew = document.querySelector('.btn--new');
const bntRoll = document.querySelector('.btn--roll');
const bntHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

//*Oyuncu değişikliğini gerçekleştirecek fonksiyon
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; //! Zarın 1 geldiği koşulda öncelikle current score'u sıfırlayacak
  activePlayer = activePlayer === 0 ? 1 : 0; //! ternary operator ile `current--${activePlayer}` 'ı şalter mantığı ile değiştirecek.
  currentScore = 0; //! current score sıfırlanmazsa sonraki elde göstermese de sürekli puanlar katlanarak eklenecek
  player0El.classList.toggle('player--active'); //! ClassList.toggle diyerek seçilen değişkende parantezdeki class var ise çıkartır, yok ise ekleriz.
  player1El.classList.toggle('player--active');
};

//*Güncel puanın atanacağı değişken (güncelleneceği için let ile tanımlanacak).
let currentScore = 0;

//*Aktif oyuncuyu takip edebilmek için değiştirilebilir bir değişken oluşturulacak.
let activePlayer = 0;

//*Oyun bittiğinde oynanabilirliği engellemek için kontrol değişkeni
let playing = 0;

//*Oyuncuların elde ettikleri puanları kaydetmek için bir array oluşturulacak.
const scores = [0, 0];

//*Yeni oyun fonksiyonu


const init = () => {
    currentScore = 0
    activePlayer = 0
    playing = true;
    scores[0, 0];

  //*Oyun başlangıcında puanın 0 olması ve zarın atılmadan gözükmemesi için başlangıç şartları
  
  diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

//*Zar Atma İşlevi

bntRoll.addEventListener('click', () => {
  //*Playing değişkeni true olduğu için, true koşulu devam ettiği sürece buttonlar ve bu buttonlara atanan işlevler aktif olur.
  if (playing) {
    //?1. Rastgele zar oluştur
    const dice = Math.trunc(Math.random() * 6) + 1;

    //?2. Zarları göster
    diceEl.classList.remove('hidden');
    diceEl.src = `img/dice-${dice}.png`;
    //! Yukarıda statik bir değer atamak yerine fonksiyon içerisinde oluşturduğumuz rastgele oluşan 1 ile 6 arası sayı backtick ile gösterdiğimiz src kaynağına getirilerek gösterilen img'nin değişmesini sağlar

    //?3. Zarın 1 olup olmadığını kontrol et.
    if (dice !== 1) {
      //?Zarı mevcut skora ekle
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; //! Yine statik değer yerine değişebilir (dinemik ID) bir metin içeriği
    } else {
      //?Eğer doğruysa diğer oyuncuya geç.
      switchPlayer();
    }
  }
});

//*Hold işlevi

bntHold.addEventListener('click', () => {
  if (playing) {
    // console.log('Hold buttonuna basıldı');
    //?1. Aktif oyuncunun puanına mevcut puanı ekle.
    scores[activePlayer] += currentScore;
    // console.log(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //?2. Aktif oyuncunun puanının en az 100 olup olmadığını kontrol et
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.getElementById(`name--${activePlayer}`).textContent = 'Winner !';
      //?oyunu bitir
      playing = false;
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
      //?100 ise oyunu bitir
      //?Değilse diğer oyuncuya geç
    }
  }
});

//*New Game işlevi

bntNew.addEventListener('click', init);
