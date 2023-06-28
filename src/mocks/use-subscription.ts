import { DependencyList, useEffect } from "react";
import { Observable, Observer } from "rxjs";

export const useSubscription = <T>(
  observable: Observable<T>,
  observer: Partial<Observer<T>>,
  deps: DependencyList
) => {
  useEffect(() => {
    const subscription = observable.subscribe(observer);
    return () => subscription.unsubscribe();
  }, [observable, ...deps]);
};
