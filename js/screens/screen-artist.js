import getElFromTempl from "../get-el-from-tmpl";
import showScreen from "../show-screen";
import {initializePlayer} from '../player';
import showScreenGenre from "./screen-genre";
import genres from '../data/genres';

export default (data, currentState) => {
  const artistTemplate = (d) =>
    d.variants
      .map((variant, idx) => `
      <div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-${idx}" name="answer" value="val-${idx}" />
          <label class="main-answer" for="answer-${idx}">
            <img class="main-answer-preview" src="${variant.img}">
            ${variant.name}
          </label>
        </div>`
      )
      .join(``);

  const templateArtist = `<section class="main main--level main--level-artist" id="level-artist">
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

      <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">02</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">00</span>
      </div>
    </svg>

    <div class="main-wrap">
      <div class="main-timer"></div>

      <h2 class="title main-title">Кто исполняет эту песню?</h2>
      <div class="player-wrapper"></div>
      <form class="main-list">
        ${artistTemplate(data)}
      </form>
    </div>
  </section>`;

  const screenArtist = getElFromTempl(templateArtist);

  screenArtist.querySelector(`.main-list`).addEventListener(`click`, (e) => {
    if (e.target.closest(`.main-answer-wrapper`)) {

      let genre = genres[currentState.genreCount];
      showScreenGenre(genre, currentState);
    }

  });
  initializePlayer(screenArtist.querySelector(`.player-wrapper`), data.url);
  showScreen(screenArtist);
  currentState.artistCount = currentState.artistCount + 1;

};
