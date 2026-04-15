declare module 'petyourcobblemon.procedures' {
  import { Entity } from 'net.minecraft.world.entity';
  import { EntityInteract } from 'PlayerInteractEvent';
  import { LevelAccessor } from 'net.minecraft.world.level';

  class DisableProcedure {
    static execute(entity: Entity): void;
  }


  class EnableProcedure {
    static execute(entity: Entity): void;
  }


  class PettingProcedure {
    static execute(world: LevelAccessor, entity: Entity, sourceentity: Entity): void;
    getScore(score: string, _ent: Entity): number;
    getScore(score: string, _ent: Entity): number;
    static onRightClickEntity(event: EntityInteract): void;
  }


  class ToggleProcedure {
    static execute(entity: Entity): void;
  }

}