import SortView from '../view/sort-view.js';
import EventView from '../view/event-view.js';
import EventsListView from '../view/events-list-view.js';
import EventEditFormView from '../view/event-edit-form-view.js';
import { render } from '../render.js';

export default class TripPresenter {
  sortComponent = new SortView();
  eventsListComponent = new EventsListView();

  constructor({container}) {
    this.container = container;
  }

  init() {
    render(this.sortComponent, this.container);
    render(this.eventsListComponent, this.container);
    render(new EventEditFormView(), this.eventsListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventView(), this.eventsListComponent.getElement());
    }
  }
}
