export abstract class Entity<TId> {
  public readonly id: TId;

  protected constructor(id: TId) {
    this.id = id;
  }

  equals(entity?: Entity<TId>): boolean {
    if (!entity) return false;
    return this.id === entity.id || (
      typeof this.id === "object" &&
      this.id !== null &&
      "equals" in this.id &&
      typeof this.id.equals === "function" &&
      this.id.equals(entity.id)
    );
  }
}
