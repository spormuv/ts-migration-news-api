import AppLoader from './appLoader';
import { ENDPOINTS } from '../../constants/endpoints';

class AppController extends AppLoader {
  public getSources<Data>(callback: (data: Readonly<Data>) => void): void {
    super.getResponse(
      {
        endpoint: ENDPOINTS.sources,
      },
      callback
    );
  }

  public getNews<Data>(
    e: PointerEvent,
    callback: (data: Readonly<Data>) => void
  ): void {
    let target = e.target as Element;
    const newsContainer = e.currentTarget as Element;

    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id');
        if (
          sourceId &&
          newsContainer.getAttribute('data-source') !== sourceId
        ) {
          newsContainer.setAttribute('data-source', sourceId);
          super.getResponse(
            {
              endpoint: ENDPOINTS.everything,
              options: {
                sources: sourceId,
              },
            },
            callback
          );
        }
        return;
      }
      target = target.parentNode as Element;
    }
  }
}

export default AppController;
