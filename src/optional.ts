export abstract class Optional<T> {
  public static of<T>(value: T): Optional<T> {
    return value == null ? None.INSTANCE : new Some(value);
  }

  public static empty<T>(): Optional<T> {
    return None.INSTANCE;
  }

  public abstract get(): T;

  public abstract orElse(defaultValue: T): T;

  public abstract orElseGet(supplier: () => T): T;

  public abstract orElseThrow(exceptionSupplier: () => Error): Optional<T>;

  public abstract map<R>(mapper: (t: T) => R): Optional<R>;

  public abstract flatMap<R>(mapper: (t: T) => Optional<R>): Optional<R>;

  public abstract isPresent(): boolean;
  public abstract ifPresent(action: (t: T) => void): void;

  public abstract filter(predicate: (t: T) => boolean): Optional<T>;

  public abstract peek(peeker: (t: T) => void): Optional<T>;

  public abstract ifPresentOrElse(
    action: (t: T) => void,
    emptyAction: () => void
  ): void;

  public abstract isEmpty(): boolean;
  
  public abstract or(supplier: () => Optional<T>): Optional<T>;
}

class None extends Optional<any> {
  public get(): any {
    throw new Error("No value present.");
  }
  public orElse(defaultValue: any) {
    return defaultValue;
  }
  public orElseGet(supplier: () => any) {
    return supplier();
  }
  public orElseThrow(exceptionSupplier: () => Error): Optional<any> {
    throw exceptionSupplier();
  }
  public map<R>(_mapper: (t: any) => R): Optional<any> {
    return this;
  }
  public flatMap<R>(_mapper: (t: any) => Optional<R>): Optional<R> {
    return this;
  }
  public isPresent(): boolean {
    return false;
  }
  public ifPresent(_action: (t: any) => void): void {
    return;
  }
  public filter(_predicate: (t: any) => boolean): Optional<any> {
    return this;
  }
  public peek(_peeker: (t: any) => void): Optional<any> {
    return this;
  }
  public ifPresentOrElse(
    _action: (t: any) => void,
    emptyAction: () => void
  ): void {
    emptyAction();
  }
  public isEmpty(): boolean {
    return true;
  }
  public or(supplier: () => Optional<any>): Optional<any> {
    return supplier();
  }

  static INSTANCE: Optional<any> = new None();
}

class Some<T> extends Optional<T> {
  private value: T;
  constructor(value: T) {
    super();
    this.value = value;
  }

  public get(): T {
    return this.value;
  }
  public orElse(_defaultValue: T): T {
    return this.value;
  }
  public orElseGet(_supplier: () => T): T {
    return this.value;
  }
  public orElseThrow(_exceptionSupplier: () => Error): Optional<T> {
    return this;
  }
  public map<R>(mapper: (t: T) => R): Optional<R> {
    return Optional.of(mapper(this.value));
  }
  public flatMap<R>(mapper: (t: T) => Optional<R>): Optional<R> {
    const result = mapper(this.value);
    if (result == null) {
      throw new Error("mapper does not return an Optional");
    }
    return result;
  }
  public isPresent(): boolean {
    return true;
  }
  public ifPresent(action: (t: T) => void): void {
    action(this.value);
  }
  public filter(predicate: (t: T) => boolean): Optional<T> {
    return predicate(this.value) ? this : None.INSTANCE;
  }
  public peek(peeker: (t: T) => void): Optional<T> {
    peeker(this.value);
    return this;
  }
  public ifPresentOrElse(
    action: (t: T) => void,
    _emptyAction: () => void
  ): void {
    action(this.value);
  }
  public isEmpty(): boolean {
    return false;
  }
  public or(_supplier: () => Optional<T>): Optional<T> {
    return this;
  }
}
