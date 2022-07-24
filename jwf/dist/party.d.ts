interface IParticle extends IVec2 {
    /**
     * Ticks to live
     */
    ttl: number;
    angle: number;
    color: IColor;
    speed: number;
    size: number;
}
interface IParty {
    particleList: IParticle[];
    _gfx: CanvasRenderingContext2D;
    draw(): void;
    createParticle(pos: IVec2, angle: number, speed: number, ttl: number, color?: IColor): void;
}
/**@private */
/**
 * Just works particle system. You are supposed to create one for each type of particle.
 * @param ctx add the jwf.gfx here.
 * @param size Size of the particles. (radius)
 * @returns
 */
declare const PARTY: (ctx: CanvasRenderingContext2D, size?: number, color?: IColor | undefined) => IParty;
/**@private */
declare function ____randColor(): IColor;
/**@private */
declare function _colorToString(color: IColor): string;
/**@private */
declare function __AngleToNormalizedVector2(angle: number): {
    x: number;
    y: number;
};
declare function __normalizedVector2ToAngle(v: IVec2): number;
declare function __vector2Add(v1: IVec2, v2: IVec2): {
    x: number;
    y: number;
};
declare function _vector2Scale(v: IVec2, scale: number): {
    x: number;
    y: number;
};
