import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import {
  IAppController,
  IAppView,
  ArticlesObject,
  SourcesData,
} from '../../types/types';

class App {
  private controller: IAppController;

  private view: IAppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  public start(): void {
    document
      ?.querySelector('.sources')
      ?.addEventListener('click', e =>
        this.controller.getNews(e as PointerEvent, (data: ArticlesObject) =>
          this.view.drawNews(data)
        )
      );
    this.controller.getSources((data: SourcesData) => {
      this.view.drawCategories(data);
      this.view.drawSources(data);
      document
        ?.querySelector('.category')
        ?.addEventListener('change', () => this.view.drawSources(data));
      document
        ?.querySelector('.country')
        ?.addEventListener('change', () => this.view.drawSources(data));
    });
  }
}

export default App;
