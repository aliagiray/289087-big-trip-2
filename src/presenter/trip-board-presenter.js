import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import { render } from '../framework/render.js';
import NoEventsView from '../view/no-events-view.js';
import EventPresenter from './event-presenter.js';
import { updateItem } from '../utils/event.js';

export default class TripBoardPresenter {
  #tripContainer = null;
  #eventsModel = null;

  #sortComponent = new SortView();
  #eventsListComponent = new EventsListView();
  #noEventsComponent = new NoEventsView();

  #eventsPresenters = new Map();
  #events = [];

  constructor({ tripContainer, eventsModel }) {
    this.#tripContainer = tripContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#events = [...this.#eventsModel.events];

    this.#renderTripBoard();
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      eventsListContainer: this.#eventsListComponent.element,
      onDataChange: this.#handleEventChange,
      onModeChange: this.#handleModeChange
    });
    eventPresenter.init(event);
    this.#eventsPresenters.set(event.id, eventPresenter);
  }

  #renderTripBoard() {
    if (this.#events.length === 0) {
      this.#renderNoEvents();
      return;
    }

    this.#renderSort();
    this.#renderEventsList();
    this.#renderEvents();
  }

  #renderSort() {
    render(this.#sortComponent, this.#tripContainer);
  }

  #renderEventsList() {
    render(this.#eventsListComponent, this.#tripContainer);
  }

  #renderNoEvents() {
    render(this.#noEventsComponent, this.#tripContainer);
  }

  #renderEvents() {
    this.#events.forEach((event) => this.#renderEvent(event));
  }

  #clearEventsList() {
    this.#eventsPresenters.forEach((presenter) => presenter.destroy());
    this.#eventsPresenters.clear();
  }

  #handleModeChange = () => {
    this.#eventsPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleEventChange = (updatedEvent) => {
    this.#events = updateItem(this.#events, updatedEvent);
    this.#eventsPresenters.get(updatedEvent.id).init(updatedEvent);
  };
}
