import './sources.css';
import { SourceObject } from '../../../types/types';

class Sources {
  public draw(data: SourceObject[]): void {
    const category = document.querySelector('.category') as HTMLSelectElement;
    const country = document.querySelector('.country') as HTMLSelectElement;
    const fragment = document.createDocumentFragment() as DocumentFragment;
    const sourceItemTemp = document.querySelector(
      '#sourceItemTemp'
    ) as HTMLTemplateElement;
    if (sourceItemTemp) {
      data.forEach((item: SourceObject) => {
        if (
          item.category ===
            category?.options[category.selectedIndex]?.textContent &&
          item.country === country?.options[country.selectedIndex]?.textContent
        ) {
          const sourceClone = sourceItemTemp.content.cloneNode(
            true
          ) as DocumentFragment;

          const itemName = sourceClone.querySelector(
            '.source__item-name'
          ) as HTMLTemplateElement;
          if (itemName) {
            itemName.textContent = item.name;
          }

          const itemElement = sourceClone.querySelector(
            '.source__item'
          ) as HTMLTemplateElement;
          if (itemElement) {
            itemElement.setAttribute('data-source-id', item.id);
          }

          fragment.append(sourceClone);
        }
      });
    }

    const sources = document.querySelector('.sources') as HTMLTemplateElement;
    const news = document.querySelector('.news') as HTMLTemplateElement;
    if (sources && news) {
      sources.innerHTML = '';
      news.innerHTML = '';
      sources.append(fragment);
    }
  }
}

export default Sources;
