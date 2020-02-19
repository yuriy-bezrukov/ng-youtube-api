import { BehaviorSubject } from 'rxjs';

export interface IBaseStore {
  action: {};
  payload?: {};
}

export class BaseStoreService<T extends IBaseStore> {

  protected _initState = <any>{ action: '', payload: {} }; // tslint:disable-line

  private readonly _state = new BehaviorSubject<T>(this._initState);

  readonly state$ = this._state.asObservable();

  protected get state(): T {
    return this._state.getValue();
  }

  protected set state(val: T) {
    console.debug(`${this.constructor.name}: ${val['action']}`, val['payload']); // tslint:disable-line
    this._state.next(val);
  }

  get stateValue(): T {
    return this._state.getValue();
  }

  protected set _assignState(stateForMerge: T) {
    (<IBaseStore>this.state) = {
        action: stateForMerge.action,
        payload: Object.assign({}, this.stateValue.payload, stateForMerge.payload)
    };
  }

}
