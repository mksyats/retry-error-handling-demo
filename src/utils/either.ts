export class Either<L, R> {
  private constructor(
    private readonly leftValue: L | null,
    private readonly rightValue: R | null,
  ) {}

  static left<L, R>(value: L): Either<L, R> {
    return new Either<L, R>(value, null);
  }

  static right<L, R>(value: R): Either<L, R> {
    return new Either<L, R>(null, value);
  }

  isLeft(): boolean {
    return this.leftValue !== null;
  }

  isRight(): boolean {
    return this.rightValue !== null;
  }

  get left(): L | null {
    return this.leftValue;
  }

  get right(): R | null {
    return this.rightValue;
  }

  map<T>(fn: (r: R) => T): Either<L, T> {
    return this.isRight()
      ? Either.right<L, T>(fn(this.rightValue!))
      : Either.left<L, T>(this.leftValue!);
  }

  match<T>(leftFn: (l: L) => T, rightFn: (r: R) => T): T {
    return this.isRight() ? rightFn(this.rightValue!) : leftFn(this.leftValue!);
  }
}
