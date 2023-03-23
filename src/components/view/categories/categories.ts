import './categories.css';
import { SourceObject } from '../../../types/types';

class Categories {
  private countries = new Set<string>();

  private categories = new Set<string>();

  public draw(data: SourceObject[]): void {
    const category = document.querySelector('.category') as HTMLTemplateElement;
    const country = document.querySelector('.country') as HTMLTemplateElement;
    data.forEach((item: SourceObject) => {
      this.countries.add(item.country);
      this.categories.add(item.category);
    });
    this.categories.forEach(item => {
      const option: HTMLOptionElement = document.createElement('option');
      option.textContent = item;
      category?.append(option);
    });
    this.countries.forEach(item => {
      const option: HTMLOptionElement = document.createElement('option');
      option.textContent = item;
      country?.append(option);
    });
  }
}

export default Categories;
