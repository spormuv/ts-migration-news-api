import './news.css';
import { NewsObject } from '../../../types/types';
import { TEN, ZERO } from '../../../constants/constants';

class News {
  public draw(data: NewsObject[]): void {
    const news: NewsObject[] =
      data.length >= TEN ? data.filter((_item, index) => index < TEN) : data;

    const fragment: DocumentFragment = document.createDocumentFragment();
    const newsItemTemp = document.querySelector(
      '#newsItemTemp'
    ) as HTMLTemplateElement;

    if (newsItemTemp) {
      news.forEach((item: NewsObject, index: number) => {
        const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;

        if (index % 2)
          newsClone.querySelector('.news__item')?.classList.add('alt');

        const metaPhoto = newsClone.querySelector(
          '.news__meta-photo'
        ) as HTMLTemplateElement;
        if (metaPhoto) {
          metaPhoto.style.backgroundImage = `url(${
            item.urlToImage || 'img/news_placeholder.jpg'
          })`;
        }

        const metaAuthor = newsClone.querySelector(
          '.news__meta-author'
        ) as HTMLTemplateElement;
        if (metaAuthor) {
          metaAuthor.textContent = item.author || item.source.name;
        }

        const metaDate = newsClone.querySelector(
          '.news__meta-date'
        ) as HTMLTemplateElement;
        if (metaDate) {
          metaDate.textContent = item.publishedAt
            .slice(ZERO, TEN)
            .split('-')
            .reverse()
            .join('-');
        }

        const descriptionTitle = newsClone.querySelector(
          '.news__description-title'
        ) as HTMLTemplateElement;
        if (descriptionTitle) {
          descriptionTitle.textContent = item.title;
        }

        const descriptionSource = newsClone.querySelector(
          '.news__description-source'
        ) as HTMLTemplateElement;
        if (descriptionSource) {
          descriptionSource.textContent = item.source.name;
        }

        const descriptionContent = newsClone.querySelector(
          '.news__description-content'
        ) as HTMLTemplateElement;
        if (descriptionContent) {
          descriptionContent.textContent = item.description;
        }

        newsClone
          .querySelector('.news__read-more a')
          ?.setAttribute('href', item.url);

        fragment.append(newsClone);
      });
    }

    const newsElement = document.querySelector('.news') as HTMLTemplateElement;
    if (newsElement) {
      newsElement.innerHTML = '';
      newsElement.appendChild(fragment);
    }
  }
}

export default News;
