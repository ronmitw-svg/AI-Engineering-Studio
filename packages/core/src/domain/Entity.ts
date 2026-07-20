export abstract class Entity<TId> {
  public readonly id: TId;

  protected constructor(id: TId) {
    this.id = id;
  }

  equals(entity?: Entity<TId>): boolean {
    if (!entity) return false;
    return this.id === entity.id;
  }
}
