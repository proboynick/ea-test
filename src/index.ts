import './style.css';

const days = document.querySelector('.days');
const hours = document.querySelector('.hours');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
const form = document.querySelector('.form');
const modal = document.querySelector('.pop-up');
const cross = document.querySelector('.pop-up__cross');
const popUpStatus = document.querySelector('.pop-up__status');
const popUpMsg = document.querySelector('.pop-up__message');
const accordionItems = document.querySelectorAll('.accordion__item');

const setTime = (dd: string, hh: string, mm: string, ss: string) => {
  // prettier-ignore
  if (
    !(days instanceof HTMLSpanElement)
    || !(hours instanceof HTMLSpanElement)
    || !(minutes instanceof HTMLSpanElement)
    || !(seconds instanceof HTMLSpanElement)
  ) {
    return;
  }
  days.innerHTML = dd;
  hours.innerHTML = hh;
  minutes.innerHTML = mm;
  seconds.innerHTML = ss;
};

const setCountDown = (deadline: number) => {
  const interval = setInterval(() => {
    const diff = deadline - new Date().valueOf();
    if (diff <= 0) {
      clearInterval(interval);
    }
    const dd = Math.floor(diff / 24 / 60 / 60 / 1000)
      .toString()
      .padStart(2, '0');
    const hh = Math.floor((diff / 1000 / 60 / 60) % 24)
      .toString()
      .padStart(2, '0');
    const mm = Math.floor((diff / 1000 / 60) % 60)
      .toString()
      .padStart(2, '0');
    const ss = Math.floor((diff / 1000) % 60)
      .toString()
      .padStart(2, '0');
    setTime(dd, hh, mm, ss);
  }, 1000);
};

document.addEventListener('DOMContentLoaded', () => {
  const deadline = new Date('2024/07/24').valueOf();
  setCountDown(deadline);
});

(form as HTMLFormElement).addEventListener('submit', (e) => {
  e.preventDefault();
  let status = '';
  let message = '';
  console.log(JSON.stringify((form as HTMLFormElement).email.value));
  // prettier-ignore
  fetch(
    'somehost.com',
    {
      method: 'POST',
      body: JSON.stringify((form as HTMLFormElement).email.value),
      headers: {
        'Content-Type': 'application/json',
      },
    },
    )
      .then((res) => res.json())
      .then(() => {
        status = 'success!';
        message = 'You have successfully subscribed to the email newsletter';
      })
      .catch(() => {
        status = 'error!';
        message = 'Something went wrong';
      })
      .finally(() => {
        (popUpStatus as HTMLParagraphElement).innerHTML = status;
        (popUpMsg as HTMLParagraphElement).innerHTML = message;
        (modal as HTMLDialogElement).showModal();
      });
});

(cross as HTMLAnchorElement).addEventListener('click', (e) => {
  e.preventDefault();
  (modal as HTMLDialogElement).close();
});

accordionItems.forEach((el) => {
  el.addEventListener('click', (e) => {
    accordionItems.forEach((item) => {
      item.classList.remove('active');
    });
    (e.currentTarget as HTMLDivElement).classList.add('active');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.setAttribute('pending', '');
  }, 500);
});
